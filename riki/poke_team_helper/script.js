let ouPokemonCache = null;
let ouUsageCache = null;

async function analyzePokemon() {
    const name = document.getElementById("pokemonInput").value.toLowerCase().trim();

    if (!name) {
        alert("Please enter a Pokémon name first!");
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












async function loadOUPokemon() {
    if (ouPokemonCache) return ouPokemonCache;

    const url = `https://corsproxy.io/?https://www.smogon.com/stats/2025-03/gen9ou-1695.txt`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");

        const text = await response.text();
        const lines = text.split("\n");
        console.log("Line 4:", JSON.stringify(lines[4]));
        console.log("Line 5:", JSON.stringify(lines[5]));
        console.log("Line 6:", JSON.stringify(lines[6]));
        console.log("Line 7:", JSON.stringify(lines[7]));


        ouPokemonCache = new Set();
        ouUsageCache = {};

        for (const line of lines) {
            // Captures both the name and usage percentage from each row
            // Line format: | 1    | Great Tusk         | 35.68679% | ...
            const match = line.trim().match(/^\|\s*\d+\s*\|\s*([A-Za-z][\w\s\-]+?)\s*\|\s*([\d.]+)%/);
            if (match) {
                const normalizedName = normalizeSmogonName(match[1]);
                const usagePercent = parseFloat(match[2]) / 100; // convert to 0.0 - 1.0

                ouPokemonCache.add(normalizedName);
                ouUsageCache[normalizedName] = usagePercent;
            }
        }
        console.log("Total lines in file:", lines.length);
        console.log("First 5 matches found:", Object.entries(ouUsageCache).slice(0, 5));
        console.log(`Loaded ${ouPokemonCache.size} OU Pokémon`);
        console.log("Sample with usage:", Object.entries(ouUsageCache).slice(0, 5));
        return ouPokemonCache;

    } catch (error) {
        console.warn("Could not load Smogon stats, skipping tier filter:", error);
        return null;
    }
}

async function findPartners(weaknesses, yourTypes = []) {
    const ouPokemon = await loadOUPokemon();
    console.log("OU list size:", ouPokemon ? ouPokemon.size : "failed to load");

    const candidateScores = {};

    // Collect all OU candidates that share a type with any of your weaknesses
    for (let weakness of weaknesses) {
        const response = await fetch("https://pokeapi.co/api/v2/type/" + weakness);
        const data = await response.json();

        data.pokemon.forEach(p => {
            const pName = p.pokemon.name;
            if (ouPokemon && !ouPokemon.has(pName)) return;
            candidateScores[pName] = (candidateScores[pName] || 0);
        });
    }

    console.log("Candidates found:", Object.keys(candidateScores).length);
    console.log("Sample candidates:", Object.keys(candidateScores).slice(0, 5));
    console.log("OU cache sample:", ouPokemonCache ? [...ouPokemonCache].slice(0, 5) : "null");
    console.log("Usage cache sample:", ouUsageCache ? Object.entries(ouUsageCache).slice(0, 5) : "null");

    const scored = [];

    for (let [name] of Object.entries(candidateScores)) {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
        const pokeData = await res.json();
        const candidateTypes = pokeData.types.map(t => t.type.name);

        let score = 0;

        // A — resistance score: does this candidate resist your weaknesses?
        for (let weakness of weaknesses) {
            let multiplier = 1;
            candidateTypes.forEach(defType => {
                if (typeChart[defType] && typeChart[defType][weakness]) {
                    multiplier *= typeChart[defType][weakness];
                }
            });
            if (multiplier === 0) score += 5; // immune — best case
            else if (multiplier < 1) score += 3; // resists it
            else if (multiplier > 1) score -= 2; // also weak — bad
        }

        // B — offensive coverage: can it hit your weakness types super effectively?
        for (let weakness of weaknesses) {
            candidateTypes.forEach(atkType => {
                if (typeChart[weakness] && typeChart[weakness][atkType]) {
                    if (typeChart[weakness][atkType] > 1) score += 2;
                }
            });
        }

        // C — shared type penalty (likely shares your weaknesses)
        const overlap = candidateTypes.filter(t => yourTypes.includes(t)).length;
        score -= overlap * 3;

        // D — usage rate bonus (higher usage = more meta relevant)
        const usage = ouUsageCache ? (ouUsageCache[name] || 0.01) : 0.01;
        score += usage * 5;

        scored.push({ name, score: parseFloat(score.toFixed(2)) });
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.map(s => `${s.name} (score: ${s.score})`);
}