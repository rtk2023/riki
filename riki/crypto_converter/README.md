
CRYPTO CONVERTER

Ievads

Crypto Converter ir vienkāršs tīmekļa rīks, kas lietotājiem ļauj konvertēt kriptovalūtu (piemēram, Bitcoin) uz fiat valūtu (piemēram, USD). Tas sniedz ātru un vienkāršu veidu, kā uzzināt kriptovalūtas vērtību reālajā laikā.

Pārskats

Projekta apraksts

Šis projekts ir izveidots kā interaktīva tīmekļa lietotne, kas ļauj lietotājam ievadīt Bitcoin (BTC) daudzumu un saņemt aprēķināto summu ASV dolāros (USD). Projekts ir izveidots, izmantojot HTML, CSS, un JavaScript. Lietotne nodrošina lietotājam draudzīgu saskarni ar vizuālām ilustrācijām.

Failu struktūra
```
crypto-converter/
├── README.md               # Projekta dokumentācija
├── index.html              # Galvenā HTML lapa
├── script.js               # Galvenāis JS fails
└── styles.css              # Lietotnes stila fails
```
Darbības princips

1. Lietotājs ievada BTC daudzumu.
2. Nospiež pogu "CONVERTET".
3. Tiek parādīta aprēķinātā vērtība USD valūtā, izmantojot Coinlayer API, lai iegūtu aktuālo BTC-USD kursu.

Zināmie defekti

- Trūkst kļūdu apstrādes, piemēram, ja lauks ir tukšs vai satur nederīgu vērtību.
- Poga satur kļūdainu tekstu: "CONVERTET" vajadzētu labot uz "CONVERT".
- Atkarība no Coinlayer API – ja API nav pieejams, lietotne nevar parādīt rezultātu.

Iespējamie uzlabojumi

- Valūtu izvēle: Atļaut izvēlēties citu kriptovalūtu vai fiat valūtu.
- Mobilā optimizācija: Nodrošināt labāku izkārtojumu un lietojamību uz mobilajām ierīcēm.
- Labāka kļūdu apstrāde: Informēt lietotāju, ja ievade nav derīga vai ir nepieciešama.

Resursi

- W3Schools HTML: https://www.w3schools.com/html/
- W3Schools JavaScript: https://www.w3schools.com/js/
- W3Schools CSS: https://www.w3schools.com/css/

Autori

2025: RTK audzēkņi
P1-3 Matvejs, Artemijs, Reinis
