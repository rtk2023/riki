function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // pārvērš metros

    if (isNaN(weight) || isNaN(height)) {
        document.getElementById('results').textContent = 'Lūdzu, ievadiet derīgas vērtības!';
        return;
    } else if (weight < 0 || height < 0) {
        document.getElementById('results').textContent = 'Lūdzu, ievadiet derīgas vērtības!';
        return;
    }
    
    const bmi = (weight / (height * height)).toFixed(2);
    let category = '';

    if (bmi < 18.5) {
        category = 'Nepietiekams svars';
    } else if (bmi < 24.9) {
        category = 'Normāls svars';
    } else if (bmi < 29.9) {
        category = 'Liekais svars';
    } else {
        category = 'Aptaukošanās';
    }

    document.getElementById('results').textContent = `Jūsu BMI ir ${bmi} (${category})`;
}

document.getElementById('back').addEventListener('click', function() {
    window.location.href = 'https://rtk2023.github.io/riki/';
});
document.getElementById('github').addEventListener('click', function() {
    window.location.href = 'https://github.com/rtk2023/riki';
});