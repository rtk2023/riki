// Iegūst MBTI tipu no localStorage
const mbti = localStorage.getItem("mbti");

// Atrod HTML elementus, kuros ievietos tipu un aprakstu
const mbtiType = document.getElementById("mbti-type");
const mbtiDescription = document.getElementById("mbti-description");

// Ja ir rezultāts, parāda to, citādi - parāda tekstu, ka nav rezultāta
mbtiType.textContent = mbti ?? "Nav rezultāta";

// MBTI apraksti
const description = {
    "INTJ": "Izdomas bagāti un stratēģiski domātāji, ar plānu visām situācijām.",
    "INTP": "Inovatīvi izgudrotāji ar neremdināmām zināšanu slāpēm.",
    "ENTJ": "Drosmīgi un izdomas bagāti vadītāji ar stingru gribu, kuri vienmēr atrod risinājumu – vai arī to rada.",
    "ENTP": "Gudri un zinātkāri domātāji, kuri nespēj pretoties intelektuālajam izaicinājumam.",
    "INFJ": "Klusi un noslēpumaini, tomēr ļoti iedvesmojoši un nenogurstoši ideālisti.",
    "INFP": "Poētiski, laipni un altruistiski cilvēki, vienmēr gatavi palīdzēt laba mērķa sasniegšanā.",
    "ENFJ": "Harizmātiski un iedvesmojoši vadītāji, kas spēj hipnotizēt savus klausītājus.",
    "ENFP": "Entuziastiski, radoši un sabiedriski brīvdomātāji, kuri vienmēr var atrast iemeslu smaidīt.",
    "ISTJ": "Praktiski cilvēki ar domāšanu, kas balstīta uz faktiem, par kuru uzticamību nevar šaubīties.",
    "ISFJ": "Ļoti uzticīgi un sirsnīgi aizsargi, vienmēr gatavi aizstāvēt savus mīļos.",
    "ESTJ": "Lieliski administratori, nepārspējami lietu vai cilvēku pārvaldībā.",
    "ESFJ": "Ārkārtīgi gādīgi, sabiedriski un populāri cilvēki, kuri vienmēr vēlas palīdzēt.",
    "ISTP": "Drosmīgi un praktiski eksperimentētāji, prot rīkoties ar visu veidu instrumentiem.",
    "ISFP": "Elastīgi un apburoši mākslinieki, kuri ir vienmēr gatavi izpētīt un piedzīvot ko jaunu.",
    "ESTP": "Gudri un enerģiski cilvēki ar asu uztveri, kuriem patiesi patīk dzīvot uz naža asmens.",
    "ESFP": "Spontāni, enerģiski un entuziasma pilni cilvēki – dzīve ap viņiem nekad nav garlai",
};

// Ja MBTI tips eksistē un ir apraksts, parāda to
if (mbti && description[mbti]) {
    mbtiDescription.textContent = description[mbti];
} else {
    // Ja nav apraksta šim tipam
    mbtiDescription.textContent = "Šim tipam vēl nav apraksta.";
}

// Iegūst izvēlētās atbildes no localStorage un parsē kā masīvu
const answer = JSON.parse(localStorage.getItem("answer"));
console.log("Atbildes no localStorage:", answer);

// Atrod HTML elementu, kur rādīt atbildes
const answerList = document.getElementById("answer-list");

// Ja ir atbildes, tās izvada sarakstā
if (answer && answer.length > 0) {
    answer.forEach((answer) => {
        const li = document.createElement("li"); // Izveido saraksta elementu
        li.className = "list-group-item"; // Bootstrap klase sarakstam
        li.textContent = answer; // Piešķir tekstu
        answerList.appendChild(li); // Pievieno sarakstam
    });
} else {
    // Ja nav nevienas atbildes, parāda atbilstošu paziņojumu
    const li = document.createElement("li");
    li.className = "list-group-item text-muted";
    li.textContent = "Nav izvēlētu atbilžu.";
    answerList.appendChild(li);
}

// attēli
const imageElement = document.getElementById("mbti-image");

// Saites uz katra veida attēliem
const imageLinks = {
    "INFJ": "https://i.pinimg.com/736x/67/c1/56/67c156a525b20150f874f02e1384c216.jpg",
    "INTP": "https://i.pinimg.com/736x/5f/48/40/5f484065f0e0b69448e437fba7c1a6e0.jpg",
    "INTJ": "https://i.pinimg.com/736x/6e/8f/47/6e8f47aae4f96fc81af2c1f5b8407839.jpg",
    "ENTP": "https://i.pinimg.com/736x/01/a6/2c/01a62cf71334748e9a5cea86218d2d66.jpg",
    "ENTJ": "https://i.pinimg.com/736x/40/86/25/408625df2bb3d7f77a92ceb0141ce99d.jpg",
    "INFP": "https://i.pinimg.com/736x/0e/d1/7f/0ed17f5bdfcb99b121588b247b052d00.jpg",
    "ENFJ": "https://i.pinimg.com/736x/bd/f2/bc/bdf2bc61cdc576e54fb12d7dfa32aa62.jpg",
    "ENFP": "https://i.pinimg.com/736x/70/a3/f7/70a3f7f606c0e5f6a4dd682049de744a.jpg",
    "ISTJ": "https://i.pinimg.com/736x/02/56/25/02562571487907fc19c70344c9b4756a.jpg",
    "ISFJ": "https://i.pinimg.com/736x/07/f9/b0/07f9b09df5625390c071502ce01c660a.jpg",
    "ESTJ": "https://i.pinimg.com/736x/76/69/64/7669647436a4eb05564ba74efccafd0f.jpg",
    "ESFJ": "https://i.pinimg.com/736x/bd/a1/8c/bda18ce2817b3d684aa049c56c145afd.jpg",
    "ISTP": "https://i.pinimg.com/736x/90/d2/49/90d24930c4587b3c719ad156114fe560.jpg",
    "ISFP": "https://i.pinimg.com/736x/1b/64/e7/1b64e7cddde53dd6960b89f21749d668.jpg",
    "ESTP": "https://i.pinimg.com/736x/f9/10/58/f9105859b9b8335c8bbef28ce6c1226a.jpg",
    "ESFP": "https://i.pinimg.com/736x/d6/46/76/d6467669428b3e22459c55825ae90b15.jpg",
};

//Mēs instalējam attēlu ar saiti, ja tāds ir
if (mbti && imageLinks[mbti]) {
    imageElement.src = imageLinks[mbti];
}else {
    imageElement.style.display = "none"; // paslēpt, ja nav attēla
}