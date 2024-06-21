var slider = document.getElementById("lenkis_value");
var output = document.getElementById("selected_lenkis");
var koeficientsSlider = document.getElementById("koeficients_value");
var downKoeficientsSlider = document.getElementById("down_koeficients_value");
var draw = document.getElementById('draw');
var drawElement = draw.getContext('2d');
var iswhiteLineVisible = true;
var isbrownLineVisible = false;

output.innerHTML = slider.value;
document.getElementById("selected_koeficients").innerHTML = koeficientsSlider.value;
document.getElementById("selected_down_koeficients").innerHTML = downKoeficientsSlider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    drawLines(this.value, parseFloat(koeficientsSlider.value), parseFloat(downKoeficientsSlider.value));
};

koeficientsSlider.oninput = function () {
    document.getElementById("selected_koeficients").innerHTML = this.value;
    drawLines(slider.value, parseFloat(this.value), parseFloat(downKoeficientsSlider.value));
};

downKoeficientsSlider.oninput = function () {
    document.getElementById("selected_down_koeficients").innerHTML = this.value;
    drawLines(slider.value, parseFloat(koeficientsSlider.value), parseFloat(this.value));
};

function drawLines(angle, n1, n2) {
    var angleRad = angle * (Math.PI / 180);

    drawElement.clearRect(0, 0, draw.width, draw.height);

    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;

    var lineLength = Math.max(centerX, centerY);

    drawElement.lineWidth = 2;
    drawElement.strokeStyle = 'black';
    drawElement.beginPath();
    drawElement.moveTo(centerX - lineLength, centerY);
    drawElement.lineTo(centerX + lineLength, centerY);
    drawElement.stroke();

    drawElement.beginPath();
    drawElement.moveTo(centerX, centerY - lineLength);
    drawElement.lineTo(centerX, centerY + lineLength);
    drawElement.stroke();

    var endX = centerX - Math.sin(angleRad) * lineLength;
    var endY = centerY - Math.cos(angleRad) * lineLength;

    drawElement.strokeStyle = 'black';
    drawElement.beginPath();
    drawElement.moveTo(centerX, centerY);
    drawElement.lineTo(endX, endY);
    drawElement.stroke();

    if (iswhiteLineVisible) {
        var endXwhite = centerX + Math.sin(angleRad) * lineLength;
        var endYwhite = centerY - Math.cos(angleRad) * lineLength;

        drawElement.strokeStyle = 'white';
        drawElement.beginPath();
        drawElement.moveTo(centerX, centerY);
        drawElement.lineTo(endXwhite, endYwhite);
        drawElement.stroke();

        document.getElementById("selected_atstarots_lenkis").innerHTML = angle;
    }

    if (isbrownLineVisible) {
        var sinRefractedAngle = (n1 / n2) * Math.sin(angleRad);

        if (sinRefractedAngle <= 1 && sinRefractedAngle >= -1) {
            var refractedAngleRad = Math.asin(sinRefractedAngle);

            var endXbrown = centerX + Math.sin(refractedAngleRad) * lineLength;
            var endYbrown = centerY + Math.cos(refractedAngleRad) * lineLength;

            drawElement.strokeStyle = 'brown';
            drawElement.beginPath();
            drawElement.moveTo(centerX, centerY);
            drawElement.lineTo(endXbrown, endYbrown);
            drawElement.stroke();

            var refractedAngle = (refractedAngleRad * (180 / Math.PI)).toFixed(2); // Переводим радианы в градусы
            document.getElementById('selected_lauzts_lenkis').innerHTML = refractedAngle + "°";
        } else{
            document.getElementById('selected_lauzts_lenkis').innerHTML = "Nav iespējama lūzums (pilnīga iekšējā atstarošana)";
        }
    }
}

draw.width = window.innerWidth;
draw.height = window.innerHeight;

drawLines(slider.value, parseFloat(koeficientsSlider.value), parseFloat(downKoeficientsSlider.value));

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        if (this.id === 'atstarojums') {
            document.getElementById('lenkis').style.display = 'flex';
            document.getElementById('atstarots').style.display = 'flex';
            document.getElementById('koeficients').style.display = 'none';
            document.getElementById('down_koeficients').style.display = 'none';
            document.getElementById('lauzts_lenkis').style.display = 'none';
            iswhiteLineVisible = true;
            isbrownLineVisible = false;
        } else if (this.id === 'luzums') {
            document.getElementById('lenkis').style.display = 'flex';
            document.getElementById('atstarots').style.display = 'none';
            document.getElementById('koeficients').style.display = 'flex';
            document.getElementById('down_koeficients').style.display = 'flex';
            document.getElementById('lauzts_lenkis').style.display = 'flex';
            iswhiteLineVisible = false;
            isbrownLineVisible = true;
        }
        drawLines(parseFloat(lenkis_value.value), parseFloat(koeficientsSlider.value), parseFloat(downKoeficientsSlider.value));
    });
});

// Инициализация отображения при загрузке страницы
window.onload = function () {
    // Вызов функции рисования с начальными значениями
    drawLines(parseFloat(lenkis_value.value), parseFloat(koeficientsSlider.value), parseFloat(downKoeficientsSlider.value));
};
