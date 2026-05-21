import {
  searchTeams,
  fetchMatchData
} from "./getData.js";

import {
  winChances
} from "./calculator.js";


let selectedTeam1 = null;
let selectedTeam2 = null;


// ==========================
// SEARCH TEAM 1
// ==========================

document
  .getElementById("searchTeam1Btn")
  .addEventListener("click", async () => {

    const query =
      document.getElementById("team1Input").value;

    const container =
      document.getElementById("team1Results");

    container.innerHTML = "Loading...";

    try {

      const teams = await searchTeams(query);

      container.innerHTML = "";

      if (teams.length === 0) {
        container.innerHTML = "Nav atrasts";
        return;
      }

      teams.forEach(team => {

        const div = document.createElement("div");

        div.className = "team-result";

        div.innerHTML = `
          <img src="${team.logo}" width="25">
          ${team.name}
          (${team.country})
        `;

        div.addEventListener("click", () => {

          selectedTeam1 = team;

          document.getElementById(
            "team1Input"
          ).value = team.name;

          container.innerHTML = `
            Selected:
            ${team.name}
          `;

        });

        container.appendChild(div);

      });

    }

    catch (err) {

      console.error(err);

      container.innerHTML =
        "Kļūda meklēšanā";

    }

  });


// ==========================
// SEARCH TEAM 2
// ==========================

document
  .getElementById("searchTeam2Btn")
  .addEventListener("click", async () => {

    const query =
      document.getElementById("team2Input").value;

    const container =
      document.getElementById("team2Results");

    container.innerHTML = "Loading...";

    try {

      const teams = await searchTeams(query);

      container.innerHTML = "";

      if (teams.length === 0) {
        container.innerHTML = "Nav atrasts";
        return;
      }

      teams.forEach(team => {

        const div = document.createElement("div");

        div.className = "team-result";

        div.innerHTML = `
          <img src="${team.logo}" width="25">
          ${team.name}
          (${team.country})
        `;

        div.addEventListener("click", () => {

          selectedTeam2 = team;

          document.getElementById(
            "team2Input"
          ).value = team.name;

          container.innerHTML = `
            Selected:
            ${team.name}
          `;

        });

        container.appendChild(div);

      });

    }

    catch (err) {

      console.error(err);

      container.innerHTML =
        "Kļūda meklēšanā";

    }

  });


// ==========================
// CALCULATE
// ==========================

document
  .getElementById("calculateBtn")
  .addEventListener("click", async () => {

    if (!selectedTeam1 || !selectedTeam2) {

      alert("Izvēlies abas komandas");

      return;
    }

    const resultDiv =
      document.getElementById("result");

    resultDiv.innerHTML = "Loading... 67%";

    try {

      const data = await fetchMatchData(
        selectedTeam1,
        selectedTeam2
      );

      const result =
        winChances(data);

      resultDiv.innerHTML = `

        <h2>Rezultāts</h2>

        <p>
          ${selectedTeam1.name}
          :
          ${result.probabilities.team1}%
        </p>

        <p>
          Neizšķirts
          :
          ${result.probabilities.draw}%
        </p>

        <p>
          ${selectedTeam2.name}
          :
          ${result.probabilities.team2}%
        </p>

        <hr>

        <h3>Koeficienti</h3>

        <p>
          ${selectedTeam1.name}
          :
          ${result.odds.team1}
        </p>

        <p>
          X
          :
          ${result.odds.draw}
        </p>

        <p>
          ${selectedTeam2.name}
          :
          ${result.odds.team2}
        </p>

      `;

    }

    catch (err) {

      console.error(err);

      resultDiv.innerHTML =
        "Kļūda aprēķinā";

    }

  });