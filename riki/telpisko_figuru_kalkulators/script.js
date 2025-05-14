//Vērtību piešķiršana ar lauku id
const variable1 = document.getElementById("variable1");
const variable2 = document.getElementById("variable2");
const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");
const result = document.getElementById("output");
const form = document.getElementById("form");
const shapeSelector = document.getElementById("shapeSelector");
const calculationType = document.getElementById("calculationType");
const pi = Math.PI; // PI vērtības piešķiršana

// R - figūras rādiuss
// H - Figūras augstums
// L - Veidules garums
// A - figūras mala

// Konuss
function volumeCone(R, H) { return (1 / 3) * pi * (R**2) * H; }
function surfaceCone(R, L) { return pi * (R**2) + pi * R * L; } // konusa pamats + Konusu sāni
// Cilindrs
function volumeCylinder(R, H) { return pi * (R**2) * H; }
function surfaceCylinder(R, H) { return 2 * pi * (R**2) + 2 * pi * R * H; } // Cilindra 2 pamati + sānu malas formula
// Lode
function volumeSphere(R) { return (4 / 3) * pi * (R**3); }
function surfaceSphere(R) { return 4 * pi * (R**2); }
// Kubs
function volumeCube(A) { return A**3 ; } 
function surfaceCube(A) { return 6 * (A**2); } // Kubam ir 6 virsmas
//Avots formulām: https://www.visc.gov.lv/lv/media/19301/download?attachment

// Funkcija mainīgo lauku maiņai
function updateForm() {
    const shape = shapeSelector.value;
    const type = calculationType.value;

    // Attiestatīt
    label1.style.display = "inline";
    variable1.style.display = "inline";
    label2.style.display = "inline";
    variable2.style.display = "inline";

    // Figūra {
    //      label.textContent = "" => nosaukuma maiņa
    //      variable.style.display = "none" => noņem elementu, lai netraucētu ar tukšo daļu
    // }

    if (shape === "cone") {
        label1.textContent = "Rādiuss (R)";
        if (type === "volume") {
            label2.textContent = "Augstums (H)";
        }
        else {
            label2.textContent = "Veidule (L)";
        }
    }
    else if (shape === "cylinder") {
        label1.textContent = "Rādiuss (R)";
        label2.textContent = "Augstums (H)";
    }
    else if (shape === "sphere") {
        label1.textContent = "Rādiuss (R)";
        label2.style.display = "none";
        variable2.style.display = "none";
    }
    else if (shape === "cube") {
        label1.textContent = "Mala (A)";
        label2.style.display = "none";
        variable2.style.display = "none";
    }
}

// Mainīgo ievades lauku nosaukumu maiņa
shapeSelector.addEventListener("change", updateForm);
calculationType.addEventListener("change", updateForm);
updateForm();

// Nospiežot pogu ar id 'submit', notiks sekojošais:
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Piešķir mainīgajiem vērtības.
    const shape = shapeSelector.value;
    const type = calculationType.value;
    const var1 = parseFloat(variable1.value);
    const var2 = parseFloat(variable2.value);
    
    // Izvadvērtība
    let output;
    
    // Pārbaude vai 1. ir aizpildītus un lielāks par 0 
    // un 2. mainīgais var būt ievadīts, ja ir, tad pārbauda vai ir aizpildīts un ir lielāks par nulli
    if (!var1 || var1 <=0 || (variable2.style.display !== "none" && (!var2 || var2 <=0))) {
        //Atsevišķi paziņojumi priekš konkretizēta trūkuma.
        if (!var1) {
            alert('Primajam laukam trūkst skaitliskas vērtības!');
        }
        else if (var1 <=0) {
            alert('Pirmajai skaitliskai vērtībai ir jābūt lielākai par 0!');
        }
        else if (!var2) {
            alert('Otrajam laukam trūkst skaitliskas vērtības!');
        }
        else if (var2 <=0) {
            alert('Otrajai skaitliskai vērtībai ir jābūt lielākai par 0!');
        }
        else{
            alert('Ievadiet visus nepieciešamos pozitīvos skaitļus!');
        }
        return;
    }

    // Aprēķināšanas funkciju izsaukšana pēc figūras
    switch (shape) {
        case "cone":
            if (type === "volume") { output = volumeCone(var1, var2); }
            else { output = surfaceCone(var1, var2); }
            break;
        case "cylinder":
            if (type === "volume") { output = volumeCylinder(var1, var2); }
            else { output = surfaceCylinder(var1, var2); }
            break;
        case "sphere":
            if (type === "volume") { output = volumeSphere(var1); }
            else { output = surfaceSphere(var1); }
            break;
        case "cube":
            if (type === "volume") { output = volumeCube(var1); }
            else { output = surfaceCube(var1); }
            break;
    }

    // Rezultāta izvade, ja ir tilpums
    if (type === "volume") {
        result.textContent = `Tilpums V = ${output.toFixed(2)}`;
    } 
    // Rezultāta izvade, ja ir virsmas laukums
    else if (type === "surface") {
        result.textContent = `Virsmas laukums S = ${output.toFixed(2)}`;
    }
});

// Ievades lauku nosaukumu uzpeldēšanas efekta funkcija
function toggleLabelClass() {
    if (variable1.value.trim() !== "") {
        variable1.classList.add('has-value');
    } 
    else {
        variable1.classList.remove('has-value');
    }

    if (variable2.value.trim() !== "") {
        variable2.classList.add('has-value');
    } 
    else {
        variable2.classList.remove('has-value');
    }
}
  
variable1.addEventListener('input', toggleLabelClass);
variable2.addEventListener('input', toggleLabelClass);
window.addEventListener('DOMContentLoaded', toggleLabelClass);
  