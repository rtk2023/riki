const map = L.map('map', {
    center: [56.95, 24.1],
    zoom: 12,
    attributionControl: false
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

let routeLayer;
document.getElementById("year").textContent = new Date().getFullYear();

// Convert address to coordinates using Nominatim API
async function geocode(address) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.length > 0) {
        return {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
            display_name: data[0].display_name
        };
    } else {
        throw new Error(`Adrese nav atrasta: ${address}`);
    }
}

// Simulated traffic multiplier function
// This function simulates traffic conditions based on the time of day and day of the week
function getSimulatedTrafficMultiplier(date) {
    const hour = date.getHours();
    const day = date.getDay();
    let multiplier = 1.0;

    if ((hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 18)) {
        multiplier = 1.2; // Rush hour
    } else if (hour >= 10 && hour <= 15) {
        multiplier = 1.1; // Moderate traffic
    } else {
        multiplier = 1.0; // Low traffic
    }

    if (day === 0 || day === 6) {
        multiplier -= 0.1;
    }

    return Math.max(multiplier, 1.0);
}

// This function converts seconds to a formatted time string (hh:mm:ss or mm:ss or ss)
function convertSecondstoTime(sec) {
    dateObj = new Date(sec * 1000);
    hours = dateObj.getUTCHours();
    minutes = dateObj.getUTCMinutes();
    seconds = dateObj.getSeconds();

    if (hours === 0 && minutes !== 0) {
        timeString = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') + ' min';
    } else if (hours === 0 && minutes === 0 && seconds !== 0) {
        timeString = seconds.toString().padStart(2, '0') + ' sec';
    }else {
        timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') + ' h';
    }
    
    return timeString;
}

// Route distance, fuel consumption, and time calculation
async function calculateRoute() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const cityFuel = parseFloat(document.getElementById('cityFuel').value);
    const highwayFuel = parseFloat(document.getElementById('highwayFuel').value);
    const infoDiv = document.getElementById('info');

    if (!from || !to || isNaN(cityFuel) || isNaN(highwayFuel)) {
        alert('Lūdzu, aizpildiet visus ievades laukus!');
        return;
    }

    // show loading spinner
    const loadingSpinner = document.getElementById('loading');
    loadingSpinner.style.display = 'block';
    infoDiv.classList.remove("show");

    const selectedDate = new Date();
    const trafficMultiplier = getSimulatedTrafficMultiplier(selectedDate);

    try {
        const [fromCoord, toCoord] = await Promise.all([
            geocode(from),
            geocode(to)
        ]);

        document.getElementById("from").value = fromCoord.display_name;
        document.getElementById("to").value = toCoord.display_name;

        const body = {
            locations: [
                { lat: fromCoord.lat, lon: fromCoord.lon },
                { lat: toCoord.lat, lon: toCoord.lon }
            ],
            costing: "auto",
            directions_options: { units: "kilometers" },
            costing_options: {
                auto: { use_toll_roads: 0.5, use_highways: 1 }
            }
        };

        let routeData;

        try {
            const valhallaRes = await fetch("https://valhalla1.openstreetmap.de/route", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
        
            if (!valhallaRes.ok) {
                const errorData = await valhallaRes.json();
        
                if (errorData.error_code === 154) {
                    alert("Maršruts ir pārāk garš! Maksimālais pieļaujamais attālums ir 1500 km.");
                } else {
                    alert(`Kļūda no maršruta servera: ${errorData.error || "Nezināma kļūda"}`);
                }
                return;
            }
        
            routeData = await valhallaRes.json();
        
        } catch (err) {
            alert("Neizdevās izveidot savienojumu ar maršruta serveri.");
            console.error("Fetch error:", err);
        }

        const distance = routeData.trip.summary.length;
        const shape = routeData.trip.legs[0].shape;
        const time = routeData.trip.summary.time;
        const latlngs = decodePolyline(shape);

        if (routeLayer) {
            map.removeLayer(routeLayer);
        }

        const highwayRegex = /\b([AEM])\s?\d+\b/i;
        routeLayer = L.layerGroup().addTo(map);
        let highwayDistance = 0;
        let cityDistance = 0;
        let shapeIndex = 0;
        
        routeData.trip.legs[0].maneuvers.forEach(m => {
            const street_names = m.street_names || [];
            const dist = m.length;

            const proportion = dist / distance;
            const pointCount = Math.max(2, Math.round(proportion * latlngs.length));
            const segmentLatLngs = latlngs.slice(shapeIndex, shapeIndex + pointCount);
            shapeIndex += pointCount - 1;

            const highway = street_names.some(name => highwayRegex.test(name));
            const color = highway ? 'crimson' : 'blueviolet';

            L.polyline(segmentLatLngs, { color, weight: 5 }).addTo(routeLayer);

            if (highway) {
                highwayDistance += dist;
            } else {
                cityDistance += dist;
            }
        });

        // Fallback to 50/50 split if both distances are zero
        if (cityDistance + highwayDistance === 0) {
            cityDistance = distance / 2;
            highwayDistance = distance / 2;
        }

        const adjustedCityFuel = cityFuel * trafficMultiplier;
        const highwayFuelUsed = (highwayDistance * highwayFuel) / 100;
        const cityFuelUsed = (cityDistance * adjustedCityFuel) / 100;
        const totalFuelUsed = cityFuelUsed + highwayFuelUsed;

        infoDiv.innerHTML = `
            <p class="res"><strong class="resLbl">Distance:</strong> ${distance.toFixed(2)} km</p>
            <p class="res"><strong class="resLbl">Aptuvenais laiks:</strong> ${convertSecondstoTime(time)}</p>
            <p class="res"><strong class="resLbl">Aptuvenais patēriņš:</strong> ${totalFuelUsed.toFixed(2)} L</p>
            <p class="city"><em><strong>Pilsēta:</strong> ${cityFuelUsed.toFixed(2)} L × ${trafficMultiplier.toFixed(2)} satiksmes ietekme</em></p>
            <p class="highway"><em><strong>Uz šosejas:</strong> ${highwayFuelUsed.toFixed(2)} L</em></p>
        `;
        infoDiv.classList.add("show");

        const bounds = L.latLngBounds(latlngs);
        map.fitBounds(bounds, { padding: [50, 50] });
        document.getElementById('centerOnRoute').style.display = 'block';
        window.lastRouteBounds = bounds;
    } catch (err) {
        console.error(err);
        alert(err.message);
    } finally {
        // hide loading spinner
        loadingSpinner.style.display = 'none';
    }
}

// Center on route
function centerOnRoute() {
    if (window.lastRouteBounds) {
        map.fitBounds(window.lastRouteBounds, { padding: [50, 50] });
    }
}

// Decode polyline function
function decodePolyline(encoded) {
    let coords = [], index = 0, lat = 0, lng = 0;
    while (index < encoded.length) {
        let b, shift = 0, result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += deltaLat;
        shift = 0; result = 0;
        do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
        } while (b >= 0x20);
        let deltaLng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += deltaLng;
        coords.push([lat / 1e6, lng / 1e6]);
    }
    return coords;
}