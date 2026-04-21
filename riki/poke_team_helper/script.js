let ouPokemonCache = null;
let ouUsageCache = null;

// Load OU data as early as possible so autocomplete is ready
window.addEventListener("load", () => loadOUPokemon());

async function analyzePokemon() {
    const name = document.getElementById("pokemonInput").value.toLowerCase().trim();

    if (!name) {
        alert("Please enter a Pokémon name first!");
        return;
    }

    const ouPokemon = await loadOUPokemon();

    // Block non-OU Pokemon
    if (ouPokemon && !ouPokemon.has(name)) {
        alert(`${name} is not in the OU tier! Only OU Pokémon can be searched.`);
        return;
    }

    const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
    if (!response.ok) {
        alert("VISS IR SLIKTI!!! POKEBUMBULIS NAV ATRASTS!");
        return;
    }

    const data = await response.json();
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
    displayResult(types, weaknesses, partners);
}

function displayResult(types, weaknesses, partners) {
    let html = "<h2>Types:</h2>" + types.join(", ");
    html += "<h2>Weaknesses:</h2>" + weaknesses.join(", ");
    html += "<h2>Suggested Pookies(Partners):</h2>";
    partners.slice(0, 50).forEach(p => {
        html += p + "<br>";
    });
    document.getElementById("result").innerHTML = html;
}

// Converts "Iron Valiant" -> "iron-valiant" to match PokeAPI format
function normalizeSmogonName(name) {
    return name.toLowerCase().replace(/\s+/g, "-");
}

// Build autocomplete dropdown from OU list
function setupAutocomplete() {
    const input = document.getElementById("pokemonInput");
    const wrapper = input.parentElement;

    // Create dropdown container
    const dropdown = document.createElement("div");
    dropdown.id = "autocompleteList";
    dropdown.style.cssText = `
        position: absolute;
        right: 40%;
        background: white;
        border: 1px solid #ccc;
        border-top: none;
        max-height: 200px;
        overflow-y: auto;
        width: ${input.offsetWidth}px;
        z-index: 999;
        display: none;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;

    // Make sure parent is positioned so dropdown aligns correctly
    wrapper.style.position = "relative";
    wrapper.appendChild(dropdown);

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();
        dropdown.innerHTML = "";
        dropdown.style.display = "none";

        if (!query || !ouPokemonCache) return;

        const matches = [...ouPokemonCache]
            .filter(name => name.startsWith(query))
            .slice(0, 10); // show max 10 suggestions

        if (matches.length === 0) return;

        matches.forEach(match => {
            const item = document.createElement("div");
            item.textContent = match;
            item.style.cssText = `
                padding: 8px 12px;
                cursor: pointer;
                font-size: 14px;
                color: #333;
            `;
            item.addEventListener("mouseenter", () => {
                item.style.background = "#f0f0f0";
            });
            item.addEventListener("mouseleave", () => {
                item.style.background = "white";
            });
            item.addEventListener("mousedown", () => {
                input.value = match;
                dropdown.style.display = "none";
            });
            dropdown.appendChild(item);
        });

        dropdown.style.display = "block";
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (e.target !== input) {
            dropdown.style.display = "none";
        }
    });

    // Hide dropdown on Escape
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
            // Captures both the name and usage percentage from each row
            // Line format: | 1    | Great Tusk         | 35.68679% | ...
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

        // Setup autocomplete now that OU list is ready
        setupAutocomplete();

        return ouPokemonCache;

    } catch (error) {
        console.warn("Could not load Smogon stats, skipping tier filter:", error);
        return null;
    }
}




// Maps Smogon names to PokeAPI names where they differ
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

            // If mapped name fails, try the raw Smogon name as fallback
            if (!res.ok && apiName !== ouName) {
                res = await fetch("https://pokeapi.co/api/v2/pokemon/" + ouName);
            }

            // If both fail, skip silently
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

            scored.push({ name: ouName, score: parseFloat(score.toFixed(2)) });

        } catch (err) {
            continue;
        }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.map(s => `${s.name} (score: ${s.score})`);
}