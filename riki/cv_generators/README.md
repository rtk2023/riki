# cv-generators
Šis rīks ir vienkāršs un moderns CV ģenerators, kas ļauj lietotājam ātri izveidot vizuāli pievilcīgu CV un eksportēt to drukāšanai vai PDF formātā.   


### Projekta apraksts
CV Generator ir front-end tīmekļa lietotne, kas darbojas pārlūkprogrammā bez servera puses loģikas.   
Lietotājs ievada savus datus formā, un CV tiek ģenerēts vizuāli savā attiecīgajā logā.   


### Arhitektūra
Projekts sastāv no trim galvenajām daļām:

**HTML**  
**CSS**  
**JavaScript**  
**Bootstrap**  


### Failu struktūra
cv-generators/  
|  
|-- index.html   
|-- style.css   
|-- index.js    
|-- README.md   


### Galvenā funkcionalitāte
* Profila attēla augšupielāde (ar faila izmēra pārraide)
* CV ģenerēšana
* Dark / Light režīms (ar localStorage saglabāšanu)
* Formas validācija (epasts, telefons) pielietojot regex
* Drukāšana / PDF eksportēšana
* Moderns un responsīvs dizains


## Iespējamie uzlabojumi
* CV saglabāšana kā `.pdf` fails bez print dialoga
* Dažādi CV dizaina template (piemēram: minimalistisks, korporatīvs, radošs)
* Drag & drop sekciju pārkārtošana
* Valodu izvēle (LV / EN)
* Datu saglabāšana (localStorage vai backend)
* LinkedIn / GitHub lauku pievienošana
* Automātiska CV analīze (piemēram, AI ieteikumi)


## Zināmie defekti
* PDF eksportēšana izmanto `window.print()`


## Resursi
* Font Awesome ikonas: (https://fontawesome.com/)
* MDN Web Docs: (https://developer.mozilla.org/)
* JavaScript FileReader: (https://developer.mozilla.org/en-US/docs/Web/API/FileReader)


## Autori
Viestards Staškevičs  
Artjoms Čereuho  
P23-1  