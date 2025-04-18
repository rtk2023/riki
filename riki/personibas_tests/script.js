// Jautājumu masīvs, kurā ir visi testi un atbilžu opcijas
const questions = [
    {
        text: "Tu jūties enerģiskāks, kad esi...", // Jautājuma teksts
        answer: [
            {text: "Starp cilvēkiem", value: "E"},
            {text: "Mazā kompānijā", value: "E"},
            {text: "Vienatnē", value: "I"},
            {text: "Ar vienu labu draugu", value: "I"}
        ]
    },
    {
        text: "Tu vairāk uzticies...",
        answer: [
            { text: "Faktiem un pierādījumiem", value: "S" },
            { text: "Reālām situācijām", value: "S"},
            { text: "Intuīcijai", value: "N"},
            { text: "Iedvesmai un sajūtām", value: "N"}
        ]
    },
    {
        text: "Pieņemot lēmumu, tu balsties uz...",
        answer: [
            { text: "Loģisku un objektivitāti", value: "T" },
            { text: "Taisnīgumu", value: "T" },
            { text: "Empātiju", value: "F" },
            { text: "Attiecībām ar cilvēkiem", value: "F"}
        ]
    },
    {
        text: "Tu plāno savu dienu...",
        answer: [
            { text: "Iepriekš", value: "J" },
            { text: "Ar sarakstu un kārtību", value: "J" },
            { text: "Spontāni", value: "P" },
            { text: "Pēc noskaņojuma", value: "P" }
        ]
    },
    {
        text: "Tu labprātāk...",
        answer: [
            { text: "Runā ar cilvēkiem", value: "E"},
            { text: "Uzstājas grupas priekšā", value: "E" },
            { text: "Klausies citu stāstus", value: "I" },
            { text: "Domā savā galvā", value: "I" }
        ]
    },
    {
        text: "Kad mācies, tu labāk saproti...",
        answer: [
            { text: "Caur praktiskiem piemēriem", value: "S" },
            { text: "Caur pieredzi", value: "S" },
            { text: "Caur idejām un teorijām", value: "N" },
            { text: "Caur simboliem un iespējām", value: "N" }
        ]
    },
    {
        text: "Tavas attiecības ar citiem bieži veidojas, jo tu...",
        answer: [
            { text: "Izsaki viedokli tieši", value: "T" },
            { text: "Aizstāvi taisnību", value: "T" },
            { text: "Pielāgojies, lai neradītu konfliktus", value: "F" },
            { text: "Rūpējies par citu jūtām", value: "F" }
        ]
    },
    {
        text: "Tavas darba metodes parasti ir...",
        answer: [
            { text: "Organizētas un plānveida", value: "J" },
            { text: "Sistemātiskas", value: "J" },
            { text: "Elastīgas", value: "P" },
            { text: "Radošas un mainīgas", value: "P" }
        ]
    },
    {
        text: "Brīvdienās tu izvēlies...",
        answer: [
            { text: "Tikties ar daudziem draugiem", value: "E" },
            { text: "Doties uz pasākumiem", value: "E" },
            { text: "Palikt mājās", value: "I" },
            { text: "Izvēlēties klusu vietu atpūtai", value: "I" }
        ]
    },
    {
        text: "Kad tev uzrodas jauns uzdevums, tu parasti...",
        answer: [
            { text: "Izveido skaidru plānu un rīkojies pēc tā", value: "J" },
            { text: "Uzreiz ķeries pie darba, lai pabeigtu pēc iespējas ātrāk", value: "J" },
            { text: "Sāc ar visvienkāršāko un improvizē pa ceļam", value: "P" },
            { text: "Domā ilgāk un dari, kad jūties gatavs", value: "P" }
        ]
    }
];

// Sākotnējie mainīgie
let currentQuestion = 0; // Aktuālā jautājuma indekss
let result = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }; // MBTI rezultāti
let selectedAnswer = []; // Saglabāto atbilžu masīvs

// Iegūst elementus no HTML
const questionText = document.getElementById("question-text"); // Jautājuma teksts
const answerDiv = document.getElementById("answer"); // Atbilžu bloks
const nextBtn = document.getElementById("next-btn"); // Poga "Turpināt"

// Funkcija, kas attēlo jautājumu un atbildes
function showQuestion(index) {
    const question = questions[index];
    questionText.textContent = question.text; // Iestata jautājuma tekstu

    answerDiv.innerHTML = ""; // Iztīra iepriekšējās atbildes

    // Pievieno radio pogas un atbilžu tekstus
    question.answer.forEach((answer, i) => {
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.id = `option${i}`;
        input.value = answer.value;

        const label = document.createElement("label");
        label.htmlFor = `option${i}`;
        label.textContent = answer.text;

        answerDiv.appendChild(input);
        answerDiv.appendChild(label);
        answerDiv.appendChild(document.createElement("br"));
    });

    // progressbar
    const progressBar = document.getElementById("progress-bar");
    const percent = Math.round((index + 1) / questions.length * 100);
    progressBar.style.width = percent + "%";
}

// Poga "Turpināt" nospiešanas funkcija
nextBtn.addEventListener("click", () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert("Lūdzu, izvēlies atbildi!"); // Ja nav izvēlēta atbilde, parādās brīdinājums
        return;
    }

    result[selected.value]++; // Palielina rezultātu atbilstoši izvēlētajai atbildei

    // Saglabā izvēlēto atbildi un jautājumu
    const label = document.querySelector(`label[for="${selected.id}"]`);
    const questionTextFull = questions[currentQuestion].text;
    selectedAnswer.push(`${questionTextFull} → ${label.textContent}`);

    currentQuestion++; // Pāriet uz nākamo jautājumu
    if (currentQuestion < questions.length) {
        animateQuestion(currentQuestion); // Ja ir vēl jautājumi, attēlo nākamo
    } else {
        // Ja jautājumi beigušies, aprēķina MBTI un saglabā datus
        const mbti = getMBTI();
        localStorage.setItem("mbti", mbti);
        localStorage.setItem("answer", JSON.stringify(selectedAnswer));
        window.location.href = "result.html"; // Pāriet uz rezultātu lapu
    }
});

// Funkcija, kas aprēķina MBTI rezultātu
function getMBTI() {
    return (result.E > result.I ? "E" : "I") + // Salīdzina, kura vērtība ir lielāka
           (result.S > result.N ? "S" : "N") +
           (result.T > result.F ? "T" : "F") +
           (result.J > result.P ? "J" : "P");
}

// Sākotnēji attēlo pirmo jautājumu
showQuestion(currentQuestion);

function animateQuestion(index) {
    const container = document.getElementById("question-container");

    //Noņemiet veco jautājumu, izmantojot fadeOut
    container.classList.remove("fade-in");
    container.classList.add("fade-out");

    //Pagaidīsim, līdz animācija beigsies (300 ms), pēc tam parādīsim jaunu jautājumu
    setTimeout(() => {
        showQuestion(index);
        container.classList.remove("fade-out");
        container.classList.add("fade-in");
    }, 300);
}