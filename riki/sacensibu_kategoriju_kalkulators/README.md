# Sacensību kategoriju kalkulators

## Ievads

Rīks paredzēts cīkstoņiem un treneriem, lai ātri noteiktu pareizo svara kategoriju un vecuma grupu atbilstoši dzimšanas gadam, svaram un cīņas veidam. Papildus kalkulatoram lietotājs var apskatīt tuvāko sacensību sarakstu, iepazīties ar pasaules un Latvijas rekordiem, kā arī saņemt nejaušu motivācijas citātu.



## Pārskats

### Projekta arhitektūra

Projekts ir vienas lapas statiska tīmekļa lietotne , kas darbojas tikai pārlūkprogrammā — bez servera puses loģikas vai datubāzes.

```
/
├── sacensibu_kategoriju_kalkulators.html   # Galvenā HTML lapa
├── script.js                               # Visa lietotnes loģika (JS)
└── style.css                               # Vizuālais noformējums
```

### Funkcionalitāte

- Svara, dzimšanas gada un dzimuma ievade
- Automātiska vecuma grupas noteikšana
- Svara kategorijas aprēķins
- Validācija (ievades pārbaude)
- Motivācijas sistēma ar nejaušiem citātiem
- Sacensību un rekordu informācijas bloki



## Iespējamie uzlabojumi

- Datubāzes pievienošana sacensībām (dinamisks saturs)
- Lietotāja profili un saglabāti rezultāti
- Tumšais režīms (dark mode)
- Mobilās aplikācijas versija
- Grafiska svara progresijas analīze
- Filtri sacensībām pēc valsts / datuma



## Zināmie defekti

- Sacensību dati ir statiski (nav automātiskas atjaunošanas)


## Resursi

- [Bootstrap 5 dokumentācija](https://getbootstrap.com/docs/5.3/)
- [Bootstrap 5 modālie logi](https://getbootstrap.com/docs/5.3/components/modal/)
- [Latvijas Cīņas federācija](https://www.latwrestling.lv)


## Autori

2026: RTK audzēknes