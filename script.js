// ===========================
// AUTOVADĪTĀJA TESTS - script.js
// ===========================

// --- JAUTĀJUMU MASĪVS ---
const questions = [
    {
        question: "Kā rīkosieties, šķērsojot krustojumu, attēlotajā situācijā?",
        image: "image/1.png",
        answers: [
            { text: "Dosiet ceļu visiem transportlīdzekļu vadītājiem.", correct: false },
            { text: "Dosiet ceļu tikai tramvaja un automobiļa vadītājam, kas tuvojas no labās puses.", correct: true },
            { text: "Šķērsosiet krustojumu pirmais.", correct: false },
            { text: "Dosiet ceļu tikai abiem tramvaja vadītājiem.", correct: false }
        ]
    },
    {
        question: "Kā rīkosieties, šķērsojot krustojumu, attēlotajā situācijā?",
        image: "image/2.png",
        answers: [
            { text: "Dosiet ceļu visiem transportlīdzekļu vadītājiem.", correct: false },
            { text: "Dosiet ceļu tikai motocikla vadītājam.", correct: false },
            { text: "Šķērsosiet krustojumu pirmais.", correct: true },
            { text: "Dosiet ceļu tikai autobusa vadītājam.", correct: false }
        ]
    },
    {
        question: "\"Ja katru nakti noguļu 8 stundas, tad miegainība pie stūres man nedraud.\" Kā vērtēt šādu transportlīdzekļa vadītāja apgalvojumu?",
        image: "image/3.png",
        answers: [
            { text: "Pareizi, tas izslēdz miegainības iespēju.", correct: false },
            { text: "Tas ne vienmēr ir pareizi, jo autovadītājam var būt miega traucējumi (miega apnojas un citi), kuru dēļ viņa miegs nav pilnvērtīgs.", correct: true }
        ]
    },
    {
        question: "Vai sarkanā automobiļa vadītājam atļauts veikt attēlā redzamo manevru?",
        image: "image/4.png",
        answers: [
            { text: "Atļauts.", correct: true },
            { text: "Aizliegts.", correct: false }
        ]
    },
    {
        question: "Vai dzeltenā automobiļa vadītājam atļauts šķērsot krustojumu taisnā virzienā no tramvaja sliežu klātnes?",
        image: "image/5.png",
        answers: [
            { text: "Atļauts.", correct: false },
            { text: "Aizliegts.", correct: true }
        ]
    },
    {
        question: "Kāda ir darbības zona attēlotajām ceļa zīmēm?",
        image: "image/6.png",
        answers: [
            { text: "Līdz tuvākajam krustojumam.", correct: false },
            { text: "Līdz apdzīvotas vietas beigām.", correct: false },
            { text: "Līdz ceļa zīmei - zonas beigas (attiecīgā zīme pārsvītrota).", correct: true }
        ]
    },
    {
        question: "Par ko brīdina ceļa zīme?",
        image: "image/7.png",
        answers: [
            { text: "Par to, ka uz ceļa tiek veikti ceļa remontdarbi.", correct: false },
            { text: "Par to, ka blakus ceļam tiek veikti jebkādi darbi.", correct: false },
            { text: "Abas minētās atbildes ir pareizas.", correct: true }
        ]
    },
    {
        question: "Kā rīkosieties, šķērsojot krustojumu, attēlotajā situācijā?",
        image: "image/8.png",
        answers: [
            { text: "Dosiet ceļu vieglā automobiļa un velosipēda vadītājam.", correct: false },
            { text: "Šķērsosiet krustojumu pirmais.", correct: false },
            { text: "Dosiet ceļu tikai velosipēda vadītājam.", correct: false },
            { text: "Dosiet ceļu tikai vieglā automobiļa vadītājam.", correct: true }
        ]
    },
    {
        question: "Kā rīkosieties, šķērsojot krustojumu, attēlotajā situācijā?",
        image: "image/9.png",
        answers: [
            { text: "Dosiet ceļu tikai vieglā automobiļa vadītājam.", correct: true },
            { text: "Dosiet ceļu abu automobiļu vadītājiem.", correct: false },
            { text: "Dosiet ceļu tikai kravas automobiļa vadītājam.", correct: false },
            { text: "Šķērsosiet krustojumu pirmais.", correct: false }
        ]
    },
    {
        question: "Ceļu satiksmes noteikumu izpratnē sarkanais automobilis tuvojas:",
        image: "image/10.png",
        answers: [
            { text: "Ceļa pārvadam.", correct: false },
            { text: "Krustojumam.", correct: true },
            { text: "Apgriešanās vietai.", correct: false }
        ]
    },
    {
        question: "Ko aizliedz attēlotā ceļa zīme?",
        image: "image/11.png",
        answers: [
            { text: "Tikai apstāties.", correct: false },
            { text: "Tikai stāvēt.", correct: false },
            { text: "Turpināt braukt.", correct: false },
            { text: "Apstāties un stāvēt.", correct: true }
        ]
    },
    {
        question: "Kurš pēc kārtas šķērsos krustojumu sarkanais automobilis?",
        image: "image/12.png",
        answers: [
            { text: "Pēdējais.", correct: true },
            { text: "Pirmais.", correct: false },
            { text: "Otrais.", correct: false },
            { text: "Trešais.", correct: false }
        ]
    },
    {
        question: "Kuru braukšanas trajektoriju jāizvēlas automobiļa vadītājam, lai nogrieztos pa labi?",
        image: "image/13.png",
        answers: [
            { text: "Tikai B.", correct: false },
            { text: "Tikai A.", correct: true },
            { text: "A vai B.", correct: false }
        ]
    },
    {
        question: "Kurā attēlā sirds masāža tiek izpildīta pareizi?",
        image: "image/14.png",
        answers: [
            { text: "A.", correct: false },
            { text: "B.", correct: true },
            { text: "Abi paņēmieni ir pareizi.", correct: false }
        ]
    },
    {
        question: "Vai sastrēguma laikā atļauts apbraukt priekšā stāvošos automobiļus, lai krustojumā nogrieztos pa labi?",
        image: "image/15.png",
        answers: [
            { text: "Atļauts.", correct: false },
            { text: "Aizliegts.", correct: true }
        ]
    },
    {
        question: "Kāds ir maksimāli atļautais braukšanas ātrums turpinot ceļu?",
        image: "image/16.png",
        answers: [
            { text: "50 km/h.", correct: true },
            { text: "70 km/h.", correct: false },
            { text: "90 km/h.", correct: false }
        ]
    },
    {
        question: "Kura transportlīdzekļa vadītājam ir priekšroka attēlotajā situācijā?",
        image: "image/17.png",
        answers: [
            { text: "Velosipēda vadītājam.", correct: true },
            { text: "Automobiļa vadītājam.", correct: false }
        ]
    },
    {
        question: "Līdz kurai vietai ir spēkā ceļa zīmes \"Maksimālā ātruma ierobežojums\" darbība attēlotajā situācijā?",
        image: "image/18.png",
        answers: [
            { text: "Līdz krustojumam.", correct: false },
            { text: "Līdz ceļa zīmei \"Apdzīvotas vietas sākums\".", correct: true },
            { text: "Līdz vietai, kur izbrauc no degvielas uzpildies stacijas.", correct: false }
        ]
    },
    {
        question: "Kādā gadījumā atļauts vilkt mehānisko transportlīdzekli ar lokano sakabi?",
        image: "image/19.png",
        answers: [
            { text: "Ja bojāta darba bremžu sistēma.", correct: false },
            { text: "Ja bojāta stūres iekārta.", correct: false },
            { text: "Ja bojāta dzesēšanas sistēma.", correct: true }
        ]
    },
    {
        question: "Kurā gadījumā cietušais jāatstāj ceļu satiksmes negadījumā iekļuvušā transportlīdzekļa salonā?",
        image: "image/20.png",
        answers: [
            { text: "Ja cietušais ir pie samaņas.", correct: true },
            { text: "Ja cietušais zaudējis samaņu.", correct: false },
            { text: "Ja transportlīdzeklim draud aizdegšanās.", correct: false }
        ]
    },
    {
        question: "Cik braukšanas joslas ir attēlotajam ceļam?",
        image: "image/21.png",
        answers: [
            { text: "Divas joslas.", correct: false },
            { text: "Trīs joslas.", correct: false },
            { text: "Četras joslas.", correct: true },
            { text: "Viena josla.", correct: false }
        ]
    },
    {
        question: "Kāds ir maksimāli atļautais braukšanas ātrums velkot automobili?",
        image: "image/22.png",
        answers: [
            { text: "80 km/h.", correct: false },
            { text: "50 km/h.", correct: true },
            { text: "90 km/h.", correct: false }
        ]
    },
    {
        question: "Kā rīkosieties attēlotajā situācijā?",
        image: "image/23.png",
        answers: [
            { text: "Apbrauksiet šķērsli pa labo vai kreiso pusi.", correct: true },
            { text: "Meklēsiet citu apbraukšanas ceļu.", correct: false }
        ]
    },
    {
        question: "Kuriem transportlīdzekļu vadītājiem atļauts braukt attēlotajā situācijā?",
        image: "image/24.png",
        answers: [
            { text: "Tikai dzeltenā automobiļa vadītājam.", correct: false },
            { text: "Dzeltenā un kravas automobiļa vadītājiem.", correct: false },
            { text: "Visiem bezsliežu transportlīdzekļu vadītājiem.", correct: true }
        ]
    },
    {
        question: "Kādos virzienos autovadītājiem atļauts braukt attēlotajā situācijā?",
        image: "image/25.png",
        answers: [
            { text: "Kravas un vieglajam automobilim- tikai taisni.", correct: false },
            { text: "Kravas automobiļa vadītājam – taisni un pa labi, vieglā automobiļa vadītājam- taisni.", correct: true },
            { text: "Kravas automobilim– taisni, vieglajam automobilim- taisni un pa kreisi.", correct: false }
        ]
    },
    {
        question: "Ko apzīmē attēlotais ceļa apzīmējums?",
        image: "image/26.png",
        answers: [
            { text: "Gājēju pāreju.", correct: false },
            { text: "Uz brauktuves izveidotu mākslīgu paaugstinājumu (ātrumvalni).", correct: false },
            { text: "Velosipēdu ceļu.", correct: true }
        ]
    },
    {
        question: "Kā jārīkojas automobiļu vadītājiem, ja iedegas atļaujošais signāls, bet gājēji vēl nav šķērsojuši gājēju pāreju?",
        image: "image/27.png",
        answers: [
            { text: "Jādod iespēja gājējiem pabeigt brauktuves šķērsošanu.", correct: true },
            { text: "Ja automobilis ir bijis apstājies, tad jāuzgaida, bet ja atrodas kustībā, tad jāsignalizē.", correct: false }
        ]
    },
    {
        question: "Kura automobiļa vadītājam ir priekšroka?",
        image: "image/28.png",
        answers: [
            { text: "Zaļā automobiļa vadītājam.", correct: true },
            { text: "Sarkanā automobiļa vadītājam.", correct: false }
        ]
    },
    {
        question: "Ko norāda attēlotā ceļa zīme?",
        image: "image/29.png",
        answers: [
            { text: "Priekšā būs autobusa pieturvieta.", correct: false },
            { text: "Pa labo joslu atļauts braukt pasažieru sabiedriskajiem transportlīdzekļiem, elektromobiļiem un taksometriem", correct: true },
            { text: "Labā josla ir vienvirziena josla.", correct: false }
        ]
    },
    {
        question: "Ko norāda attēlotā ceļa zīme?",
        image: "image/30.png",
        answers: [
            { text: "Autobusu un trolejbusu pieturvietu.", correct: true },
            { text: "Stāvvietu lielveikala klientu transportlīdzekļiem.", correct: false },
            { text: "Vietu, kur aizliegts apstāties mehāniskajiem transportlīdzekļiem.", correct: false }
        ]
    },
    {
        question: "Kur novietosiet automobili, ja esat plānojis ilgstoši stāvēt?",
        image: "image/31.png",
        answers: [
            { text: "Tikai A.", correct: false },
            { text: "A vai B.", correct: false },
            { text: "Tikai B.", correct: true }
        ]
    },
    {
        question: "Kuros virzienos automobiļa vadītājam ir atļauts braukt attēlotā situācijā?",
        image: "image/32.png",
        answers: [
            { text: "A C D E.", correct: true },
            { text: "B C D.", correct: false },
            { text: "B C E.", correct: false }
        ]
    },
    {
        question: "Vai attēlotā situācijā, ja nekur nesteidzaties, drīkst braukt ar 30 km/h mazāku ātrumu, kā atļautais?",
        image: "image/33.png",
        answers: [
            { text: "Atļauts, jo tas nav aizliegts.", correct: false },
            { text: "Aizliegts ir tikai pārsniegt atļauto ātrumu.", correct: false },
            { text: "Aizliegts, jo tas rada bīstamas situācijas.", correct: true }
        ]
    },
    {
        question: "Kura transportlīdzekļa vadītājam ir priekšroka attēlotajā situācijā?",
        image: "image/34.png",
        answers: [
            { text: "Automobiļa vadītājam.", correct: true },
            { text: "Velosipēda vadītājam.", correct: false }
        ]
    },
    {
        question: "Par ko brīdina attēlotās ceļa zīmes?",
        image: "image/35.png",
        answers: [
            { text: "Par ceļa posmu ar bīstamu pagriezienu pēc 70 m.", correct: true },
            { text: "Par bīstamu pagriezienu 70 m garumā sākot no ceļa zīmes.", correct: false },
            { text: "Par bīstamu pagriezienu ar 70 m rādiusu.", correct: false }
        ]
    },
    {
        question: "Kurā gadījumā būtu lietderīgi izslēgt automobiļa motoru?",
        image: "image/36.png",
        answers: [
            { text: "Pirms krustojumiem, kad jādod ceļš.", correct: false },
            { text: "Pirms dzelzceļa pārbrauktuves, ja ir jāpalaiž vilciens.", correct: true },
            { text: "Satiksmes sastrēgumos.", correct: false }
        ]
    },
    {
        question: "Kad velkamajam automobilim ir jābūt iedegtai avārijas gaismas signalizācijai?",
        image: "image/37.png",
        answers: [
            { text: "Braucot ārpus apdzīvotām vietām.", correct: false },
            { text: "Braucot apdzīvotās vietās.", correct: false },
            { text: "Vienmēr.", correct: true },
            { text: "Braucot diennakts tumšajā laikā.", correct: false }
        ]
    },
    {
        question: "Ceļu satiksmes noteikumu izpratnē sarkanais automobilis tuvojas:",
        image: "image/38.png",
        answers: [
            { text: "Krustojumam.", correct: true },
            { text: "Ceļa pārvadam.", correct: false },
            { text: "Apgriešanās vietai.", correct: false }
        ]
    },
    {
        question: "Kā rīkosieties, šķērsojot krustojumu, attēlotajā situācijā?",
        image: "image/39.png",
        answers: [
            { text: "Šķērsosiet krustojumu pirmais.", correct: false },
            { text: "Šķērsosiet krustojumu trešais", correct: true },
            { text: "Šķērsosiet krustojumu otrais.", correct: false },
            { text: "Šķērsosiet krustojumu pēdējais.", correct: false }
        ]
    },
    {
        question: "Kā rīkosieties, šķērsojot krustojumu, attēlotajā situācijā?",
        image: "image/40.png",
        answers: [
            { text: "Šķērsosiet krustojumu pirmais.", correct: true },
            { text: "Dosiet ceļu tikai sarkanā automobiļa vadītājam.", correct: false },
            { text: "Dosiet ceļu tikai zaļā automobiļa vadītājam.", correct: false },
            { text: "Dosiet ceļu abiem transportlīdzekļu vadītājiem.", correct: false }
        ]
    },
    {
        question: "Kādos virzienos atļauts braukt attēlotajā situācijā?",
        image: "image/41.png",
        answers: [
            { text: "AD.", correct: false },
            { text: "ABD.", correct: true },
            { text: "AB.", correct: false },
            { text: "CD.", correct: false }
        ]
    },
    {
        question: "Kā rīkosieties, ieraugot attēlā redzamo ceļa zīmi?",
        image: "image/42.png",
        answers: [
            { text: "Raidīsiet garus skaņas signālus, lai aizbaidītu savvaļas dzīvniekus.", correct: false },
            { text: "Ievērosiet īpašu piesardzību un izvēlēsieties atbilstošu ātrumu.", correct: true },
            { text: "Ieslēgsiet visas iespējamās apgaismes ierīces, lai dzīvnieki jūs savlaicīgi pamanītu un neskrietu uz ceļa.", correct: false }
        ]
    },
    {
        question: "Vai attēlotajā situācijā atļauts apdzīt?",
        image: "image/43.png",
        answers: [
            { text: "Aizliegts.", correct: true },
            { text: "Atļauts.", correct: false }
        ]
    },
    {
        question: "Kurš no vadītājiem ir ieņēmis pareizu stāvokli uz brauktuves, lai veiktu manevru?",
        image: "image/44.png",
        answers: [
            { text: "Oranžā automobiļa vadītājs.", correct: true },
            { text: "Sarkanā automobiļa vadītājs.", correct: false }
        ]
    },
    {
        question: "Kādu piekabi atļauts vilkt ar vieglo automobili, kura pilna masa ir 3500 kg, ja autovadītājam ir B kategorijas vadītāja apliecība?",
        image: "image/45.png",
        answers: [
            { text: "Kuras pilna masa nepārsniedz 750kg.", correct: true },
            { text: "Kuras pilna masa nepārsniedz 1725 kg.", correct: false },
            { text: "Piekabi šajā gadījumā vilkt nedrīkst.", correct: false }
        ]
    },
    {
        question: "Kā rīkosieties, šķērsojot krustojumu, attēlotajā situācijā?",
        image: "image/46.png",
        answers: [
            { text: "Šķērsosiet krustojumu pirmais.", correct: false },
            { text: "Dosiet ceļu tikai motocikla vadītājam.", correct: true },
            { text: "Dosiet ceļu tikai sarkanā automobiļa vadītājam.", correct: false },
            { text: "Šķērsosiet krustojumu pēdējais.", correct: false }
        ]
    },
    {
        question: "Kā rīkosieties, šķērsojot krustojumu, attēlotajā situācijā?",
        image: "image/47.png",
        answers: [
            { text: "Dosiet ceļu tikai motocikla vadītājam.", correct: false },
            { text: "Šķērsosiet krustojumu pirmais.", correct: false },
            { text: "Dosiet ceļu tikai dzeltenā automobiļa vadītājam.", correct: true },
            { text: "Šķērsosiet krustojumu pēdējais.", correct: false }
        ]
    },
    {
        question: "Vai dzeltenā automobiļa vadītājam atļauts braukt pa tramvaja sliežu klātni attēlotā situācijā?",
        image: "image/48.png",
        answers: [
            { text: "Aizliegts.", correct: true },
            { text: "Atļauts", correct: false }
        ]
    },
    {
        question: "Vai vieglā automobiļa vadītājam atļauts veikt attēlā redzamo manevru?",
        image: "image/49.png",
        answers: [
            { text: "Atļauts.", correct: true },
            { text: "Aizliegts.", correct: false }
        ]
    },
    {
        question: "Ārsts jums izraksta lietošanai kādu medikamentu. Kā uzzināt, vai šis medikaments varētu pasliktināt transportlīdzekļa vadīšanas spējas?",
        image: "image/50.png",
        answers: [
            { text: "Jautājiet ārstam.", correct: false },
            { text: "Visas minētās atbildes ir pareizas.", correct: true },
            { text: "Jautājiet farmaceitam.", correct: false },
            { text: "Uzmanīgi izlasiet medikamenta lietošanas instrukciju.", correct: false }
        ]
    }
];

// --- A KATEGORIJAS JAUTĀJUMI (vienmērīgi sadalītas pareizās atbildes) ---
const questionsA = [
    {
        question: "Kurā no attēliem cietušajam motociklistam aizsargķivere tiek noņemta pareizāk?",
        image: "image/a1.png",
        answers: [
            { text: "A.", correct: false },
            { text: "B.", correct: true },
            { text: "Abi paņēmieni ir pareizi.", correct: false }
        ]
    },
    {
        question: "Par ko brīdina attēlotā ceļa zīme?",
        image: "image/a2.png",
        answers: [
            { text: "Par bīstamu ceļa posmu.", correct: true },
            { text: "Par reti sastopamu dabas skatu.", correct: false },
            { text: "Par tuvumā esošu informācijas centru.", correct: false }
        ]
    },
    {
        question: "Vai motocikla vadītājam atļauts turpināt braukt taisnā virzienā pa ieņemto joslu?",
        image: "image/a3.png",
        answers: [
            { text: "Atļauts.", correct: false },
            { text: "Aizliegts.", correct: true }
        ]
    },
    {
        question: "Turpinot kustību, Jūsu vadītā motocikla braukšanas ātrums nedrīkst pārsniegt:",
        image: "image/a4.png",
        answers: [
            { text: "90 km/h.", correct: false },
            { text: "50 km/h.", correct: false },
            { text: "70 km/h.", correct: true }
        ]
    },
    {
        question: "Braucot pagriezienā ar izspiestu sajūgu:",
        image: "image/a5.png",
        answers: [
            { text: "Motocikla vadāmība ir ierobežota, jo nav ieslēgts pārnesums.", correct: true },
            { text: "Ir iespēja laidenāk izbraukt pagriezienu.", correct: false },
            { text: "Motocikla vadāmība netiek ietekmēta.", correct: false }
        ]
    },
    {
        question: "Kādu pasažieri motocikla drošas vadīšanas nolūkā atturēsieties pārvadāt?",
        image: "image/a6.png",
        answers: [
            { text: "Pasažieri, kura augums ir garāks par manu", correct: false },
            { text: "Visus minētos pasažierus", correct: true },
            { text: "Pasažieri, kura svars ir lielāks par manu", correct: false },
            { text: "Pasažieri, kurš pats ir pieredzējis moto braucējs", correct: false }
        ]
    },
    {
        question: "Kā ir jārīkojas motocikla vadītājam, šķērsojot krustojumu?",
        image: "image/a7.png",
        answers: [
            { text: "Jādod ceļš tikai tramvaja vadītājam.", correct: true },
            { text: "Jādod ceļš abu transportlīdzekļu vadītājiem.", correct: false },
            { text: "Jādod ceļš tikai automobiļa vadītājam.", correct: false },
            { text: "Jāpārbrauc krustojums pirmajam.", correct: false }
        ]
    },
    {
        question: "Ko norāda attēlotā ceļa zīme?",
        image: "image/a8.png",
        answers: [
            { text: "Maksimālos masas ierobežojumus joslās.", correct: false },
            { text: "Maksimālos ātruma ierobežojumus joslās.", correct: true },
            { text: "Minimālās distances ierobežojumus joslās.", correct: false }
        ]
    },
    {
        question: "Kā jārīkojas motocikla vadītājam attēlotajā situācijā?",
        image: "image/a9.png",
        answers: [
            { text: "Jādod ceļš gājējam.", correct: true },
            { text: "Jāturpina kustību.", correct: false }
        ]
    },
    {
        question: "Pa kuru no trajektorijām motocikla vadītājam atļauts apsteigt vieglo automobili apdzīvotā vietā?",
        image: "image/a10.png",
        answers: [
            { text: "Tikai pa A.", correct: false },
            { text: "Tikai pa B.", correct: true },
            { text: "Pa A un B.", correct: false }
        ]
    },
    {
        question: "Kurā brīdī motocikla vadītājs drīkst ieslēgt virzienrādītāju, lai aplī izbrauktu pa attēlā redzamo trajektoriju?",
        image: "image/a11.png",
        answers: [
            { text: "Tikai A.", correct: false },
            { text: "Tikai B.", correct: true },
            { text: "A un B.", correct: false }
        ]
    },
    {
        question: "Attēlotajā situācijā motocikla vadītājs atrodas:",
        image: "image/a12.png",
        answers: [
            { text: "Uz mazāksvarīga ceļa.", correct: false },
            { text: "Uz galvenā ceļa.", correct: true },
            { text: "Vienādas nozīmes krustojumā.", correct: false },
            { text: "Regulējamā krustojumā.", correct: false }
        ]
    },
    {
        question: "Kādu manevru veic motocikla vadītājs attēlotajā situācijā?",
        image: "image/a13.png",
        answers: [
            { text: "Apdzīšanu.", correct: true },
            { text: "Apsteigšanu.", correct: false },
            { text: "Apbraukšanu.", correct: false }
        ]
    },
    {
        question: "Vai Jums atļauts braukt taisni attēlotajā situācijā?",
        image: "image/a14.png",
        answers: [
            { text: "Aizliegts.", correct: true },
            { text: "Atļauts.", correct: false },
            { text: "Atļauts, ja braucu uz dzīvesvietu.", correct: false }
        ]
    },
    {
        question: "Uz kādas sistēmas tehnisko stāvokli norāda attēlotā indikācija mēraparātu panelī?",
        image: "image/a15.png",
        answers: [
            { text: "Motora eļļošanas sistēmas.", correct: false },
            { text: "Motora dzesēšanas sistēmas.", correct: true },
            { text: "Degvielas padeves sistēmas.", correct: false }
        ]
    },
    {
        question: "Vai motocikla vadītājam atļauts apstāties, lai uzņemtu pasažieri attēlotajā situācijā?",
        image: "image/a16.png",
        answers: [
            { text: "Aizliegts.", correct: true },
            { text: "Atļauts.", correct: false }
        ]
    },
    {
        question: "Motocikla vadītājs braucot sajūt vairākas miegainības pazīmes. Līdz galamērķim palikuši tikai 40 km. Kura motocikla vadītāja rīcība ir vispareizākā?",
        image: "image/a17.png",
        answers: [
            { text: "Ievērojami palielināt braukšanas ātrumu, jo adrenalīns motocikla vadītāja asinīs neļaus iemigt.", correct: false },
            { text: "Apstāties tuvākajā piemērotajā vietā, pagulēt 15–20 minūtes un tad turpināt ceļu.", correct: true },
            { text: "Atvērt aizsargķiveres vizieri, dziļi elpot un mēģināt tikt līdz galamērķim.", correct: false }
        ]
    },
    {
        question: "Vai motocikla vadītājam atļauts apdzīt attēlotās ceļa zīmes darbības zonā?",
        image: "image/a18.png",
        answers: [
            { text: "Atļauts, jo ceļa zīmes prasības attiecas tikai uz kravas automobiļiem.", correct: true },
            { text: "Atļauts tikai gadījumā, ja vieglā automobiļa ātrums ir mazāks par 30 km/h.", correct: false },
            { text: "Aizliegts jebkurā gadījumā.", correct: false }
        ]
    },
    {
        question: "Kāda ir \"Apstāties aizliegts\" ceļa zīmes darbības zona attēlotajā situācijā?",
        image: "image/a19.png",
        answers: [
            { text: "Līdz dzeltenās līnijas beigām.", correct: true },
            { text: "Līdz tuvākajam krustojumam.", correct: false },
            { text: "Līdz apdzīvotas vietas beigām.", correct: false }
        ]
    },
    {
        question: "Kas ir jāņem vērā motocikla vadītājam, ja pēc ilgstoša sausuma perioda sāk līt lietus?",
        image: "image/a20.png",
        answers: [
            { text: "Ūdenim sajaucoties ar putekļiem uz brauktuves veidojas slidena netīrumu kārta, pasliktinot riepu saķeri ar brauktuves virsmu.", correct: true },
            { text: "Lietus nomazgās uz brauktuves esošos netīrumus, uzlabojot riepu saķeri ar brauktuves virsmu.", correct: false },
            { text: "Īpaša piesardzība nav nepieciešama, ja riepām ir labs protektors.", correct: false }
        ]
    },
    {
        question: "Kā jārīkojas motocikla vadītājam, lai mazinātu centrbēdzes ietekmi, braucot līkumā ar lielāku ātrumu?",
        image: "image/a21.png",
        answers: [
            { text: "Ķermenis jāsasver uz līkuma iekšmalu.", correct: true },
            { text: "Manevrs jāveic ar izspiestu sajūgu.", correct: false },
            { text: "Ķermenis jāsasver uz līkuma ārmalu.", correct: false },
            { text: "Manevrs jāveic bremzējot līkumā.", correct: false }
        ]
    },
    {
        question: "Vai motocikla vadāmība var būtiski izmainīties, turpinot ceļu pa bruģi?",
        image: "image/a22.png",
        answers: [
            { text: "Var mainīties jebkurā gadījumā.", correct: true },
            { text: "Var mainīties tikai lietus laikā.", correct: false },
            { text: "Var mainīties, tikai ja brauktuve nav attīrīta no lapām un citiem gružiem.", correct: false }
        ]
    },
    {
        question: "Vai motocikli pareizi novietoti stāvēšanai?",
        image: "image/a23.png",
        answers: [
            { text: "Tikai zilais motocikls.", correct: true },
            { text: "Tikai sarkanais motocikls.", correct: false },
            { text: "Abi motocikli novietoti pareizi.", correct: false }
        ]
    },
    {
        question: "Vai diennakts gaišajā laikā atļauts piedalīties ceļu satiksmē, ja ir ieslēgts tikai priekšējais un aizmugurējais gabarītlukturis?",
        image: "image/a24.png",
        answers: [
            { text: "Aizliegts.", correct: true },
            { text: "Atļauts.", correct: false }
        ]
    },
    {
        question: "Ko kontrolē stacionārais fotoradars?",
        image: "image/a25.png",
        answers: [
            { text: "Transportlīdzekļu braukšanas ātrumu, OCTA un tehniskās apskates derīgumu.", correct: true },
            { text: "Transportlīdzekļu braukšanas ātrumu un OCTA derīgumu.", correct: false },
            { text: "Transportlīdzekļu braukšanas ātrumu un to, vai motocikla vadītājs lieto aizsargķiveri.", correct: false }
        ]
    },
    {
        question: "Kādu ātrumu izvēlēsieties attēlotajā situācijā, vadot motociklu?",
        image: "image/a26.png",
        answers: [
            { text: "Tādu, kas neapdraud satiksmes drošību un atbilst ceļa apstākļiem.", correct: true },
            { text: "Aptuveni 80 km/h, nepārsniedzot to.", correct: false },
            { text: "Ar tādu, lai bremzēšanas ceļš nepārsniegtu 100 m.", correct: false }
        ]
    },
    {
        question: "Kā rīkosieties, ja, iedegoties atļaujošajam luksofora signālam, gājējs vēl nav šķērsojis gājēju pāreju?",
        image: "image/a27.png",
        answers: [
            { text: "Došu iespēju gājējam pabeigt brauktuves šķērsošanu.", correct: true },
            { text: "Lēnām sākšu kustību un pasteidzināšu gājēju uztaurējot.", correct: false }
        ]
    },
    {
        question: "Kā ir jārīkojas motocikla vadītājam, šķērsojot krustojumu?",
        image: "image/a28.png",
        answers: [
            { text: "Jādod ceļš tikai kvadricikla vadītājam.", correct: true },
            { text: "Jāšķērso krustojums pirmajam.", correct: false },
            { text: "Jādod ceļš tikai vieglā automobiļa vadītājam.", correct: false },
            { text: "Jāšķērso krustojums pēdējam.", correct: false }
        ]
    },
    {
        question: "Kurā no attēliem cietušais pareizi novietots stabilā sānu pozā?",
        image: "image/a29.png",
        answers: [
            { text: "A.", correct: true },
            { text: "B.", correct: false }
        ]
    },
    {
        question: "Ko norāda marķējums ķiveres iekšpusē?",
        image: "image/a30.png",
        answers: [
            { text: "Ķiveres atbilstību drošības standartiem.", correct: true },
            { text: "Maksimāli pieļaujamā braukšanas ātruma indeksu, kuram ir paredzēta konkrētā ķivere.", correct: false },
            { text: "Ķiveres lietošanas tipu.", correct: false },
            { text: "Visas minētās atbildes ir pareizas.", correct: false }
        ]
    }
];
// --- KONSTANTES ---
// --- KONSTANTES ---
const BURTI = ['A', 'B', 'C', 'D'];

// Mainīgie, kas mainās atkarībā no kategorijas
let laiksSekundes = 1500;
let izturetSlieksnis = 35; // iekšējai lietošanai, neparādām
let jautajumuSkaits = 50;

// --- MAINĪGIE ---
let esosieJautajumi = [];
let izveletaKategorija = null;
let jautIdx = 0;
let pareizas = 0;
let timeris = null;
let atlikusaisLaiks = laiksSekundes;
let atbildeIzv = false;

// --- ELEMENTI ---
const katEkrans = document.getElementById('category-screen');
const sakEkrans   = document.getElementById('start-screen');
const testaEkrans = document.getElementById('quiz-screen');
const rezEkrans   = document.getElementById('result-screen');
const pogaB      = document.getElementById('category-b-btn');
const pogaA      = document.getElementById('category-a-btn');
const pogaSakt   = document.getElementById('start-btn');
const pogaAtkart = document.getElementById('retry-btn');
const pogaNak   = document.getElementById('next-btn');
const timerEl    = document.getElementById('timer');
const timerKaste = document.getElementById('timer-box');
const progresaJosla = document.getElementById('progress-bar');
const jautSkaititajs = document.getElementById('q-counter');
const jautTeksts = document.getElementById('question-text');
const atbildesDiv = document.getElementById('answers');
const jautAttels = document.getElementById('question-image');
const attTukšais = document.getElementById('img-placeholder');

// --- NOTIKUMU KLAUSĪTĀJI ---
pogaB.addEventListener('click', function() { izveletiesKat('B'); });
pogaA.addEventListener('click', function() { izveletiesKat('A'); });
pogaSakt.addEventListener('click', saktTestu);
pogaAtkart.addEventListener('click', function() {
    paraditEkranu(katEkrans);
});
pogaNak.addEventListener('click', nakamaisJaut);

// --- FUNKCIJAS ---

function izveletiesKat(kat) {
    izveletaKategorija = kat;
    esosieJautajumi = kat === 'B' ? questions : questionsA;
    
    if (kat === 'B') {
        laiksSekundes = 1500;
        izturetSlieksnis = 35;
        jautajumuSkaits = 50;
    } else {
        laiksSekundes = 900;
        izturetSlieksnis = 21;
        jautajumuSkaits = 30;
    }
    
    atjauninatSakumaEkranu();
    paraditEkranu(sakEkrans);
}

function atjauninatSakumaEkranu() {
    const minutes = Math.floor(laiksSekundes / 60);
    const statNum = document.querySelectorAll('#start-screen .stat-num');
    statNum[0].textContent = jautajumuSkaits;
    statNum[1].textContent = minutes + ':00';
    
    document.querySelector('#start-screen .hero-desc').innerHTML = 
        jautajumuSkaits + ' jautājumi par ceļu satiksmes noteikumiem ar attēliem. Laiks: <strong>' + 
        minutes + ' minūtes</strong>.';
}

function saktTestu() {
    jautIdx = 0;
    pareizas = 0;
    atlikusaisLaiks = laiksSekundes;
    atbildeIzv = false;

    paraditEkranu(testaEkrans);
    saktTimeri();
    raditJautajumu();
}

function paraditEkranu(ekrans) {
    [katEkrans, sakEkrans, testaEkrans, rezEkrans].forEach(el => el.classList.remove('active'));
    ekrans.classList.add('active');
}

function raditJautajumu() {
    atbildeIzv = false;
    pogaNak.style.display = 'none';
    atbildesDiv.innerHTML = '';

    const jaut = esosieJautajumi[jautIdx];

    // progresa josla
    const progress = (jautIdx / esosieJautajumi.length) * 100;
    progresaJosla.style.width = progress + '%';
    jautSkaititajs.textContent = (jautIdx + 1) + ' / ' + esosieJautajumi.length;

    jautTeksts.textContent = jaut.question;

    if (jaut.image) {
        jautAttels.src = jaut.image;
        jautAttels.style.display = 'block';
        attTukšais.style.display = 'none';
    } else {
        jautAttels.style.display = 'none';
        attTukšais.style.display = 'flex';
    }

    jaut.answers.forEach(function(atb, i) {
        const poga = document.createElement('button');
        poga.classList.add('answer-btn');
        poga.innerHTML = '<span class="letter">' + BURTI[i] + '</span>' +
                         '<span class="answer-text">' + atb.text + '</span>';
        poga.dataset.pareiza = atb.correct;
        poga.addEventListener('click', izveletiesAtbildi);
        atbildesDiv.appendChild(poga);
    });
}

function izveletiesAtbildi(e) {
    if (atbildeIzv) return;
    atbildeIzv = true;

    const poga = e.currentTarget;
    const irPareiza = poga.dataset.pareiza === 'true';

    if (irPareiza) {
        poga.classList.add('pareizi');
        pareizas++;
    } else {
        poga.classList.add('nepareizi');
        atbildesDiv.querySelectorAll('.answer-btn').forEach(function(btn) {
            if (btn.dataset.pareiza === 'true') {
                btn.classList.add('pareizi');
            }
        });
    }

    atbildesDiv.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
    pogaNak.style.display = 'flex';
}

function nakamaisJaut() {
    jautIdx++;
    if (jautIdx < esosieJautajumi.length) {
        raditJautajumu();
    } else {
        apturetTimeri();
        paraditRezultatus(false);
    }
}

function paraditRezultatus(laiksBeidzies) {
    apturetTimeri();
    paraditEkranu(rezEkrans);

    const procenti = Math.round((pareizas / esosieJautajumi.length) * 100);
    const izturets = pareizas >= izturetSlieksnis;

    document.getElementById('result-icon').textContent = izturets ? '🏆' : '❌';
    document.getElementById('result-title').textContent = izturets ? 'Apsveicam!' : 'Neizdevās';

    const scoreEl = document.getElementById('result-score');
    scoreEl.textContent = pareizas + ' / ' + esosieJautajumi.length;
    scoreEl.className = 'result-score ' + (izturets ? 'izturets' : 'neizturets');

    let zina = '';
    if (laiksBeidzies) {
        zina = 'Laiks beidzās! Tu atbildēji uz ' + pareizas + ' no ' + esosieJautajumi.length + ' jautājumiem.';
    } else if (izturets) {
        zina = 'Lielisks rezultāts — ' + procenti + '%! Tu esi gatavs ceļam.';
    } else {
        zina = 'Diemžēl rezultāts ir ' + procenti + '%. Nepieciešams vismaz 70%. Mēģini vēlreiz!';
    }
    document.getElementById('result-msg').textContent = zina;

    document.getElementById('result-breakdown').innerHTML =
        '✅ Pareizās atbildes: <strong>' + pareizas + '</strong><br>' +
        '❌ Nepareizās atbildes: <strong>' + (esosieJautajumi.length - pareizas) + '</strong><br>' +
        '📊 Rezultāts: <strong>' + procenti + '%</strong>';
}

function saktTimeri() {
    apturetTimeri();
    atlikusaisLaiks = laiksSekundes;
    atjauninatTimeri(atlikusaisLaiks);

    timeris = setInterval(function() {
        atlikusaisLaiks--;
        atjauninatTimeri(atlikusaisLaiks);

        if (atlikusaisLaiks <= 0) {
            apturetTimeri();
            paraditRezultatus(true);
        }
    }, 1000);
}

function apturetTimeri() {
    clearInterval(timeris);
    timeris = null;
}

function atjauninatTimeri(sek) {
    const min = Math.floor(sek / 60);
    const sekundes = sek % 60;
    timerEl.textContent = min + ':' + sekundes.toString().padStart(2, '0');

    timerKaste.classList.remove('warning', 'danger');
    if (sek <= 30) {
        timerKaste.classList.add('danger');
    } else if (sek <= 90) {
        timerKaste.classList.add('warning');
    }
}