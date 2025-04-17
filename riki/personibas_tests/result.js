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