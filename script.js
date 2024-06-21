const apiURL = 'https://open.er-api.com/v6/latest/USD';

document.addEventListener('DOMContentLoaded', () => {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencyKeys = Object.keys(data.rates);
            populateCurrencyOptions(currencyKeys);
        });

    document.getElementById('convert').addEventListener('click', convertCurrency);
});

function populateCurrencyOptions(currencyKeys) {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    currencyKeys.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.text = currency;
        fromCurrency.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.text = currency;
        toCurrency.appendChild(optionTo);
    });
}

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency] / data.rates[fromCurrency];
            const convertedAmount = amount * rate;
            document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        });
}
