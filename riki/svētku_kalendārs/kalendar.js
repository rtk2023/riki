const kal = document.getElementById("calendar");
const mGads = document.getElementById("monthYear");
const svetkupanelis = document.getElementById("svetki");

let datums = new Date();
let todayDay = datums.getDate();
let todayMonth = datums.getMonth();
let todayYear = datums.getFullYear();

let men = todayMonth;
let gads = todayYear;
let viewLevel = 0;  // 0=dienas, 1=mēneši, 2=gadi

// Pašreizējās atlasītās šūnas glabāšanai
let selectedCell = null;

// Atgriež šodienai un rāda tās svētkus
function goToday() {
  // līmeņa atiestatīšana (dienas)
  viewLevel = 0;
  // šodien kalendārs
  men = todayMonth;
  gads = todayYear;
  // atjaunojam skatu
  renderCalendar();
  // rādām paneli ar svētkiem šodien
  const key = `${todayMonth + 1}-${todayDay}`;
  showHoliday(key, todayDay);
  // atlasām šodienas šūnu
  // const cells = kal.querySelectorAll('.day');
  // cells.forEach(cell => {
  //   if (cell.querySelector('span').textContent == todayDay) {
  //     if (selectedCell) selectedCell.classList.remove('selected');
  //     cell.classList.add('selected');
  //     selectedCell = cell;
  //   }
  // });
}

const dienas = ["Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena", "Svētdiena"];

const mens = ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs",
  "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"];

const mens_0 = ["janvārī", "februārī", "martā", "aprīlī", "maijā", "jūnijā",
  "jūlijā", "augustā", "septembrī", "oktobrī", "novembrī", "decembrī"];

// Datu ielādēšana no globālā mainīgā "svetki"
let svetki = {}; // tiks aizpildīts ar fetch

// Kalendāra parādīšana
function renderCalendar() {
  // mainoties līmenim, atmetat izdalījumu
  if (selectedCell) {
    selectedCell.classList.remove('selected');
    selectedCell = null;
  }
  kal.innerHTML = "";
  svetkupanelis.innerHTML = "<h2>Svētki</h2><p>Izvēlieties dienu, lai redzētu svētkus!</p>";

  if (viewLevel === 0) drawDays();
  else if (viewLevel === 1) drawMonths();
  else if (viewLevel === 2) drawYears();
}

// 0: dienas
function drawDays() {
  const firstWeekday = new Date(gads, men).getDay();
  const daysInMonth = new Date(gads, men + 1, 0).getDate();
  const offset = (firstWeekday + 6) % 7;
  mGads.textContent = `${mens[men]} ${gads}`;
  kal.className = "";  // klases atiestatīšana
  kal.classList.remove("viewMonths", "viewYears");

  dienas.forEach(d => {
    kal.innerHTML += `<div class="weekday">${d}</div>`;
  });

  for (let i = 0; i < offset; i++) {
    kal.innerHTML += `<div class="day0"></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${men + 1}-${d}`;
    const list = svetki[key] || [];
    const cell = document.createElement("div");
    cell.className = "day";
    if (gads === todayYear && men === todayMonth && d === todayDay) {
      cell.classList.add("today");
    }
    cell.innerHTML = `<span>${d}</span>` +
      (list.length > 0 ? `<div class="holiday">${list[0].name}${list.length > 1 ? ', ...' : ''}</div>` : "");
    cell.onclick = () => showHoliday(key, d);
    cell.addEventListener('click', () => {
      // Noņem atlasi no vecās
      if (selectedCell) selectedCell.classList.remove('selected');
      // Atlasa pašreizējo
      cell.classList.add('selected');
      selectedCell = cell;
    });
    kal.appendChild(cell);
  }
}

// 1: mēneši
function drawMonths() {
  mGads.textContent = `Izvēlieties mēnesi ${gads}`;
  kal.className = "viewMonths";
  for (let i = 0; i < 12; i++) {
    const cell = document.createElement("div");
    cell.className = "month-cell";
    if (gads === todayYear && i === todayMonth) {
      cell.classList.add("today");
    }
    cell.textContent = mens[i];
    cell.onclick = () => {
      men = i;
      viewLevel = 0;
      renderCalendar();
    };
    kal.appendChild(cell);
  }
}

// 2: gadi
function drawYears() {
  const start = gads - 7;
  mGads.textContent = `Izvēlieties gadu`;
  kal.className = "viewYears";
  for (let y = start; y < start + 16; y++) {
    const cell = document.createElement("div");
    cell.className = "year-cell";
    if (y === todayYear) {
      cell.classList.add("today");
    }
    cell.textContent = y;
    cell.onclick = () => {
      gads = y;
      viewLevel = 1;
      renderCalendar();
    };
    kal.appendChild(cell);
  }
}

// Svētku panelī nomainīt tekstu
function showHoliday(key, day) {
  const list = svetki[key] || [];
  let html = `<h2>Svētki ${day}. ${mens_0[men]}</h2>`;
  if (list.length === 0) html += `<p>Šajā dienā nav svētku</p>`;
  else {
    list.forEach(h => {
      html += `<div class="item">
        <hr class="horizont_line">
        <strong>${h.name}</strong><br><br>
        <p>${h.info}</p>
        ${h.link ? `<a href="${h.link}" target="_blank">Saite</a>` : ''}
      </div>`;
    });
  }
  svetkupanelis.innerHTML = html;
}

//Pārslēgt vienu mēnesi atpakaļ
function ieprmen() {
  if (viewLevel === 0) {
    if (--men < 0) { men = 11; gads--; }
  } else if (viewLevel === 1) {
    gads--;
  } else {
    gads -= 16;
  }
  renderCalendar();
}

//Pārslēgt vienu mēnesi uz priekšu
function nakmen() {
  if (viewLevel === 0) {
    if (++men > 11) { men = 0; gads++; }
  } else if (viewLevel === 1) {
    gads++;
  } else {
    gads += 16;
  }
  renderCalendar();
}

mGads.onclick = () => {
  viewLevel = (viewLevel + 1) % 3;
  renderCalendar();
};

renderCalendar();
