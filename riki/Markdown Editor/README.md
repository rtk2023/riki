# Markdown Editor

## IEVADS

Markdown Editor ir vienkāršs Markdown formāta teksta ievades rīks, kurā ir iespējams redzēt veiktās izmaiņas kamēr veicot tās.
Tas palīdz ātri un ērti pārbaudīt Markdown sintaksi bez citu programmu palīdzību.

## PĀRSKATS

### ATBALSTĪTIĀ FUNKCIONALITĀTE

- virsraksti (# līdz ######)
- rindkopas
- horizontālā līnija
- citātu bloki
- sakārtoti un nesakārtoti saraksti
- inline kods
- saites
- attēli
- treknraksts, kursīvs un pārsvītrojums
- failu augšupielāde un saglabāšana

### KĀ TAS STRĀDĀ

1. Lietotājs ievada Markdown tekstu vai augšupielādē `.md`/`.txt` failu.
2. Javascript nolasa ievadi un to nosūta apstrādes funkcijai.
3. Teksts tiek pārstrādāts izmantojot regex.
4. Rezultāts tiek izvadīts uz izvades lauka.
5. Lietotājam ir iespēja lejupielādēt pašreizējo saturu kā `.md` failu.


### FAILU STRUKTŪRA
```
Markdown Editor/  
├── index.html 
├── style.css
├── script.js 
├── README.md 
```

- `index.html` markdown dokumenta teksta ievade/izvade.
- `style.css` satur visu vizuālo izskatu rīkam.
- `script.js` apstrādā ievadi un to nosūtu tālāk.


## IESPĒJAMIE UZLABOJUMI

- pievienot tabulu funkcionalitāti
- pievienot sarakstu ligzdošanās atbalstu
- pievienot ievades laukā markdown sintakses izcelšanu
- pielāgot lejupielādētā faila nosaukumu atbilstoši ielādētajam failam

## ZINĀMIE DEFEKTI

- sarežģītāki Markdown gadījumi var tikt interpretēti nepilnīgi, jo parsēšana balstās uz regex
- ligzdoti saraksti un daži kombinēti Markdown bloki var tikt attēloti nepilnīgi

## RESURSI

- Markdown sintakse: [markdownguide.org](https://www.markdownguide.org/basic-syntax/)
- Regex piemēri: [w3schools.com](https://www.w3schools.com/js/js_regexp.asp)

## AUTORI

2026: Jānis Kalvaitis, Reinis Jānis Brencis
