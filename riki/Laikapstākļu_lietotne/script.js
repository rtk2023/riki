document.addEventListener("DOMContentLoaded", () => {
  const APIKey = "369dc84bc5ad66ddec133018a36e29a1";
  const input = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search-btn");
  const cityList = document.querySelector(".city-list");
  const themeToggle = document.querySelector(".theme-toggle");

  let cities = JSON.parse(localStorage.getItem("cities")) || [];

  // Iestata pašreizējo tēmu no localStorage
  const currentTheme = localStorage.getItem("theme") || "light";
  if (currentTheme === "dark") document.body.classList.add("dark");
  themeToggle.textContent = currentTheme === "dark" ? "☀️" : "🌙";

  // Tēmas pārslēgšana (gaišā / tumšā)
  themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
    const newTheme = document.body.classList.contains("dark")
      ? "dark"
      : "light";
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
  };

  // UNIX laikspiedola pārveidošana uz cilvēkiem saprotamu formātu
  function unixToTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  }

  // Attēlo saglabāto pilsētu sarakstu
  function renderCities() {
    cityList.innerHTML = "";
    cities.forEach((city) => {
      const tag = document.createElement("div");
      tag.className = "city-tag";
      tag.innerHTML = `${city} <span>&times;</span>`;
      // Noņem pilsētu, ja uzklikšķina uz "X"
      tag.querySelector("span").onclick = (e) => {
        e.stopPropagation();
        cities = cities.filter((c) => c !== city);
        localStorage.setItem("cities", JSON.stringify(cities));
        renderCities();
      };
      // Uzklikšķinot uz pilsētas, iegūst laika datus
      tag.onclick = () => fetchWeather(city);
      cityList.appendChild(tag);
    });
  }

  // Iegūst laika apstākļu datus no OpenWeatherMap API
  function fetchWeather(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === "404" || /\d/.test(city))
          return alert("Pilsēta nav atrasta");

        if (!cities.includes(city)) {
          cities.push(city);
          localStorage.setItem("cities", JSON.stringify(cities));
          renderCities();
        }

        // Parāda laika apstākļu blokus
        document.querySelector(".city").style.display = "flex";
        document.querySelector(".temperatures").style.display = "flex";
        document.querySelector(".weather-box").style.display = "block";
        document.querySelector(".temperature-feels-like").style.display = "flex";
        document.querySelector(".weather-details").style.display = "flex";
        document.querySelector(".sunset-sunrise-timezone").style.display = "flex";
        document.querySelector(".forecast-container").style.display = "flex";
        document.getElementById("rain-map").style.display = "block";

        // Aizpilda laika apstākļu informāciju
        document.querySelector(".city span").innerHTML = city;
        document.querySelector(".min-temperature span").innerHTML = `${data.main.temp_min.toFixed(0)}°C`;
        document.querySelector(".max-temperature span").innerHTML = `${data.main.temp_max.toFixed(0)}°C`;
        document.querySelector(".weather-box img").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.querySelector(".temperature").innerHTML = `${Math.round(data.main.temp)}°C`;
        document.querySelector(".description").innerHTML = data.weather[0].description;
        document.querySelector(".feels-like span").innerHTML = `${data.main.feels_like.toFixed(0)}°C`;
        document.querySelector(".humidity span").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind span").innerHTML = `${data.wind.speed} km/h`;
        document.querySelector(".sunrise span").innerHTML = `${unixToTime(data.sys.sunrise)}`;
        document.querySelector(".timezone-hours span").innerHTML =
          data.timezone / 3600 > -1
            ? `${data.timezone / 3600}+`
            : `${data.timezone / 3600}`;
        document.querySelector(".sunset span").innerHTML = `${unixToTime(data.sys.sunset)}`;

        // Saņem prognozi un atjauno karti
        fetchForecast(data.coord.lat, data.coord.lon);
        updateMap(data.coord.lat, data.coord.lon);
      });
  }

  // Iegūst tuvāko stundu prognozi (5 ieraksti)
  function fetchForecast(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const container = document.querySelector(".forecast-container");
        container.innerHTML = "";
        data.list.slice(0, 5).forEach((entry) => {
          const time = new Date(entry.dt_txt).getHours();
          const card = document.createElement("div");
          card.className = "forecast-card";
          card.innerHTML = `
            <div>${time}:00</div>
            <img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}.png">
            <div>${Math.round(entry.main.temp)}°C</div>
            <div>${entry.weather[0].description}</div>
          `;
          container.appendChild(card);
        });
      });
  }

  let leafletMap;

  // Inicializē karti ar Leaflet bibliotēku
  function initMap(lat = 56.9496, lon = 24.1052) {
    leafletMap = L.map("map").setView([lat, lon], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      leafletMap
    );

    const rainLayer = L.tileLayer(
      `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${APIKey}`,
      {
        opacity: 10,
        attribution: "&copy; OpenWeatherMap",
      }
    );
    rainLayer.addTo(leafletMap);
  }

  // Atjauno kartes skatu pēc pilsētas izvēles
  function updateMap(lat, lon) {
    if (leafletMap) {
      leafletMap.setView([lat, lon], 8);
    }
  }

  // Pogas notikums — meklēšanas apstrāde
  searchBtn.onclick = () => {
    const city = input.value.trim();
    if (!city) return;
    fetchWeather(city);
    input.value = "";
  };

  renderCities();
  initMap();
});
