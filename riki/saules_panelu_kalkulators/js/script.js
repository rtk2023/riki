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
            option.textContent = `${country.name.common} (${country.cca2})`; // izvada valsts 
            comboBoxCountryCode.appendChild(option);
        });
    }).catch(error => console.error('Error fetching country codes:', error));



// Funkcija, kas pārbauda datus pirms aprēķina veikšanas
export async function formasParbaude() { 
    console.log("button clicked");
    // geo dati
    let pastaIndeks = document.getElementById('zip').value;
    let valstsKodaVertiba = document.getElementById('countryCodes').value;
    let valstsKods = valstsKodaVertiba.substring(valstsKodaVertiba.length-3, valstsKodaVertiba.length); // tikai 2 burtu kodu
    //const indxParbaude = await pastaInxParbaude(pastaIndeks, valstsKods);
    // Pasta koda saderības pārbaudīšana
    //if (!indxParbaude) { 
    //    alert('Kļūme! Pasta indeks neatbilst/nesakrīt ar valsts kodu.'); 
    //    return;
    //}
    
    const {lat, lon} = await geoDati(pastaIndeks, valstsKods);
    // geo API dat parbaude
    if (!lat ) {
        alert('Kļūme atlasot datus (platums = 0)'); 
        return;
    }
    else if (!lon) {
        alert('Kļūme atlasot datus (augstums = 0)'); 
        return;
    }
    let puslode = zemesPuslode(lat);

    // finanšu dati
    let menesaRekins = document.getElementById('monthly-cost').value; 
    let menesaPaterins = document.getElementById('monthly-usage').value; 

    // paneļu dati
    let paneluLaukums = document.getElementById('mounting-area').value;
    let saulesPanelaJauda = document.getElementById('power').value; 
    //let inventoraEfekt = document.getElementById('...').value; // Pēc inventora?

    //else {
        
        //laikapstakluDati(puslode); // geo datu iegūšana
    //}
    
    //aprekins(zemesPuslode);
    
    // laikapstakluDati()

    // if () ... else ---> Ja visi dati ir pareizi ievadīti, tad un tikai tad veic datu aprēķināšanu
    //if (...) { alert('...'); return;}
    // document.getElementById('...').value
}

window.formasParbaude = formasParbaude; // padara funkciju globāli pieejamu

// Funkcija, kas pārbauda pasta koda saderību ar valsts kodu.
async function pastaInxParbaude(pastaIndeks, valstsIndeks) {
    try {
        console.log("checking zip");
        const response = await fetch(`https://api.zipcodestack.com/v1/search?codes=${pastaIndeks.toString()}&country=${valstsIndeks}&apikey=${zK}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parbaudesDati = await response.json();

        return (parbaudesDati.results && Object.keys(parbaudesDati.results).length > 0) ? parbaudesDati.results : null;
    }
    catch (error) {
        console.error('Error fetching post index and country code data:', error);
        return 0;
    }
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
            console.log('fetched lat: ', lat, ' lon: ', lon); // console.log
            return { lat, lon };
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error fetching geo data:', error);
        return 0
    }
} 

// funkcija, kas nosaga zemes puslodi pēc platuma
function zemesPuslode(lat) {
    if (lat > 0) { // Ziemeļu puslode
        return "Z";
    } else if (lat < 0) { // Dienvidu puslode
        return "D";
    } else {
        return "E"; // platums = 0 ---> Ekvators
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
    constructor(date, cloudPrecent) { // aust, riet => vai varbūt saulesH
        this.date = date;
        this.cloudPrecent = cloudPrecent;
        // ...
    }
}

// funkcija, kas veic saules paneļu 
function aprekins(zemesPuslode) { //dayData
    // mainīgie
    let paneluOrientacija = document.getElementById('orientation').value; 
    let novietojumaLenkis = document.getElementById('angle-display').value; 
    let enojums = document.getElementById('shading').value;// ēnojums (true/false ---> true - % no max saražotās, false - neietekmē max saražoto)

    // par datumiem 

    // Aprekini
    let uztvertaEnergija; // Paneļu laukums * saņemtais saules starojums (?)
    let razotaEnergija; // Uztverta energija * saules paneļu vidējā efektivitāte
    let energijasIzvade; // Jaudas izvade (DC) * inventora efektivitate
    
    //if () {}
    // for

    let kopejaisTeikums = document.getElementById('kopejaisRezultats');
    kopejaisTeikums.innerHTML = '';

    kopejaisTeikums.innerHTML += `Kopējā paneļu saražotā enerģija nākamajās 7 dienās būs aptuveni <em>$ {} kW</em> un aptuvenais ietaupījums <em>$ {} €</em>`;
    // for

    window.location.href = 'result.html';
} 

