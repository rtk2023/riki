function sessionInit() {
    if (localStorage.getItem("BankiDecks") === null) {
        localStorage.setItem("BankiDecks", "{}");
    }
}

function openPage(page) {
    document.getElementById("deck-page").style.display = "none";
    document.getElementById("quizz-area").style.display = "none";
    document.getElementById("deck-editor").style.display = "none";

    if (page) {
        document.getElementById(page).style.display = "grid";
    }
}

function loadCardArea () {
    openPage("deck-page");
    const deck = JSON.parse(localStorage.getItem("BankiDecks"))[sessionStorage.getItem("selectedDeck")];

    document.getElementById("deck-name-page").innerHTML = deck.name;
    document.getElementById("deck-description-page").innerHTML = deck.description;

    loadCardList_area();
}

function loadDeckEditWindow () {
    openPage("deck-editor");
    const deck = JSON.parse(localStorage.getItem("BankiDecks"))[sessionStorage.getItem("selectedDeck")];

    document.getElementById("deck-name-editor").value = deck.name;
    document.getElementById("deck-description-editor").value = deck.description;

    loadCardList_edit();
}

// ------------------------ Deck and card edit ------------------------

function loadDeckList() {
    document.getElementById("deck_list").innerHTML = "";

    if (localStorage.getItem("BankiDecks") === "{}") {
        document.getElementById("deck_list").innerHTML += `
            <div id="error" class="deckListError"> 
                kavu nav :(
            </div>
        `;
        return;
    }

    const data = JSON.parse(localStorage.getItem("BankiDecks"));

    for (let i = 1; i < Object.keys(data).length+1; i++) {
        if (!data[i].name) {
            document.getElementById("deck_list").innerHTML += `
                <button id="deck${i}" class="deckListItem" onclick="deckSelect(${i})"> 
                    <p> ${i} ... </p>
                </button>
            `;
        } else {
            document.getElementById("deck_list").innerHTML += `
                <button id="deck${i}" class="deckListItem" onclick="deckSelect(${i})"> 
                    <p> ${i} ${data[i].name} </p>
                </button>
            `;
        }
    }
}

function loadCardList_area() {
    let data = JSON.parse(localStorage.getItem("BankiDecks"));
    const cards = data[ sessionStorage.getItem("selectedDeck")].cards;

    document.getElementById("card-list-page").innerHTML = "";

    if (cards.length === 0) {
        document.getElementById("card-list-page").innerHTML += `
            <div id="error" class="cardListEmpty"> 
                Kartiņu kava ir tukša
            </div>
        `;
    }

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        document.getElementById("card-list-page").innerHTML += `
            <div class="cardListItem">
                <p class="cardListItemQuestion"> ${card.question} </p>
            </div>
        `;
    }
}

function loadCardList_edit() {
    let data = JSON.parse(localStorage.getItem("BankiDecks"));
    const cards = data[ sessionStorage.getItem("selectedDeck")].cards;

    document.getElementById("card-list-editor").innerHTML = "";

    if (cards.length === 0) {
        document.getElementById("card-list-editor").innerHTML += `
            <div id="error" class="cardListEmpty"> 
                Kartiņu kava ir tukša
            </div>
        `;
    }

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        document.getElementById("card-list-editor").innerHTML += `
            <button class="cardListItem" onclick="cardSelect_edit(${card.id})">
                <div class="cardListItemNum"> <p> ${card.id} </p> </div>
                <p class="cardListItemQuestion"> ${card.question} </p>
            </button>
        `;
    }
}

// ------------------------ Decks ------------------------

function addDeck() {
    let data = JSON.parse(localStorage.getItem("BankiDecks")) || {};
    const newId = Object.keys(data).length+1;

    data[newId] = {
        name: "",
        description: "",
        cards: []
    };

    localStorage.setItem("BankiDecks", JSON.stringify(data));

    sessionStorage.setItem("selectedDeck", newId);
    document.getElementById("field").src = "./HTML/deckEditor.html";

    loadDeckList()
    deckSelect(newId)
}

function deckSelect(deckNum) {
    sessionStorage.setItem("selectedDeck", deckNum);
    loadCardArea();
}

// ------------------------ Cards ------------------------

function addCard() {
    let data = JSON.parse(localStorage.getItem("BankiDecks"));
    const cards = data[ sessionStorage.getItem("selectedDeck")].cards;

    const newID = cards.length + 1;

    cards.push({
        id: newID,
        question: "Q" + newID,
        answer: "A" + newID
    });

    localStorage.setItem("BankiDecks", JSON.stringify(data));
    sessionStorage.setItem("selectedCard", cards.length - 1);

    loadCardList_edit();
    cardSelect_edit(cards.length);
}

function cardSelect_edit(cardNum) {
    document.getElementById("card-editor-form").style.display = "flex";

    sessionStorage.setItem("selectedCard", cardNum);
    const card = JSON.parse(localStorage.getItem("BankiDecks"))[ sessionStorage.getItem("selectedDeck")].cards[cardNum - 1];

    document.getElementById("card_prop_label").innerHTML = "Card " + card.id;
    document.getElementById("card_question").value = card.question;
    document.getElementById("card_answer").value = card.answer;
}

// ------------------------ Deck and card edit ------------------------

function saveDeckDetails() {
    const name = document.getElementById("deck-name-editor").value;
    const description = document.getElementById("deck-description-editor").value;

    let data = JSON.parse(localStorage.getItem("BankiDecks"));

    data[sessionStorage.getItem("selectedDeck")].name = name;
    data[sessionStorage.getItem("selectedDeck")].description = description;

    localStorage.setItem("BankiDecks", JSON.stringify(data));

    loadDeckList();
}

function deleteDeck() {
    if (confirm("Vaidzēst kartiņu kavu?")) {

        let data = JSON.parse(localStorage.getItem("BankiDecks")) || {};
        const deckId = sessionStorage.getItem("selectedDeck");

        (data.hasOwnProperty(deckId));
        delete data[deckId];
        localStorage.setItem("BankiDecks", JSON.stringify(data));

        reindexDecks();
        loadDeckList();
        openPage();
    }
}

function saveCardDetails() {
    const question = document.getElementById("card_question").value;
    const answer = document.getElementById("card_answer").value;

    const data = JSON.parse(localStorage.getItem("BankiDecks"))
    const cards = data[sessionStorage.getItem("selectedDeck")].cards;

    cards[sessionStorage.getItem("selectedCard") - 1].question = question;
    cards[sessionStorage.getItem("selectedCard") - 1].answer = answer;

    localStorage.setItem("BankiDecks", JSON.stringify(data));

    loadCardList_edit();
}

function deleteCard() {
    document.getElementById("card-editor-form").style.display = "none";

    let data = JSON.parse(localStorage.getItem("BankiDecks")) || {};
    
    const deckId = sessionStorage.getItem("selectedDeck");
    const cardId = sessionStorage.getItem("selectedCard");
    const cards = data[deckId].cards;
    cards.splice(cardId - 1, 1);

    localStorage.setItem("BankiDecks", JSON.stringify(data));
    reindexCards();
    
    loadCardList_edit();
    
}

// ------------------------ Reindexing ------------------------

function reindexDecks() {
    let data = JSON.parse(localStorage.getItem("BankiDecks")) || {};
    const newData = {};
    let index = 1;

    for (const key of Object.keys(data).sort((a, b) => a - b)) {
        newData[index] = data[key];
        index++;
    }

    localStorage.setItem("BankiDecks", JSON.stringify(newData));
}

function reindexCards() {
    const deckId = sessionStorage.getItem("selectedDeck");
    if (!deckId) {
        console.error("No deck selected.");
        return;
    }

    let data = JSON.parse(localStorage.getItem("BankiDecks"));
    if (!data || !data[deckId] || !Array.isArray(data[deckId].cards)) {
        console.error("Deck not found or invalid.");
        return;
    }

    let cards = data[deckId].cards;

    // Reindex: set card.id = index + 1
    cards.forEach((card, index) => {
        card.id = index + 1;
    });

    // Save the updated deck back to localStorage
    localStorage.setItem("BankiDecks", JSON.stringify(data));
}


// ------------------------ Quizing ------------------------

function startQuizz() {
    document.getElementById("quizz-area").style.display = "flex";
    document.getElementById("quizz-next-button").style.display = "flex";
    sessionStorage.setItem("quizzCard", 0);
    flipCardBack();

    const cards = JSON.parse(localStorage.getItem("BankiDecks"))[sessionStorage.getItem("selectedDeck")].cards;
    document.getElementById("flashcard-front").innerHTML = cards[0].question;
    document.getElementById("flashcard-back").innerHTML = cards[0].answer;

    if ( sessionStorage.getItem("quizzCard") >= cards.length - 1) {
        document.getElementById("quizz-next-button").style.display = "none";
        return;
    }
}

function closeQuizz() {
    document.getElementById("quizz-area").style.display = "none";
}

function flipCard() {
    document.getElementById("flashcard-inner").style.transform = "rotateY(180deg)";
}

function flipCardBack() {
    document.getElementById("flashcard-inner").style.transform = "rotateY(0deg)";
}

function nextCard() {
    let cardNum = sessionStorage.getItem("quizzCard");
    cardNum++;
    const cards = JSON.parse(localStorage.getItem("BankiDecks"))[sessionStorage.getItem("selectedDeck")].cards;

    flipCardBack();

    document.getElementById("flashcard-front").innerHTML = cards[cardNum].question;
    document.getElementById("flashcard-back").innerHTML = cards[cardNum].answer;

    sessionStorage.setItem("quizzCard", cardNum);

    if (cardNum >= cards.length - 1) {
        document.getElementById("quizz-next-button").style.display = "none";
        return;
    }
}

// ------------------------ Import / Export ------------------------

function importDecks(event) {
    const file = event.target.files[0];
    if (!file) {
        alert("Lūdzu izvēlieties failu!");
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const json = JSON.parse(e.target.result);
            validateDeck(json);
        } catch (err) {
            alert("Nederīga JSON fails!");
        }
    };
    
    reader.readAsText(file);
}

function validateDeck(json) {
    if (typeof json !== "object" || json === null) {
        alert("Nederīga JSON struktūra!");
        return;
    }

    for (const deckId in json) {
        const deck = json[deckId];

        if (!deck.name || typeof deck.name !== "string") {
            alert(`Kava ${deckId} trūkst derīgas 'nosaukums'`);
            return;
        }
        if (!deck.description || typeof deck.description !== "string") {
            alert(`Kavā ${deckId} trūkst derīgas 'apraksts'`);
            return;
        }
        if (!Array.isArray(deck.cards)) {
            alert(`Kavai ${deckId} trūkst derīgas 'kārtis'`);
            return;
        }

        for (let card of deck.cards) {
            if (typeof card.id !== "number") {
                alert(`Kārtij kavā ${deckId} trūkst derīgas 'id'`);
                return;
            }
            if (!card.question || typeof card.question !== "string") {
                alert(`Kārtij kavā ${deckId} trūkst derīgas 'jautājuma'`);
                return;
            }
            if (!card.answer || typeof card.answer !== "string") {
                alert(`Kārtij kavā ${deckId} trūkst derīgas 'atbildes'`);
                return;
            }
        }
    }

    let data = JSON.parse(localStorage.getItem("BankiDecks")) || {};
    let len = Object.keys(data).length;
    
    for (const deckId in json) {
        const newId = (++len).toString();
        data[newId] = json[deckId];
    }
    
    localStorage.setItem("BankiDecks", JSON.stringify(data));

    loadDeckList();
    alert("Kavas sekmīgi importētas!");
}

function exportDecks() {
    if (confirm("Vai tiešām vēlaties eksportēt kavas?")) {
        const decks = localStorage.getItem("BankiDecks");

        if (!decks) {
            alert("Nav kavu ko eksportēt!");
            return;
        }

        const blob = new Blob([decks], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "banki_decks.json";
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

function invokeImport() {
    document.getElementById("deck-import").click();
}