# Powerliftinga Kalkulators

## Ievads
Powerliftinga Kalkulators ir rīks, kas palīdz powerlifteriem un citiem spēka sportistiem aprēķināt savus 1RM (viena maksimālā atkārtojuma) rezultātus, salīdzināt tos ar dažādu federāciju normatīviem un plānot savu treniņu procesu, izmantojot kaloriju aprēķinus un svara kategoriju datus.

## Pārskats
Projekts ir veidots kā interaktīva tīmekļa lietotne, izmantojot HTML, CSS un JavaScript ar jQuery. Tā sastāv no trīs galvenajām daļām:

1. **Normatīvu Kalkulators** - Ļauj lietotājiem aprēķināt savu 1RM un salīdzināt to ar dažādu federāciju normatīviem
2. **Kaloriju Kalkulators** - Palīdz sportistiem aprēķināt nepieciešamo kaloriju daudzumu atkarībā no mērķiem
3. **Pilnas Tabulas** - Parāda pilnu normatīvu tabulu dažādām federācijām un vingrojumiem

### Failu struktūra

```
PowerliftingaKalkulators/
├── css/
│   └── style.css           # Lietotnes stila fails
├── js/
│   ├── app.js              # Galvenais lietotnes inicializācijas fails
│   ├── calorie-calculator.js # Kaloriju kalkulatora funkcionalitāte
│   ├── norm-calculator.js  # Normatīvu kalkulatora funkcionalitāte
│   ├── norms.js            # Normatīvu datu bāze
│   ├── tables.js           # Normatīvu tabulu funkcionalitāte
│   └── utilities.js        # Kopīgās utilītfunkcijas
├── index.html              # Galvenā HTML lapa
└── README.md               # Projekta dokumentācija
```

### Funkcionalitātes pārskats

1. **Normatīvu Kalkulators**:
   - Ķermeņa svara ievade
   - Vingrinājuma izvēle (spiešana guļus, pietupieni, vilkme, utt.)
   - Federācijas izvēle ar vai bez dopinga kontroles
   - 1RM aprēķins, pamatojoties uz darba svaru un atkārtojumu skaitu
   - Normatīvu salīdzinājums un sasniegtā līmeņa noteikšana

2. **Kaloriju Kalkulators**:
   - Personīgās informācijas ievade (dzimums, vecums, svars, augums)
   - Aktivitātes līmeņa izvēle
   - Mērķu noteikšana (konkrēts svars vai svara kategorija)
   - Kaloriju aprēķins un svara izmaiņu prognozes
   - Laika grafika vizualizācija

3. **Pilnas Tabulas**:
   - Pilnu normatīvu tabulu skatīšana dažādām federācijām
   - Filtrēšana pēc vingrinājuma veida un dopinga kontroles statusa

## Iespējamie uzlabojumi
1. Pievienot vairāk vingrinājumu normatīvus
2. Izveidot personīgo progresa sekošanas sistēmu
3. Pievienot sieviešu normatīvus
4. Pielāgot lietotāja saskarni mobilajām ierīcēm

## Zināmie defekti
Pašlaik nav zināmu defektu, visi iepriekš konstatētie ir laboti. Ja atrodat kādu problēmu, lūdzu, ziņojiet par to projekta autoriem.

## Resursi
- [FRS24.ru](http://frs24.ru) - Detalizēta informācija par dažādu federāciju normatīviem un svara kategorijām
- [Cleveland Clinic - BMR Formula](https://my.clevelandclinic.org/health/body/basal-metabolic-rate-bmr) - Informācija par bazālā metaboliskā ātruma aprēķināšanu

## Autori
- 2025: Rostislavs Berjoza, Roberts Assarovskis, Ritvars Pučurs
