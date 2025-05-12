# Saules paneļu ietaupījuma kalkulators

## IEVADS
Šis rīks veidots,lai aprēķinātu cik lielu ietaupījumu saules paneļi rada 1 nedēļā. Rīks papildus palīdz isprast, kādi parametri un kādā veidā ietekmē Saules paneļu elektriskās enerģijas ražošanu.

## RĪKA PĀRSKATS
### RĪKA DARBĪBAS APRAKSTS
Programmas galvenās lapas `index.html` formā klientss norāda informāciju par atrašanās vietu, finanšu datiem un paneļu parametriem priekš aprēķinu veikšanas. Pēc rezultātu aprēķināsānas `js/script.js` tiek atvērta `result.html` un demonstrēti aprēķinātie dati.

`js/script.js` mainīgie un funkcijas:
- validācija/ datu aizpildīšana
    - `window.onload = function()` - funkcija, kas aizpilda kas pievieno `<option>` ar valsts kodiem iekš elementa `<select>` ar id='countryCodes' , kad tiek atvērta `index.html` lapa. Šo datu iegūšanai izmanto [RESTful API](https://restcountries.com/#endpoints-code).
    - `formasParbaude()` - funkcija, kas veic formas datu iegūšanu, pārbaudīšanu un nodošanu uz API datu iegūšanas funkcijām. Funkcija arī veic iegūto datu pārbaudi no API funkcijām. Ja pārbaudes laikā nenotiek neviens error, funkcijas beigās tiek izsaukta galvenā aprēķinu veikšanas funkcija `aprekins()`.
    - `pastaInxParbaude()` - funkcija, kas pārbauda vai lietotāja ievadītais pasta indeks is sastopams starp norādītās valsts koda pasta indeksiem. 
- API datu iegūšanas
    - `geoDati()` - funkcija, kas iegūst platuma (`lat`) un garuma (`lon`) datus no [Nominatim API](https://nominatim.org/release-docs/develop/api/Overview/). Šie dati tiek tālāk izmantoti,lai iegūtu konkrētus laikapstākļu datus. 
    - `laikapstakluDati()` funkcija, kas iegūst un saglabā datuma, saullēkta, saulrieta un mākoņainības datus no [Timeline Weather API](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/#introduction-section). Šie dati tiek tālāk izmantoti dienas saražotās elektrības datu aprēķināšanai.
- aprēķins vai noformēšana
    - `datumi()` - funkcija, kas atrod/aprēķina datumus (šodienas un 7. dienas pēc šodienas) un tos noformē priekš laikapstākļu iegūšanas.
    - `aprekins()` -  funkcija, kas veic saules paneļu ietaupījuma, saražotās jaudas un saražotās enerģijas pārpalikumu (gan nedēļai, gan katrai dienai atsevišķi)
    - `dateFormat()` - funkcija, kas pārveido datumus no YYYY-MM-DD formāta uz DD.MM.YYYY. 
    - `timeToValue()` - funkcija, kas pārveido datumu uz skaitlisku vērtību priekš aprēķinu veikšanas
- Globālie mainīgie
    - `dayData[]` - globāls masīvs, kurā tiek saglabāti iegūtie dati par šo un nākamo 6 dienu laikamstākļu datiem [Zipcodestack API](https://zipcodestack.com/) `pastaInxParbaude()` funkcijā.  

`result.html` iekļautais skripts nodrošina šī HTML faila elementu aizpildīšanu ar aprēķinātajiem datiem.

### APRĒĶINA DARBĪBAS
dayPaterins = menesaRekins/Ec/30  

> **dayPaterins** - apuvenais 1 dienas elektrības patērīņš    
**menesaRekins** - vidējais mēneša rēķins  
**Ec** - Elektroenerģijas cena  
**30** - dienas mēnesī (vidēji)  
  
maxP = (sunsetNumberValue - sunriseNumberValue) * paneluOrientacija * panelaJauda  

> **maxP** - maksimālais saražotās elektroenerģijas daudzums  
**sunsetNumberValue, sunriseNumberValue** - saullēkta un saulrieta stundu skaitliskās vērtības   
**paneluOrientacija** - paneļu orientācijas pret D ietekmes %  
**panelaJauda** - uzstādītā paneļu jauda  

cloudP = maxP * cloudiness * 0.2  

> **cloudP** - mākoņainā laikā saražotā enektroenerģija  
**maxP** - maksimālais saražotās elektroenerģijas daudzums  
**cloudiness** - dienas mākoņainās daļas %  
**0.2** - mākoņainības ietekmes %  

shadeP = maxP * (1 - cloudiness) * E  

> **shadeP** - saulainā laikā saražotā enektroenerģija ar ēnojuma ietekmi    
**maxP** - maksimālais saražotās elektroenerģijas daudzums  
**(1 - cloudiness)** - dienas saulainās daļas %    
**E** - ēnojuma ieteekmes % (ja ir ēnojums E=0.75, ja nav E=1)  

dayP = cloudP + shadeP  

> **dayP** - dienā kopējā saraažotā enerģija  
**cloudP** - mākoņainā laikā saražotā enektroenerģija  
**shadeP** - saulainā laikā saražotā enektroenerģija ar ēnojuma ietekmi  

dayIetaup = dayP * Ec  

> **dayIetaup** - dienā saražotās enerģijas cena jeb dienā ietaupītā summa no saražotās elektroenerģijas  
**dayP** - dienā kopējā saraažotā enerģija  
**Ec** - elektroenerģijas cena  

SEP = dayP - dayPaterins < 0 ? _0 : dayP - dayPaterins_  

> **SEP** - Saražotās enerģijas pārpalikums  
_vērtība_ - ja (dayP - dayPaterins) starpība ir negatīva vai 0, tad pārpalikums nav (jeb tā vērtība ir 0), bet ja starpība ir lielāka par 0, tad saglabā starpības rezultātu.  

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
Rīkam ir vairāki iespējamie uzlabojumi, ņemot vērā to, ka saules paneļu saražoto enerģiju ietekmē vairāki un dažādi nelineāri faktori (paneļu, apkārtējās vides, laikapstākļu, u. c.), kuri nav aprēķināti/iegūti tikt detalizēti. Tas nodrošinātu precīzāku rīka aprēķinātās potenciālās saražotās ektroenerģijas paredzēšanu. 

Šie potenciālie rīka uzlabošanas veidi ir:
- laikapstākļi (precīzāku mākoņu veidu ietekmi);
- saules paneļu modeļi (materiāla ietekme, veidi - parastie, rotējoši, divpusējie);
- gadalaiku ietekme (saules leņķis virs horizonta);
- paneļu kopšana (regulāra putekļu tīrīšana, sniega tīrīšana - ziemā);
- paneļu savstarpējais savienojums (paralēli, virknē);
- grafiski attēloti rezultāti;
- mēneša ietaupījuma aprēķināsāna;
- precīzāki ēnojuma procenti (attiecība starp paneļu platību un ēnojuma platību);
- vietas, paneļa leņķa un saules novietojums max orbītā savstarpējā ietekme;
- saražotā enerģija dienā (precīzāk ar datiem pa stundām no API datiem);
- temperatūrs ietekme uz paneļu saražoto enerģiju;
- saldo princips (ja tāds klientam noslēgts).  

### ZINĀMIE DEFEKTI
- Kalkulatora aprēķinātie rezultāti nav precīzi, bet gan aptuveni, jo vairāki parametri ir uzskatīti lineāri. Patiesībā lielākā daļa ir nelineāri (saules novietojums virs horizonta, laikapstākļi, elektrības tariga cena, uc.). Saistībā ar to - paneļu leņķa daļa ievades formā ir lieka.
- Sakarā ar to, ka kalkulatora datus varējām salīdzināt ar maz datiem (tikai vieniem saules paneļu datiem no Latvijas), tapēc nav pārbaudīts cik precīzi aprēķina saules paneļu saražoto elektrību nav pārbaudits, kā citu pasaulē
- Savigācija izmantojot '<-' un '->' internetpārlūkprogrammas pogas, dati tiek saglabāti un dažreiz izraisa error.


## RESURSI
Izmantotie API: 
- [Timeline Weather API](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/#introduction-section) (nepieciešama API atsēga) - laikapstākļu datu iegūšanai
- [Nominatim API](https://nominatim.org/release-docs/develop/api/Overview/) (nav nepieciešama API atsēga) - ģeogrāfisko datu iegūšanai
- [Zipcodestack](https://zipcodestack.com/) (nepieciešama API atsēga, mazs limits) - pasta indeksu datu validācijai
- [RESTful API](https://restcountries.com/#endpoints-code) (nav nepieciešama API atsēga) - valstu kodu datu iegūšanai

Materiāli saules paneļu energījas ražošanas ietekmējošo faktoru izprašanai:
- https://www.solarshop.lv/blogs-un-jaunumi/ 

**Autori**  
2025: Laila Bicāla, Kristers Patriks Feldbergs, Ralfs Jefimovs