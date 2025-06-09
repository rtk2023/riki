# Darba stundu kalkulators – dokumentācija

## Ievads
Darba stundu kalkulators ir tīmekļa lietojumprogramma, kas ļauj lietotājiem ērti aprēķināt nostrādātās darba stundas izvēlētā periodā, ņemot vērā nedēļas nogales, svētku dienas, kā arī individuāli pielāgotas darba vai brīvdienas.

## Pārskats
Izstrādātā sistēma sastāv no viena HTML faila (`index.html`), kurš satur:
- Lietotāja saskarni (UI) datumu, darba dienu un darba stundu ievadei.
- FullCalendar bibliotēkas izmantošanu kalendāra vizualizācijai.
- Funkcionalitāti, kas ļauj:
  - Norādīt sākuma un beigu datumu.
  - Definēt, kuras nedēļas dienas tiek uzskatītas par darba dienām.
  - Manuāli pievienot īpašas darba dienas un brīvdienas.
  - Redzēt aprēķināto darba dienu un stundu kopsummu.
- Sistēma automātiski ņem vērā Latvijas oficiālās svētku dienas, kuras tiek attēlotas kalendārā.

Projekta arhitektūra:
- **HTML daļa**: struktūra un kalendāra izvietojums.
- **CSS daļa**: dizains un noformējums.
- **JavaScript daļa**: visa loģika datumu apstrādei un kalendāra funkcionēšanai.

Tehnoloģijas:
- HTML5, CSS3, JavaScript (bez backend servera).
- FullCalendar v5.10 bibliotēka.
- date-holidays funkcionalitāte integrēta manuāli, lai uzskaitītu Latvijas svētku dienas.

## Iespējamie uzlabojumi
- Pievienot datu saglabāšanu lokāli (LocalStorage) vai serverī, lai lietotājs varētu saglabāt savu grafiku.
- Atbalsts dažādiem darba modeļiem (piemēram, maiņu darbs, nepilns darba laiks).
- Automātiska sinhronizācija ar Google Calendar vai līdzīgām kalendāru sistēmām.
- Iespēja eksportēt darba stundu aprēķinu uz PDF vai Excel failu.

**Zināmie defekti (bugs):**
- Ja lietotājs ievada nekorektus datumus (piemēram, beigu datums pirms sākuma datuma), sistēma brīdina, taču nav pilnas validācijas pret visām kļūdām.
- Neatbalsta mobilo ierīču ļoti mazos ekrānus ideāli (CSS varētu būt uzlabojams).

## Resursi
- [FullCalendar dokumentācija](https://fullcalendar.io/docs)
- [MDN Web Docs (JavaScript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Date Holidays saraksts](https://date.nager.at/)

## Autori
Gads: 2025  
Autori: Semjons Komarovs, Andrejs Švabs
Grupa: P2-3