# Piezimju dēlis

## Ievads

Rīka galvenā nozīme ir nodrošināt vienkāršu un pielāgojamu veidu, kā saglabāt un kategorizēt piezīmes. 

## Pārskats

Projektā tiek izmantota moduļu sistēma, kurā visi elementi ir sadalīti komponentēs (līdzīgi kā React). 
Visi lapas dati tiek glabāti mapē “lib”. 
“Data” mapē ir ietverti skripti, kas pārvalda komponentus, piemēram, piezīmju mapi, piezīmju un tagu. 
Mapēs “windows” un “templates” ir html faili ar attiecīgajiem logiem/elementiem. 

Ielādējot tiek izpildīti vairāki skripti: vispirms tiek izpildīts window_loader.js, kas ielādē visus logus uz ainas un beigās nosūta notikumu “loaded”, kas signalizē citiem skriptiem, ka var ielādēt citus datus. 
Pēc tam tiek izpildīts “data_manager.js”, kas satur kuģa datus un palīgfunkcijas, piemēram, piezīmju un mapju datu pārvaldību, kā arī skripta un komponenta ievietošanu lapā. 
Pēc tam tiek izpildīts “folder_loader.js”, kas ģenerē datus uz dēļa. Tas nolasa tāfeles datus un iterē katru mapi un piezīmju un pievieno tiem komponentus. 
Pārējie “manager” skripti atbild par datu pārvaldību attiecīgajās komponentēs (logos).

Lai pievienotu komponentu lapai, vispirms ielādējiet HTML komponenta failu, pēc tam atsevišķi pievienojiet skriptu izveidotajam komponentam ar citu funkciju. Tas ir saistīts ar to, ka nav iespējams dinamiski pievienot skripta tagus ar HTML.

## Iespējamie uzlabojumi

Nākotnē varētu ieviest konta sistēmu, kas ļautu sinhronizēt datus starp visām ierīcēm. 

Vēl ko varētu uzlabot, ir vairāk piezīmju tipu, piemēram, varētu pievienot konkrētam datumam/laikam atbilstošus piezīmjus vai atzīmēšanas rūtiņu piezīmjus, kā arī uzlabot pielāgošanu.

## Resursi 

Galvenais resurss, ko izmantoju stila veidošanai, bija Mozilla Developer dokumentācija: 
https://developer.mozilla.org/en-US/docs/Web

Kodam galvenie resursi bija StackOverflow un Reddit: 
https://stackoverflow.com/questions 
https://www.reddit.com/

## Autori 

2025 gads: Andrejs Pisočņikovs


