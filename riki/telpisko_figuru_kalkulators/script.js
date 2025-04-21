//Vērtību iegūšana
const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const result = document.getElementById("result");
const form = document.getElementById("form");
const calculationType = document.getElementById("calculationType");

// Konusa funkcijas
function volumeCone(R, H) {
    return (1 / 3) * Math.PI * R * R * H;
}
function surfaceCone(R, L) {
    return Math.PI * R * R + Math.PI * R * L;
}
// Nospiežot pogu ar id 'submit', notiks sekojošais:
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Piešķir mainīgajiem vērtības.
    let R = parseFloat(number1.value);
    let H_or_L = parseFloat(number2.value);
    let selectedCalc = calculationType.value;
    // Izvadvērtība
    let output;
    // Ja Radiusa lauks vai 2. lauks ir tukš
    if (!R || !H_or_L) {
        alert('Abiem laukiem jābūt aizpildītiem ar skaitļiem!');
        return;
    }
    // Nevar būt negatīvas vērtības ģeometriskām
    if (R <= 0 || H_or_L <= 0) {
        alert('Abiem skaitļiem jābūt lielākiem par nulli!');
        return;
    } 
    // Tilpuma funkcijas izsaukums
    if (selectedCalc === "volume") {
        output = volumeCone(R, H_or_L);
        result.textContent = `Tilpums V = ${output.toFixed(2)}`;
    } 
    // Ja tomēr ir virsmas laukums 
    else if (selectedCalc === "surface") {
        output = surfaceCone(R, H_or_L);
        result.textContent = `Virsmas laukums S = ${output.toFixed(2)}`;
    }
});