let ouPokemonCache = null;
let ouUsageCache = null;

window.addEventListener("load", () => loadOUPokemon());

async function analyzePokemon() {
    const name = document.getElementById("pokemonInput").value.toLowerCase().trim();

    if (!name) {
        alert("Lūdzu, sākumā ievadīt Pokemonu!");
        return;
    }

    const ouPokemon = await loadOUPokemon();

    if (ouPokemon && !ouPokemon.has(name)) {
        alert(`${name} nav OU līmenī! Var meklēt tikai OU Pokemonus.`);
        return;
    }

    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
    if (!response.ok) {
        alert("Kļūda! Pokemons netika atrasts!");
        return;
    }
    const data = await response.json();
    const inputImage = data.sprites.other?.["official-artwork"]?.front_default || data.sprites.front_default;
    const types = data.types.map(t => t.type.name);

    let weaknesses = [];
    for (let attackType in typeChart) {
        let multiplier = 1;
        types.forEach(defType => {
            if (typeChart[defType] && typeChart[defType][attackType]) {
                multiplier *= typeChart[defType][attackType];
            }
        });
        if (multiplier > 1) {
            weaknesses.push(attackType);
        }
    }

    const partners = await findPartners(weaknesses, types);
    displayResult(types, weaknesses, partners, name, inputImage);
}

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

function renderTypes(types) {
  return types.map(type => {
    return `
      <span class="type-badge" style="background-color: ${typeColors[type]}">
        ${type}
      </span>
    `;
  }).join("");
}

function displayResult(types, weaknesses, partners, name, inputImage) {
    let html = `
            <div class="container">
                <div class="box">
                    <img src="${inputImage}" alt="${name}" style="width:200px;height:200px;margin-right:18px;">
                    
                </div>
                <div class="box">
                    <h1>${name}</h1>
                    <div class="info">
                        <p><span>Tipi:</span> ${renderTypes(types)}</p>
                        <p><span>Vājības:</span> ${renderTypes(weaknesses)}</p>
                    </div>
                </div>
            </div>
            <h2>Ieteiktie partneri:</h2>
            <div class="pokemonList">
        `;
    partners.slice(0, 48).forEach(p => {
        html += `
            <div class="card">
                <img src="${p.image}" alt="${p.name}" style="width:100px;height:100px;">
                <h2>${p.name}</h2>
                <p>Tipi: ${renderTypes(p.types)}</p>
                <small>Punkti: ${p.score}</small>
            </div>
        `;
    });
    html += '</div>';
    document.getElementById("result").innerHTML = html;
}

function normalizeSmogonName(name) {
    return name.toLowerCase().replace(/\s+/g, "-");
}

function setupAutocomplete() {
    const input = document.getElementById("pokemonInput");
    const wrapper = input.parentElement;

    const dropdown = document.createElement("div");
    dropdown.id = "autocompleteList";
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        background: #0F1419;
        color: #E8ECF1;
        border: 1px solid #333;
        border-radius: 5px;
        border-top: none;
        max-height: 200px;
        overflow-y: auto;
        width: ${input.offsetWidth-2}px;
        z-index: 999;
        display: none;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;

    wrapper.style.position = "relative";
    wrapper.appendChild(dropdown);

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();
        dropdown.innerHTML = "";
        dropdown.style.display = "none";

        if (!query || !ouPokemonCache) return;

        const matches = [...ouPokemonCache]
            .filter(name => name.startsWith(query))
            .slice(0, 10);

        if (matches.length === 0) return;

        matches.forEach(match => {
            const item = document.createElement("div");
            item.textContent = match;
            item.style.cssText = `
                padding: 8px 12px;
                cursor: pointer;
                font-size: 14px;
                color: #E8ECF1;
            `;
            item.addEventListener("mouseenter", () => {
                item.style.background = "#1A1F28";
            });
            item.addEventListener("mouseleave", () => {
                item.style.background = "#0F1419";
            });
            item.addEventListener("mousedown", () => {
                input.value = match;
                dropdown.style.display = "none";
            });
            dropdown.appendChild(item);
        });

        dropdown.style.display = "block";
    });

    document.addEventListener("click", (e) => {
        if (e.target !== input) {
            dropdown.style.display = "none";
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Escape") dropdown.style.display = "none";
    });
}

async function loadOUPokemon() {
    if (ouPokemonCache) return ouPokemonCache;

    const url = `https://corsproxy.io/?https://www.smogon.com/stats/2025-03/gen9ou-1695.txt`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");

        const text = await response.text();
        const lines = text.split("\n");

        ouPokemonCache = new Set();
        ouUsageCache = {};

        for (const line of lines) {
            const match = line.trim().match(/^\|\s*\d+\s*\|\s*([A-Za-z][\w\s\-]+?)\s*\|\s*([\d.]+)%/);
            if (match) {
                const normalizedName = normalizeSmogonName(match[1]);
                const usagePercent = parseFloat(match[2]) / 100;

                if (usagePercent >= 0.005) {
                    ouPokemonCache.add(normalizedName);
                    ouUsageCache[normalizedName] = usagePercent;
                }
            }
        }
        console.log("Total lines in file:", lines.length);
        console.log("First 5 matches found:", Object.entries(ouUsageCache).slice(0, 5));
        console.log(`Loaded ${ouPokemonCache.size} OU Pokémon`);

        setupAutocomplete();

        return ouPokemonCache;

    } catch (error) {
        console.warn("Could not load Smogon stats, skipping tier filter:", error);
        return null;
    }
}




const smogonToPokeAPI = {
    "enamorus": "enamorus-incarnate",
    "keldeo": "keldeo-ordinary",
    "maushold": "maushold-family-of-four",
    "mimikyu": "mimikyu-disguised",
    "ogerpon-wellspring": "ogerpon-wellspring-mask",
    "ogerpon-cornerstone": "ogerpon-cornerstone-mask",
    "ogerpon-hearthflame": "ogerpon-hearthflame-mask",
    "ogerpon": "ogerpon-teal-mask",
    "ogerpon": "ogerpon",
    "palafin": "palafin-zero",
    "tatsugiri": "tatsugiri-curly",
    "squawkabilly": "squawkabilly-green-plumage",
    "gimmighoul": "gimmighoul-chest",
    "wo-chien": "wo-chien",
    "chien-pao": "chien-pao",
    "ting-lu": "ting-lu",
    "chi-yu": "chi-yu"
};

async function findPartners(weaknesses, yourTypes = []) {
    const ouPokemon = await loadOUPokemon();
    if (!ouPokemon) {
        console.warn("OU list unavailable");
        return [];
    }

    const scored = [];

    for (let ouName of ouPokemon) {
        try {
            const apiName = smogonToPokeAPI[ouName] || ouName;
            const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + apiName);

            if (!res.ok && apiName !== ouName) {
                res = await fetch("https://pokeapi.co/api/v2/pokemon/" + ouName);
            }

            if (!res.ok) {
                console.log(`Skipping ${ouName} — not found in PokeAPI`);
                continue;
            }

            const pokeData = await res.json();
            const candidateTypes = pokeData.types.map(t => t.type.name);

            let score = 0;

            // A — does this candidate resist your weaknesses?
            for (let weakness of weaknesses) {
                let multiplier = 1;
                candidateTypes.forEach(defType => {
                    if (typeChart[defType] && typeChart[defType][weakness]) {
                        multiplier *= typeChart[defType][weakness];
                    }
                });
                if (multiplier === 0) score += 5;
                else if (multiplier <= 0.25) score += 4;
                else if (multiplier < 1) score += 3;
                else if (multiplier > 1) score -= 3;
            }

            // B — can it hit your weakness types super effectively?
            for (let weakness of weaknesses) {
                candidateTypes.forEach(atkType => {
                    if (typeChart[weakness] && typeChart[weakness][atkType]) {
                        if (typeChart[weakness][atkType] > 1) score += 2;
                    }
                });
            }

            // C — shared type penalty
            const overlap = candidateTypes.filter(t => yourTypes.includes(t)).length;
            score -= overlap * 3;

            // D — usage rate bonus
            const usage = ouUsageCache[ouName] || 0.005;
            score += usage * 5;

            const image =
                pokeData.sprites.other?.["official-artwork"]?.front_default ||
                pokeData.sprites.front_default;

            scored.push({
                name: ouName,
                score: parseFloat(score.toFixed(2)),
                image: image,
                types: candidateTypes
            });

        } catch (err) {
            continue;
        }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored;
}