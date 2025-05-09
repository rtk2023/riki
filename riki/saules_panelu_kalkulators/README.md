# Saules paneļu ietaupījuma kalkulators

## IEVADS
Šis rīks veidots,lai aprēķinātu cik lielu ietaupījumu saules paneļi rada 1 nedēļā. Rīks papildus palīdz isprast, kādi parametri un kādā veidā ietekmē Saules paneļu elektriskās enerģijas ražošanu.

## RĪKA PĀRSKATS
...

### FAILU STRUKTŪRA
```
saules_panelu_kalkulators/
├── data/
│   └── config.js
├── js/
│   └── script.js
├── .gitignore
├── index.html
├── README.md
└── result.html
```
`data/config.js` satur API atslēgas, bet netiek ievietots šajā repozitorijā, jo tas norādīts `.gitignore`.
`js/script.js` satur JavaScript kodu, kas veic ievadīto datu no `index.html` pārbaudi, aprēķina rezultātu un noformē to `result.html`.
`.gitignore` norāda failus un mapes, kurus nav vēlams pievienot repozitorijam.
`index.html` ievāc lietotāja ievadīto informāciju (forma).
`result.html` izvada lietotājam aprēķinātos rezultāus.

## IESPĒJAMIE UZLABOJUMI
Rīkam ir vairāki iespējamie uzlabojumi, ņemot vērā to, ka saules paneļu saražoto enerģiju ietekmē vairāki un dažādi faktori (paneļu, apkārtējās vides, laikapstākļu, u. c.), kuri nav tikt detalizētāk aprēķināti. Tas nodrošinātu precīzāku rīka aprēķinātā rezultāta sniegšanu. 

Šie potenciālie rīka uzlabošanas veidi ir:
- laikapstākļi (precīzāku mākoņu veidu ietekmi);
- saules paneļu modeļi (materiāla ietekme, veidi - parastie, rotējoši, divpusējie);
- saules gaismas stundas (rītausmas stundās, pusdienu stundās, saulrieta stundās)
- gadalaiku ietekme (saules leņķis virs horizonta);
- paneļu kopšana (regulāra putekļu tīrīšana, sniega tīrīšana - ziemā);
- paneļu savstarpējais savienojums (paralēli, virknē);
- grafiski attēloti rezultāti.
- mēneša ietaupījuma aprēķināsāna.

### ZINĀMIE DEFEKTI
...

## RESURSI
Izmantotie API:
- OpenWeather (nepieciešama API atsēga)
    - [Weather API](https://openweathermap.org/api/one-call-3) - laikapstākļu datu iegūšanai
    - [Geocoding API](https://openweathermap.org/api/geocoding-api) - ģeogrāfisko datu iegūšanai
- [Zipcodestack](https://zipcodestack.com/) (nepieciešama API atsēga) - pasta indeksu datu validācijai
- [RESTful API](https://restcountries.com/#endpoints-code) (nav nepieciešama API atsēga) - valstu kodu datu iegūšanai

Materiāli saules paneļu energījas ražošanas ietekmējošo faktoru izprašanai:
- https://www.solarshop.lv/blogs-un-jaunumi/ 

**Autori**  
2025: Laila Bicāla, Kristers Patriks Feldbergs, Ralfs Jefimovs