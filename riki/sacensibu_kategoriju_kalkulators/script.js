// Funkcija, kas atjauno cīņas veida izvēli atkarībā no dzimuma
function updateCinasVeids() {

    // Iegūst izvēlēto dzimumu
    const dzimums = document.getElementById('dzimums').value;

    // Atrod konkrētās opcijas select laukā
    const gregOption = document.querySelector('#cinasVeids option[value="GR"]');
    const wfsOption = document.querySelector('#cinasVeids option[value="WFS"]');
    const fsOption = document.querySelector('#cinasVeids option[value="FS"]');

    // Ja sieviete
    if (dzimums === "s") {
        gregOption.disabled = true;
        fsOption.disabled = true;
        wfsOption.disabled = false;

    // Ja vīrietis 
    } else if (dzimums === "v") {
        gregOption.disabled = false;
        fsOption.disabled = false;
        wfsOption.disabled = true;
    }
}

// Galvenā aprēķina funkcija
function aprekinat() {
    const rezultats = document.getElementById('rezultats');

    // Iegūst ievades laukus
    const svarsInput = document.getElementById('svars').value.trim();
    const gadsInput = document.getElementById('gads').value.trim();
    const dzimumsInput = document.getElementById('dzimums').value;
    const veidsInput = document.getElementById('cinasVeids').value;

    // Ja nekas nav ievadīts
    if (!svarsInput && !gadsInput && !dzimumsInput && !veidsInput) {
        rezultats.innerHTML = `<div class="alert alert-warning">Lūdzu, ievadi datus!</div>`;
        return;
    }

    // Aizvieto komatu ar punktu (piemēram 55,5 → 55.5)
    let svarsRaw = svarsInput.replace(',', '.');

    // Pārbauda-svaru 
    if (!/^\d+(\.\d)?$/.test(svarsRaw)) {
        rezultats.innerHTML = `<div class="alert alert-danger">Svars drīkst būt tikai ar 1 ciparu aiz komata!</div>`;
        return;
    }

    // Pārvērš skaitļos
    const svars = parseFloat(svarsRaw);
    const gads = parseInt(gadsInput);
    const dzimums = dzimumsInput;
    const veids = veidsInput;

    // Pašreizējais gads
    const currentYear = new Date().getFullYear();

    //  kļūda ja kāds lauks nav aizpildīts
    if (!svars || !gads || !dzimums || !veids) {
        rezultats.innerHTML = `<div class="alert alert-danger">Lūdzu, ievadi datus!</div>`;
        return;
    }

    // Svara robežu pārbaude
    if (svars < 25 || svars > 200) {
        rezultats.innerHTML = `<div class="alert alert-danger">Svars jābūt starp 25 un 200 kg!</div>`;
        return;
    }

    // Dzimšanas gada pārbaude
    if (gads > currentYear || gads < 1930) {
        rezultats.innerHTML = `<div class="alert alert-danger">Nepareizs dzimšanas gads!</div>`;
        return;
    }

    // Aprēķina vecumu
    const vecums = currentYear - gads;

    // Minimālais vecums
    if (vecums < 6) {
        rezultats.innerHTML = `<div class="alert alert-danger">Pārāk jauns sacensībām!</div>`;
        return;
    }

    // Nosaka vecuma grupu
    let grupa = "";

    if (gads >= 2011 && gads <= 2012) {
        grupa = "U15";
    }
    else if (gads >= 2009 && gads <= 2010) {
        grupa = "U17";
    }
    else if (gads >= 2007 && gads <= 2008) {
        grupa = "U20";
    }
    else if (gads <= 2006) {
        grupa = "Pieaugušie";
    }

    let kategorijas = [];

// U20 (2007–2008)
if (gads >= 2007 && gads <= 2008) {
    if (veids === "WFS") kategorijas = [50,53,55,57,59,62,65,68,72,76];
    if (veids === "GR") kategorijas = [55,60,63,67,72,77,82,87,97,130];
    if (veids === "FS") kategorijas = [57,61,65,70,74,79,86,92,97,125];
}

// U17 (2009–2010)
else if (gads >= 2009 && gads <= 2010) {
    if (veids === "WFS") kategorijas = [43,46,49,53,57,61,65,69,73];
    if (veids === "GR") kategorijas = [45,48,51,55,60,65,71,80,92,110];
    if (veids === "FS") kategorijas = [45,48,51,55,60,65,71,80,92,110];
}

// U15 (2011–2012)
else if (gads >= 2011 && gads <= 2012) {
    if (veids === "WFS") kategorijas = [39,42,46,50,54,58,62,66];
    if (veids === "GR") kategorijas = [38,41,44,48,52,57,62,68,75,85,110];
    if (veids === "FS") kategorijas = [38,41,44,48,52,57,62,68,75,85,110];
}

// Jaunāki
else if (gads >= 2013) {
    if (veids === "WFS") kategorijas = [20,23,26,29,32,35,40,45,50,60];
    if (veids === "GR") kategorijas = [26,29,32,35,38,42,47,53,59,66,85];
    if (veids === "FS") kategorijas = [26,29,32,35,38,42,47,53,59,66,85];
}

// Pieaugušie
else if (gads <= 2006) {
    if (veids === "WFS") kategorijas = [50,53,55,57,59,62,65,68,72,76];
    if (veids === "GR") kategorijas = [55,60,63,67,72,77,82,87,97,130];
    if (veids === "FS") kategorijas = [57,61,65,70,74,79,86,92,97,125];
}

    //  kļūda ja nav atrastas kategorijas
    if (kategorijas.length === 0) {
        rezultats.innerHTML = `<div class="alert alert-warning">Nav datu šai vecuma grupai!</div>`;
        return;
    }

    // Atrod atbilstošo kategoriju
    let kategorija = "";
    let next = null;

    for (let i = 0; i < kategorijas.length; i++) {
        if (svars <= kategorijas[i]) {
            kategorija = kategorijas[i];
            next = kategorijas[i + 1] || null;
            break;
        }
    }

    
    if (!kategorija) {
        kategorija = kategorijas[kategorijas.length - 1] + "+";
    }

    // Informācija par nākamo kategoriju
    let kgInfo = "";
    if (next) {
        let diff = (next - svars).toFixed(1);
        kgInfo = `Līdz nākamajai kategorijai: <b>${diff} kg</b>`;
    } else {
        kgInfo = "Tu esi augstākajā kategorijā";
    }

    // Attēlo rezultātu
    rezultats.innerHTML = `
        <div class="alert alert-purple">
            <p>Vecums: <b>${vecums}</b></p>
            <p>Grupa: <b>${grupa}</b></p>
            <p>Kategorija: <b>${kategorija} kg</b></p>
            <p>${kgInfo}</p>
        </div>
    `;
}

// Notīra visus laukus
function notirit() {
    document.getElementById('svars').value = "";
    document.getElementById('gads').value = "";
    document.getElementById('dzimums').value = "";
    document.getElementById('cinasVeids').value = "";
    document.getElementById('rezultats').innerHTML = "";
}

// Parāda motivācijas tekstu
function showMotivation() {
    const motivacijas = [
        { text: "Nekad nedrīkst palikt piezemēts. Jāceļas un jāturpina!", author: "Makss Šmēlings" },
        { text: "Nekad nepadodies! Neveiksmes ir tikai pirmais solis uz panākumiem.", author: "Džims Valvano" },
        { text: "Uzvarētāji turpina spēlēt, līdz viņiem viss izdodas.", author: "Billija Džeina Kinga" },
        { text: "Neatlaidība var pārvērst neveiksmi par sasniegumu.", author: "Mets Biondi" },
        { text: "Ja tas tev nav izaicinājums, tas tevi nemaina.", author: "Freds Devito" },
        { text: "Jo vairāk es praktizēju, jo laimīgāks es kļūstu.", author: "Garijs Pleijers" },
        { text: "Es sāku agri un palieku vēlu. Panākumi prasa laiku.", author: "Lionels Mesi" },
        { text: "Neviens, kurš ir devis labāko no sevis, to nav nožēlojis.", author: "Džordžs Halss" },
        { text: "Nav īsāko ceļu. Ir tikai atkārtojumi.", author: "Arnolds Švarcenegers" },
        { text: "Tu nekad neesi zaudētājs, kamēr nepārstāj mēģināt.", author: "Maiks Ditka" }
    ];

    const random = motivacijas[Math.floor(Math.random() * motivacijas.length)];

    document.getElementById("motivText").innerHTML =
        `<div>${random.text}</div><div class="mt-2"><b>— ${random.author}</b></div>`;

    const modal = new bootstrap.Modal(document.getElementById('motivModal'));
    modal.show();
}