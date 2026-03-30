# Ieradumu Sekotājs

## Ievads

Vienkārša tīmekļa vietne, kas ļauj lietotājam sekot līdzi ikdienas ieradumiem, piemēram, ūdens dzeršanai, treniņiem vai lasīšanai. Vietne piedāvā iespēju pievienot ieradumus, atzīmēt to izpildi un saglabāt progresu.

## Pārskats

Projekts sastāv no 4 failiem:

### `index.html`

Galvenā HTML struktūra, kurā atrodas:
- Ievades lauks jauna ieraduma pievienošanai
- Poga “Pievienot ieradumu”
- Konteiners, kurā tiek attēloti ieradumu bloki
- Ielādē ārējos failus: `styles.css`, `habits-main.js` un `habits-ui.js`

### `styles.css`

Stila fails, kas nodrošina vienkāršu un skaidru dizainu.  
Galvenās iezīmes:
- Katrā ieraduma bloka stilizācija: rāmis, fons, ikonas
- Pārskatāmi taustiņi, pārslēgšanas efekti
- Elastīgs dizains, kas piemērots arī mobilajām ierīcēm

### `habits-main.js`

JavaScript fails, kas satur ieraduma pārvaldības loģiku:

#### Attēlošana

- Aktivizē renderētājus(`renderAll`)
- Sadala ieradumus "Aktīvajos" un "Pabeigtajos" pēc kategorijā(`renderHabits`)
- Ģenerē katra ieraduma HTML kartīti(`createHabitCard`)
- Grupē kartītes pēc kategorijas un stāvokļa(`renderHabitGroup`)
- Attēlo kategoriju krāsas un to pārvaldību(`renderCategoryColors`)
- Piepilda jauna ieraduma formu ar kategoriju izvēli.(`populateCategorySelect`)

#### Darbības ar ieradumiem

- Pārslēdz vai atceļ ieraduma atzīmi šodienai(`toggleHabitCompletion`)
- Dzēš konkrētu ieradumu(`deleteHabit`)

#### Kategoriju pārvaldība

- Veido, dzēš un maina krāsas(`addNewCategory`, `deleteCategory`, `changeCategoryColor`)

#### Statistika

- Analizē, cik ieradumi izpildīti konkrētā periodā(`calculateStats`)
- Attēlo rezultātus diagrammā (Chart.js).(`renderStats`)
- Pārslēdz statistikas laika periodu(`showStats`)

### `calendar.js`

Javascript fails, kas apstrādā modernā kalendāra funkcionalitāti:

- Kalendāra attēlošana izvēlētajam mēnesim (`renderModernCalendar`)
- Mēneša maiņa uz priekšu un atpakaļ (`nextMonthModern`, `prevMonthModern`)
- Ieradumu statusa attēlošana
- Kalendārā atšķir šodienu un pagātnes/nākotnes dienas

Kalendārs parāda arī iepriekšējā mēneša pēdējās dienas, lai sākums vienmēr būtu no pirmdienas

## Iespējamie uzlabojumi

- Kalendāra skats ar plašāku mēneša pārskatu
- Ieradumu kategorizēšana (piemēram: fiziskais, mentālais u.c.)
- Progresu statistika ar grafikiem
- Notifikācijas vai e-pasta atgādinājumi
- Krāsas uzstādīšana ar paleti, nevis HEX skaitli

## Zināmie defekti

- Atsvaidzinot lapu, visi dati pazūd
- Ja pievieno pārāk daudz ieradumu, dizains kļūst nepārskatāms (scroll nav optimizēts)
- Nav validācijas tukšiem vai dublētiem ieradumiem
- Pievienojot jaunu ieradumu un uzstādot atkārtošanās biežumu nedēļa vai mēnesis, ieradums netiek pievienots
- Ieejot lapā, sērija(Streak) rādās jau 30

## Resursi

- HTML5 localStorage dokumentācija: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage  
- FontAwesome ikonu bibliotēka: https://fontawesome.com  
- Iedvesma ieradumu sekotāju dizainiem: https://dribbble.com/tags/habit_tracker

## Autori

2025: RTK audzēkņi