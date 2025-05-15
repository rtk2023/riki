---

# **Valūtu Kalkulators un Vēsture (Bootstrap/jQuery)**

## **Ievads**

Šī lietotne ļauj lietotājiem konvertēt valūtas, pamatojoties uz jaunākajiem valūtu kursiem, un parādīt vēsturiskos valūtu kursus ar diagrammu palīdzību. Tā izmanto **Bootstrap** kā stilu bibliotēku un **jQuery** kā JavaScript bibliotēku, lai vienkāršotu DOM manipulācijas un API pieprasījumus.

---

## **Direktorija Struktūra**

```
tukanstucis-5-prak-tgrants/
├── index.html       # Galvenais HTML fails, kas satur lietotnes struktūru
└── script.js        # JavaScript fails ar funkcionalitāti (valūtu konvertēšana un vēstures datu parādīšana)
```

---

## **1. index.html**

Šis ir galvenais HTML fails, kas satur HTML struktūru, lai lietotāji varētu ievadīt valūtas konvertēšanas datus un apskatīt vēsturiskos kursus.

### **HTML struktūras pārskats**

#### **Galvene (head)**

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valūtu Kalkulators un Vēsture (Bootstrap/jQuery)</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/moment@^2"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-moment@^1"></script>

    <style>
        /* Pielāgotie stili */
        :root {
            --bs-primary-rgb: 13, 110, 253;
            --app-primary-color: #0d6efd;
            --app-body-bg: #f8f9fa;
        }
        body {
            background-color: var(--app-body-bg);
            padding-top: 1rem;
            padding-bottom: 1rem;
        }
        .history-btn-group .btn {
            min-width: 50px;
        }
        #chart-container {
             min-height: 300px;
        }
    </style>
</head>
```

* **`<meta charset="UTF-8">`**: Šī meta taga piešķir lapai rakstzīmju kodējumu, lai atbalstītu dažādas valodas un simbolus, piemēram, latviešu valodas diakritiskos simbolus.

* **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**: Šis meta tags nodrošina, ka lapas izskats ir pielāgots dažādām ierīcēm, izmantojot "responsive design" (piemēram, mobilajiem tālruņiem).

* **`<link>` un `<script>` saites**: Šie ir saites uz ārējām resursiem, piemēram, **Bootstrap** stiliem, **Chart.js** bibliotēku un **moment.js** datu apstrādei (datuma un laika manipulācijām).

#### **Lietotnes saturs (body)**

```html
<body>
    <div class="container">
        <div class="card shadow-sm">
            <div class="card-body p-4 p-md-5">
                <h1 class="text-center mb-4">Valūtu Kalkulators un Vēsture</h1>

                <div class="row g-3 mb-4 align-items-end">
                    <!-- Formu lauki valūtas konvertēšanai -->
                    <div class="col-md">
                        <label for="amount" class="form-label">Summa</label>
                        <input type="number" id="amount" value="1" min="0" step="any" required class="form-control form-control-lg">
                    </div>
                    <div class="col-md">
                        <label for="fromCurrency" class="form-label">No</label>
                        <select id="fromCurrency" aria-label="No valūta" class="form-select form-select-lg">
                        </select>
                    </div>
                    <div class="col-auto">
                        <button type="button" id="swap" aria-label="Apgrozīt valūtas" title="Apgrozīt Valūtas" class="btn btn-secondary btn-lg">
                            ⇆
                        </button>
                    </div>
                    <div class="col-md">
                        <label for="toCurrency" class="form-label">Uz</label>
                        <select id="toCurrency" aria-label="Uz valūta" class="form-select form-select-lg">
                        </select>
                    </div>
                </div>

                <div id="result" class="text-center h4 mb-4 text-success fw-bold min-vh-1">
                </div>
                <div id="message-area" class="text-center mb-4">
                </div>

                <hr class="my-4">
                <div class="history-section">
                    <h2 class="text-center mb-4">Vēsturiskie Kursi</h2>
                    <div class="d-flex justify-content-center mb-3 history-btn-group" role="group" aria-label="History Duration">
                        <!-- Vēstures laika perioda pogas -->
                        <button type="button" data-duration="1m" class="btn btn-outline-primary history-btn">1M</button>
                        <button type="button" data-duration="6m" class="btn btn-outline-primary history-btn">6M</button>
                        <button type="button" data-duration="1y" class="btn btn-outline-primary history-btn">1Y</button>
                        <button type="button" data-duration="5y" class="btn btn-outline-primary history-btn">5Y</button>
                    </div>
                    <div id="chart-container" class="position-relative mb-2">
                        <canvas id="historyChart"></canvas>
                    </div>
                    <div id="chart-message" class="text-center text-muted small min-vh-1">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <script src="script.js"></script>
</body>
```

* Šis HTML fails satur galvenos elementus, kā piemēram, **valūtas konvertēšanas formu**, **vēstures laika perioda izvēli** (pogas), kā arī **Chart.js** diagrammu, kas parāda vēsturiskos kursus.

* **`<div class="container">`**: Šis ir konteineris, kas satur visu lietotnes saturu. Bootstrap nodrošina šo elementu, lai automātiski pielāgotu izskatu dažādām ierīcēm.

* **`<canvas id="historyChart">`**: Šis elements tiek izmantots, lai parādītu **Chart.js** ģenerētu diagrammu ar vēsturiskajiem valūtu kursiem.

---

## **2. script.js**

Šis fails satur JavaScript funkcionalitāti, kas ir atbildīga par valūtas konvertēšanu, vēsturisko datu iegūšanu un diagrammu atjaunošanu.

### **Galvenās funkcijas un to apraksts**

#### **Lietošanas sākšana**

```javascript
$(document).ready(function() {
    initApp();
});
```

Šī funkcija tiek izsaukta, kad viss HTML ir ielādēts. Tā sākotnēji ielādē jaunākos valūtas kursus, izveido nepieciešamos interfeisus un sagatavo lietotni darbībai.

#### **Valūtu kursu ielāde un inicializācija**

```javascript
async function initApp() {
    showLoadingMessage($messageArea, 'Ielādēju jaunākos kursus...');
    try {
        const latestData = await fetchData(LATEST_RATES_API);
        latestRates = {
            ...latestData.rates,
            [latestData.base]: 1
        };
        populateCurrencyOptions(Object.keys(latestRates));
        setDefaultCurrencies();
        setupEventListeners();
        convertCurrency();
        setActiveHistoryButton(currentChartDuration);
        updateHistoryChart();
        showLoadingMessage(\$messageArea, '');
    } catch (error) {
        console.error("Inicializācija neizdevās:", error);
        displayErrorMessage(\$messageArea, `Kļūda: ${error.message}. Lūdzu, mēģiniet atsākt lapu.`);
        disableControls(true);
    }
}
```
Šī funkcija nodrošina valūtas kursu ielādi un veic sākotnējos iestatījumus. Tā pieprasa valūtas datus no ārēja API, kas nodrošina visjaunākos valūtas kursus, ielādē tos, un aizpilda izvēlnes.


#### **Valūtas konvertēšana**


```javascript
function convertCurrency() {
    const amount = parseFloat($amountInput.val());
    const fromCurrency = $fromCurrencySelect.val();
    const toCurrency = $toCurrencySelect.val();

    if (isNaN(amount) || amount <= 0) {
        displayErrorMessage($resultDiv, 'Lūdzu, ievadiet derīgu summu.');
        return;
    }

    const conversionRate = latestRates[toCurrency] / latestRates[fromCurrency];
    const result = (amount * conversionRate).toFixed(2);
    displayConversionResult(`${amount} ${fromCurrency} = ${result} ${toCurrency}`);
}
````

Funkcija `convertCurrency` tiek izsaukta, kad aprēķinātu rezultātu, balstoties uz lietotāja ievadīto summu un izvēlētajām valūtām. Tā izmanto ielādētos valūtas kursus un veic aprēķinu.

#### **Vēsturiskie dati un diagramma**

```javascript
function updateHistoryChart() {
    const url = `${HISTORICAL_API_BASE}${currentChartFrom}_${currentChartTo}.json?from=${currentChartDuration}`;
    $.get(url, function(data) {
        const labels = data.dates;
        const chartData = labels.map(date => data.rates[date][currentChartTo]);
        const chartLabels = labels.map(date => moment(date).format('MMM D, YYYY'));

        const chartConfig = {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: `${currentChartFrom} to ${currentChartTo}`,
                    data: chartData,
                    borderColor: '#0d6efd',
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        ticks: { autoSkip: true, maxTicksLimit: 20 }
                    }
                }
            }
        };

        if (historyChart) historyChart.destroy();
        historyChart = new Chart($chartCanvas, chartConfig);
    });
}
```

Funkcija `updateHistoryChart` iegūst vēsturiskos valūtu kursus un ģenerē līniju diagrammu ar **Chart.js** bibliotēku. Tā izmanto datus no ārējā API, kas atgriež vēsturiskos valūtu kursus.

---

Šis kods nodrošina pilnīgu valūtu konvertēšanas un vēstures funkcionalitāti, piedāvājot lietotājiem vienkāršu veidu, kā iegūt un analizēt valūtu datus.
