const mbti = localStorage.getItem("mbti");
const mbtiType = document.getElementById("mbti-tipe");
const mbtiDescription = document.getElementById("mbti-description");

mbtiType.textContent = mbti ?? "Nav rezultāta";

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

if (mbti && description[mbti]) {
    mbtiDescription.textContent = description[mbti];
} else {
    mbtiDescription.textContent = "Šim tipam vēl nav apraksta.";
}