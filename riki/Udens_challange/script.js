let total = parseInt(localStorage.getItem("waterTotal") || "0");
let goal = parseInt(localStorage.getItem("waterGoal") || "2000");
let streak = parseInt(localStorage.getItem("streak") || "0");
let record = parseInt(localStorage.getItem("record") || "0");
let glasses = parseInt(localStorage.getItem("glasses") || "0");
let locked = localStorage.getItem("locked") === "true";
let goalReached = localStorage.getItem("goalReached") === "true";
let lastDate = localStorage.getItem("lastDate");
let lastClick = 0;
let today = new Date().toDateString();

if (lastDate !== today) {
    if (!goalReached && lastDate) {
        streak = 0;
        localStorage.setItem("streak", "0");
    }
    total = 0;
    glasses = 0;
    goalReached = false;
    localStorage.setItem("waterTotal", "0");
    localStorage.setItem("glasses", "0");
    localStorage.setItem("goalReached", "false");
    localStorage.setItem("lastDate", today);
}

document.getElementById("goal").value = goal;

function addWater() {
    let now = Date.now();
    let input = document.getElementById("glassSize").value;

    if (!input || parseInt(input) <= 0) {
        showMsg("⚠️ Ievadi glāzes izmēru!");
        return;
    }

    let glass = parseInt(input);

    if (glass > 350) {
        showMsg("🚫 Maksimums 350ml!");
        return;
    }

    if (total >= 3000) {
        showMsg("⚠️ Jau 3L cilvēkam nav veselīgi!");
        return;
    }

    if (now - lastClick < 1500) {
        showMsg("🐌 Lēnām!");
        return;
    }
    lastClick = now;

    total += glass;
    glasses++;

    localStorage.setItem("waterTotal", total);
    localStorage.setItem("glasses", glasses);

    update();
}

function startChallenge() {
    let mode = document.getElementById("mode").value;

    if (mode !== "none") {
        locked = true;
        localStorage.setItem("locked", "true");
        showMsg("🎯 Challenge sākts!");
    }
}

function saveGoal() {
    if (locked) return;

    let newGoal = document.getElementById("goal").value;

    if (!newGoal || parseInt(newGoal) <= 0) return;

    goal = parseInt(newGoal);
    localStorage.setItem("waterGoal", goal);
    update();
}

function resetLock() {
    locked = false;
    localStorage.setItem("locked", "false");
}

function resetDay() {
    total = 0;
    glasses = 0;
    goalReached = false;

    localStorage.setItem("waterTotal", "0");
    localStorage.setItem("glasses", "0");
    localStorage.setItem("goalReached", "false");

    update();
}

function update() {
    let percent = (total / goal) * 100;
    if (percent > 100) percent = 100;

    document.getElementById("total").innerText = total;
    document.getElementById("goalDisplay").innerText = goal;
    document.getElementById("streak").innerText = streak;
    document.getElementById("glasses").innerText = glasses;
    document.getElementById("record").innerText = record;

    document.getElementById("bar").style.width = percent + "%";
    document.getElementById("water").style.height = percent + "%";
    document.getElementById("percent").innerText = Math.round(percent) + "%";
}

function showMsg(text) {
    document.getElementById("msg").innerText = text;
}

update();