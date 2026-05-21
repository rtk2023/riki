# Futbola Analītikis

## Ievads
Šis rīks ir paredzēts futbola spēļu analīzei, aprēķinot uzvaras varbūtības divām izvēlētām komandām. Tas izmanto datus - komandu nesenās formas, vārtu starpību un savstarpējo statistiku, lai sniegtu ieskatus par potenciālajiem spēļu rezultātiem.

## Pārskats
Futbola Analītikis projekts ir klienta puses tīmekļa lietojumprogramma, kas izveidota ar HTML, CSS un JavaScript. Tas ļauj lietotājiem meklēt futbola komandas, atlasīt divas komandas un aprēķināt uzvaras iespējas katrai.

### Projekta Arhitektūra
- **Frontend**: Tīrs HTML/CSS/JS bez ietvariem vienkāršības labad.
- **Datu Avots**: Iegūst reāllaika futbola datus no Cloudflare Worker API, kas ņem pieprasījumus no API-football.
- **Aprēķinu Loģika**: Īsteno svērto algoritmu uzvaras varbūtībai, pamatojoties uz:
  - Komandu forma (50% svars): Nesenās spēļu rezultāti.
  - Vārtu starpība (30% svars): Kopējie gūtie vārti pret zaudētajiem.
  - Savstarpējās (20% svars): Rezultāti no iepriekšējām tikšanās reizēm.

### Failu Struktūra
- `index.html`: Galvenais HTML fails, kas satur lietotāja interfeisu komandu meklēšanai un rezultātu parādīšanai.
- `style.css`: Stila lapa vizuālajam stilam.
- `scripts/main.js`: Apstrādā lietotāja mijiedarbību, komandu atlasi un organizē datu iegūšanu un aprēķinu.
- `scripts/getData.js`: Satur funkcijas API pieprasījumiem, tostarp komandu meklēšanu, formas iegūšanu, savstarpējo datu un kombinēto spēļu datu iegūšanu.
- `scripts/calculator.js`: Īsteno uzvaras varbūtības aprēķina funkciju.

## Iespējamie Uzlabojumi
- Pievienot atbalstu vairāk sezonām vai līgām ārpus 2024. gada.
- Iekļaut papildu statistiku, piemēram, spēlētāju savainojumus, mājas/izbraukuma sniegumu vai derību koeficientus.


## Zināmie Defekti
- Problēmas ar API ātruma ierobežojumiem un datu pieejamību.

## Resursi
- [Futbola API Dokumentācija](https://www.api-football.com/documentation-v3) – Pamata datu avots.
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) – Lai saprastu datu iegūšanu.
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) – Lai saprastu API starpnieka iestatīšanu.

## Autori
2026: 1, 7, 19