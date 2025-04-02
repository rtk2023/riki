function convertTemperature() {
    // Iegūst temperatūras vērtību no ievades lauka un pārveido to par decimālskaitli
    let temperatureInput = document.getElementById('temperature');
    let temperature = parseFloat(temperatureInput.value);

    // Pārbauda, vai ievadītā vērtība ir derīga
    if (isNaN(temperature)) {
        alert('Lūdzu, ievadiet derīgu temperatūras vērtību!');
        temperatureInput.value = ''; // Notīra ievades lauku
        return;
    }

    // Iegūst sākotnējo mērvienību un galamērķa mērvienību
    let fromUnit = document.getElementById('fromUnit').value;
    let toUnit = document.getElementById('toUnit').value;

    let result;
    
    // Pārvēršana no Kelviniem
    if (fromUnit === 'kelvin') {
        if (toUnit === 'celsius') {
            // Formula: Kelvin -> Celsius
            result = temperature - 273.15;
        } else if (toUnit === 'fahrenheit') {
            // Formula: Kelvin -> Fahrenheit
            result = (temperature - 273.15) * 9/5 + 32;
        } else {
            // Ja vienības ir tādas pašas
            result = temperature; // Nav nepieciešams veikt pārveidojumu
        }
    }
    
    // Pārvēršana no Celsija
    else if (fromUnit === 'celsius') {
        if (toUnit === 'kelvin') {
            // Formula: Celsius -> Kelvin
            result = temperature + 273.15;
        } else if (toUnit === 'fahrenheit') {
            // Formula: Celsius -> Fahrenheit
            result = temperature * 9/5 + 32;
        } else {
            // Ja vienības ir tādas pašas
            result = temperature; // Nav nepieciešams veikt pārveidojumu
        }
    }
    
    // Pārvēršana no Farenheita
    else if (fromUnit === 'fahrenheit') {
        if (toUnit === 'kelvin') {
            // Formula: Fahrenheit -> Kelvin
            result = (temperature - 32) * 5/9 + 273.15;
        } else if (toUnit === 'celsius') {
            // Formula: Fahrenheit -> Celsius
            result = (temperature - 32) * 5/9;
        } else {
            // Ja vienības ir tādas pašas
            result = temperature; // Nav nepieciešams veikt pārveidojumu
        }
    }
    
    // Parāda rezultātu
    document.getElementById('result').innerHTML = `${temperature} ${fromUnit.toUpperCase()} ir ${result.toFixed(2)} ${toUnit.toUpperCase()}`;
}
