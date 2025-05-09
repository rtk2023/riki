# 🎧 **Moodify** — Mūzika pēc noskaņas

## Ievads

**Moodify** ir vienkārša tīmekļa lietotne, kas ieteic mūziku, balstoties uz lietotāja izvēlēto noskaņojumu. Papildu funkcionalitāte — "Peep Mode" — ļauj atskaņot Lil Peep labākos skaņdarbus īpašā stilā.

## Pārskats

Projekts sastāv no HTML, CSS un JavaScript failiem, kas kopā veido interaktīvu tīmekļa aplikāciju. Tiek izmantots [Deezer API](https://developers.deezer.com/) mūzikas meklēšanai un atskaņošanai.

### Arhitektūra

- **HTML (`index.html`)**: Satur visas galvenās struktūras — galveni, vadības paneļus, atskaņotāju laukumu un kājeni.
- **CSS (`css/style.css`)**: Stils (nav pilnībā iekļauts šeit), kas nosaka izskatu, t.sk. tumšais režīms un pielāgots “Peep Mode”.
- **JS (`js/script.js`)**:
  - Vada mūzikas meklēšanu un atskaņošanu, pamatojoties uz lietotāja noskaņojuma izvēli.
  - Realizē "Peep Mode" — īpašu režīmu, kurā tiek parādīti Lil Peep populārākie skaņdarbi.
  - Ietver:
    - Audio kontroles (play, pauze, progress bar, skaļuma kontrole).
    - Playlistu ielādi ar kešatmiņu.
    - AJAX pieprasījumus uz Deezer API.
    - Tumšā režīma pārslēgšanu.

### Failu struktūra

```
mūzikas_ieteikums/
├── css/
│   └── style.css           # Lietotnes stila fails
├── js/
│   └── script.js        # Kopīgās utilītfunkcijas
├── index.html              # Galvenā HTML lapa
└── README.md               # Projekta dokumentācija
```

## Iespējamie uzlabojumi

- 🎨 Pievienot vairāk dizaina tēmas un animācijas pārejām.
- 📱 Pielāgot mobilajām ierīcēm (responsive dizains).
- 🎶 Integrācija ar Spotify API vai YouTube API paplašinātam saturam.
- 💬 Pievienot iespēju komentēt vai saglabāt ieteiktās dziesmas.
- 🔍 Uzlabota filtrēšana pēc žanriem vai valodas.

## Zināmie defekti

- 🔄 Jauna playlistes izvēle katru reizi var dublēties — nav iespējas pārskatīt vēsturi.
- ⚠️ Dažkārt Deezer API neatsūta pilnvērtīgu datus (piemēram, nav pieejams `preview`).
- ❌ "Peep Mode" izmanto tikai vienu statisku izpildītāju (Lil Peep) — nav konfigurējams.

## Resursi

- [Deezer API dokumentācija](https://developers.deezer.com/)
- [Bootstrap 5 dokumentācija](https://getbootstrap.com/)
- [Font Awesome ikonas](https://fontawesome.com/)
- [jQuery](https://jquery.com/)

## Autori

- 2025: Martins Osīts & Nikita Belosheev
- RTK audzēkņi
