# QR-koda ģenerators

## Ievads

QR-koda ģenerators ir vienkāršs tīmekļa rīks, kas ļauj lietotājiem ievadīt tekstu vai URL, lai ģenerētu un pielāgotu QR kodu. Rīks piedāvā dažādus iestatījumus, piemēram, QR koda izmēru, krāsu un punktu stilu.

## Pārskats

### Projekta apraksts

Projekts ir veidots kā interaktīva tīmekļa lietotne, izmantojot HTML, CSS, JavaScript un bibliotēku **QRCodeStyling**. Generators ir tīmekļa lietojumprogramma, kas ļauj lietotājiem ģenerēt QR kodus ar pielāgojamiem parametriem. Lietotāji var ievadīt tekstu vai URL, izvēlēties QR koda izmēru, krāsu un punktu stilu, un lejupielādēt ģenerēto QR kodu kā attēlu.

## Failu struktūra

```bash
QR-code-generator/
├── README.md               # Projekta dokumentācija
├── index.html              # Galvenā HTML lapa
├── script.js               # Galvenāis JS fails
└── styles.css              # Lietotnes stila fails
```

### Darbības princips

1. Lietotājs ievada tekstu vai URL laukā.
2. Lietotājs izvēlas QR koda izmēru, krāsu un punktu stilu.
3. Poga "Ģenerēt QR kodu" izveido QR kodu atbilstoši lietotāja izvēlētajiem parametriem.
4. Lietotājs var lejupielādēt QR kodu kā attēlu, noklikšķinot uz pogas "Lejupielādēt QR kodu".

### Zināmie defekti

Iespējamās problēmas:
- Nav kļūdu apstrāde, ja tādas var būt vietnē
- Problēmas ar qrcoda izmēra izvēli vietnē no tālruņa
- Input nav iestatījumu vai ierobežojumu

## Iespējamie uzlabojumi

- **Papildu pielāgojumi QR kodam**: Lietotāji varētu iegūt iespēju pievienot logotipu QR kodam vai mainīt fona krāsu.
- **Atbalsts vairākām valodām**: Piešķirt rīkam iespēju mainīt valodu atkarībā no lietotāja izvēles.

## Resursi

- [QRCodeStyling ](https://www.npmjs.com/package/@liquid-js/qr-code-styling)
- [QRCodeStyling dokumentācija](https://liquid-js.github.io/qr-code-styling/)
- [W3Schools HTML](https://www.w3schools.com/html/)
- [W3Schools css](https://www.w3schools.com/css/)

## Autori

2025: RTK audzēknis