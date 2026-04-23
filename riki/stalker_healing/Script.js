// image URLs for each limb at each health level
const healthImages = {
  head: {
    full: 'https://i.ibb.co/rfky82nR/H-healthy.png',
    'three-quarter': 'https://i.ibb.co/60Xx6QCw/H-3I4.png',
    half: 'https://i.ibb.co/wNQW2dcK/H-half.png',
    quarter: 'https://i.ibb.co/twcVqLTC/H-1I4.png',
  },
  torso: {
    full: 'https://i.ibb.co/3yDhRbnk/T-healthy.png',
    'three-quarter': 'https://i.ibb.co/Y4s49RTT/T-3I4.png',
    half: 'https://i.ibb.co/RGHtT1kY/T-half.png',
    quarter: 'https://i.ibb.co/4ngLqdjN/T-1I4.png',
  },
  'right-arm': {
    full: 'https://i.ibb.co/jPTY7j8V/RA-healthy.png',
    'three-quarter': 'https://i.ibb.co/m5q81bdw/RA-3I4.png',
    half: 'https://i.ibb.co/0VKs8HqD/RA-half.png',
    quarter: 'https://i.ibb.co/Q7TLNBXj/RA-1I4.png',
    dead: 'https://i.ibb.co/QvxKS6Y2/RA-dead.png',
  },
  'left-arm': {
    full: 'https://i.ibb.co/fGNnh9Tw/LA-healthy.png',
    'three-quarter': 'https://i.ibb.co/r2nKLdFH/LA-3I4.png',
    half: 'https://i.ibb.co/TxZ90C0v/LA-half.png',
    quarter: 'https://i.ibb.co/8grXQ1Q1/LA-1I4.png',
    dead: 'https://i.ibb.co/1G6xN8yn/LA-dead.png',
  },
  'right-leg': {
    full: 'https://i.ibb.co/SDNzLTjY/Right-leg-healthy.png',
    'three-quarter': 'https://i.ibb.co/TDvFHmQy/RL-1I4.png',
    half: 'https://i.ibb.co/LMpXKPm/RL-half.png',
    quarter: 'https://i.ibb.co/cSxmdZqR/RL-3I4.png',
    dead: 'https://i.ibb.co/cXvyc4n4/RL-dead.png',
  },
  'left-leg': {
    full: 'https://i.ibb.co/hxZ4sJvR/LL-healthy.png',
    'three-quarter': 'https://i.ibb.co/pvYnckmW/LL-3I4.png',
    half: 'https://i.ibb.co/Rk32nmnh/LL-half.png',
    quarter: 'https://i.ibb.co/CsMH0xW3/LL-1I4.png',
    dead: 'https://i.ibb.co/BVMVsyCC/LL-dead.png',
  },
};

const levelLabels = {
  full: 'Full health',
  'three-quarter': '3/4 health',
  half: 'Half health',
  quarter: '1/4 health',
  dead: 'Dead / severed',
};

// HP value out of 10 for each button state
const levelHP = {
  full: 10,
  'three-quarter': 7.5,
  half: 5,
  quarter: 2.5,
  dead: 0,
};

// tracks the currently selected level for each limb
const currentLevels = {
  head: 'full',
  torso: 'full',
  'right-arm': 'full',
  'left-arm': 'full',
  'right-leg': 'full',
  'left-leg': 'full',
};

// Attaches a click listener to every health button on the page.
// When clicked it does three things:
//   1. removes 'active' from every other button in the same group so only
//      one level can be selected at a time per limb
//   2. updates currentLevels so the rest of the code knows the current state
//   3. swaps the limb image and caption text to match the chosen level
// The part and level come straight from the button's data attributes
// (data-part="head", data-level="half" etc.) so no extra lookup is needed.
document.querySelectorAll('.health-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const part = this.dataset.part;
    const level = this.dataset.level;

    this.closest('.btn-group').querySelectorAll('.health-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    currentLevels[part] = level;

    const img = document.getElementById('img-' + part);
    if (img && healthImages[part]?.[level]) {
      img.src = healthImages[part][level];
    }

    const text = document.getElementById('text-' + part);
    if (text) {
      text.textContent = (levelLabels[level] || level) + ' — ' + part.replace('-', ' ');
    }
  });
});

// medicine data — heal values per limb, trader cost, short note
// yellow = temp HP only, white = perm HP only, super = both at once
const MEDS = [

  // yellow (first-aid / temp)
  {
    id: 'diclofenac',
    name: 'Diclofenac Sodium',
    type: 'yellow',
    yellow: { head: 4, torso: 4, 'right-arm': 2, 'left-arm': 2, 'right-leg': 2, 'left-leg': 2 },
    cost: 500,
    note: 'Light temp heal. Good for minor arm/leg scrapes.',
  },
  {
    id: 'morphine',
    name: 'Morphine Ampoule',
    type: 'yellow',
    yellow: { head: 8, torso: 5, 'right-arm': 4, 'left-arm': 4, 'right-leg': 4, 'left-leg': 4 },
    cost: 2000,
    note: 'Strong head temp heal. May cause drowsiness.',
  },
  {
    id: 'epinephrine',
    name: 'Epinephrine Shot',
    type: 'yellow',
    yellow: { head: 11, torso: 11, 'right-arm': 5, 'left-arm': 5, 'right-leg': 5, 'left-leg': 5 },
    cost: 3000,
    note: 'Best temp heal for head & torso. Combat use.',
  },
  {
    id: 'firstaid',
    name: 'First-Aid Kit',
    type: 'yellow',
    yellow: { head: 5, torso: 5, 'right-arm': 2, 'left-arm': 2, 'right-leg': 2, 'left-leg': 2 },
    cost: 500,
    note: 'Standard kit. Balanced temp heal.',
  },
  {
    id: 'army_medkit',
    name: 'Army Medkit',
    type: 'yellow',
    yellow: { head: 7, torso: 7, 'right-arm': 3, 'left-arm': 3, 'right-leg': 3, 'left-leg': 3 },
    cost: 1000,
    note: 'Reliable mid-tier temp heal across all parts.',
  },
  {
    id: 'imp_stimpack',
    name: 'Improvised Stimpack',
    type: 'yellow',
    yellow: { head: 5, torso: 5, 'right-arm': 3, 'left-arm': 3, 'right-leg': 3, 'left-leg': 3 },
    cost: 750,
    note: 'Craftable. Decent temp heal for its cost.',
  },
  {
    id: 'sci_medkit',
    name: 'Scientific Medkit',
    type: 'yellow',
    yellow: { head: 9, torso: 9, 'right-arm': 4, 'left-arm': 4, 'right-leg': 4, 'left-leg': 4 },
    cost: 1500,
    note: 'High temp heal. Removes radiation.',
  },
  {
    id: 'tourniquet',
    name: 'Tourniquet',
    type: 'yellow',
    yellow: { head: 0, torso: 5, 'right-arm': 5, 'left-arm': 5, 'right-leg': 5, 'left-leg': 5 },
    cost: 500,
    note: 'Torso & limbs only (no head). Stops bleeding fast.',
  },
  {
    id: 'bandage',
    name: 'Bandage',
    type: 'yellow',
    yellow: { head: 0, torso: 3, 'right-arm': 3, 'left-arm': 3, 'right-leg': 3, 'left-leg': 3 },
    cost: 250,
    note: 'Cheapest option. No head heal. Stops bleeding.',
  },
  {
    id: 'metamizole',
    name: 'Metamizole Ampoule',
    type: 'yellow',
    yellow: { head: 2, torso: 2, 'right-arm': 2, 'left-arm': 2, 'right-leg': 2, 'left-leg': 2 },
    cost: 250,
    note: 'Minimal temp heal. Filler / budget option.',
  },

  // white (post-heal / perm)
  {
    id: 'antidote',
    name: 'Antidote',
    type: 'white',
    white: { head: 3, torso: 3, 'right-arm': 0, 'left-arm': 0, 'right-leg': 0, 'left-leg': 0 },
    cost: 500,
    note: 'Head & torso perm heal only. Also cures poison.',
  },
  {
    id: 'fentanyl',
    name: 'Fentanyl',
    type: 'white',
    white: { head: 3, torso: 3, 'right-arm': 3, 'left-arm': 3, 'right-leg': 3, 'left-leg': 3 },
    cost: 1000,
    note: 'Best all-body perm heal. Dizziness. Use out of combat.',
  },
  {
    id: 'yadulin',
    name: 'Yadulin',
    type: 'white',
    white: { head: 4, torso: 4, 'right-arm': 2, 'left-arm': 2, 'right-leg': 2, 'left-leg': 2 },
    cost: 1000,
    note: 'Strong head/torso perm heal. Severe dizziness.',
  },
  {
    id: 'sulfadimethoxine',
    name: 'Sulfadimethoxine',
    type: 'white',
    white: { head: 0, torso: 0, 'right-arm': 0, 'left-arm': 0, 'right-leg': 1, 'left-leg': 1 },
    cost: 100,
    note: 'Legs only (1 HP). budget leg fix.',
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    type: 'white',
    white: { head: 0, torso: 0, 'right-arm': 4, 'left-arm': 4, 'right-leg': 4, 'left-leg': 4 },
    cost: 500,
    note: 'Arms & legs only. Best cost-per-HP for limbs.',
  },
  {
    id: 'vinca',
    name: 'Vinca',
    type: 'white',
    white: { head: 0, torso: 4, 'right-arm': 0, 'left-arm': 0, 'right-leg': 0, 'left-leg': 0 },
    cost: 250,
    note: 'Torso only (4 HP perm). Cheap torso fix.',
  },
  {
    id: 'anabiotics',
    name: 'Anabiotics',
    type: 'white',
    white: { head: 10, torso: 10, 'right-arm': 10, 'left-arm': 10, 'right-leg': 10, 'left-leg': 10 },
    cost: 4000,
    note: 'Fully perma-heals ALL limbs to max. Emergency item.',
  },
  {
    id: 'chlortetracycline',
    name: 'Chlortetracycline',
    type: 'white',
    white: { head: 0, torso: 0, 'right-arm': 1, 'left-arm': 1, 'right-leg': 0, 'left-leg': 0 },
    cost: 100,
    note: 'Arms only (1 HP perm).',
  },

  // super heals — give both yellow and white HP in one use
  {
    id: 'mil_stimpack',
    name: 'Military Stimpack',
    type: 'super',
    yellow: { head: 5, torso: 7, 'right-arm': 3, 'left-arm': 3, 'right-leg': 3, 'left-leg': 3 },
    white: { head: 2, torso: 2, 'right-arm': 1, 'left-arm': 1, 'right-leg': 1, 'left-leg': 1 },
    cost: 2500,
    note: 'Strong torso temp + modest perm across all.',
  },
  {
    id: 'sci_stimpack',
    name: 'Scientific Stimpack',
    type: 'super',
    yellow: { head: 9, torso: 9, 'right-arm': 4, 'left-arm': 4, 'right-leg': 4, 'left-leg': 4 },
    white: { head: 4, torso: 4, 'right-arm': 1, 'left-arm': 1, 'right-leg': 1, 'left-leg': 1 },
    cost: 3000,
    note: 'Best combo item. Great head/torso coverage.',
  },
];

const PARTS = [
  { key: 'head', label: 'Head' },
  { key: 'torso', label: 'Torso' },
  { key: 'right-arm', label: 'Right Arm' },
  { key: 'left-arm', label: 'Left Arm' },
  { key: 'right-leg', label: 'Right Leg' },
  { key: 'left-leg', label: 'Left Leg' },
];

// greedySolve(needed, healKey, validTypes)
//
// This is the core algorithm that figures out which medicines to use and how many.
// It works as a greedy loop: each iteration scores every available medicine by
// how much HP it delivers to still-damaged limbs divided by its cost, then picks
// the winner and applies one use of it. Repeats until all damage is covered or
// no valid candidates are left.
//
// Parameters:
//   needed      - object mapping each limb key to the HP still missing, e.g. { head: 5, torso: 2.5, ... }
//   healKey     - which heal property to read from each med: 'yellow' or 'white'
//   validTypes  - array of med types to consider, e.g. ['yellow', 'super']
//
// The 3-use cap (MAX_PER_MED) stops the algorithm from just spamming the single
// best-value item forever, which wouldn't reflect how the game actually works.
// The 80-iteration ceiling is just a safety net to prevent infinite loops
// if something goes wrong with the math.
//
// Returns an array of { med, qty, coveredParts } entries — one per unique medicine chosen.
function greedySolve(needed, healKey, validTypes) {
  const remaining = { ...needed };
  const chosen = [];
  const used = {};
  const MAX_PER_MED = 3;
  let iterations = 0;

  while (PARTS.some(p => remaining[p.key] > 0.01) && iterations++ < 80) {
    const candidates = MEDS.filter(m => {
      if (!validTypes.includes(m.type)) return false;
      if ((used[m.id] || 0) >= MAX_PER_MED) return false;
      return PARTS.some(p => remaining[p.key] > 0.01 && (m[healKey]?.[p.key] || 0) > 0);
    });

    if (!candidates.length) break;

    // score each candidate by HP delivered to still-damaged parts divided by cost
    let best = null;
    let bestScore = -1;

    for (const med of candidates) {
      let hp = 0;
      for (const p of PARTS) {
        if (remaining[p.key] > 0.01) {
          hp += Math.min(med[healKey]?.[p.key] || 0, remaining[p.key]);
        }
      }
      const score = hp / med.cost;
      if (score > bestScore) {
        bestScore = score;
        best = med;
      }
    }

    if (!best) break;

    // apply it, track which parts got healed
    const healed = [];
    for (const p of PARTS) {
      const amount = best[healKey]?.[p.key] || 0;
      if (amount > 0 && remaining[p.key] > 0.01) {
        remaining[p.key] = Math.max(0, remaining[p.key] - amount);
        healed.push(p.label);
      }
    }

    used[best.id] = (used[best.id] || 0) + 1;

    const existing = chosen.find(e => e.med.id === best.id);
    if (existing) {
      existing.qty++;
      existing.coveredParts = [...new Set([...existing.coveredParts, ...healed])];
    } else {
      chosen.push({ med: best, qty: 1, coveredParts: healed });
    }
  }

  return chosen;
}

// calcHealing()
//
// Builds the full two-phase treatment plan based on the current limb states.
//
// Phase 1 (yellow / temp HP): calls greedySolve to find the cheapest combination
// of first-aid items that covers all the missing temporary health.
//
// Phase 2 (white / perm HP): does the same for permanent healing, but first
// subtracts whatever white HP any stimpacks from phase 1 already provided
// so we don't over-recommend medicine.
//
// Also generates a short list of contextual warnings (e.g. opioid side effects,
// critical head/torso damage) to show below the treatment table.
//
// Returns either { healthy: true } if nothing needs healing, or a full result
// object with both phases, total cost, and any warnings.
function calcHealing() {
  const damage = {};
  let anyDamage = false;

  for (const p of PARTS) {
    const missing = 10 - levelHP[currentLevels[p.key]];
    damage[p.key] = missing;
    if (missing > 0.01) anyDamage = true;
  }

  if (!anyDamage) return { healthy: true };

  // phase 1 — get yellow (temp) HP up first
  const yellowNeeded = { ...damage };
  const phase1 = greedySolve(yellowNeeded, 'yellow', ['yellow', 'super']);

  // phase 2 — convert to white (perm) HP
  // any stimpacks from phase 1 already gave some white HP so subtract that first
  const whiteNeeded = { ...damage };
  for (const entry of phase1) {
    if (entry.med.type === 'super') {
      for (const p of PARTS) {
        const given = (entry.med.white?.[p.key] || 0) * entry.qty;
        whiteNeeded[p.key] = Math.max(0, whiteNeeded[p.key] - given);
      }
    }
  }
  const phase2 = greedySolve(whiteNeeded, 'white', ['white', 'super']);

  const cost1 = phase1.reduce((sum, e) => sum + e.med.cost * e.qty, 0);
  const cost2 = phase2.reduce((sum, e) => sum + e.med.cost * e.qty, 0);

  const notes = [];
  const all = [...phase1, ...phase2];

  if (all.some(e => ['fentanyl', 'yadulin'].includes(e.med.id)))
    notes.push('Opioid post-heals (Fentanyl/Yadulin) cause dizziness. Apply only out of combat.');
  if (all.some(e => e.med.id === 'anabiotics'))
    notes.push('Anabiotics fully heal everything at once — but are very expensive. Only use if cost is no object.');
  if (all.some(e => e.med.id === 'epinephrine'))
    notes.push('Epinephrine is a combat stimulant — best used mid-fight for emergency head/torso temp heal.');
  if (damage['head'] > 5 || damage['torso'] > 5)
    notes.push('Critical vital damage — head/torso below half. Heal immediately to avoid death!');
  if (all.some(e => e.med.id === 'tourniquet' || e.med.id === 'bandage'))
    notes.push('Bandage/Tourniquet do not heal the head — a separate item is needed for head temp HP.');

  return {
    healthy: false,
    damage,
    phases: [
      { label: 'Phase 1 — First Aid (Temporary / Yellow HP)', items: phase1, cost: cost1 },
      { label: 'Phase 2 — Post-Heal (Convert to Permanent HP)', items: phase2, cost: cost2 },
    ],
    totalCost: cost1 + cost2,
    notes,
  };
}

// renderCalc()
//
// Calls calcHealing() and writes the results into the #calc-panel element as HTML.
// If all limbs are healthy it just shows a short "all good" message.
// Otherwise it renders:
//   - a row of colored HP bars showing the damage state of each limb
//   - a table per phase listing the recommended medicines, quantities, and costs
//   - a grand total cost row
//   - any contextual warning notes from calcHealing()
//   - a small disclaimer at the bottom
//
// Everything is built as a string and dropped in via innerHTML at the end.
// Not the fanciest approach but it keeps things simple and avoids needing
// a framework just to display a table.
function renderCalc() {
  const panel = document.getElementById('calc-panel');
  if (!panel) return;

  const result = calcHealing();

  if (result.healthy) {
    panel.innerHTML = `
      <div class="calc-healthy">
        <strong>All limbs are at full health.</strong><br>
        <small>No medicine required.</small>
      </div>`;
    return;
  }

  // damage bars
  let damageSummary = '<div class="calc-damage-summary">';
  for (const p of PARTS) {
    const missing = result.damage[p.key];
    const pct = Math.round(((10 - missing) / 10) * 100);
    const cls = pct === 100 ? 'ok' : pct >= 75 ? 'warn' : pct >= 50 ? 'bad' : 'crit';
    damageSummary += `
      <div class="calc-dmg-row">
        <span class="calc-dmg-label">${p.label}</span>
        <div class="calc-dmg-bar-wrap">
          <div class="calc-dmg-bar calc-dmg-${cls}" style="width:${pct}%"></div>
        </div>
        <span class="calc-dmg-pct">${pct}%</span>
      </div>`;
  }
  damageSummary += '</div>';

  let html = `<h5 class="calc-title">Optimal Treatment Plan</h5>${damageSummary}`;

  for (const phase of result.phases) {
    if (!phase.items.length) continue;

    html += `
      <div class="calc-phase">
        <div class="calc-phase-label">${phase.label}</div>
        <table class="calc-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Treats</th>
              <th>Unit ₽</th>
              <th>Subtotal ₽</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>`;

    for (const { med, qty, coveredParts } of phase.items) {
      html += `
          <tr>
            <td>${med.name}</td>
            <td class="calc-qty">x${qty}</td>
            <td class="calc-parts">${coveredParts.join(', ')}</td>
            <td class="calc-cost">${med.cost.toLocaleString()}</td>
            <td class="calc-cost-total">${(med.cost * qty).toLocaleString()}</td>
            <td class="calc-note-td">${med.note}</td>
          </tr>`;
    }

    html += `
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4" class="calc-sub-label">Phase subtotal</td>
              <td class="calc-sub-val">${phase.cost.toLocaleString()} ₽</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>`;
  }

  html += `
    <div class="calc-grand-row">
      <span>Estimated total cost</span>
      <span class="calc-grand-total">${result.totalCost.toLocaleString()} ₽</span>
    </div>`;

  if (result.notes.length) {
    html += '<div class="calc-notes">';
    for (const note of result.notes) {
      html += `<div class="calc-note-item">${note}</div>`;
    }
    html += '</div>';
  }

  html += `
    <p class="calc-disclaimer">
      * Minimum items needed to fully heal. Stimpack white HP is deducted from Phase 2 automatically.
      Prices are approximate GAMMA trader values — edit the MEDS array to match your playthrough.
    </p>`;

  panel.innerHTML = html;
}

// Sakharov button click handler
//
// When the player clicks "Save me Sakharov!!" this runs two things:
//   1. Builds and injects the HP summary table into #hp-summary, showing
//      each limb's current status as a colored progress bar.
//      The overall HP percentage is shown at the bottom as a wider bar.
//   2. Calls renderCalc() to run the solver and display the treatment plan
//      in the calculator section below, then smoothly scrolls to it.
//
// levelValues maps each health level to a 0-4 score used just for the
// summary percentage display (not related to the actual HP values in levelHP).
const audio = document.createElement("audio");
audio.src = "https://static.wikia.nocookie.net/stalker/images/0/08/Professor_talk_1.ogg/revision/latest?cb=20201125183323&path-prefix=ru";
audio.preload = "auto";
audio.volume = 0.8;

const levelValues = { full: 4, 'three-quarter': 3, half: 2, quarter: 1, dead: 0 };

document.getElementById('sakharov-btn').addEventListener('click', function() {
		
  const maxTotal = 4 * PARTS.length;
  let total = 0;
  let rows = '';

  for (const p of PARTS) {
    const level = currentLevels[p.key];
    const val = levelValues[level];
    total += val;
    const pct = Math.round((val / 4) * 100);

    let cls = 'prog-secondary';
    if (val === 4) cls = 'prog-success';
    else if (val === 3) cls = 'prog-info';
    else if (val === 2) cls = 'prog-warning';
    else if (val === 1) cls = 'prog-danger';

    rows += `
      <tr>
        <td><strong>${p.label}</strong></td>
        <td>${levelLabels[level]}</td>
        <td>
          <div class="prog-wrap">
            <div class="prog-bar ${cls}" style="width:${pct}%">${pct}%</div>
          </div>
        </td>
      </tr>`;
  }

  const overallPct = Math.round((total / maxTotal) * 100);
  let overallCls = 'prog-secondary';
  if (overallPct >= 75) overallCls = 'prog-success';
  else if (overallPct >= 50) overallCls = 'prog-warning';
  else if (overallPct >= 25) overallCls = 'prog-danger';

  document.getElementById('hp-summary').innerHTML = `
    <div class="hp-summary-box">
      <h5>Health Report</h5>
      <table class="summary-table">
        <thead>
          <tr><th>Body Part</th><th>Status</th><th>HP</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <hr>
      <strong>Overall HP: ${overallPct}%</strong>
      <div class="prog-wrap" style="height:20px; margin-top:0.4rem;">
        <div class="prog-bar ${overallCls}" style="width:${overallPct}%; font-size:0.72rem;">${overallPct}%</div>
      </div>
    </div>`;
	
  renderCalc();
  document.getElementById('calc-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  	audio.currentTime = 0; // restartē katru reizi
  audio.play().catch(err => {
    console.log("Audio neatskaņojās:", err);
  });
});
