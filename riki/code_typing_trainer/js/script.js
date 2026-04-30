let currentCode = "";
let typedText = "";
let codeParts = [];
let currentPartIndex = 0;
let timeLeft = 0;
let currentErrors = 0;
let totalErrors = 0;
let correctCodes = 0;
let completedChars = 0;
let startTime;
let timer;
let isGameActive = false;
let totalDuration = 0;
let gameMode = "time";
let targetCorrectCodes = 0;

const codeArea = document.getElementById("codeArea");
const timeElem = document.getElementById("time");
const timeLabelElem = document.getElementById("timeLabel");
const wpmElem = document.getElementById("wpm");
const errorsElem = document.getElementById("errors");
const correctElem = document.getElementById("correct");
const usernameInput = document.getElementById("usernameInput");
const resultsList = document.getElementById("resultsList");
const notificationOverlay = document.getElementById("notificationOverlay");
const notificationBadge = document.getElementById("notificationBadge");
const notificationTitle = document.getElementById("notificationTitle");
const notificationMessage = document.getElementById("notificationMessage");
const notificationClose = document.getElementById("notificationClose");

const modeInput = document.getElementById("modeInput");
const modeButtons = document.querySelectorAll(".mode-button");
const secondsInput = document.getElementById("secondsInput");
const targetInput = document.getElementById("targetInput");
const secondsLabel = document.getElementById("secondsLabel");
const targetLabel = document.getElementById("targetLabel");
const difficultySelect = document.getElementById("difficultySelect");
const startBtn = document.getElementById("startBtn");
const resultsStorageKey = "typingGameRecentResults";

// Koda piemēri
const snippetLibrary = {
    easy: [
        {
            name: "clamp",
            code: `const clamp = (value, min, max) => Math.min(Math.max(value, min), max);`
        },
        {
            name: "capitalize",
            code: `const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);`
        },
        {
            name: "sum",
            code: `const sum = (...values) => values.reduce((total, value) => total + value, 0);`
        },
        {
            name: "reverse-string",
            code: `const reverseString = text => [...text].reverse().join("");`
        },
        {
            name: "is-even",
            code: `const isEven = value => value % 2 === 0;`
        },
        {
            name: "random-int",
            code: `const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;`
        },
        {
            name: "remove-falsy",
            code: `const compact = values => values.filter(Boolean);`
        },
        {
            name: "unique-values",
            code: `const uniqueValues = values => [...new Set(values)];`
        }
    ],
    medium: [
        {
            name: "chunk-array",
            code: `const chunk = (items, size) => {
    return items.reduce((chunks, item, index) => {
        const chunkIndex = Math.floor(index / size);
        chunks[chunkIndex] = chunks[chunkIndex] || [];
        chunks[chunkIndex].push(item);
        return chunks;
    }, []);
};`
        },
        {
            name: "group-by",
            code: `const groupBy = (items, key) => {
    return items.reduce((groups, item) => {
        const groupKey = typeof key === "function" ? key(item) : item[key];
        groups[groupKey] = groups[groupKey] || [];
        groups[groupKey].push(item);
        return groups;
    }, {});
};`
        },
        {
            name: "count-by",
            code: `const countBy = (items, mapper) => {
    return items.reduce((counts, item) => {
        const key = mapper(item);
        counts[key] = (counts[key] || 0) + 1;
        return counts;
    }, {});
};`
        },
        {
            name: "sort-by",
            code: `const sortBy = (items, mapper) => {
    return [...items].sort((left, right) => {
        const leftValue = mapper(left);
        const rightValue = mapper(right);
        return leftValue > rightValue ? 1 : leftValue < rightValue ? -1 : 0;
    });
};`
        },
        {
            name: "pick-fields",
            code: `const pick = (source, keys) => {
    return keys.reduce((result, key) => {
        if (key in source) {
            result[key] = source[key];
        }
        return result;
    }, {});
};`
        },
        {
            name: "zip-arrays",
            code: `const zip = (...lists) => {
    const maxLength = Math.max(...lists.map(list => list.length));
    return Array.from({ length: maxLength }, (_, index) => {
        return lists.map(list => list[index]);
    });
};`
        }
    ],
    hard: [
        {
            name: "deep-flatten",
            code: `const deepFlatten = values => {
    return values.reduce((result, value) => {
        if (Array.isArray(value)) {
            result.push(...deepFlatten(value));
        } else {
            result.push(value);
        }
        return result;
    }, []);
};`
        },
        {
            name: "fibonacci",
            code: `const fibonacci = size => {
    if (size <= 0) {
        return [];
    }

    const sequence = [0, 1];
    while (sequence.length < size) {
        const last = sequence[sequence.length - 1];
        const previous = sequence[sequence.length - 2];
        sequence.push(last + previous);
    }

    return sequence.slice(0, size);
};`
        },
        {
            name: "nest-comments",
            code: `const nestComments = (comments, parentId = null) => {
    return comments
        .filter(comment => comment.parentId === parentId)
        .map(comment => ({
            ...comment,
            replies: nestComments(comments, comment.id)
        }));
};`
        },
        {
            name: "flatten-object",
            code: `const flattenObject = (source, prefix = "") => {
    return Object.keys(source).reduce((result, key) => {
        const value = source[key];
        const nextKey = prefix ? \`\${prefix}.\${key}\` : key;

        if (value && typeof value === "object" && !Array.isArray(value)) {
            Object.assign(result, flattenObject(value, nextKey));
        } else {
            result[nextKey] = value;
        }

        return result;
    }, {});
};`
        },
        {
            name: "memoize",
            code: `const memoize = handler => {
    const cache = new Map();

    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }

        const value = handler(...args);
        cache.set(key, value);
        return value;
    };
};`
        }
    ],
    pro: [
        {
            name: "event-emitter",
            code: `class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(eventName, listener) {
        const listeners = this.events.get(eventName) || [];
        listeners.push(listener);
        this.events.set(eventName, listeners);
        return () => this.off(eventName, listener);
    }

    off(eventName, listener) {
        const listeners = this.events.get(eventName) || [];
        this.events.set(
            eventName,
            listeners.filter(currentListener => currentListener !== listener)
        );
    }

    emit(eventName, payload) {
        const listeners = this.events.get(eventName) || [];
        listeners.forEach(listener => listener(payload));
    }
}`
        },
        {
            name: "lru-cache",
            code: `class LruCache {
    constructor(limit = 5) {
        this.limit = limit;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) {
            return undefined;
        }

        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.limit) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }

        this.cache.set(key, value);
    }
}`
        },
        {
            name: "pipe-async",
            code: `const pipeAsync = (...handlers) => {
    return input =>
        handlers.reduce(async (promise, handler) => {
            const resolvedValue = await promise;
            return handler(resolvedValue);
        }, Promise.resolve(input));
};

const loadUserSummary = pipeAsync(
    async id => ({ id, name: "Ada", score: 42 }),
    user => ({ ...user, level: user.score > 40 ? "pro" : "mid" }),
    user => \`\${user.name} (\${user.level})\`
);`
        },
        {
            name: "create-store",
            code: `const createStore = initialState => {
    let state = initialState;
    const listeners = new Set();

    return {
        getState() {
            return state;
        },
        setState(updater) {
            state = typeof updater === "function" ? updater(state) : updater;
            listeners.forEach(listener => listener(state));
        },
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        }
    };
};`
        }
    ]
};

const roundsPerDifficulty = {
    easy: 18,
    medium: 14,
    hard: 10,
    pro: 7
};

// Rakstīšanas laukuma kontroles
codeArea.addEventListener("paste", e => e.preventDefault());
codeArea.addEventListener("copy", e => e.preventDefault());
codeArea.addEventListener("cut", e => e.preventDefault());
codeArea.addEventListener("beforeinput", e => e.preventDefault());
codeArea.addEventListener("input", e => e.preventDefault());

startBtn.addEventListener("click", startGame);
notificationClose.addEventListener("click", hideNotification);
notificationOverlay.addEventListener("click", event => {
    if(event.target === notificationOverlay){
        hideNotification();
    }
});
document.addEventListener("keydown", event => {
    if(event.key === "Escape" && !notificationOverlay.hidden){
        hideNotification();
    }
});
modeButtons.forEach(button => {
    button.addEventListener("click", () => {
        modeInput.value = button.dataset.mode;
        syncModeFields();
    });
});

// Parāda tikai to kas vajadzīgs noteiktam režīmam
function syncModeFields(){
    const selectedMode = modeInput.value;
    secondsLabel.hidden = selectedMode !== "time";
    targetLabel.hidden = selectedMode !== "target";
    modeButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.mode === selectedMode);
        button.setAttribute("aria-selected", String(button.dataset.mode === selectedMode));
    });
}

// Pārbauda ievadītos datus un palaiž jaunu sesiju
function startGame(){
    const difficulty = difficultySelect.value;
    const username = usernameInput.value.trim();
    gameMode = modeInput.value;

    if(!username){
        showNotification({
            tone: "warning",
            title: "Username required",
            message: "Enter your username before starting a session."
        });
        usernameInput.focus();
        return;
    }

    if(gameMode === "time"){
        const secondsValue = parseInt(secondsInput.value, 10);
        if(Number.isNaN(secondsValue) || secondsValue <= 0){
            showNotification({
                tone: "warning",
                title: "Invalid timer",
                message: "Please enter a valid number of seconds greater than zero."
            });
            secondsInput.focus();
            return;
        }
        totalDuration = secondsValue;
        targetCorrectCodes = 0;
    }else if(gameMode === "target"){
        const targetValue = parseInt(targetInput.value, 10);
        if(Number.isNaN(targetValue) || targetValue <= 0){
            showNotification({
                tone: "warning",
                title: "Invalid goal",
                message: "Please enter a valid target for correct codes."
            });
            targetInput.focus();
            return;
        }
        totalDuration = 0;
        targetCorrectCodes = targetValue;
    }else{
        totalDuration = Infinity;
        targetCorrectCodes = 0;
    }

    timeLeft = totalDuration;
    currentErrors = 0;
    totalErrors = 0;
    correctCodes = 0;
    completedChars = 0;
    typedText = "";
    startTime = new Date();
    isGameActive = true;
    codeParts = generateCodeQueue(difficulty);
    currentPartIndex = 0;
    displayCurrentPart();
    clearInterval(timer);
    timer = setInterval(updateStats, 1000);
    updateStats();
    codeArea.focus();
}

// Izveido sajauktu koda piemēru
function generateCodeQueue(difficulty){
    const pool = shuffle([...snippetLibrary[difficulty]]);
    const totalRounds = roundsPerDifficulty[difficulty];
    const queue = [];

    for(let index = 0; index < totalRounds; index++){
        const snippet = pool[index % pool.length];
        queue.push(snippet.code.trim());
    }

    return shuffle(queue);
}

// Ielādē nākamo koda piemēru ja izpildīts iepriekšejais
function displayCurrentPart(){
    if(currentPartIndex >= codeParts.length){
        codeParts = generateCodeQueue(difficultySelect.value);
        currentPartIndex = 0;
    }

    currentCode = codeParts[currentPartIndex];
    typedText = "";
    renderCodeArea();
}

// Simbolu satus - pareizs, nepareizs vai vēl nav uzrakstīts
function renderCodeArea(){
    let html = "";
    currentErrors = 0;

    for(let i = 0; i < currentCode.length; i++){
        const expectedChar = currentCode[i];
        const actualChar = typedText[i];

        if(actualChar === undefined){
            html += `<span class="pending">${escapeHTML(expectedChar)}</span>`;
        }else if(actualChar === expectedChar){
            html += `<span class="correct">${escapeHTML(actualChar)}</span>`;
        }else{
            html += `<span class="wrong">${escapeHTML(actualChar)}</span>`;
            currentErrors++;
        }
    }

    if(typedText.length > currentCode.length){
        for(let i = currentCode.length; i < typedText.length; i++){
            html += `<span class="wrong extra">${escapeHTML(typedText[i])}</span>`;
            currentErrors++;
        }
    }

    codeArea.innerHTML = html;
}

// Statistika
function updateStats(){
    const now = new Date();
    const elapsedSeconds = Math.floor((now - startTime) / 1000);
    const seconds = Math.max(1, elapsedSeconds);
    const totalCorrectChars = completedChars + countCorrectChars(typedText, currentCode);
    const wpm = Math.round((totalCorrectChars / 5) * (60 / seconds));

    if(gameMode === "infinite"){
        timeLabelElem.innerText = "Progress";
        timeElem.innerText = "∞";
    }else if(gameMode === "time"){
        timeLabelElem.innerText = "Progress";
        timeLeft = Math.max(0, totalDuration - elapsedSeconds);
        timeElem.innerText = timeLeft;
    }else{
        timeLabelElem.innerText = "Timer";
        timeElem.innerText = formatElapsedTime(elapsedSeconds);
    }

    wpmElem.innerText = wpm;
    errorsElem.innerText = totalErrors;
    correctElem.innerText = correctCodes;

    if(gameMode === "time" && elapsedSeconds >= totalDuration){
        finishGame("Time is up!");
    }
}

// Sesijas beigas
function finishGame(message){
    if(!isGameActive){
        return;
    }

    clearInterval(timer);
    isGameActive = false;
    saveResult();
    showNotification({
        tone: "success",
        title: "Session complete",
        message: `${message} You completed ${correctCodes} correct code blocks with ${totalErrors} errors.`
    });
}

codeArea.addEventListener("keydown", (event) => {
    if(!isGameActive){
        return;
    }

    const allowedControlKeys = ["Tab", "Shift", "Control", "Alt", "Meta", "CapsLock", "Escape"];
    if(allowedControlKeys.includes(event.key)){
        return;
    }

    event.preventDefault();

    // Pārbauda ievadi
    const currentIndex = typedText.length;

    if(event.key === "Backspace"){
        typedText = typedText.slice(0, -1);
    }else if(event.key === "Enter"){
        if(currentCode[currentIndex] !== "\n"){
            totalErrors++;
        }
        typedText += "\n";
    }else if(event.key.length === 1){
        if(currentCode[currentIndex] !== event.key){
            totalErrors++;
        }
        typedText += event.key;
    }else{
        return;
    }

    renderCodeArea();
    checkCompletion();
    updateStats();
});

codeArea.addEventListener("mousedown", (event) => {
    event.preventDefault();
    codeArea.focus();
});

function checkCompletion(){
    if(typedText === currentCode){
        completedChars += currentCode.length;
        correctCodes++;
        currentPartIndex++;
        if(gameMode === "target" && correctCodes >= targetCorrectCodes){
            updateStats();
            finishGame("Goal reached!");
            return;
        }
        displayCurrentPart();
    }
}

// Statistika - pareizie simboli
function countCorrectChars(input, expected){
    let correctChars = 0;

    for(let i = 0; i < input.length; i++){
        if(input[i] === expected[i]){
            correctChars++;
        }
    }

    return correctChars;
}

// Sajauc masīvu nejaušā secībā,
function shuffle(items){
    const copy = [...items];

    for(let i = copy.length - 1; i > 0; i--){
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
    }

    return copy;
}

// Saglabā tikai 10 jaunākos rezultātus
function saveResult(){
    const results = getSavedResults();
    const elapsedSeconds = Math.max(1, Math.floor((new Date() - startTime) / 1000));
    const totalCorrectChars = completedChars + countCorrectChars(typedText, currentCode);
    const wpm = Math.round((totalCorrectChars / 5) * (60 / elapsedSeconds));
    const result = {
        username: usernameInput.value.trim(),
        difficulty: difficultySelect.value,
        mode: gameMode,
        timeMode: gameMode === "time" ? secondsInput.value : gameMode,
        targetCorrectCodes,
        correctCodes,
        totalErrors,
        wpm,
        playedAt: new Date().toISOString()
    };

    results.unshift(result);
    localStorage.setItem(resultsStorageKey, JSON.stringify(results.slice(0, 10)));
    renderResults();
}

function getSavedResults(){
    try {
        return JSON.parse(localStorage.getItem(resultsStorageKey)) || [];
    } catch (error) {
        return [];
    }
}

// Izvada statistikas sarakstu
function renderResults(){
    const results = getSavedResults();
    resultsList.innerHTML = "";

    if(results.length === 0){
        const emptyItem = document.createElement("li");
        emptyItem.className = "results-empty";
        emptyItem.textContent = "No saved results yet.";
        resultsList.appendChild(emptyItem);
        return;
    }

    results.forEach(result => {
        const item = document.createElement("li");
        const timeLabel = formatModeLabel(result);
        const difficultyLabel = formatDifficulty(result.difficulty);
        const dateLabel = new Date(result.playedAt).toLocaleString("en-US");
        item.className = "result-item";
        item.textContent = `${result.username} · ${difficultyLabel} · ${timeLabel} · WPM ${result.wpm} · errors ${result.totalErrors} · correct ${result.correctCodes} · ${dateLabel}`;
        resultsList.appendChild(item);
    });
}

function formatModeLabel(result){
    if(result.mode === "time"){
        return `${result.timeMode} sec`;
    }
    if(result.mode === "target"){
        return `goal ${result.targetCorrectCodes}`;
    }
    if(result.mode === "infinite" || result.timeMode === "infinite"){
        return "infinite";
    }
    return String(result.timeMode);
}

function formatDifficulty(value){
    if(value === "easy") return "easy";
    if(value === "medium") return "medium";
    if(value === "hard") return "hard";
    if(value === "pro") return "pro";
    return value;
}

function formatElapsedTime(totalSeconds){
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Universāls paziņojuma logs
function showNotification({ tone = "info", title, message }){
    notificationOverlay.dataset.tone = tone;
    notificationBadge.innerText = tone === "success" ? "Finished" : tone === "warning" ? "Warning" : "Notice";
    notificationTitle.innerText = title;
    notificationMessage.innerText = message;
    notificationOverlay.hidden = false;
    notificationClose.focus();
}

function hideNotification(){
    notificationOverlay.hidden = true;
}

// Aizsardzība pret HTML
function escapeHTML(c){
    if(c === "<") return "&lt;";
    if(c === ">") return "&gt;";
    if(c === "&") return "&amp;";
    if(c === "\n") return "<br>";
    if(c === " ") return "&nbsp;";
    return c;
}

renderCodeArea();
renderResults();
syncModeFields();
