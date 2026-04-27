# Šifrēšanas/Atšifrēšanas Rīks

## Ievads

Šis ir tīmekļa rīks, kas ļauj lietotājiem šifrēt un atšifrēt tekstu, izmantojot dažādus šifrēšanas algoritmus. Rīks ir izstrādāts kā vienkārša un intuitīva lietotne, kas darbojas tieši pārlūkprogrammā bez nepieciešamības instalēt papildu programmatūru.

## Pārskats

### Projekta arhitektūra

Rīks ir veidots kā vienas lapas tīmekļa lietotne (SPA), kas sastāv no HTML, CSS un JavaScript failiem. Galvenā loģika ir sadalīta vairākos moduļos:

- **app.js** - galvenā lietotnes loģika, kas pārvalda lietotāja interfeisu un koordinē dažādos šifrēšanas algoritmus
- **AtbashCipher.js** - Atbash šifrēšanas algoritms
- **CeaserCipher.js** - Cēzara šifrēšanas algoritms
- **VigenereCipher.js** - Vigenère šifrēšanas algoritms
- **base64.js** - Base64 kodēšanas/dekodēšanas funkcionalitāte
- **morse.js** - Morsa koda pārvēršana
- **htmlEncoder.js** - HTML entītiju kodēšana/dekodēšana

### Failu struktūra

```
cipher_decoder/
├── index.html           # Galvenā HTML lapa ar lietotāja interfeisu
├── style.css            # CSS stili premium izskata nodrošināšanai
├── app.js               # Galvenā lietotnes loģika un notikumu apstrāde
├── AtbashCipher.js      # Atbash šifrēšanas implementācija
├── CeaserCipher.js      # Cēzara šifrēšanas implementācija
├── VigenereCipher.js    # Vigenère šifrēšanas implementācija
├── base64.js            # Base64 kodēšanas funkcionalitāte
├── morse.js             # Morsa koda apstrāde
├── htmlEncoder.js       # HTML entītiju kodētājs
└── README.md            # Šī dokumentācija
```

### Tehniskās detaļas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Stilizācija:** Moderns CSS ar gradientiem, ēnām un animācijām
- **Atbalstītie šifrēšanas veidi:**
  - Atbash šifrs (simetrisks)
  - Cēzara šifrs (pārbīdes šifrs)
  - Vigenère šifrs (polialfabētisks)
  - Base64 kodēšana
  - Morsa kods
  - HTML entītiju kodēšana

### Darbības princips

Lietotājs izvēlas šifrēšanas veidu no nolaižamās izvēlnes, ievada tekstu un nepieciešamības gadījumā atslēgu. Rīks apstrādā ievadi klienta pusē un parāda rezultātu. Visa apstrāde notiek pārlūkprogrammā - dati netiek nosūtīti uz serveri.

## Kas ir iekšā

- **Atbash Šifrs** - Senais šifrs, apgriež alfabētu
- **Cēzara Šifrs** - Pārbīdes šifrs ar konfigurējamu pārbidi
- **Vigenère Šifrs** - Polialfabētiskais šifrs ar atslēgvārdu
- **Base64** - Standarta Base64 šifrēšana/atšifrēšana
- **Morsa Kods** - Teksts uz Morsu un atpakaļ
- **HTML Kodētājs** - HTML entītiju šifrēšana/atšifrēšana

## Kā lietot

1. Izvēlies šifru no nolaižamās izvēlnes
2. Ieraksti vai iekope kādu tekstu
3. Pievieno atslēgu/pārbidi, ja nepieciešams
4. Nospied Šifrēt vai Atšifrēt
5. Kopē rezultātu

### Šifrēšanas veidu īpatnības

#### Cēzara Šifrs
Nepieciešams skaitlis pārbidei (1-25). Tā pati vērtība gan šifrēšanai, gan atšifrēšanai.

#### Vigenère Šifrs
Nepieciešams atslēgvārds (tikai burti). Reģistrs nav svarīgs.

#### Atbash Šifrs
Nav nepieciešami parametri. Darbojas vienādi gan šifrēšanai, gan atšifrēšanai.

#### Base64
Vienkārši ielīmē savu tekstu. Nav nepieciešami parametri.

#### Morsa Kods
Pārvērš tekstu uz Morsu un atpakaļ. Atstarpes atdala rakstzīmes izvadē.

#### HTML Kodētājs
Šifrē un atšifrē HTML entītijas. Nav nepieciešami parametri.

## Iespējamie uzlabojumi

### Funkcionalitāte
- **Papildu šifrēšanas algoritmi:** Rail Fence, Playfair, RSA, AES
- **Failu augšupielāde:** Teksta failu šifrēšana/atšifrēšana
- **Batch apstrāde:** Vairāku tekstu apstrāde vienlaicīgi
- **Šifrēšanas vēsture:** Iepriekšējo darbību saglabāšana
- **Eksports:** Rezultātu eksportēšana dažādos formātos
- **Tumšais režīms:** Papildu tēmu opcijas
- **Mobilā versija:** Optimizācija mobilajām ierīcēm
- **API integrācija:** REST API citiem lietojumiem

### Tehniskie uzlabojumi
- **Veiktspējas optimizācija:** Lielu failu apstrāde
- **Drošības uzlabojumi:** Klienta puses datu šifrēšana
- **Testēšana:** Automatizēti testi visiem algoritmiem
- **Kļūdu apstrāde:** Uzlabota kļūdu ziņošana
- **Internacionalizācija:** Atbalsts vairākām valodām

## Zināmie defekti

### Kritiski
- Nav identificēti kritiski defekti, kas traucētu pamata funkcionalitāti

### Nepilnības
- **UI/UX:** Mobilajā versijā dažas animācijas var būt lēnākas vecākās ierīcēs
- **Pārlūka saderība:** Clipboard API var nedarboties ļoti vecos pārlūkos
- **Veiktspēja:** Ļoti lieli teksti (>1MB) var izraisīt pārlūka palēnināšanos
- **Validācija:** Nepietiekama ievades validācija dažiem šifrēšanas veidiem
- **Kļūdu ziņojumi:** Daži kļūdu ziņojumi var būt pārāk tehniski gala lietotājam

### Plānotie labojumi
- Uzlabot ievades validāciju visiem šifrēšanas veidiem
- Pievienot lietotājam draudzīgākus kļūdu ziņojumus
- Optimizēt veiktspēju lielu datu apstrādei
- Uzlabot mobilās versijas atsaucību

## Resursi

### Dokumentācija
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MDN Web Docs - HTML/CSS](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [Base64 Encoding](https://en.wikipedia.org/wiki/Base64)
- [Caesar Cipher](https://en.wikipedia.org/wiki/Caesar_cipher)
- [Vigenère Cipher](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher)

### Mācību materiāli
- [JavaScript.info](https://javascript.info/)
- [freeCodeCamp](https://www.freecodecamp.org/)
- [Codecademy JavaScript](https://www.codecademy.com/learn/introduction-to-javascript)

### Rīki un bibliotēkas
- [GitHub](https://github.com/) - Versiju kontrole
- [Visual Studio Code](https://code.visualstudio.com/) - Koda redaktors
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) - Debugging


### Saistītie projekti
- [CryptoJS](https://github.com/brix/crypto-js) - JavaScript kriptogrāfijas bibliotēka
- [OpenSSL](https://www.openssl.org/) - SSL/TLS protokoli un algoritmi

## Autori

2026: Daniels Ričards Šervinckis P23-2
2026: Patriks Žirba P23-2

