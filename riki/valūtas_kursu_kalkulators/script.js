$(document).ready(function() {

    const $amountInput = $('#amount');
    const $fromCurrencySelect = $('#fromCurrency');
    const $toCurrencySelect = $('#toCurrency');
    const $swapButton = $('#swap');
    const $resultDiv = $('#result');
    const $messageArea = $('#message-area');
    const $historyButtons = $('.history-btn');
    const $chartCanvas = $('#historyChart');
    const $chartMessageDiv = $('#chart-message');

    const LATEST_RATES_API = 'https://api.frankfurter.app/latest';
    const HISTORICAL_API_BASE = 'https://api.frankfurter.app/';

    let latestRates = {};
    let historyChart = null;
    let currentChartFrom = '';
    let currentChartTo = '';
    let currentChartDuration = '1m';

    initApp();

    async function initApp() {
        showLoadingMessage($messageArea, 'Loading latest rates...');
        showLoadingMessage($chartMessageDiv, '');

        try {
            const latestData = await fetchData(LATEST_RATES_API);
            if (!latestData || !latestData.rates) throw new Error("Could not fetch latest rates.");

            latestRates = { ...latestData.rates, [latestData.base]: 1 };
            populateCurrencyOptions(Object.keys(latestRates));
            setDefaultCurrencies();

            setupEventListeners();

            convertCurrency();
            setActiveHistoryButton(currentChartDuration);
            updateHistoryChart();

            showLoadingMessage($messageArea, '');

        } catch (error) {
            console.error("Initialization failed:", error);
            displayErrorMessage($messageArea, `Error: ${error.message}. Please try reloading.`);
            disableControls(true);
        }
    }

    function fetchData(url) {
        return $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json'
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error("AJAX error:", textStatus, errorThrown, jqXHR.responseText);
             let errorMsg = `API request failed: ${textStatus}`;
             if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                 errorMsg += ` - ${jqXHR.responseJSON.message}`;
             } else if (errorThrown) {
                 errorMsg += ` - ${errorThrown}`;
             }
            throw new Error(errorMsg);
        });
    }

    function populateCurrencyOptions(currencyKeys) {
        $fromCurrencySelect.empty();
        $toCurrencySelect.empty();

        currencyKeys.sort().forEach(currency => {
            const $option = $('<option>', { value: currency, text: currency });
            $fromCurrencySelect.append($option.clone());
            $toCurrencySelect.append($option);
        });
    }

    function setDefaultCurrencies() {
        const defaultFrom = latestRates['EUR'] ? 'EUR' : Object.keys(latestRates)[0] || 'USD';
        const defaultTo = latestRates['USD'] ? 'USD' : Object.keys(latestRates)[1] || 'EUR';
        $fromCurrencySelect.val(defaultFrom);
        $toCurrencySelect.val(defaultTo);
    }

    function displayConversionResult(text) {
        $resultDiv.text(text).removeClass('text-danger').addClass('text-success');
    }

    function showLoadingMessage($element, text) {
        $element.text(text).removeClass('text-danger text-success').addClass('text-muted');
    }

    function displayErrorMessage($element, text) {
        $element.text(text).removeClass('text-muted text-success').addClass('text-danger fw-bold');
    }

    function disableControls(disabled) {
        $amountInput.prop('disabled', disabled);
        $fromCurrencySelect.prop('disabled', disabled);
        $toCurrencySelect.prop('disabled', disabled);
        $swapButton.prop('disabled', disabled);
        $historyButtons.prop('disabled', disabled);
    }

    function setupEventListeners() {
        $amountInput.on('input', convertCurrency);
        $fromCurrencySelect.on('change', handleCurrencyChange);
        $toCurrencySelect.on('change', handleCurrencyChange);
        $swapButton.on('click', swapCurrencies);

        $historyButtons.on('click', function() {
            currentChartDuration = $(this).data('duration');
            setActiveHistoryButton(currentChartDuration);
            updateHistoryChart();
        });
    }

    function handleCurrencyChange() {
        convertCurrency();
        updateHistoryChart();
    }

    function swapCurrencies() {
        const fromVal = $fromCurrencySelect.val();
        const toVal = $toCurrencySelect.val();
        $fromCurrencySelect.val(toVal);
        $toCurrencySelect.val(fromVal);
        handleCurrencyChange();
    }

    function setActiveHistoryButton(duration) {
        $historyButtons.each(function() {
            const $btn = $(this);
            if ($btn.data('duration') === duration) {
                $btn.addClass('active').removeClass('btn-outline-primary').addClass('btn-primary');
            } else {
                $btn.removeClass('active').addClass('btn-outline-primary').removeClass('btn-primary');
            }
        });
    }

    function convertCurrency() {
        const amount = parseFloat($amountInput.val());
        const fromCurrency = $fromCurrencySelect.val();
        const toCurrency = $toCurrencySelect.val();

        $messageArea.text('');

        if (isNaN(amount) || amount < 0) {
            displayErrorMessage($resultDiv, 'Please enter a valid positive amount.');
            return;
        }
        if (!fromCurrency || !toCurrency || fromCurrency === toCurrency) {
            $resultDiv.text('');
            return;
        }
        if (!latestRates || Object.keys(latestRates).length === 0) {
            displayErrorMessage($resultDiv, 'Rates not loaded.');
            return;
        }

        const rateFromBase = latestRates[fromCurrency];
        const rateToBase = latestRates[toCurrency];

        if (!rateFromBase || !rateToBase) {
            displayErrorMessage($resultDiv, 'Rate data unavailable for selected currency.');
            return;
        }

        const conversionRate = rateToBase / rateFromBase;
        const convertedAmount = amount * conversionRate;

        displayConversionResult(
            `${amount.toLocaleString()} ${fromCurrency} = ${convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} ${toCurrency}`
        );
    }

    function getDateRange(duration) {
        const endDate = moment();
        let startDate;

        switch (duration) {
            case '1m': startDate = moment().subtract(1, 'months'); break;
            case '6m': startDate = moment().subtract(6, 'months'); break;
            case '1y': startDate = moment().subtract(1, 'years'); break;
            case '5y': startDate = moment().subtract(5, 'years'); break;
            default:   startDate = moment().subtract(1, 'months');
        }
        return { start: startDate.format('YYYY-MM-DD'), end: endDate.format('YYYY-MM-DD') };
    }

    async function updateHistoryChart() {
        const from = $fromCurrencySelect.val();
        const to = $toCurrencySelect.val();

        if (!from || !to || from === to) {
            displayErrorMessage($chartMessageDiv, 'Select two different currencies to see history.');
            clearChart();
            return;
        }

        if (from === currentChartFrom && to === currentChartTo && /* duration unchanged condition needed */ false) {
             return;
        }

        currentChartFrom = from;
        currentChartTo = to;

        showLoadingMessage($chartMessageDiv, `Loading ${currentChartDuration} history for ${from}/${to}...`);
        clearChart();

        try {
            const { start, end } = getDateRange(currentChartDuration);
            const historyApiUrl = `${HISTORICAL_API_BASE}${start}..${end}?from=${from}&to=${to}`;

            const historyData = await fetchData(historyApiUrl);

            if (!historyData || !historyData.rates || Object.keys(historyData.rates).length === 0) {
                throw new Error(`No historical data found for ${from}/${to} in this period.`);
            }

            const labels = Object.keys(historyData.rates).sort();
            const dataPoints = labels.map(date => historyData.rates[date][to]);

            renderChart(labels, dataPoints, from, to);
            showLoadingMessage($chartMessageDiv, '');

        } catch (error) {
            console.error("Failed to update history chart:", error);
            displayErrorMessage($chartMessageDiv, `Error loading chart: ${error.message}`);
            clearChart();
        }
    }

    function getCssVariable(variableName) {
       return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim() || null;
    }

    function renderChart(labels, dataPoints, from, to) {
        const ctx = $chartCanvas[0].getContext('2d');

        const primaryColor = getCssVariable('--app-primary-color') || '#0d6efd';
        const primaryColorTransparent = primaryColor + '1A';

        if (historyChart) {
            historyChart.destroy();
        }

        historyChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: `1 ${from} to ${to}`,
                    data: dataPoints,
                    borderColor: primaryColor,
                    backgroundColor: primaryColorTransparent,
                    borderWidth: 1.5,
                    pointRadius: 0,
                    pointHitRadius: 10,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                 scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: inferTimeUnit(labels),
                            tooltipFormat: 'll',
                            displayFormats: {
                               day: 'MMM d', week: 'MMM d', month: 'MMM yyyy', year: 'yyyy',
                            }
                        },
                        title: { display: true, text: 'Date' },
                        grid: { display: false },
                        ticks: { autoSkip: true, maxRotation: 0, maxTicksLimit: 7 }
                    },
                    y: {
                        title: { display: true, text: `Rate (1 ${from} = X ${to})` },
                         grid: { color: '#e9ecef' }
                    }
                },
                plugins: {
                    tooltip: { mode: 'index', intersect: false, backgroundColor: '#212529' },
                    legend: { display: false }
                },
                hover: { mode: 'index', intersect: false },
                animation: { duration: 300 }
            }
        });
    }

    function clearChart() {
        if (historyChart) {
            historyChart.destroy();
            historyChart = null;
        }
    }

    function inferTimeUnit(labels) {
         if (!labels || labels.length < 2) return 'day';
         const start = moment(labels[0]);
         const end = moment(labels[labels.length - 1]);
         const diffDays = end.diff(start, 'days');

        if (diffDays > 365 * 2) return 'year';
        if (diffDays > 180) return 'month';
        return 'day';
    }

});
