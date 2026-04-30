// ===========================
// AUTOVADĪTĀJA TESTS - script.js
// ===========================

// --- KONSTANTES ---
const BURTI = ['A', 'B', 'C', 'D'];
let laiksSekundes = 1500;
let izturetSlieksnis = 35;
let jautajumuSkaits = 50;

// --- DATI (tiks ielādēti no JSON) ---
let testaDati = null;

// --- MAINĪGIE ---
let esosieJautajumi = [];
let izveletaKategorija = null;
let jautIdx = 0;
let pareizas = 0;
let timeris = null;
let atlikusaisLaiks = laiksSekundes;
let atbildeIzv = false;

// --- ELEMENTI ---
const katEkrans = document.getElementById('category-screen');
const sakEkrans   = document.getElementById('start-screen');
const testaEkrans = document.getElementById('quiz-screen');
const rezEkrans   = document.getElementById('result-screen');
const pogaB      = document.getElementById('category-b-btn');
const pogaA      = document.getElementById('category-a-btn');
const pogaSakt   = document.getElementById('start-btn');
const pogaAtkart = document.getElementById('retry-btn');
const pogaNak   = document.getElementById('next-btn');
const timerEl    = document.getElementById('timer');
const timerKaste = document.getElementById('timer-box');
const progresaJosla = document.getElementById('progress-bar');
const jautSkaititajs = document.getElementById('q-counter');
const jautTeksts = document.getElementById('question-text');
const atbildesDiv = document.getElementById('answers');
const jautAttels = document.getElementById('question-image');
const attTukšais = document.getElementById('img-placeholder');

// --- SĀKNĒJI IELĀDĒJIET DATUS ---
fetch('masivs.json')
  .then(response => response.json())
  .then(data => {
    testaDati = data;
    // Kad dati ir gatavi, aktivizē pogas (tās jau bija, bet precīzāk būtu iestatīt listenerus jebkurā gadījumā)
    // Ja gribi parādīt, ka notiek ielāde, vari nospiest "ielādē..." ziņu.
  })
  .catch(error => {
    console.error('Neizdevās ielādēt testa datus:', error);
    alert('Kļūda, ielādējot testa jautājumus. Lūdzu, pārbaudiet masivs.json failu.');
  });

// --- NOTIKUMU KLAUSĪTĀJI ---
pogaB.addEventListener('click', function() { izveletiesKat('B'); });
pogaA.addEventListener('click', function() { izveletiesKat('A'); });
pogaSakt.addEventListener('click', saktTestu);
pogaAtkart.addEventListener('click', function() {
    paraditEkranu(katEkrans);
});
pogaNak.addEventListener('click', nakamaisJaut);

// --- FUNKCIJAS ---

function izveletiesKat(kat) {
    if (!testaDati) {
        alert('Dati vēl nav ielādēti. Lūdzu, uzgaidiet mirkli.');
        return;
    }

    izveletaKategorija = kat;
    esosieJautajumi = kat === 'B' ? testaDati.questionsB : testaDati.questionsA;

    if (kat === 'B') {
        laiksSekundes = 1500;
        izturetSlieksnis = 35;  // 70% no 50
        jautajumuSkaits = 50;
    } else {
        laiksSekundes = 900;
        izturetSlieksnis = 21;  // 70% no 30
        jautajumuSkaits = 30;
    }

    atjauninatSakumaEkranu();
    paraditEkranu(sakEkrans);
}

function atjauninatSakumaEkranu() {
    const minutes = Math.floor(laiksSekundes / 60);
    const statNum = document.querySelectorAll('#start-screen .stat-num');
    statNum[0].textContent = jautajumuSkaits;
    statNum[1].textContent = minutes + ':00';

    document.querySelector('#start-screen .hero-desc').innerHTML =
        jautajumuSkaits + ' jautājumi par ceļu satiksmes noteikumiem ar attēliem. Laiks: <strong>' +
        minutes + ' minūtes</strong>.';
}

function saktTestu() {
    if (!esosieJautajumi.length) {
        alert('Nav ielādēti jautājumi!');
        return;
    }
    jautIdx = 0;
    pareizas = 0;
    atlikusaisLaiks = laiksSekundes;
    atbildeIzv = false;

    paraditEkranu(testaEkrans);
    saktTimeri();
    raditJautajumu();
}

function paraditEkranu(ekrans) {
    [katEkrans, sakEkrans, testaEkrans, rezEkrans].forEach(el => el.classList.remove('active'));
    ekrans.classList.add('active');
}

function raditJautajumu() {
    atbildeIzv = false;
    pogaNak.style.display = 'none';
    atbildesDiv.innerHTML = '';

    const jaut = esosieJautajumi[jautIdx];

    const progress = (jautIdx / esosieJautajumi.length) * 100;
    progresaJosla.style.width = progress + '%';
    jautSkaititajs.textContent = (jautIdx + 1) + ' / ' + esosieJautajumi.length;

    jautTeksts.textContent = jaut.question;

    if (jaut.image) {
        jautAttels.src = jaut.image;
        jautAttels.style.display = 'block';
        attTukšais.style.display = 'none';
    } else {
        jautAttels.style.display = 'none';
        attTukšais.style.display = 'flex';
    }

    jaut.answers.forEach(function(atb, i) {
        const poga = document.createElement('button');
        poga.classList.add('answer-btn');
        poga.innerHTML = '<span class="letter">' + BURTI[i] + '</span>' +
                         '<span class="answer-text">' + atb.text + '</span>';
        poga.dataset.pareiza = atb.correct;
        poga.addEventListener('click', izveletiesAtbildi);
        atbildesDiv.appendChild(poga);
    });
}

function izveletiesAtbildi(e) {
    if (atbildeIzv) return;
    atbildeIzv = true;

    const poga = e.currentTarget;
    const irPareiza = poga.dataset.pareiza === 'true';

    if (irPareiza) {
        poga.classList.add('pareizi');
        pareizas++;
    } else {
        poga.classList.add('nepareizi');
        atbildesDiv.querySelectorAll('.answer-btn').forEach(function(btn) {
            if (btn.dataset.pareiza === 'true') {
                btn.classList.add('pareizi');
            }
        });
    }

    atbildesDiv.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
    pogaNak.style.display = 'flex';
}

function nakamaisJaut() {
    jautIdx++;
    if (jautIdx < esosieJautajumi.length) {
        raditJautajumu();
    } else {
        apturetTimeri();
        paraditRezultatus(false);
    }
}

function paraditRezultatus(laiksBeidzies) {
    apturetTimeri();
    paraditEkranu(rezEkrans);

    const procenti = Math.round((pareizas / esosieJautajumi.length) * 100);
    const izturets = pareizas >= izturetSlieksnis;

    document.getElementById('result-icon').textContent = izturets ? '🏆' : '❌';
    document.getElementById('result-title').textContent = izturets ? 'Apsveicam!' : 'Neizdevās';

    const scoreEl = document.getElementById('result-score');
    scoreEl.textContent = pareizas + ' / ' + esosieJautajumi.length;
    scoreEl.className = 'result-score ' + (izturets ? 'izturets' : 'neizturets');

    let zina = '';
    if (laiksBeidzies) {
        zina = 'Laiks beidzās! Tu atbildēji uz ' + pareizas + ' no ' + esosieJautajumi.length + ' jautājumiem.';
    } else if (izturets) {
        zina = 'Lielisks rezultāts — ' + procenti + '%! Tu esi gatavs ceļam.';
    } else {
        zina = 'Diemžēl rezultāts ir ' + procenti + '%. Nepieciešams vismaz 70%. Mēģini vēlreiz!';
    }
    document.getElementById('result-msg').textContent = zina;

    document.getElementById('result-breakdown').innerHTML =
        '✅ Pareizās atbildes: <strong>' + pareizas + '</strong><br>' +
        '❌ Nepareizās atbildes: <strong>' + (esosieJautajumi.length - pareizas) + '</strong><br>' +
        '📊 Rezultāts: <strong>' + procenti + '%</strong>';
}

function saktTimeri() {
    apturetTimeri();
    atlikusaisLaiks = laiksSekundes;
    atjauninatTimeri(atlikusaisLaiks);

    timeris = setInterval(function() {
        atlikusaisLaiks--;
        atjauninatTimeri(atlikusaisLaiks);

        if (atlikusaisLaiks <= 0) {
            apturetTimeri();
            paraditRezultatus(true);
        }
    }, 1000);
}

function apturetTimeri() {
    clearInterval(timeris);
    timeris = null;
}

function atjauninatTimeri(sek) {
    const min = Math.floor(sek / 60);
    const sekundes = sek % 60;
    timerEl.textContent = min + ':' + sekundes.toString().padStart(2, '0');

    timerKaste.classList.remove('warning', 'danger');
    if (sek <= 30) {
        timerKaste.classList.add('danger');
    } else if (sek <= 90) {
        timerKaste.classList.add('warning');
    }
}