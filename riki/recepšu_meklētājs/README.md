# Recepšu meklētājs 
## Ievads
Vienkāršs recepju meklētājs, ar nejaušām receptēm un meklēt pēc sastāvdaļas.
## Pārskats
### Projekta arhitektūra
Tikai izmantotas tehnoloģijas:
- HTML
- CSS
- JS
- API (TheMealDB)

### Faila struktūra:
```
web6
├── index.html                     # Galvenā lapa
├── style.css                      
├── random/                        # Nejaušās receptes daļa
│   ├── index.html                 
│   ├── script.js                  
│   ├── style.css                  
│   └── recipe/                    # Vienas receptes detalizēts skats
│       ├── index.html
│       ├── script.js
│       └── style.css
├── search/                        # Meklēšanas rezultāti
│   ├── index.html                 
│   ├── script.js
│   ├── style.css
│   └── result/                    # Vienas recptes detalizēts skats
│       ├── index.html
│       ├── script.js
│       └── style.css
└── README.md                      # Projekta dokumentācija
```
## Iespējamie uzabojumi
Ir, manuprāt, vairāki uzlabojumi, kas var būt veikti:
- Pievienot recepšu meklēšanu pēc reģiona
- Meklēšana pēc ēdiena nosaukuma 
- Meklēšana pēc ēdiena kategorijas
- Recepšu saglabāšaba `localstorage` 

## Problēmas
Interfeis mobilām ierīcēm nav perfekts

## Resursi
- [MealDB API Dokumentācija](https://www.themealdb.com/api.php)
- [HTML W3](https://www.w3schools.com/html/default.asp)
- [CSS W3](https://www.w3schools.com/css/default.asp)
- [JS W3](https://www.w3schools.com/js/default.asp)
- Kā arī nu nekurienes izvilktas mājaslapas(stackoverflow, reddit un citu forumu posti), kas salabojaa man specifisku problēmu.
## Autori
Jānis Bašēns P2-3
