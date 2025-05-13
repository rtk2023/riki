# Ieradumu Sekotājs

## Ievads

Vienkārša tīmekļa vietne, kas ļauj lietotājam sekot līdzi ikdienas ieradumiem, piemēram, ūdens dzeršanai, treniņiem vai lasīšanai. Vietne piedāvā iespēju pievienot ieradumus, atzīmēt to izpildi un saglabāt progresu.

## Pārskats

Projekts sastāv no trīs failiem:

### `index.html`

Galvenā HTML struktūra, kurā atrodas:
- Ievades lauks jauna ieraduma pievienošanai
- Poga “Pievienot ieradumu”
- Konteiners, kurā tiek attēloti ieradumu bloki
- Ielādē ārējos failus: `styles.css` un `app.js`

### `styles.css`

Stila fails, kas nodrošina vienkāršu un skaidru dizainu.  
Galvenās iezīmes:
- Katrā ieraduma bloka stilizācija: rāmis, fons, ikonas
- Pārskatāmi taustiņi, pārslēgšanas efekti
- Elastīgs dizains, kas piemērots arī mobilajām ierīcēm

### `app.js`

JavaScript fails, kas apstrādā visu loģiku:
- Ieradumu pievienošana (`addHabit`)
- Ieradumu attēlošana (`renderHabits`)
- Progresu pārslēgšana (`toggleDay`)
- Datu saglabāšana un ielāde no `localStorage`
- Dati tiek glabāti kā JSON objekti lietotāja pārlūkā

Struktūra ir vienkārša un saprotama, padarot kodu viegli papildināmu un uzturamu.

## Iespējamie uzlabojumi

- Kalendāra skats ar plašāku mēneša pārskatu
- Ieradumu kategorizēšana (piemēram: fiziskais, mentālais u.c.)
- Progresu statistika ar grafikiem
- Datu eksportēšana / importēšana
- Notifikācijas vai e-pasta atgādinājumi
- Krāsas uzstādīšana ar paleti, nevis HEX skaitli

## Zināmie defekti

- Ja pārlūks izdzēš `localStorage`, visi dati tiek zaudēti
- Ja pievieno pārāk daudz ieradumu, dizains kļūst nepārskatāms (scroll nav optimizēts)
- Nav validācijas tukšiem vai dublētiem ieradumiem
- Pievienojot jaunu ieradumu un uzstādot atkārtošanās biežumu nedēļa vai mēnesis, ieradums netiek pievienots

## Resursi

- HTML5 localStorage dokumentācija: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage  
- FontAwesome ikonu bibliotēka: https://fontawesome.com  
- Iedvesma ieradumu sekotāju dizainiem: https://dribbble.com/tags/habit_tracker

## Autori

2025: RTK audzēkņi