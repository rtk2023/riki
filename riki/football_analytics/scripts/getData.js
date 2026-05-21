// cloudflare worker url
const WORKER_URL = "https://futbiknn.vin0gr398.workers.dev/";

// запрос 
async function apiRequest (endpoint ) {
  const res = await fetch(WORKER_URL + endpoint);
  if (!res.ok) throw new Error("kļūda: " + res.status);
  const data = await res.json();
  return data.response;
}

// поиск команды (айди, название, лого)
export async function searchTeams (name) {
  const results = await apiRequest(`/teams?search=${encodeURIComponent(name)}`);
  return results.map(item => ({
    id: item.team.id,
    name: item.team.name,
    logo: item.team.logo,
    country: item.team.country
  }));
}

// получаем инфу о ласт 5 матчей за 2024
export async function getTeamForm(teamId) {
  const all = await apiRequest(`/fixtures?team=${teamId}&season=2024`);
  const fixtures = all
    .filter(f => f.fixture.status.short === "FT") // FT - full time - сыгранные 
    .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date)) // сортируем по дате 
    .slice(0, 5); // берем первые 5
  return fixtures.map(f => {
    const isHome = f.teams.home.id === teamId;
    const goalsFor     = isHome ? f.goals.home : f.goals.away;
    const goalsAgainst = isHome ? f.goals.away : f.goals.home;

    let result;
    if (f.teams.home.winner === null) {
      result = "D"; // draw
    } else if ((isHome && f.teams.home.winner) || (!isHome && !f.teams.home.winner)) {
      result = "W"; // win
    } else {
      result = "L"; // lose
    }

    return { date: f.fixture.date, result, goalsFor, goalsAgainst };
  });
}

// личные встречи
export async function getH2H(team1Id, team2Id) {
  const all = await apiRequest(
    `/fixtures/headtohead?h2h=${team1Id}-${team2Id}&season=2024`
  );
  const fixtures = all
    .filter(f => f.fixture.status.short === "FT")
    .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date))
    .slice(0, 5);

  return fixtures.map(f => {
    let winnerId;
    if (f.teams.home.winner === null) {
      winnerId = null;
    } else if (f.teams.home.winner === true) {
      winnerId = f.teams.home.id;
    } else {
      winnerId = f.teams.away.id;
    }

    return {
      date: f.fixture.date,
      homeTeamName: f.teams.home.name,
      awayTeamName: f.teams.away.name,
      goalsHome: f.goals.home,
      goalsAway: f.goals.away,
      winnerId
    };
  });
}

// в калькулятор 
export async function fetchMatchData(team1, team2) {
  const [form1, form2, h2h] = await Promise.all([
    getTeamForm(team1.id),
    getTeamForm(team2.id),
    getH2H(team1.id, team2.id)
  ]);

  return {
    team1: { ...team1, form: form1 },
    team2: { ...team2, form: form2 },
    h2h
  };
}