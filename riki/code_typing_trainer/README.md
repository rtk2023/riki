# Code Typing Trainer

`Code Typing Trainer` ir pārlūkā darbināma rakstīšanas treniņu lietotne, kas paredzēta JavaScript koda rakstīšanas prasmju uzlabošanai. Tā ļauj trenēties ar reāliem koda fragmentiem dažādās grūtības pakāpēs, izvēlēties vairākus spēles režīmus un sekot līdzi jaunākajiem rezultātiem, kas tiek saglabāti lokāli pārlūkā.

## Projekta mērķis

Programmas galvenais mērķis ir palīdzēt lietotājam ātrāk un precīzāk rakstīt programmēšanas sintaksi, ne tikai parastu tekstu. Atšķirībā no klasiskām typing lietotnēm, šeit tiek izmantoti JavaScript piemēri ar:

- funkcijām;
- masīvu un objektu apstrādi;
- `reduce`, `map`, `filter` un citām metodēm;
- klasēm;
- asinhrono kodu;
- vairākrindu fragmentiem.

Tas palīdz trenēt gan pirkstu atmiņu, gan spēju ātri orientēties programmēšanas konstrukcijās.

## Galvenās iespējas

- Lietotājvārda ievade pirms sesijas sākuma.
- 3 spēles režīmi:
  - `Seconds` jeb sesija uz noteiktu sekunžu skaitu;
  - `Code Goal` jeb sesija līdz sasniegts noteikts pareizi pabeigto koda bloku skaits;
  - `Infinite` jeb bezgalīgs treniņš bez automātiska laika limita.
- 4 grūtības līmeņi:
  - `Easy`
  - `Medium`
  - `Hard`
  - `Pro`
- Reālu JavaScript koda fragmentu bibliotēka.
- Dinamiska simbolu pārbaude rakstīšanas laikā:
  - pareizie simboli tiek attēloti kā korekti;
  - kļūdainie tiek izcelti;
  - vēl neuzrakstītā daļa ir redzama kā gaidošais teksts.
- Statistika sesijas laikā:
  - progress vai taimeris;
  - `WPM` (words per minute);
  - kļūdu skaits;
  - pareizi pabeigto koda fragmentu skaits.
- Sesijas beigu paziņojums.
- Pēdējo 10 rezultātu saglabāšana pārlūka `localStorage`.
- Adaptīvs dizains darbam uz datora, planšetes un telefona.

## Kā programma darbojas

Lietotājs ievada savu vārdu, izvēlas režīmu, nepieciešamos parametrus un grūtības līmeni, pēc tam uzsāk sesiju ar pogu `Start Session`.

Programma:

1. pārbauda ievadītos datus;
2. izveido izvēlētajai grūtībai atbilstošu koda fragmentu rindu;
3. parāda vienu fragmentu rakstīšanas laukumā;
4. salīdzina katru lietotāja nospiesto taustiņu ar sagaidāmo simbolu;
5. uzreiz atjauno statistiku un vizuālo atgriezenisko saiti;
6. pēc fragmenta korektas pabeigšanas ielādē nākamo fragmentu;
7. sesijas beigās saglabā rezultātu un parāda to rezultātu sarakstā.

## Spēles režīmi

### 1. `Seconds`

Sesija ilgst noteiktu sekunžu skaitu, piemēram, `60`. Lietotāja mērķis ir šajā laikā pabeigt pēc iespējas vairāk koda fragmentu ar iespējami labu precizitāti un ātrumu.

### 2. `Code Goal`

Sesija turpinās tik ilgi, līdz lietotājs pareizi uzraksta noteiktu skaitu koda fragmentu. Šis režīms ir piemērots mērķtiecīgam treniņam bez laika spiediena.

### 3. `Infinite`

Sesija nebeidzas automātiski. Lietotājs var trenēties brīvā režīmā tik ilgi, cik nepieciešams.

## Grūtības līmeņi

### `Easy`

Vienkārši vienrindas JavaScript fragmenti, piemēram:

- skaitļa ierobežošana diapazonā;
- teksta kapitalizēšana;
- summēšana;
- virknes apgriešana;
- pāra skaitļa pārbaude.

Šis līmenis ir piemērots iesācējiem un rakstīšanas iesildīšanai.

### `Medium`

Vidējas sarežģītības funkcijas ar vairākrindu struktūru, piemēram:

- masīvu sadalīšana blokos;
- grupēšana;
- skaitīšana pēc noteikta kritērija;
- kārtošana;
- noteiktu lauku atlasīšana no objekta.

### `Hard`

Sarežģītāki algoritmiski un rekursīvi piemēri, piemēram:

- dziļa masīvu saplacināšana;
- Fibonacci virknes ģenerēšana;
- komentāru koka izveide;
- objektu saplacināšana;
- memoizācija.

### `Pro`

Profesionālā līmeņa piemēri ar klasēm un progresīvākām konstrukcijām, piemēram:

- `EventEmitter`;
- `LruCache`;
- asinhronu funkciju cauruļvadi;
- vienkārša stāvokļa pārvaldības glabātuve.

## Statistikas aprēķins

Programma sesijas laikā aprēķina:

- `WPM` pēc korekti ievadīto simbolu skaita, pieņemot, ka 5 simboli veido vienu “vārdu”;
- kopējo kļūdu skaitu;
- pareizi pabeigto koda fragmentu skaitu;
- sesijas progresu vai pagājušo laiku atkarībā no izvēlētā režīma.

## Rezultātu saglabāšana

Rezultāti tiek saglabāti lietotāja pārlūkā ar `localStorage` atslēgu:

```text
typingGameRecentResults
```

Katram rezultātam tiek glabāta šāda informācija:

- lietotājvārds;
- grūtības līmenis;
- režīms;
- sesijas parametrs (`sekundes`, `mērķis` vai `infinite`);
- pareizi pabeigto fragmentu skaits;
- kļūdu skaits;
- `WPM`;
- sesijas datums un laiks.

Tiek saglabāti tikai pēdējie 10 rezultāti.

## Lietotāja saskarne

Lietotne sastāv no vairākām daļām:

- ievada un konfigurācijas paneļa;
- koda rakstīšanas laukuma `Code Arena`;
- statistikas kartītēm;
- jaunāko rezultātu saraksta;
- paziņojumu loga validācijai un sesijas pabeigšanai.

Rakstīšanas laukā:

- nav iespējams ielīmēt tekstu;
- nav iespējams kopēt vai izgriezt saturu;
- ievade tiek kontrolēta caur tastatūras notikumiem;
- katrs simbols tiek salīdzināts ar sagaidāmo rezultātu reāllaikā.

## Tehnoloģijas

Projektā izmantotas tikai pamata front-end tehnoloģijas:

- `HTML5`
- `CSS3`
- `JavaScript (Vanilla JS)`

Papildu bibliotēkas vai ietvari netiek izmantoti.

## Projekta struktūra

```text
Code_Typing_Trainer/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

### Failu paskaidrojums

- `index.html`  
  Satur lietotnes struktūru: virsrakstus, formas laukus, rakstīšanas zonu, statistiku, rezultātu sarakstu un paziņojumu logu.

- `css/style.css`  
  Satur visu vizuālo noformējumu: krāsu paleti, izkārtojumu, kartītes, pogas, adaptivitāti un rakstīšanas laukuma stilu.

- `js/script.js`  
  Satur visu lietotnes loģiku:
  - spēles inicializāciju;
  - režīmu pārslēgšanu;
  - koda fragmentu ģenerēšanu;
  - ievades pārbaudi;
  - statistikas aprēķinu;
  - rezultātu saglabāšanu;
  - paziņojumu attēlošanu.

## Uzstādīšana un palaišana

Šim projektam nav nepieciešama instalācija vai pakotņu pārvaldnieks.

### Vienkāršākais variants

1. Lejupielādē vai atver projekta failus.
2. Atver `index.html` failu jebkurā modernā pārlūkā.

### Ieteicamais variants izstrādei

Ja vēlies projektu palaist kā lokālu vietni, vari izmantot jebkuru vienkāršu statisko serveri, piemēram:

```bash
python3 -m http.server
```

Pēc tam atver pārlūkā adresi:

```text
http://localhost:8000
```

## Lietošanas instrukcija

1. Ievadi savu lietotājvārdu laukā `Username`.
2. Izvēlies spēles režīmu.
3. Ja nepieciešams, norādi sekunžu skaitu vai mērķa fragmentu skaitu.
4. Izvēlies grūtības līmeni.
5. Nospied `Start Session`.
6. Raksti ekrānā redzamo kodu pēc iespējas precīzi.
7. Vēro statistiku sesijas laikā.
8. Pēc sesijas beigām apskati rezultātu sadaļu `Latest Results`.

## Iebūvētie ierobežojumi un uzvedība

- Sesiju nevar sākt bez lietotājvārda.
- Laika režīmā jāievada pozitīvs sekunžu skaits.
- Mērķa režīmā jāievada pozitīvs pareizo fragmentu mērķis.
- Ja konkrētās grūtības fragmenti izbeidzas, programma ģenerē jaunu sajauktu rindu.
- Rezultāti tiek glabāti tikai konkrētajā pārlūkā un konkrētajā ierīcē.
- Pārlūka datu dzēšana izdzēsīs arī saglabātos rezultātus.

## Kam šis projekts ir piemērots

Šī programma ir piemērota:

- programmēšanas studentiem;
- iesācējiem JavaScript apguvē;
- lietotājiem, kuri vēlas uzlabot rakstīšanas ātrumu tieši kodā;
- mācību demonstrācijām un nelieliem front-end projektiem;
- portfolio darbam kā interaktīvs JavaScript projekts.

## Iespējamie uzlabojumi nākotnē

- vairāku programmēšanas valodu atbalsts;
- precizitātes procenta attēlošana;
- līderu tabula;
- rezultātu eksportēšana;
- skaņas efekti;
- tumšā/gaišā režīma pārslēgšana;
- lietotāju profili;
- detalizētāka sesiju analītika.

## Kopsavilkums

`Code Typing Trainer` ir viegla, skaidri strukturēta un praktiska tīmekļa lietotne JavaScript koda rakstīšanas treniņiem. Tā apvieno mācību elementu ar spēles principu, piedāvā tūlītēju atgriezenisko saiti, vairākus treniņu režīmus un lokālu rezultātu vēsturi bez nepieciešamības izmantot ārējas bibliotēkas vai servera pusi.
