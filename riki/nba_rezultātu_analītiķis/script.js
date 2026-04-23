const API_BASE = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba";

/* UI elementu saīsnes, lai nav atkārtoti jāmeklē DOM */
const dateInput = document.getElementById("gameDate");
const loadBtn = document.getElementById("refreshBtn");
const todayBtn = document.getElementById("todayBtn");
const statusLine = document.getElementById("statusLine");
const gamesWrap = document.getElementById("gamesContainer");

/* Vienkāršs stāvoklis: komandu statistiku kešs + pieprasījumu skaitītājs */
const appState = {
  teamStatsByKey: {},
  requestNumber: 0,
};

setupPage();

/* Inicializē lapu, notikumus un pirmo automātisko ielādi */
function setupPage() {
  /* Datuma laukā uzreiz ieliekam šodienu */
  dateInput.value = formatDate(new Date(), "input");

  loadBtn.addEventListener("click", () => {
    loadGamesForDay(dateInput.value);
  });

  todayBtn.addEventListener("click", () => {
    /* Ātri atgriežamies uz šodienas datumu */
    dateInput.value = formatDate(new Date(), "input");
    loadGamesForDay(dateInput.value);
  });

  /* Pirmā ielāde uzreiz pēc lapas atvēršanas */
  loadGamesForDay(dateInput.value);
}

/* Galvenā ielāde konkrētam datumam */
async function loadGamesForDay(day) {
  if (!day) {
    setStatus("Lūdzu izvēlies datumu.", true);
    return;
  }

  /* Skaitītājs palīdz ignorēt novecojušus async pieprasījumus */
  const localRequest = ++appState.requestNumber;
  gamesWrap.innerHTML = "";
  setStatus("Ielādē spēles...");

  try {
    const boardUrl = `${API_BASE}/scoreboard?dates=${day.replaceAll("-", "")}`;
    const board = await fetchJson(boardUrl);

    /* Ja jau palaists jaunāks pieprasījums, šī atbilde nav aktuāla */
    if (localRequest !== appState.requestNumber) return;

    const games = board?.events ?? [];
    const season =
      board?.leagues?.[0]?.season?.year ?? board?.season?.year ?? new Date(day).getFullYear();

    if (!games.length) {
      renderEmpty("Šajā datumā spēles nav atrastas.");
      setStatus("Spēles nav atrastas.");
      return;
    }

    const cards = [];
    for (const game of games) {
      /* Katrai spēlei uzģenerē vienu kartīti */
      const card = await createGameCard(game, season);
      cards.push(card);
    }

    gamesWrap.innerHTML = "";
    cards.forEach((card) => gamesWrap.appendChild(card));
    setStatus(cards.length === 1 ? "Ielādēta 1 spēle." : `Ielādētas ${cards.length} spēles.`);
  } catch (err) {
    console.error(err);
    renderEmpty("Neizdevās ielādēt datus no ESPN.");
    setStatus("Neizdevās ielādēt datus no ESPN API.", true);
  }
}

/* Izveido kartīti vienai spēlei */
async function createGameCard(game, season) {
  const comp = game?.competitions?.[0];
  const home = comp?.competitors?.find((t) => t.homeAway === "home");
  const away = comp?.competitors?.find((t) => t.homeAway === "away");

  const card = document.createElement("article");
  card.className = "game-card";

  if (!home || !away) {
    /* Fallback, ja API kādai spēlei neatgriež pilnu struktūru */
    card.textContent = "Neizdevās nolasīt spēles informāciju.";
    return card;
  }

  /* Paralēli paņemam abas komandu sezonas statistikas */
  const [homeStats, awayStats] = await Promise.all([
    getTeamStats(home.team.id, season),
    getTeamStats(away.team.id, season),
  ]);

  /* Aprēķinām prognozi no vienkāršas fiksētas formulas */
  const prediction = makePrediction(home, away, homeStats, awayStats);

  const statusText = translateStatus(
    comp?.status?.type?.description ?? comp?.status?.type?.shortDetail ?? "Scheduled"
  );
  const statusState = comp?.status?.type?.state ?? "pre";
  const showScores = statusState === "in" || statusState === "post";

  /* Dzīvajām/beigtām spēlēm rāda score, citādi '-' */
  const homeScore = showScores ? num(home.score) : Number.NaN;
  const awayScore = showScores ? num(away.score) : Number.NaN;

  card.innerHTML = `
    <div class="game-top">
      <div>
        <strong>${escapeHtml(game.shortName ?? `${away.team.displayName} @ ${home.team.displayName}`)}</strong>
        <div class="tipoff">${escapeHtml(formatDate(comp?.date, "display"))}</div>
      </div>
      <span class="status-pill">${escapeHtml(statusText)}</span>
    </div>

    <div class="teams">
      ${renderTeamRow(away, getTeamRecord(away), awayScore)}
      ${renderTeamRow(home, getTeamRecord(home), homeScore)}
    </div>

    <div class="prediction-box">
      <p class="winner-line">Iespējamais uzvarētājs: ${escapeHtml(prediction.favorite)} (${prediction.winProb}%)</p>
      <p>Prognozētais rezultāts: ${escapeHtml(away.team.abbreviation)} ${prediction.awayScore} - ${escapeHtml(home.team.abbreviation)} ${prediction.homeScore}</p>
      <p>Punktu starpība: ${escapeHtml(prediction.spreadText)}</p>
    </div>
  `;

  return card;
}

/* Komandas pamata rādītāji no regular-season schedule */
async function getTeamStats(teamId, season) {
  const key = `${season}-${teamId}`;

  /* Kešs samazina atkārtotu pieprasījumu skaitu */
  if (appState.teamStatsByKey[key]) return appState.teamStatsByKey[key];

  appState.teamStatsByKey[key] = (async () => {
    const url = `${API_BASE}/teams/${teamId}/schedule?season=${season}&seasontype=2`;
    const schedule = await fetchJson(url);
    const events = schedule?.events;

    if (!Array.isArray(events)) {
      throw new Error("Could not load team statistics from ESPN API.");
    }

    const completed = events.filter((e) => e?.competitions?.[0]?.status?.type?.completed);
    if (!completed.length) {
      throw new Error("Could not load team statistics from ESPN API.");
    }

    let pointsFor = 0;
    let pointsAgainst = 0;
    let wins = 0;
    const diffs = [];

    for (const event of completed) {
      const comp = event.competitions[0];
      const teamEntry = comp.competitors.find((c) => String(c.team.id) === String(teamId));
      const oppEntry = comp.competitors.find((c) => String(c.team.id) !== String(teamId));

      const teamScore = num(teamEntry?.score);
      const oppScore = num(oppEntry?.score);

      if (!Number.isFinite(teamScore) || !Number.isFinite(oppScore)) continue;

      /* Uzkrājam sezonas summas un diff pēdējās formas aprēķinam */
      pointsFor += teamScore;
      pointsAgainst += oppScore;
      if (teamScore > oppScore) wins += 1;
      diffs.push(teamScore - oppScore);
    }

    if (!diffs.length) {
      throw new Error("Could not load team statistics from ESPN API.");
    }

    const games = diffs.length;
    const recent = diffs.slice(-10);
    return {
      avgFor: pointsFor / games,
      avgAgainst: pointsAgainst / games,
      winRate: wins / games,
      recentDiff: average(recent),
      gamesPlayed: games,
    };
  })();

  try {
    return await appState.teamStatsByKey[key];
  } catch {
    /* Kļūdas gadījumā neglabājam neveiksmīgu rezultātu kešā */
    delete appState.teamStatsByKey[key];
    throw new Error("Could not load team statistics from ESPN API.");
  }
}

/* Gala prognoze ar fiksētu formulu (bez modeļa trenēšanas pārlūkā) */
function makePrediction(home, away, homeStats, awayStats) {
  /* Uzbrukuma, aizsardzības, formas un win-rate starpības */
  const offEdge = homeStats.avgFor - awayStats.avgFor;
  const defEdge = awayStats.avgAgainst - homeStats.avgAgainst;
  const formEdge = homeStats.recentDiff - awayStats.recentDiff;
  const winEdge = homeStats.winRate - awayStats.winRate;

  /* Mājas laukuma bonuss */
  const homeCourt = 2.2;

  /* Handikapa prognoze ar fiksētiem svariem */
  const margin = clamp(
    homeCourt + offEdge * 0.38 + defEdge * 0.34 + formEdge * 0.22 + winEdge * 11,
    -28,
    28
  );

  /* Kopējais punktu skaits spēlē */
  const total = clamp(
    (homeStats.avgFor + awayStats.avgFor + homeStats.avgAgainst + awayStats.avgAgainst) / 2,
    185,
    270
  );

  /* No total + margin izrēķina katras komandas punktus */
  const homeScore = clamp(total / 2 + margin / 2, 85, 150);
  const awayScore = clamp(total / 2 - margin / 2, 85, 150);

  /* Vienkārša loģistiskā uzvaras varbūtība */
  const pHome = 1 / (1 + Math.exp(-(homeScore - awayScore) / 8));
  const pAway = 1 - pHome;

  const homeFav = pHome >= pAway;
  const winProb = Math.round((homeFav ? pHome : pAway) * 100);

  return {
    favorite: homeFav ? home.team.displayName : away.team.displayName,
    winProb,
    homeScore: Math.round(homeScore),
    awayScore: Math.round(awayScore),
    spreadText:
      homeScore >= awayScore
        ? `${home.team.abbreviation} -${Math.abs(homeScore - awayScore).toFixed(1)}`
        : `${away.team.abbreviation} -${Math.abs(homeScore - awayScore).toFixed(1)}`,
  };
}

/* Viena komandas rinda kartītē (logo + nosaukums + score) */
function renderTeamRow(team, record, score) {
  const scoreText = Number.isFinite(score) ? String(Math.round(score)) : "-";
  return `
    <div class="team-row">
      <img src="${escapeHtml(team?.team?.logo ?? "")}" alt="${escapeHtml(team?.team?.displayName ?? "komanda")} logo">
      <div class="team-meta">
        <strong>${escapeHtml(team?.team?.displayName ?? "Nezināma komanda")} (${escapeHtml(team?.team?.abbreviation ?? "nav")})</strong>
        <span>${escapeHtml(record)}</span>
      </div>
      <div class="team-score">${escapeHtml(scoreText)}</div>
    </div>
  `;
}

/* Dabū komandas record, ar fallback ja nav pieejams */
function getTeamRecord(teamEntry) {
  return (
    teamEntry?.records?.find((record) => record.type === "total")?.summary ??
    teamEntry?.record ??
    "Uzvaras/zaudējumi nav pieejami"
  );
}

/* Universāls skaitļa parseris: der score/stat laukiem no ESPN */
function num(value) {
  if (Number.isFinite(value)) return Number(value);
  if (typeof value === "string") return Number.parseFloat(value);

  if (value && typeof value === "object") {
    /* ESPN reizēm atgriež objektu ar value/displayValue */
    if (Number.isFinite(value.value)) return Number(value.value);
    if (typeof value.value === "string") return Number.parseFloat(value.value);
    if (typeof value.displayValue === "string") return Number.parseFloat(value.displayValue);
  }

  return Number.NaN;
}

/* Vienkāršs vidējais ar aizsardzību pret tukšu masīvu */
function average(arr) {
  if (!arr.length) return 0;
  return arr.reduce((sum, n) => sum + n, 0) / arr.length;
}

/* Ierobežo vērtību min..max robežās */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/* Viena datuma utilīta input un ekrāna formātam */
function formatDate(value, mode = "display") {
  if (mode === "input") {
    const d = value instanceof Date ? value : new Date(value);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  if (!value) return "Laiks nav pieejams";

  /* Lokalizēts laika formāts latviešu valodai */
  return new Intl.DateTimeFormat("lv-LV", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

/* Vienkārši pārvērš vērtību tekstā */
function escapeHtml(value) {
  return String(value ?? "");
}

/* Atjauno statusa tekstu augšā */
function setStatus(text, isError = false) {
  statusLine.textContent = text;
  statusLine.style.color = isError ? "#b02a37" : "var(--muted)";
}

/* Tukšais stāvoklis, ja nav spēļu vai ir kļūda */
function renderEmpty(text) {
  gamesWrap.innerHTML = `<div class="empty-state">${escapeHtml(text)}</div>`;
}

/* Pārtulko biežākos ESPN spēles statusus */
function translateStatus(status) {
  const statuses = {
    Scheduled: "Ieplānota",
    "In Progress": "Notiek",
    Final: "Beigusies",
    Postponed: "Pārcelta",
    Canceled: "Atcelta",
    Delayed: "Aizkavēta",
  };

  return statuses[status] ?? status;
}

/* Universāls JSON pieprasījuma wrapperis ar HTTP kļūdu pārbaudi */
async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}
