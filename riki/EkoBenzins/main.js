const map = L.map('map').setView([56.95, 24.1], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

let routeLayer;

document.getElementById('customTimeToggle').addEventListener('change', function () {
    document.getElementById('customDateTime').style.display = this.checked ? 'block' : 'none';
});

// Convert address to coordinates using Nominatim API
// This function fetches the latitude and longitude of an address using the Nominatim API
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
    throw new Error(`Address not found: ${address}`);
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

// Route distance, fule consumption and time calculation
async function calculateRoute() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const cityFuel = parseFloat(document.getElementById('cityFuel').value);
    const highwayFuel = parseFloat(document.getElementById('highwayFuel').value);
    const customTimeToggle = document.getElementById('customTimeToggle').checked;
    const customDateTimeInput = document.getElementById('customDateTime').value;
    const infoDiv = document.getElementById('info');

    if (!from || !to || isNaN(cityFuel) || isNaN(highwayFuel)) {
        alert('Please fill all fields correctly.');
        return;
    }

    const selectedDate = customTimeToggle && customDateTimeInput ? new Date(customDateTimeInput) : new Date();
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

        const valhallaRes = await fetch("https://valhalla1.openstreetmap.de/route", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const routeData = await valhallaRes.json();

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
            const color = highway ? 'red' : 'blue';

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
            <p><strong>Distance:</strong> ${distance.toFixed(2)} km</p>
            <p><strong>Estimated Time:</strong> ${(time / 60).toFixed(1)} minutes</p>
            <p><strong>Estimated Fuel:</strong> ${totalFuelUsed.toFixed(2)} L</p>
            <p><em>City: ${cityFuelUsed.toFixed(2)} L @ × ${trafficMultiplier.toFixed(2)} traffic multiplier, Highway: ${highwayFuelUsed.toFixed(2)} L</em></p>
        `;
    } catch (err) {
        console.error(err);
        alert(err.message);
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