let btc_input;
let change;
let btcPrice = 0;

function saveDATA1() {
  btc_input = parseFloat(document.getElementById("BTCinput").value);
  document.getElementById("BTCinput").value = "";
  
  if (btcPrice && btc_input) {
    change = btcPrice * btc_input;
    document.getElementById("USDinput").value = change.toFixed(2);
  } else {
    document.getElementById("USDinput").value = "Ошибка";
  }
}

const accessKey = 'f3b3d629988ea67808c2c0b1739be249';
const url = `http://api.coinlayer.com/api/live?access_key=${accessKey}&symbols=BTC`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.success && data.rates && data.rates.BTC) {
      btcPrice = data.rates.BTC;


      if (!btcPriceElement) {
        btcPriceElement = document.createElement('p');
        btcPriceElement.id = 'btc-price';
        document.body.appendChild(btcPriceElement);
      }

      btcPriceElement.textContent = `1 BTC = ${btcPrice} USD`;
      btcPriceElement.style.color = "white";
      btcPriceElement.style.fontSize = "24px";
      btcPriceElement.style.textAlign = "center";
    } else {
      showError('Не удалось получить цену BTC.');
    }
  })
  .catch(error => {
    console.error('Ошибка при запросе:', error);
  });

function showError(message) {
  let btcPriceElement = document.getElementById('btc-price');
  if (!btcPriceElement) {
    btcPriceElement = document.createElement('p');
    btcPriceElement.id = 'btc-price';
    document.body.appendChild(btcPriceElement);
  }
  btcPriceElement.textContent = message;
  btcPriceElement.style.color = "red";
  btcPriceElement.style.textAlign = "center";
}

