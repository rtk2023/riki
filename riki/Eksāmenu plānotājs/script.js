
let completed = {};
let currentExam = "";

// ---------------- INIT ----------------
window.onload = () => {
    loadTheme();
    loadData();
};

// ---------------- SLIDES ----------------
function showSlide(n) {
    document.querySelectorAll(".slide").forEach(s => s.classList.remove("active"));
    document.getElementById("slide" + n).classList.add("active");
}

// ---------------- TOPICS ----------------
function getTopics(exam, grade) {
    const data = {
        math: {
            9: [
                { name: "Trigonometrija", desc: "Leņķu un malu attiecības.", q: "Sin 90°?", a: "1" },
                { name: "Procenti", desc: "Daļas no 100.", q: "25% no 200?", a: "50" },
                { name: "Lineārie vienādojumi", desc: "ax + b = 0.", q: "x + 5 = 10, x?", a: "5" },
                { name: "Ģeometrija", desc: "Figūras un laukumi.", q: "Kvadrāta laukums formula?", a: "a^2" }
            ],
            12: [
                { name: "Atvasinājumi", desc: "Funkcijas izmaiņas.", q: "x² derivatīvs?", a: "2x" },
                { name: "Integrāļi", desc: "Laukums zem grafika.", q: "∫x dx?", a: "x^2/2" },
                { name: "Trigonometrija", desc: "Sin, cos, tan.", q: "cos 0°?", a: "1" },
                { name: "Eksponentfunkcijas", desc: "Augšana un kritums.", q: "2^3?", a: "8" }
            ]
        },

        english: {
            9: [
                { name: "Grammar basics", desc: "Pamati gramatikā.", q: "He ___ a book (read/reads)?", a: "reads" },
                { name: "Tenses", desc: "Laiku sistēma.", q: "Past of go?", a: "went" },
                { name: "Vocabulary", desc: "Vārdu krājums.", q: "Apple latviski?", a: "ābols" },
                { name: "Reading", desc: "Tekstu izpratne.", q: "Read = ?", a: "lasīt" }
            ],
            12: [
                { name: "Essay writing", desc: "Eseju rakstīšana.", q: "How many paragraphs in essay?", a: "5" },
                { name: "Advanced grammar", desc: "Sarežģīta gramatika.", q: "Conditional type 2?", a: "would" },
                { name: "Listening", desc: "Klausīšanās.", q: "Listening = ?", a: "klausīšanās" },
                { name: "Formal writing", desc: "Oficiālais stils.", q: "Dear Sir is?", a: "formal" }
            ]
        },

        latvian: {
            9: [
                { name: "Gramatika", desc: "Valodas noteikumi.", q: "Vārda locījums?", a: "nominatīvs" },
                { name: "Lasīšana", desc: "Teksta izpratne.", q: "Lasīt = ?", a: "read" },
                { name: "Diktāts", desc: "Pareizrakstība.", q: "Pareizi: skola vai scola?", a: "skola" },
                { name: "Teksta analīze", desc: "Teksta izpēte.", q: "Kas ir tēma?", a: "galvenā doma" }
            ],
            12: [
                { name: "Eseja", desc: "Rakstīšana.", q: "Cik daļas esejā?", a: "3" },
                { name: "Literatūra", desc: "Darbu analīze.", q: "Rainis ir?", a: "rakstnieks" },
                { name: "Stilistika", desc: "Rakstības stils.", q: "Stils = ?", a: "veids" },
                { name: "Argumentācija", desc: "Viedokļa aizstāvēšana.", q: "Argument = ?", a: "pierādījums" }
            ]
        }
    };

    return data[exam][grade];
}

// ---------------- PLAN ----------------
function generatePlan() {
    const grade = document.getElementById("grade").value;
    const exam = document.getElementById("exam").value;

    currentExam = exam;

    if (!completed[exam]) completed[exam] = [];

    const topics = getTopics(exam, grade);

    let html = "<h3>Tēmas</h3>";

    topics.forEach(t => {
        const done = completed[exam].includes(t.name);

        html += `
        <div class="topic-item">
            <span onclick="openTopic('${t.name}','${t.desc}','${t.q}','${t.a}')">
                ${done ? "✅" : "⬜"} ${t.name}
            </span>

            <button class="done-btn" onclick="toggleDone('${t.name}')">
                ${done ? "Noņemt" : "✔ Esmu iemācījies"}
            </button>
        </div>
        `;
    });

    document.getElementById("planResult").innerHTML = html;

    updateProgress(exam, topics);
    save();

    showSlide(2);
}

// ---------------- TOGGLE ----------------
function toggleDone(topic) {
    if (!completed[currentExam]) completed[currentExam] = [];

    if (completed[currentExam].includes(topic)) {
        completed[currentExam] = completed[currentExam].filter(t => t !== topic);
    } else {
        completed[currentExam].push(topic);
    }

    save();

    const grade = document.getElementById("grade").value;
    const topics = getTopics(currentExam, grade);

    generatePlan();
    updateProgress(currentExam, topics);
}

// ---------------- TOPIC ----------------
function openTopic(name, desc, q, a) {

    document.getElementById("topicTitle").innerText = name;

    document.getElementById("topicContent").innerHTML = `
        <h3>📘 Teorija</h3>
        <p>${desc}</p>

        <hr>

        <h3>🧠 Tests</h3>
        <p>${q}</p>

        <input id="answer">
        <button onclick="checkTest('${a}','${name}')">Pārbaudīt</button>

        <p id="testResult"></p>

        <a href="https://www.uzdevums.lv" target="_blank">Uzdevums.lv</a>
    `;

    showSlide(3);
}

// ---------------- TEST ----------------
function checkTest(correct, topic) {
    const val = document.getElementById("answer").value;
    const res = document.getElementById("testResult");

    if (val.trim().toLowerCase() === correct.toLowerCase()) {
        res.innerHTML = "✅ Pareizi!";

        if (!completed[currentExam].includes(topic)) {
            completed[currentExam].push(topic);
        }

        save();
    } else {
        res.innerHTML = "❌ Nepareizi";
    }
}

// ---------------- PROGRESS ----------------
function updateProgress(exam, topics) {
    const done = completed[exam] ? completed[exam].length : 0;
    const percent = Math.round((done / topics.length) * 100);

    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressText").innerText =
        `${done}/${topics.length} (${percent}%)`;
}

// ---------------- SAVE ----------------
function save() {
    localStorage.setItem("progress", JSON.stringify(completed));
}

function loadData() {
    const data = localStorage.getItem("progress");
    if (data) completed = JSON.parse(data);
}

// ---------------- THEME FIX ----------------
function setTheme(theme) {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
}

document.getElementById("themeToggle").onclick = () => {
    const current = document.body.classList.contains("light") ? "light" : "dark";
    setTheme(current === "dark" ? "light" : "dark");
};

function loadTheme() {
    const saved = localStorage.getItem("theme");

    if (saved) {
        setTheme(saved);
    } else {
        const hour = new Date().getHours();
        setTheme(hour >= 7 && hour < 19 ? "light" : "dark");
    }
}