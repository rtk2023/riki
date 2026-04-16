# F1 Rezultātu Kalkulators
## Ievads
F1 rezultātu kalkulators ir rīks, kas parāda iepriekšējo sacīkšu rezultātus un palīdz aprēķināt punktu skaitu pēc iegūtajām pozīcijām sacīkstēs kā arī ievadīt savus izdomātos rezultātus.

## Pārskats
Projektā tiek izmantots Bootstrap ietvars un OpenF1 API, lai iegūtu ritošos datus par sacensību vietām un čempionāta rezultātiem.
- index.html: Satur pašas lapas struktūru un Bootstrap elementus.
- style.css: Satur lapas stila elementus.
- script.js: Satur visu lapas loģiku, tai skaitā API pieprasījumus, aprēķinus un uznirstošā loga parādīšanos.
- modal.js: Satur modālā loga loģiku (ņemts no piemēra).
- modal.css: Satur uznirstošā loga stilu (ņemts no interneta piemēra)

## Iespējamie uzlabojumi
Braucēju un Komandu titulu līderu saraksts.
Vēsturisku sacensību un gadu rezultātu apskates vieta.
### Zināmie defekti
Alberts un Epšteins komandā (toms un kristaps) - Ričards Bezbailis (18 gadi) 16.04.2026 13:25
API neatgriež aktuālo informāciju aprīlī, sakarā ar sacensību nenotikšanu - ir hard-coded pēdējā sesija pirms pauzes.

##Resursi
OpenF1 API: <https://openf1.org/docs/#api-endpoints>
Bootstrap Docs: <https://getbootstrap.com/docs/5.3/getting-started/introduction/>

## Autori
2026., Ričards Bezbailis, Toms Imbrass, Kristaps Priede, P23-1
















