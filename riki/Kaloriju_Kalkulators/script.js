document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('calorieForm');
    let results = document.getElementById('results');
    let maintainCalories = document.getElementById('maintainCalories');
    let loseCalories = document.getElementById('loseCalories');
    let gainCalories = document.getElementById('gainCalories');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const activity = parseFloat(document.getElementById('activity').value);

        //The BMR was determined using three methods. 
        //In men, the Harris-Benedict equation formula used was:
        // BMR=66.4730 + 13.7516 x weight in kg + 5.0033 x height in cm – 6.7550 x age in years. 
        //In women, BMR=655.0955 + 9.5634 x weight in kg + 1.8496 x height in cm – 4.6756 x age in years

        let bmr;

        if (gender === 'male') {
            bmr = 66.47 + (13.75 * weight) + (5 * height) - (6.7 * age);
        } else {
            bmr = 655.09 + (9.6 * weight) + (1.85 * height) - (4.7 * age);
        }

        const maintenance = bmr * activity;
        const lose = maintenance - 500;
        const gain = maintenance + 500;

        maintainCalories.textContent = Math.round(maintenance);
        loseCalories.textContent = Math.round(lose);
        gainCalories.textContent = Math.round(gain);

        results.style.display = 'block';
    });
});
