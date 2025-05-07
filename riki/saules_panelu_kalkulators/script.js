// Valstu kodu datu iegūšana prieks <select> (vajaddzīgs priekš geo datu iegūšanas)

fetch('https://restcountries.com/v3.1/all?fields=name,cca2')// country code saraksts no REST Countries API priekš combo box
    .then(resp => resp.json())
    .then(data => {
        data.sort((a, b) => a.name.common.localeCompare(b.name.common)); // sakārto pēc valsts nosaukuma
        const comboBoxCountryCode = document.getElementById('countryCodes');
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.cca2;
            option.textContent = `${country.cca2} (${country.name.common})`; // izvada valsts 
            comboBoxCountryCode.appendChild(option);
        });
    }).catch(error => console.error('Error fetching country codes:', error));


// Weather API datu iegūšana

const apiKey = "5750c52c68367e07812638ccaf6fe22d"; // API atslēga priekš OpenWeather

function aprekinatButton() { // Funkcija, kas pārbauda datus pirms aprēķina veikšanas
    
    // document.getElementById('...').value
    let paneluLaukums; // document.getElementById('author1').value
    let atrasanasVieta;
    let saulesPaneluVidejaEfektiv; 
    let inventoraEfekt; // Pēc inventora

    // if () ... else ---> Ja visi dati ir pareizi ievadīti, tad un tikai tad veic datu aprēķināšanu
    //if (...) { alert('...'); return;}
    
}

// funkcija, kas iegūst datus no ģeolokācijas API
async function geoDati() { 
    try {
        let lon = await fetch(`...`) // nav api pielikts
        .then(resp => resp.json());
        let len = await fetch(`...`) // nav api pielikts
        .then(resp => resp.json());
    }
    catch (error) {
        console.error('Error fetching geo data:', error);
    }
} 

// funkcija, kas iegūst datus no laikapstaklu API
async function laikapstakluDati() { 
    try {
        let longiyufe = await fetch(``) // nav api pielikts
        .then(resp => resp.json());
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
    }
    let sanemtaisSaulesStarojums;
}

// SAULES PANEĻU APRĒĶINU VEIKŠANA

// funkcija, kas veic saules paneļu 
function aprekins() { 
    let uztvertaEnergija; // Paneļu laukums * saņemtais saules starojums (?)
    let razotaEnergija; // Uztverta energija * saules paneļu vidējā efektivitāte
    let energijasIzvade; // Jaudas izvade (DC) * inventora efektivitate
    
    // ēnojums (pa tiešo dabūt - true/false ---> true - % no max saražotās, false - neietekmē max saražoto)
    let enojums = document.getElementById('shading').value;
} 