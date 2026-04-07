// ===========================
// AUTOVADĪTĀJA TESTS - script.js
// ===========================

// --- JAUTĀJUMU MASĪVS ---
const questions = [
    {
        question: "Kā rīkosieties, ieraugot attēlā redzamo ceļa zīmi?",
        image: "image/1.png",
        answers: [
            { text: "Raidīsiet garus skaņas signālus, lai aizbaidītu savvaļas dzīvniekus.", correct: false },
            { text: "Ievērosiet īpašu piesardzību un izvēlēsieties atbilstošu ātrumu.", correct: true },
            { text: "Ieslēgsiet visas iespējamās apgaismes ierīces, lai dzīvnieki jūs savlaicīgi pamanītu.", correct: false }
        ]
    },
    {
        question: "Kurā attēlā pareizāk tiek veikta cietušā izvilkšana no ceļu satiksmes negadījumā iekļuvušā automobiļa?",
        image: "image/2.png",
        answers: [
            { text: "A.", correct: false },
            { text: "B.", correct: true },
            { text: "Abi paņēmieni ir pareizi.", correct: false }
        ]
    },
    {
        question: "Kurš no vadītājiem ir ieņēmis pareizu stāvokli uz brauktuves, lai brauktu pa loku?",
        image: "image/3.png",
        answers: [
            { text: "Abu automobiļu vadītāji.", correct: false },
            { text: "Tikai vieglā automobiļa vadītājs.", correct: false },
            { text: "Tikai kravas automobiļa vadītājs.", correct: true }
        ]
    },
    {
        question: "Ko apzīmē attēlotais ceļa apzīmējums?",
        image: "image/4.png",
        answers: [
            { text: "Uz brauktuves izveidotu mākslīgu paaugstinājumu (ātrumvalni).", correct: false },
            { text: "Gājēju pāreju.", correct: true },
            { text: "Riteņbraucēju celiņu.", correct: false }
        ]
    },
    {
        question: "Ko norāda attēlotā ceļa zīme?",
        image: "image/5.png",
        answers: [
            { text: "Stāvvietu lielveikala klientu transportlīdzekļiem.", correct: false },
            { text: "Vietu, kur aizliegts apstāties mehāniskajiem transportlīdzekļiem.", correct: false },
            { text: "Autobusu un trolejbusu pieturvietu.", correct: true }
        ]
    },
    {
        question: "Kā rīkosieties, ja tuvojas operatīvais transportlīdzeklis ar iedegtu mirgojošu zilu un sarkanu bākuguni un ieslēgtu speciālu skaņas signālu?",
        image: "image/6.png",
        answers: [
            { text: "Turpināsiet braukt pa iecerēto maršrutu.", correct: false },
            { text: "Nekavējoties apstāsieties brauktuves labajā malā.", correct: true },
            { text: "Nekavējoties apstāsieties jebkurā vietā.", correct: false }
        ]
    },
    {
        question: "Kā rīkosieties, šķērsojot krustojumu, attēlotajā situācijā?",
        image: "image/7.png",
        answers: [
            { text: "Dosiet ceļu tikai kravas automobiļa vadītājam.", correct: false },
            { text: "Dosiet ceļu abu automobiļu vadītājiem.", correct: true },
            { text: "Šķērsosiet krustojumu pirmais.", correct: false }
        ]
    },
    {
        question: "Kādā attālumā no pretim braucošā transportlīdzekļa tālās gaismas jāpārslēdz uz tuvajām?",
        image: "image/8.png",
        answers: [
            { text: "Vismaz 150 metru attālumā.", correct: true },
            { text: "Tikai tad, kad pretimbraucošais periodiski pārslēdz lukturu gaismu.", correct: false },
            { text: "Tikai tad, kad pretim braucošais ieslēdz avārijas gaismas signalizāciju.", correct: false }
        ]
    },
    {
        question: "Kādu piekabi atļauts vilkt ar vieglo automobili, kura pilna masa ir 2000 kg, ja autovadītājam ir B kategorijas vadītāja apliecība?",
        image: "image/9.png",
        answers: [
            { text: "Piekabi, kuras pašmasa nepārsniedz 1500 kg.", correct: false },
            { text: "Piekabi, kuras pilna masa nepārsniedz 1500 kg.", correct: true },
            { text: "Piekabi, kuras faktiskā masa nepārsniedz 1500 kg.", correct: false }
        ]
    },
    {
        question: "Ko apzīmē attēlotais ceļa apzīmējums — bultas uz brauktuves?",
        image: "image/10.png",
        answers: [
            { text: "Apzīmē joslu, kur mainīsies braukšanas virziens uz pretējo.", correct: true },
            { text: "Brīdina par tuvojošos ceļa sašaurinājumu.", correct: false },
            { text: "Apzīmē apdzīšanas joslu.", correct: false }
        ]
    }
];

// --- KONSTANTES ---
const LAIKS_SEKUNDES = 300; // 5 minūtes
const IZTURET_SLIEKSNIS = 7; // minimālais pareizo atbilžu skaits
const BURTU_APZIMEJUMI = ['A', 'B', 'C', 'D'];

// --- MAINĪGIE ---
let parejaisJautajumsIndex = 0;
let pareizasAtbildes = 0;
let timerInterval = null;
let atlicinaisLaiks = LAIKS_SEKUNDES;
let atbildeIzvEleta = false;

// --- ELEMENTI ---
const startScreen   = document.getElementById('start-screen');
const quizScreen    = document.getElementById('quiz-screen');
const resultScreen  = document.getElementById('result-screen');
const startBtn      = document.getElementById('start-btn');
const retryBtn      = document.getElementById('retry-btn');
const nextBtn       = document.getElementById('next-btn');
const timerEl       = document.getElementById('timer');
const timerBox      = document.getElementById('timer-box');
const progressBar   = document.getElementById('progress-bar');
const qCounter      = document.getElementById('q-counter');
const questionText  = document.getElementById('question-text');
const answersDiv    = document.getElementById('answers');
const questionImage = document.getElementById('question-image');
const imgPlaceholder= document.getElementById('img-placeholder');

// --- NOTIKUMU KLAUSĪTĀJI ---
startBtn.addEventListener('click', saktiTestu);
retryBtn.addEventListener('click', saktiTestu);
nextBtn.addEventListener('click', nakamaisJautajums);

// --- FUNKCIJAS ---

/**
 * Sāk testu no sākuma — atiestata visus mainīgos un parāda pirmo jautājumu.
 */
function saktiTestu() {
    parejaisJautajumsIndex = 0;
    pareizasAtbildes = 0;
    atlicinaisLaiks = LAIKS_SEKUNDES;
    atbildeIzvEleta = false;

    raditEkranu(quizScreen);
    saktiTaimeri();
    raditJautajumu();
}

/**
 * Parāda konkrētu ekrānu un paslēpj pārējos.
 * @param {HTMLElement} ekrans - Ekrāns, kas jāparāda
 */
function raditEkranu(ekrans) {
    [startScreen, quizScreen, resultScreen].forEach(s => s.classList.remove('active'));
    ekrans.classList.add('active');
}

/**
 * Parāda pašreizējo jautājumu — tekstu, attēlu un atbilžu pogas.
 */
function raditJautajumu() {
    atbildeIzvEleta = false;
    nextBtn.style.display = 'none';
    answersDiv.innerHTML = '';

    const jautajums = questions[parejaisJautajumsIndex];

    // Atjaunina progresa joslu un skaitītāju
    const progress = ((parejaisJautajumsIndex) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    qCounter.textContent = (parejaisJautajumsIndex + 1) + ' / ' + questions.length;

    // Iestata jautājuma tekstu
    questionText.textContent = jautajums.question;

    // Rāda vai paslēpj attēlu
    if (jautajums.image) {
        questionImage.src = jautajums.image;
        questionImage.style.display = 'block';
        imgPlaceholder.style.display = 'none';
    } else {
        questionImage.style.display = 'none';
        imgPlaceholder.style.display = 'flex';
    }

    // Izveido atbilžu pogas
    jautajums.answers.forEach(function(atbilde, i) {
        const poga = document.createElement('button');
        poga.classList.add('answer-btn');
        poga.innerHTML =
            '<span class="letter">' + BURTU_APZIMEJUMI[i] + '</span>' +
            '<span class="answer-text">' + atbilde.text + '</span>';
        poga.dataset.pareiza = atbilde.correct;
        poga.addEventListener('click', izvEliesAtbildi);
        answersDiv.appendChild(poga);
    });
}

/**
 * Apstrādā atbildes izvēli — atzīmē pareizo/nepareizo un rāda "Nākamais" pogu.
 * @param {Event} e - Klikšķa notikums
 */
function izvEliesAtbildi(e) {
    if (atbildeIzvEleta) return; // Novērš dubultklikšķi
    atbildeIzvEleta = true;

    const izvEletaPoga = e.currentTarget;
    const isPareiza = izvEletaPoga.dataset.pareiza === 'true';

    if (isPareiza) {
        izvEletaPoga.classList.add('pareizi');
        pareizasAtbildes++;
    } else {
        izvEletaPoga.classList.add('nepareizi');
        // Parāda arī pareizo atbildi
        const visasPAogas = answersDiv.querySelectorAll('.answer-btn');
        visasPAogas.forEach(function(p) {
            if (p.dataset.pareiza === 'true') {
                p.classList.add('pareizi');
            }
        });
    }

    // Atslēdz visas pogas
    answersDiv.querySelectorAll('.answer-btn').forEach(function(p) {
        p.disabled = true;
    });

    nextBtn.style.display = 'flex';
}

/**
 * Pāriet uz nākamo jautājumu vai rāda rezultātus.
 */
function nakamaisJautajums() {
    parejaisJautajumsIndex++;
    if (parejaisJautajumsIndex < questions.length) {
        raditJautajumu();
    } else {
        apstatinatTaimeri();
        raditRezultatus(false);
    }
}

/**
 * Parāda rezultātu ekrānu.
 * @param {boolean} laiksBeidzies - Vai laiks beidzās pirms testa pabeigšanas
 */
function raditRezultatus(laiksBeidzies) {
    apstatinatTaimeri();
    raditEkranu(resultScreen);

    const procenti = Math.round((pareizasAtbildes / questions.length) * 100);
    const izturets = pareizasAtbildes >= IZTURET_SLIEKSNIS;

    document.getElementById('result-icon').textContent = izturets ? '🏆' : '❌';
    document.getElementById('result-title').textContent = izturets ? 'Apsveicam!' : 'Neizdevās';

    const scoreEl = document.getElementById('result-score');
    scoreEl.textContent = pareizasAtbildes + ' / ' + questions.length;
    scoreEl.className = 'result-score ' + (izturets ? 'izturets' : 'neizturets');

    let msg = '';
    if (laiksBeidzies) {
        msg = 'Laiks beidzās! Tu atbildēji uz ' + pareizasAtbildes + ' no ' + questions.length + ' jautājumiem.';
    } else if (izturets) {
        msg = 'Lielisks rezultāts — ' + procenti + '%! Tu esi gatavs ceļam.';
    } else {
        msg = 'Diemžēl rezultāts ir ' + procenti + '%. Nepieciešams vismaz 70%, lai izturētu. Mēģini vēlreiz!';
    }
    document.getElementById('result-msg').textContent = msg;

    document.getElementById('result-breakdown').innerHTML =
        '✅ Pareizās atbildes: <strong>' + pareizasAtbildes + '</strong><br>' +
        '❌ Nepareizās atbildes: <strong>' + (questions.length - pareizasAtbildes) + '</strong><br>' +
        '📊 Rezultāts: <strong>' + procenti + '%</strong>';
}

/**
 * Sāk lejupejošo taimeri.
 */
function saktiTaimeri() {
    apstatinatTaimeri();
    atlicinaisLaiks = LAIKS_SEKUNDES;
    atjauninatTimera(atlicinaisLaiks);

    timerInterval = setInterval(function() {
        atlicinaisLaiks--;
        atjauninatTimera(atlicinaisLaiks);

        if (atlicinaisLaiks <= 0) {
            apstatinatTaimeri();
            raditRezultatus(true);
        }
    }, 1000);
}

/**
 * Apstādina taimeri.
 */
function apstatinatTaimeri() {
    clearInterval(timerInterval);
    timerInterval = null;
}

/**
 * Atjaunina taimera attēlojumu ekrānā.
 * @param {number} sekundes - Atlikušais laiks sekundēs
 */
function atjauninatTimera(sekundes) {
    const min = Math.floor(sekundes / 60);
    const sek = sekundes % 60;
    timerEl.textContent = min + ':' + sek.toString().padStart(2, '0');

    // Krāsu brīdinājumi
    timerBox.classList.remove('warning', 'danger');
    if (sekundes <= 30) {
        timerBox.classList.add('danger');
    } else if (sekundes <= 90) {
        timerBox.classList.add('warning');
    }
}