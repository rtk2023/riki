# 🌍 Ceļojumu Plānotājs

## Projekts - Ievads
````
Ceļojumu Plānotājs ir interaktīva WEB lietotne, kas palīdz lietotājiem atrast piemērotākos ceļojumu galamērķus, balstoties uz individuālām vēlmēm, piemēram, budžetu, ilgumu un interesēm utt.
````
---

## Pārskats
```
Projekts ir realizēts kā klienta puses (frontend) tīmekļa lietotne, kas izmanto statiskus datus (glabātus JSON formātā)
un JavaScript loģiku, lai ģenerētu personalizētus ceļojumu ieteikumus.
```

---

## Arhitektūra
```
Lietotne sastāv no 3 loģiskām daļām:

- Saskarnes slānis. -
Nodrošina lietotāja saskarni un rezultātu attēlošanu.

- Datu slānis. -
Satur galamērķu datubāzi ar paplašinātu informāciju:
pamata parametri 
papildu atribūti 
informatīvie dati
attēli (ārējo URL formātā)

- Loģikas slānis. -
datu ielāde
filtrēšana un vērtēšana
Ieteikumu ģenerēšanu
Nejaušaieteikuma izvēle
Datu saglabāšanu
Dinamisku saskarnes atjaunošanu
```

---
## Direktorija

```
/root
├── index.html
├── styles.css
├── script.js
├── destinations.json
├── README.md
└── js
    ├── main.js
    ├── filter.js
    ├── scoring.js
    └── ui.js
```

---
## Funkcionalitāte
```
> Lietotāja ievades apstrāde.
> Galamērķu filtrēšana pēc kritērijiem.
> Rezultātui vērtēšana.
> Ieteikumu ģenerēšana.
> Iepriekšējā vaicājumaa saglabāšana.
> Attēlu attēlošana.
> Informācijas panelis par galamērķi.
> “Pārsteidz Mani” funkcija.
```
---

## Iespējamie uzlabojumi
```
> Integrācija - API.
> Datu bāzes pieslēgšana.
> Lietotāja kontu sistēma.
> Personalizēti ieteikumi ar NLA algoritmiem.
> Interaktīva karte.
> valodu atbalsts.
> Tumšā/gaišā režīma pārslēgšana.
> Reāllaika ieteikumi bez formas iesniegšanas (pogas nospiešanas) nepieciešamības.
```
---

## Zināmie defekti
```
1) Scroll animācija darbojas, bet nepilnā apjomā (ir nepieciešami nelieli Scroll funkcionalitātes uzlabojumi),
2) "Pārsteidz mani" režīmā izvadāmās informācijas apjoms nav pilns (ir jāpapildina informācija; Jānodrošina izvades datu konsekvence visos režīmos).
```
---

## Resursi
```
> https://developer.mozilla.org/en-US/ (JavaScript, HTML, CSS dokumentācija)
> https://unsplash.com/ (attēlu avots)
> https://fontawesome.com/  (ikonas)
> https://json.org/ (JSON formāta apraksts)
> https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API  (Fetch API)
> https://www.w3schools.com
> https://www.geeksforgeeks.org
> https://uiverse.io/elements
```
---

## 🔗 GitHub 
```
> https://github.com/Arthur-dev1/celojumu-planotajs/tree/main/riki/celojumu_planotajs
> https://arthur-dev1.github.io/celojumu-planotajs-live/
```
---

##  Autori
```
P23-2 Grupa. Autoru n.p.k.: [9], [10].
2026
```
