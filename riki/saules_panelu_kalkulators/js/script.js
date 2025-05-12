import {wK, zK} from '../data/config.js'; // laikapstākļiem un pasta indeksiem keys

// Valstu kodu datu iegūšana prieks <select> (vajadzīgs priekš geo datu iegūšanas)
window.onload = function() {
    if (document.getElementById('theMain')) {
        fetch('https://restcountries.com/v3.1/all?fields=name,cca2')// country code saraksts no REST Countries API priekš combo box
        .then(resp => resp.json())
        .then(data => {
            data.sort((a, b) => a.name.common.localeCompare(b.name.common)); // sakārto pēc valsts nosaukuma
            const comboBoxCountryCode = document.getElementById('countryCodes');
            data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.cca2;
            option.textContent = `${country.name.common}`; // izvada valsts 
            comboBoxCountryCode.appendChild(option);
        });
    }).catch(error => console.error('Error fetching country codes:', error));
    }
};

// Nākamo 7 dienu dat saglabāšanai.
let dayData = []; // date - 0, sunrise - 1, sunset - 2, clouds - 3

// Funkcija, kas pārbauda datus pirms aprēķina veikšanas
export async function formasParbaude() { 
    try {
        console.log("button clicked");
        // GEO DATI
        let pastaIndeks = document.getElementById('zip').value;
        let valstsKods = document.getElementById('countryCodes').value;
        if (!pastaIndeks || !valstsKods) {
            alert('Jābūt aizpildītiem gan pasta indeksam, gan valsts kodam .'); 
            return;
        }
        /* 
        // Pasta koda saderības pārbaudīšana
        const indxParbaude = await pastaInxParbaude(pastaIndeks, valstsKods);
        nullValueCheck(indxParbaude, 'Pasta indeks neatbilst/nesakrīt ar valsts kodu.')
        if (!indxParbaude) { 
            alert('Pasta indeks neatbilst/nesakrīt ar valsts kodu.'); 
            return;
        }*/
        
        // geo API datu parbaude
        const {lat, lon} = await geoDati(pastaIndeks, valstsKods);
        if (!lat || !lon) {
            console.log('lat or lon is 0'); 
            return;
        }

        // Datumi un laikapstākļi
        const {todayDate, day7Date} = datumi();
        const weatherAPI = await laikapstakluDati(lat, lon, todayDate, day7Date);
        if (!weatherAPI) {
            console.log('lat or lon is 0'); 
            return;
        }

        // finanšu dati
        let Ec = document.getElementById('Ec').value; 
        let menesaRekins = document.getElementById('monthly-cost').value; 
        if (!Ec || !menesaRekins) {
            alert('Finanšu datu vērtībām jābūt lielākām par 0.'); 
            return;
        } 
        else if (isNaN(Ec) || isNaN(menesaRekins)) {
            alert('Finanšu informācijas sadaļā jāievada tikai skaitļi.'); 
            return;
        }

        // paneļu dati
        let saulesPanelaJauda = document.getElementById('power').value; 
        if (!saulesPanelaJauda) {
            alert('Paneļu jaudas vērtībai jābūt lielākai par 0.'); 
            return;
        } 
        else if (isNaN(saulesPanelaJauda)) {
            alert('Paneļu jaudas vērtībai jāievada tikai skaitļi.'); 
            return;
        }

        let paneluOrientacija = document.getElementById('orientation').value;
        let enojums = document.getElementById('shading').value;

        // Paneļu aprekinasana
        aprekins(saulesPanelaJauda, Ec, paneluOrientacija, enojums, menesaRekins);
    } catch (error) {
        console.error('error in checking data: ', error);
    }
}

window.formasParbaude = formasParbaude; // padara funkciju globāli pieejamu

// funkcija, kas atrod/aprēķina datumus (šodienas un 7. dienas pēc šodienas) un tos noformē
function datumi() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let todayDate = today.toISOString().substring(0, 10);
    
    const day7 = new Date();
    day7.setDate(day7.getDate() + 6);
    day7.setHours(0, 0, 0, 0);
    let day7Date = day7.toISOString().substring(0, 10);

    return {todayDate, day7Date};
}

// Funkcija, kas pārbauda pasta koda saderību ar valsts kodu.
async function pastaInxParbaude(pastaIndeks, valstsIndeks) {
    try {
        console.log("checking zip");
        const response = await fetch(`https://api.zipcodestack.com/v1/search?codes=${pastaIndeks.toString()}&country=${valstsIndeks}&apikey=${zK}`);
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
    try { // https://nominatim.openstreetmap.org/search?postalcode=${zipCode}&country_code=${countryCode}&format=json&limit=1`);
        const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${pastaIndeks}&countrycodes=${valstsIndeks}&format=json&limit=1`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const geoData = await response.json();
        console.log(geoData);

        if (geoData && geoData.length > 0 ) {
            const lat = geoData[0].lat;
            const lon = geoData[0].lon;
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

// funkcija, kas iegūst datus no laikapstaklu API
async function laikapstakluDati(lat, lon, today, future) {
    console.log('STRĀDĀ??');
    try { 
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${today}/${future}?key=${wK}`); // nav api url
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const weatherData = await response.json();
        console.log(weatherData);

        if (weatherData && Array.isArray(weatherData.days)) {
            dayData = weatherData.days.map(item => {
                return [
                    item.datetime,             // Date (YYYY-MM-DD)
                    item.sunrise,             // Sunrise (HH:MM:SS)
                    item.sunset,               // Sunset (HH:MM:SS)
                    item.cloudcover / 100    // Cloudiness (convert to fraction)
                ];
            });
            console.log('weather data gathered', dayData);
            console.log(dayData[0][0] +", "+ dayData[0][1] +", "+dayData[0][2] +", "+dayData[0][3]);
            return 1;
            
        }
        else {
            console.error("Error: Expected weatherData.days to be an array, but got:", weatherData);
            return 0; 
        }
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// funkcija, kas veic saules paneļu ietaupījuma, saražotās jaudas un 
function aprekins(panelaJauda, Ec, paneluOrientacija, enojums, menesaRekins) {    
    // mainīgie
    let E = enojums ? 0.75 : 1;
    let dayPaterins = menesaRekins/Ec/30;

    // Aprēķinu darbības
    let weekP = 0; // Nedēļas kopējā saražotā jauda
    let weekIetaup = 0; // Nedēļas kopējais ietaupījums
    let weekSEP = 0; // Nedēļas kopējais patēriņš
    let dienuDati = [];
    for (var i = 0; i < 7; i++) {
        // Dienai
        let maxP = (timeToValue(dayData[i][2]) - timeToValue(dayData[i][1])) * paneluOrientacija * panelaJauda; 
        let cloudP = maxP * dayData[i][3] * 0.2;
        let shadeP = maxP * (1 - dayData[i][3]) * E; 
        //if (dayP>=panelaJauda) {}
        let dayP = cloudP + shadeP;
        let dayIetaup = dayP * Ec;
        let SEP = (dayP - dayPaterins < 0 ? 0.00 : dayP - dayPaterins); // SEP - Saražotās enerģijas pārpalikums
        
        // Nedēļai
        weekP += dayP;
        weekIetaup += dayIetaup;
        weekSEP += SEP;
        
        // Dienas datu apkopošana  (datums, saraž, ietaup, SEP)
        dayP = dayP.toFixed(2);
        dayIetaup = dayIetaup.toFixed(2);
        SEP = SEP.toFixed(2);
        dienuDati[i] = `<tr><th scope="row">${dateFormat(dayData[i][0])}</th><td>${dayP}</td><td>${dayIetaup}</td><td>${SEP}</td></tr>`;
    }

    weekP = weekP.toFixed(2);
    weekIetaup = weekIetaup.toFixed(2);
    weekSEP = weekSEP.toFixed(2);

    sessionStorage.setItem('weekP', weekP);
    sessionStorage.setItem('weekIetaup', weekIetaup);
    sessionStorage.setItem('weekSEP', weekSEP);
    sessionStorage.setItem('dienuDati', JSON.stringify(dienuDati));
    window.location.href = 'result.html'; // Atver rezultatu lapu
}

// Funkcija datuma noformēšanai
function dateFormat(date) {
    let parts = date.split('-');
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

// Funkcija stundu noformēšanai
function timeToValue(time) {
    let timeValue = time.split(':');
    let h = parseInt(timeValue[0], 10);
    let minuH = parseInt(timeValue[1], 10) / 60;
    let secH = parseInt(timeValue[2], 10) / 3600;
    return h + minuH + secH;
}