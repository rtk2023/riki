# Banki
## Kas is Banki?

Banki\
│└── Anki\
└─── "better"

Banki ir skolas projekts. Tā ir lietotājpuses tīmekļa lietojumprogramma, kas ļauj izveidot personalizētas kartiņas ar jautājumiem un atbildēm. 

Banki galvenais mērķis ir palīdzēt skolēniem, studentiem vai jebkuram, kurš sastopās ar grūtībām apgūt jaunas zināšanas.

## Sistemas apraksts

### Failu struktūra

```bash
Banki
├── Assets
│   ├── Fonts
│   │   └── JetBrainsMono-Medium.ttf
│   └── favicon.png
├── CSS
│   ├── globals.css
│   ├── index.css
│   ├── deck-page.css
│   ├── deck-editor.css
│   └── quizz-are.css
├── general.js
├── index.html
└── README.md
```

#### 1. HTML

Viss HTML saturs ir apveienots **index.html** faila, jo tā apjoms ir salīdzinoši neliels un tādā veidā noveršot vizuālus defektus lādējot noteiktus lietumprogrammas segmentus. Šo segmentu "ielāde" norisinās mainot *display* stila vertības no "none" uz "flex" vai "grid".

#### 2. CSS

Ņemot vērā CSS koda apjomu, tas tika sadalīts vairākās daļās:

- "globals.css" satur visas globālās vērtības un stilizējumus, kas tiek piešķirti HTML elementiem pēc noklusējuma,
- "index.css" satur satur lapas kalveno un nemainīgo elementu stilizējumus kā piemēram kavu sarakstam vai navigācijas ailei,
- "deck-page.css" satur stilizējuma vērības kavu atlasīšnas sadaļai, 
- "deck-editor.css" satur stilizējuma vērtības kavu redigēšanas sadaļāi,
- "quizz-are.css" satur stilizējuma vērtības testēšanas sadaļai. 

#### 3. JavaScript

Visu lietumprogrammas funkcionalitāti nodrošina **general.js** JavaScript fails, kas satur visas funkcijas, kuras izsauc HTML elementi.

#### 4. Papildus datnes

Papildu dati un faili tik uzglabāti **Assets** folderī. Tas satur Jetbrains Mono fonta failu un mājaslapas "favicon". Šos failus nav iespējams ievietot dinamiski no arējiem resursiem, tādēļ tie tiek glabāti lokāli.

### Datu glabāšana

Kavu dati kopā ar kartiņu datiem glabājas pārlūka lokālajā glabātuvē, JSON obejkta veidā.
Atlasīto kavu un kartiņu izsekosāna tiek veikta glabājot to attiecīgās vērtības sesijas glabātuvē.

### Programmas defekti

Lietojumprogramma ir pilnīgā darba kārtībā. Testēšanas laikā, visas atrastā nepilnības, ir izlabotas.

### Veicamie uzlabojumi

Uzlabot iespejams ir kavu eksportēšanu un importēšanu, piemēram, eksportējot failam piešķirt noteiktu nosaukumu un speciifisku kavu izvēli.

## Izmantošana

Glavenais projekta fails ir **index.html**, kuru atverot lietotājs iegūst pieeju lietojumprogrammai.

Ekrāna kreisajā pusē sarakstā, atlasot kavu, var izvēlēties vai to rediģēt (mainit nosaukumu, aprakstu, pievienot kartiņas vai tās rediģēt) vai dzēst. Atlasot kavu var uzsākt arī testēšanu.

### Rediģēšana

Rediģēšanas sadāļā pirmajās ailēs var mainīt kavas nosaukumu un aprakstu. Atlasot noteiku kartiņu, paradās ievades forma, kurā var rediģēt kartiņas jautājumu vai atbildi. Rediģēšanas laikā izmaiņas tiek saglabātas tikai pēc pogas ```Saglabāt``` nospiešanas.

### Testēšana

Testēšanu uzsākt var noklikšķinot uz zaļā laukuma ```Sākt``` pēc kavas atlasīšanas. Testa uzsākšanas brīdī uz ekrāna parādās kartiņa ar jautājumu. Uz tās nospiežot parādās atbilde. Ekrāna labajā pusē nospiežot uz pogas ar bultiņu, kartiņas saturs nomaināš uz nākamās kartiņas jautajumu un atbildi, un testēšanas cikls turpinās.

### Kavu eksportēšana un importēšana

Kavas ir iespējams eksportēt un importēt, nospiežot attiecīgās pogas: ```Eksportē kavas``` un ```Importēt kavas```, ekrāna agušējā kreisajāpusē.

## Projekta izveidē izmantotie resursi

- [Stack Overflow](https://stackoverflow.com)
- [Reddit](https://www.reddit.com)
- [W3Schools](https://www.w3schools.com/)
- [W3 validator](https://validator.w3.org/)
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)

## Autori

**RTK** P2-3 kursa audzēknis