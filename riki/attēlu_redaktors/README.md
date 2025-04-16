# Attēlu Redaktors

## Ievads
Vienkārš attēlu redaktors izmantojot `<canvas>` objektu. Mājaslapa spēj rediģēt jau eksistējošus foto, kā arī izveidot jaunus un tos saglabāt.

## Pārskats
Projekts ir veidots modulāra veidā, tādēļ vajadzētu būt samērā vienkārši pievienot jaunas funkcionalitātes.

Failu struktūra ir kā sekojošā:
 - `index.html` Galvenais fails, uztur visu lapas struktūru
 - `[Modules]`
    - `[Tools]` Direktorija ar JS moduļiem, kurus var vienkārši izveidot, lai pievienotu papildus rīku, kreisajā joslā (piem. pildspalva, dzēšgumija)
    - `Canvas.js` Galvenais fails priekš kanvasas un tās funkcionalitātēm, apstrādā funkcijas kā `undo`, pašu zīmēšanas funkciju, u.t.l
    - `IO.js` Paplašinājums priekš Canvas.js, IO pievieno funkcijas failu importēšanai/eksportēšanai
    - `ToolHandler.js` Apstrādā visus rīkus no [Tools] direktorijas un dinamiski pievieno tos malas joslai.

## Iespējamie uzlabojumi
Būtu iespejams pievienot slāņu (layers) funkciju, lai rediģēšana būtu vieglāka.

Kā arī varētu pievienot vairākus ekstra rīkus, piemēram teksts

### Zināmie defekti
Atverot eksistējošu foto, kreisajā joslā netiek atjaunināts kanvasas izmērs (kaut vai kanvasa nomaina izmēru), bet kodā ir pievienota funkcionalitāte lai tas mainītos, bet nav skaidrs kādēļ tas nestrādā.

Modulārā dizaina dēļ, nav iespējams izmantot lapu bez web servera (localhost, github pages, u.t.l) jo javascript import/export statementiem ir nepieciešams http(s)

## Resursi
* tailwindcss:
https://tailwindcss.com/docs/installation
* html canvas: https://www.w3schools.com/html/html5_canvas.asp

## Autori
2025 gads: Rainers Bočs