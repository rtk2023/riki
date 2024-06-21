var slider = document.getElementById("lenkis_value");
var output = document.getElementById("selected_lenkis");
var koeficientsSlider = document.getElementById("koeficients_value");
var downKoeficientsSlider = document.getElementById("down_koeficients_value");
var draw = document.getElementById('draw');
var drawElement = draw.getContext('2d');
var iswhiteLineVisible = true;
var isbrownLineVisible = false;

// Начальные значения инициализации
output.innerHTML = slider.value;
document.getElementById("selected_koeficients").innerHTML = koeficientsSlider.value;
document.getElementById("selected_down_koeficients").innerHTML = downKoeficientsSlider.value;

// Обработчик изменения угла падения
slider.oninput = function () {
    output.innerHTML = this.value;
    drawLines(this.value, parseFloat(koeficientsSlider.value), parseFloat(downKoeficientsSlider.value));
};

// Обработчик изменения коэффициента преломления
koeficientsSlider.oninput = function () {
    document.getElementById("selected_koeficients").innerHTML = this.value;
    drawLines(slider.value, parseFloat(this.value), parseFloat(downKoeficientsSlider.value));
};

// Обработчик изменения коэффициента преломления (для нижней части)
downKoeficientsSlider.oninput = function () {
    document.getElementById("selected_down_koeficients").innerHTML = this.value;
    drawLines(slider.value, parseFloat(koeficientsSlider.value), parseFloat(this.value));
};

function drawLines(angle, n1, n2) {
    var angleRad = angle * (Math.PI / 180); // Угол падения в радианах

    // Очистка canvas перед рисованием новых линий
    drawElement.clearRect(0, 0, draw.width, draw.height);

    // Вычисляем координаты центра экрана
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;

    // Длина линии - выбираем как максимум ширину или высоту экрана
    var lineLength = Math.max(centerX, centerY);

    // Рисуем черную горизонтальную линию через центр экрана
    drawElement.lineWidth = 2;
    drawElement.strokeStyle = 'black';
    drawElement.beginPath();
    drawElement.moveTo(centerX - lineLength, centerY);
    drawElement.lineTo(centerX + lineLength, centerY);
    drawElement.stroke();

    // Рисуем черную вертикальную линию через центр экрана (нормаль)
    drawElement.beginPath();
    drawElement.moveTo(centerX, centerY - lineLength);
    drawElement.lineTo(centerX, centerY + lineLength);
    drawElement.stroke();

    // Вычисляем конечные координаты линии в левую верхнюю часть (угол падения)
    var endX = centerX - Math.sin(angleRad) * lineLength;
    var endY = centerY - Math.cos(angleRad) * lineLength;

    // Рисуем черную линию для угла падения
    drawElement.strokeStyle = 'black';
    drawElement.beginPath();
    drawElement.moveTo(centerX, centerY);
    drawElement.lineTo(endX, endY);
    drawElement.stroke();

    if (iswhiteLineVisible) {
        // Вычисляем конечные координаты линии в правую верхнюю часть (угол отражения)
        var endXwhite = centerX + Math.sin(angleRad) * lineLength;
        var endYwhite = centerY - Math.cos(angleRad) * lineLength;

        // Рисуем красную линию для угла отражения
        drawElement.strokeStyle = 'white';
        drawElement.beginPath();
        drawElement.moveTo(centerX, centerY);
        drawElement.lineTo(endXwhite, endYwhite);
        drawElement.stroke();

        // Обновляем значение угла отражения
        document.getElementById("selected_atstarots_lenkis").innerHTML = angle;
    }

    if (isbrownLineVisible) {
        // Вычисляем синус угла преломления по закону Снелла
        var sinRefractedAngle = (n1 / n2) * Math.sin(angleRad);

        if (sinRefractedAngle <= 1 && sinRefractedAngle >= -1) {
            var refractedAngleRad = Math.asin(sinRefractedAngle);

            // Вычисляем конечные координаты линии для угла преломления
            var endXbrown = centerX + Math.sin(refractedAngleRad) * lineLength;
            var endYbrown = centerY + Math.cos(refractedAngleRad) * lineLength;

            // Рисуем зеленую линию для угла преломления
            drawElement.strokeStyle = 'brown';
            drawElement.beginPath();
            drawElement.moveTo(centerX, centerY);
            drawElement.lineTo(endXbrown, endYbrown);
            drawElement.stroke();

            // Обновляем значение угла преломления
            var refractedAngle = (refractedAngleRad * (180 / Math.PI)).toFixed(2); // Переводим радианы в градусы
            document.getElementById('selected_lauzts_lenkis').innerHTML = refractedAngle + "°";
        } else{
            // Обновляем значение угла преломления с сообщением о полном внутреннем отражении
            document.getElementById('selected_lauzts_lenkis').innerHTML = "Nav iespējama lūzums (pilnīga iekšējā atstarošana)";
        }
    }
}

// Установка размеров canvas равными размерам окна
draw.width = window.innerWidth;
draw.height = window.innerHeight;

// Рисуем начальную линию от центра экрана
drawLines(slider.value, parseFloat(koeficientsSlider.value), parseFloat(downKoeficientsSlider.value));

// Обработчики для переключения режимов
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function () {
        // Убираем класс 'active' у всех кнопок
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
        // Добавляем класс 'active' к нажатой кнопке
        this.classList.add('active');

        // Переключение видимости элементов и настройка переменных
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
        // Обновить линии после переключения режима
        drawLines(parseFloat(lenkis_value.value), parseFloat(koeficientsSlider.value), parseFloat(downKoeficientsSlider.value));
    });
});

// Инициализация отображения при загрузке страницы
window.onload = function () {
    // Вызов функции рисования с начальными значениями
    drawLines(parseFloat(lenkis_value.value), parseFloat(koeficientsSlider.value), parseFloat(downKoeficientsSlider.value));
};
