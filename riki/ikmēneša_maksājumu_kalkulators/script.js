function calculatePayment() {
    let amount = document.getElementById('amount').value;
    let rate = document.getElementById('rate').value;
    let years = document.getElementById('years').value;

    if (amount && rate && years) {
        let monthlyRate = (rate / 100) / 12;
        let numberOfPayments = years * 12;
        let x = Math.pow(1 + monthlyRate, numberOfPayments);
        let monthlyPayment = (amount * x * monthlyRate) / (x - 1);
        
        document.getElementById('result').innerText = `Месячный платеж: ${monthlyPayment.toFixed(2)} руб.`;
    } else {
        document.getElementById('result').innerText = 'Пожалуйста, заполните все поля.';
    }
}
