// calculator.js

// ==========================
// FORM SCORE
// W = 3
// D = 1
// L = 0
// ==========================

function formScore(form) {

  return form.reduce((sum, match) => {

    if (match.result === "W") {
      return sum + 3;
    }

    if (match.result === "D") {
      return sum + 1;
    }

    return sum;

  }, 0);

}


// ==========================
// GOAL DIFFERENCE
// ==========================

function goalDifference(form) {

  return form.reduce((sum, match) => {
    return sum + (match.goalsFor - match.goalsAgainst);
  }, 0);

}


// ==========================
// H2H SCORE
// ==========================

function h2hScore(h2h, teamId) {

  let score = 0;

  for (const match of h2h) {

    if (match.winnerId === null) {
      score += 1;
    }

    else if (match.winnerId === teamId) {
      score += 3;
    }

  }

  return score;

}


// ==========================
// NORMALIZE
// ==========================

function normalize(team1Value, team2Value) {

  const total = team1Value + team2Value;

  if (total === 0) {
    return [50, 50];
  }

  return [
    (team1Value / total) * 100,
    (team2Value / total) * 100
  ];

}


// ==========================
// PROBABILITY -> ODDS
// ==========================

function probabilityToOdds(percent) {

  const probability = percent / 100;

  if (probability <= 0) {
    return "99.00";
  }

  return ((1 / probability) * 0.9).toFixed(2);

}


// ==========================
// MAIN FUNCTION
// ==========================

export function winChances(matchData) {

  const { team1, team2, h2h } = matchData;

  // ==========================
  // FORM (50%)
  // ==========================

  const form1 = formScore(team1.form);
  const form2 = formScore(team2.form);

  const [formPct1, formPct2] =
    normalize(form1, form2);


  // ==========================
  // GOAL DIFFERENCE (30%)
  // ==========================

  const gd1 =
    Math.max(0, goalDifference(team1.form) + 10);

  const gd2 =
    Math.max(0, goalDifference(team2.form) + 10);

  const [gdPct1, gdPct2] =
    normalize(gd1, gd2);


  // ==========================
  // H2H (20%)
  // ==========================

  const h2h1 = h2hScore(h2h, team1.id);
  const h2h2 = h2hScore(h2h, team2.id);

  const [h2hPct1, h2hPct2] =
    normalize(h2h1, h2h2);


  // ==========================
  // FINAL SCORE
  // ==========================

  const team1Chance =
    formPct1 * 0.5 +
    gdPct1 * 0.3 +
    h2hPct1 * 0.2;

  const team2Chance =
    formPct2 * 0.5 +
    gdPct2 * 0.3 +
    h2hPct2 * 0.2;


  // ==========================
  // DRAW LOGIC
  // ==========================

  let drawChance = 20;

  const diff =
    Math.abs(team1Chance - team2Chance);

  if (diff < 10) {
    drawChance = 30;
  }

  else if (diff < 20) {
    drawChance = 25;
  }


  // ==========================
  // NORMALIZE FINAL
  // ==========================

  const total =
    team1Chance + team2Chance;

  const remain = 100 - drawChance;

  const finalTeam1 =
    Math.round((team1Chance / total) * remain);

  const finalTeam2 =
    Math.round((team2Chance / total) * remain);


  // ==========================
  // RETURN
  // ==========================

  return {

    probabilities: {

      team1: finalTeam1,
      draw: drawChance,
      team2: finalTeam2

    },

    odds: {

      team1: probabilityToOdds(finalTeam1),
      draw: probabilityToOdds(drawChance),
      team2: probabilityToOdds(finalTeam2)

    }

  };

}