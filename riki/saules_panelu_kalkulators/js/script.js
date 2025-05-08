import {wK, zK} from '../data/config.js'; // laikapstākļiem un pasta indeksiem keys

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

function aprekinatButton() { // Funkcija, kas pārbauda datus pirms aprēķina veikšanas
    // geo dati
    let pastaIndeks = document.getElementById('zip').value;
    let valstsIndeks = document.getElementById('countryCodes').value.substring(0, 2); // tikai 2 burtu kodu
    // --- parbaudit vai zip atbilst valstij.
    
    let paneluLaukums = document.getElementById('mounting-area').value; // document.getElementById('author1').value
    
    let saulesPaneluVidejaEfektiv = document.getElementById('...').value; 
    let inventoraEfekt = document.getElementById('...').value; // Pēc inventora


    // API datu parbaude
    const{lat, lon} = geoDati(pastaIndeks, valstsIndeks);
    if (!lat) {
        alert('Kļūme atlasot datus (lat = 0)'); 
        return;
    }
    else if (!lon) {
        alert('Kļūme atlasot datus (lon = 0)'); 
        return;
    }
    else {
        laikapstakluDati();
    }
    
    // laikapstakluDati()

    // if () ... else ---> Ja visi dati ir pareizi ievadīti, tad un tikai tad veic datu aprēķināšanu
    //if (...) { alert('...'); return;}
    // document.getElementById('...').value
}

// funkcija, kas iegūst datus no ģeolokācijas API
async function geoDati(pastaIndeks, valstsIndeks) { 
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${pastaIndeks},${valstsIndeks}&appid=${wK}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const geoData = await response.json();

        if (geoData && geoData.lat && geoData.lon) {
            const lat = geoData.lat;
            const lon = geoData.lon;
            console.log('fetched lat: ', lat, ' lon: ', lon); // test only
            return { lat, lon };
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error fetching geo data:', error);
    }
} 

// funkcija, kas iegūst datus no laikapstaklu API
async function laikapstakluDati() {
    let sanemtaisSaulesStarojums; 
    const dayData = [];
    try { // --------------------- Japamaina links!!!!!!!!!!!!!!!
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${pastaIndeks},${valstsIndeks}&appid=${wK}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const weatherData = await response.json();
        // current, daily, hourly ???

        for (var i = 0; i < 7; i++) { // šai un nākamajām 6 dienām
            if (weatherData) {
                
                // cloudPrecent, sunRise, sunSet, 
                dayData[i] = new theDay(date, weatherData.cloud);
            }
        }
        // datumiiem (toISOString().substring(0, 10)) yyyy-mm-dd
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// SAULES PANEĻU APRĒĶINU VEIKŠANA
class theDay {
    constructor(date, cloudPrecent) {
      this.date = date;
      this.cloudPrecent = cloudPrecent;
      // ...
    }
}

// funkcija, kas veic saules paneļu 
function aprekins(dayData) { 
    // mainīgie
    let paneluOrientacija = document.getElementById('orientation').value; 
    let novietojumaLenkis = document.getElementById('angle-display').value; 


    // Aprekini
    let uztvertaEnergija; // Paneļu laukums * saņemtais saules starojums (?)
    let razotaEnergija; // Uztverta energija * saules paneļu vidējā efektivitāte
    let energijasIzvade; // Jaudas izvade (DC) * inventora efektivitate
    
    // ēnojums (pa tiešo dabūt - true/false ---> true - % no max saražotās, false - neietekmē max saražoto)
    let enojums = document.getElementById('shading').value;

    //window.location.href = 'result.html';
} 

// function rezultaataAttelosana() { window.location.href = 'result.html';} // ???