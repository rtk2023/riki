document.getElementById('bodyFatForm').addEventListener('submit', function(e){
    e.preventDefault();

    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);

    if(!gender || !weight || !height || !age){
        alert("Lūdzu, aizpildiet visus laukus!");
        return;
    }
    let bmi = weight / ((height/100) ** 2);
    let bodyFat;

    if(gender === 'male'){
        bodyFat = 1.20 * bmi + 0.23 * age - 16.2;
    } else {
        bodyFat = 1.20 * bmi + 0.23 * age - 5.4;
    }

    bodyFat = bodyFat.toFixed(2);

    document.getElementById('result').innerHTML = `Aptuvenais ķermeņa tauku procents: ${bodyFat}%`;
});