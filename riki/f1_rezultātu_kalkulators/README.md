# F1 Rezultātu Kalkulators
## Ievads
F1 rezultātu kalkulators ir rīks, kas parāda iepriekšējo sacīkšu rezultātus un palīdz aprēķināt punktu skaitu pēc iegūtajām pozīcijām sacīkstēs kā arī ievadīt savus izdomātos rezultātus.

## Pārskats
Projektā tiek izmantots Bootstrap ietvars un OpenF1 API, lai iegūtu ritošos datus par sacensību vietām un čempionāta rezultātiem.
### Projekta arhitektūra
- index.html: Satur pašas lapas struktūru un Bootstrap elementus.
- style.css: Satur lapas stila elementus.
- script.js: Satur visu lapas loģiku, tai skaitā API pieprasījumus, aprēķinus un uznirstošā loga parādīšanos.
- modal.js: Satur modālā loga loģiku (ņemts no piemēra).
- modal.css: Satur uznirstošā loga stilu (ņemts no interneta piemēra)

## Iespējamie uzlabojumi
- Braucēju un komandu titulu līderu saraksts.
- Vēsturisku sacensību un gadu rezultātu apskates vieta.
- Kvalifikācijas rezultātu atspoguļošana noteiktām sacensībām (ja kvalifikācija ir jau notikusi).
### Zināmie defekti
API neatgriež aktuālo informāciju aprīlī, sakarā ar sacensību nenotikšanu - ir hard-coded pēdējā sesija pirms pauzes.

## Resursi
OpenF1 API: <https://openf1.org/docs/#api-endpoints>  
Bootstrap Docs: <https://getbootstrap.com/docs/5.3/getting-started/introduction/>  
Modālā loga piemērs: <https://sjns19.medium.com/making-a-simple-re-usable-modal-dialog-system-using-vanilla-javascript-4eae68b3557c>

## Autori
2026., Ričards Bezbailis, Toms Imbrass, Kristaps Priede, RTK P23-1
















