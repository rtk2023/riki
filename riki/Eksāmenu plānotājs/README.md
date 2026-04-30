# Eksāmenu plānotājs

## Ievads

Šis rīks palīdz skolēniem plānot gatavošanos eksāmeniem, sadalot tēmas, sekojot progresam un pārbaudot zināšanas ar mini testiem.

---

## Pārskats

Projekts ir vienkārša tīmekļa lietotne, kas izstrādāta, izmantojot HTML, CSS un JavaScript.

### Arhitektūra

* Frontend lietotne (bez backend)
* Datu saglabāšana notiek pārlūkprogrammā, izmantojot `localStorage`
* Lietotne sastāv no 3 “slaidiem” (ekrāniem):

  1. Datu ievade (klase, eksāmens, datums, stundas)
  2. Plāns un progress
  3. Tēmas detalizēts skats (teorija + tests)

### Failu struktūra

* `index.html` — galvenā lapa un struktūra
* `style.css` — dizains (tema, fons, layout)
* `script.js` — loģika (plāns, progress, testi, saglabāšana)

### Galvenā funkcionalitāte

* Eksāmenu izvēle (matemātika, angļu, latviešu)
* Tēmu saraksts katram eksāmenam un klasei
* Progress katram eksāmenam atsevišķi
* Poga “Esmu iemācījies”
* Mini testi katrai tēmai
* Automātiska tēmas maiņa (gaišā/tumšā)
* Datu saglabāšana (progress netiek zaudēts)

---

## Iespējamie uzlabojumi

* Kalendārs ar mācību plānu pa dienām
* Lietotāja kontu sistēma (login/registration)
* Vairāki jautājumi katrai tēmai
* Punktu (XP) un līmeņu sistēma
* Push paziņojumi vai atgādinājumi
* Detalizētāka statistika par progresu

---

## Zināmie defekti

* Tēmu skaits ir ierobežots (nav pilns eksāmenu saturs)
* Testi satur tikai vienu jautājumu katrai tēmai
* Nav validācijas visiem ievades laukiem
* Dizains nav pilnībā pielāgots mobilajām ierīcēm

---

## Resursi

* https://www.w3schools.com/ — HTML, CSS un JS pamācības
* https://www.uzdevumi.lv/— mācību materiāli un uzdevumi
* https://chatgpt.com/- to izmantoja, lai aizpildītu tēmas ar tekstu, un izdomāja uzdevumus (ar ko gan neizdevās pārāk labi tikt galā) 
* https://github.com/rtk2023/riki

---

## Autori

2026: RTK audzēknis
