# Autovadītāja teorijas treniņa tests 

## Ievads
Šis ir treniņa rīks, kas palīdz sagatavoties CSDD autovadītāja teorijas eksāmenam. Tas satur 50 jautājumus B kategorijai un 30 jautājumus A kategorijai. Lietotājs var izvēlēties kategoriju, atbildēt uz jautājumiem ar attēliem un saņemt tūlītēju atgriezenisko saiti par savu rezultātu. Rīks izveidots praktiskā darba ietvaros.

## Pārskats
Rīks sastāv no trim galvenajiem failiem:
- `index.html` – lapas struktūra un saturs.
- `style.css` – vizuālais noformējums, krāsas, izkārtojums un responsivitāte.
- `script.js` – visa JavaScript loģika: jautājumu masīvi, atbilžu pārbaude, taimeris, rezultātu aprēķins.

**Darbības princips:**
1. Lietotājs izvēlas kategoriju (B vai A).
2. Tiek parādīts sākuma ekrāns ar informāciju par jautājumu skaitu un laiku.
3. Pēc testa sākuma tiek iedarbināts taimeris (25 min B kat., 15 min A kat.).
4. Katrs jautājums tiek attēlots kopā ar atbilžu variantiem un attēlu (ja tāds ir).
5. Izvēloties atbildi, pareizā atbilde tiek iezīmēta zaļā krāsā, nepareizā – sarkanā.
6. Beigās tiek parādīts rezultāts – pareizo atbilžu skaits, procenti un ziņa par to, vai eksāmens būtu nokārtots.

Visi ekrāni (kategorijas izvēle, sākuma ekrāns, testa ekrāns, rezultātu ekrāns) tiek slēpti un rādīti dinamiski, izmantojot CSS klasi `active`.

## Iespējamie uzlabojumi
- Pievienot iespēju pārtraukt testu un saglabāt progresu.
- Izveidot vairāk jautājumu variantu un tos nejauši atlasīt no lielākas datubāzes.
- Pievienot skaņas signālus, kad tuvojas laika beigas.
- Izveidot administratora paneli jaunu jautājumu pievienošanai.
- Izvediot profilu izveidošanu un piereģistrēšanos.
- Izveidot "Leader board", kur parāda lietotājus ar visvairāk 100% gājieniem un atsevišķu priekš ātrakajiem laikiem, portams katrai kategorijai savi.
- Pievienot vēl kategorijas.

## Zināmie defekti
- Pašlaik visi jautājumi ir iekļauti tieši JavaScript masīvos, tāpēc tos nevar ērti rediģēt bez programmēšanas zināšanām.
- Taimeris turpina skaitīt laiku pat tad, ja pārlūkprogrammas cilne nav aktīva (tas ir standarta uzvedība, bet varētu pievienot pauzēšanu).
- Rezultātu ekrānā vienmēr tiek rādīts, vai lietotājs veiksmīgi izpildija eksāmenu, bet netiek saglabāta vēsture.
- Neizmantoju labāku, vēlamo metodi, lai importētu bildes.

## Resursi
Izstrādē izmantotie resursi un noderīgas saites:
- [Google Fonts (Rajdhani, Source Sans 3)](https://fonts.google.com/)
- [W3C HTML validators](https://validator.w3.org/)
- [CSS validators](https://jigsaw.w3.org/css-validator/)
- [Google Lighthouse](https://pagespeed.web.dev/)
- [MDN Web Docs (JavaScript pamācības)](https://developer.mozilla.org/lv/)
- [Rīku saraksts (RTK2023)](https://rtk2023.github.io/riki/)
- [Projekta GitHub repozitorijs](https://github.com/rtk2023/riki)

## Autori
2026: Dominiks Zaikovskis, Filips Bībers P23-2
