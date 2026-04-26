# Tavs Skaistuma Stils

## Ievads
Šis rīks ļauj lietotājam noteikt savu individuālo skaistuma stilu, balstoties uz sejas īpašībām, piemēram, ādas tipu, acu krāsu un sejas formu.

## Pārskats
Projekts ir izstrādāts kā vienas lapas tīmekļa lietotne, izmantojot HTML, CSS un JavaScript.

### Arhitektūra
- Frontend-only risinājums – nav nepieciešams serveris
- Lietotāja ievade tiek apstrādāta pārlūkprogrammā
- Dati tiek saglabāti JavaScript objektā (`choices`)

### Failu struktūra
- `index.html` – galvenais fails, kas satur:
  - HTML struktūru
  - CSS stilus 
  - JavaScript loģiku 

### Galvenā funkcionalitāte
- Lietotājs izvēlas:
  - Ādas tipu
  - Ādas toni
  - Acu krāsu
  - Matu krāsu
  - Sejas formu
  - Acu formu
- Progresa josla rāda aizpildes statusu
- Validācija pārbauda, vai visas izvēles ir veiktas
- Rezultāts tiek ģenerēts modālajā logā
- Pieejamas papildfunkcijas:
  - Nejauša izvēle
  - Notīrīt izvēles

### Tehnoloģijas
- HTML
- CSS
- JavaScript 
- Bootstrap

## Iespējamie uzlabojumi
- Saglabāt rezultātus (localStorage)
- Pievienot lietotāja kontus
- Izmantot mākslīgo intelektu precīzākai analīzei
- Pievienot attēlus un vizuālus piemērus
- Uzlabot loģiku (vairāk kombināciju un precizitāte)
- Pievienot daudzvalodu atbalstu

## Zināmie defekti
- Analīzes loģika ir vienkāršota (neaptver visas kombinācijas)
- Nav servera validācijas
- Dizains var atšķirties dažādās ierīcēs
- Nav saglabāšanas pēc lapas pārlādes

## Resursi
- https://getbootstrap.com/
- https://www.w3schools.com/
- https://gitlab.com/tgrants/web

## Autori
2026: Ariana Terehova, Marija Soboleva 