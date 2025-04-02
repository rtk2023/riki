document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);

    if (isNaN(width) || isNaN(height)) {
        alert('Please enter valid numbers');
        return;
    }

    const area = width * height;
    document.getElementById('result').textContent = `Area: ${area}`;
});
