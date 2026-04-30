# Balķa cenu kalkulators

Vienkāršs un ātrs kalkulators koka balķu izmaksu aprēķināšanai pēc izmēriem, koksnes sugas un apstrādes veida.


## Funkcijas

- Aprēķina balķa tilpumu (m³) un kopējo cenu
- Atbalsta vairākas koksnes sugas ar atbilstošiem cenu koeficientiem
- Atbalsta dažādus apstrādes veidus
- Rāda cenu sadalījumu ar un bez PVN (21%)
- Responsīvs dizains — strādā gan datorā, gan mobilajā
- Dark mode atbalsts (automātiski pēc sistēmas iestatījumiem)

## Koksnes sugas

| Suga | Koeficients |
|---|---|
| Priede / Egle | ×1.0 (bāze) |
| Bērzs | ×1.2 |
| Ozols | ×1.65 |
| Liepa / Alksnis | ×0.95 |

## Apstrādes veidi

| Apstrāde | Papildu izmaksas |
|---|---|
| Zāģējamais (neapstrādāts) | +0% |
| Iezāģēts (aptēsts) | +15% |
| Ēvelēts (gluds) | +30% |
| Impregnēts | +45% |

---

## Failu struktūra

```
├── index.html   # Lapa un HTML struktūra
├── style.css    # Dizains un dark mode
├── script.js    # Aprēķinu loģika
└── README.md
```

## Lokāla palaišana

Nav nepieciešama nekāda uzstādīšana vai build process. Vienkārši atver `index.html` pārlūkā:



---

>  Cenas aprēķinātas orientējoši(no kkada random saita nemtas). Faktiskā cena var atšķirties atkarībā no tirgus situācijas.
