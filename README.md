# FuelPoint x CodeStitch — Stress Test

Replica della homepage di **FuelPoint S.p.A.** costruita con componenti [CodeStitch](https://codestitch.app/app) per verificarne la copertura su un caso reale e complesso.

---

## Come avviare il progetto

**Prerequisiti**: Node.js 18+

```bash
npm install
npm run dev
```

Il dev server si avvia su `http://localhost:5173`.

```bash
npm run build    # build di produzione in /dist
npm run preview  # anteprima della build
```

---

## Stack tecnico

| Cosa | Dettaglio |
|---|---|
| Build tool | Vite 5 (vanilla, no framework) |
| Linguaggi | HTML, CSS vanilla, JS minimale |
| Design system | CodeStitch (componenti HTML/CSS puri) |
| Font | Roboto via Google Fonts |
| Immagini | Placeholder Unsplash (WebP reali da integrare) |

---

## Struttura del progetto

```
/
├── index.html                  # Entry point principale — sezioni separate (571 + 1736)
├── custom/
│   └── index.html              # Variante stitch 1619 — hero + card in sezione unica
├── package.json
├── CLAUDE.md                   # Istruzioni progetto per Claude Code
├── README.md                   # Questo file
├── src/
│   ├── main.js                 # Entry JS: import CSS + scripts
│   ├── styles/
│   │   └── global.css          # Variabili :root, reset, tipografia globale + CSS di ogni sezione
│   ├── js/
│   │   └── navigation.js       # Toggle hamburger + dropdown logic
│   └── assets/
│       └── icons/
│           └── logo.svg        # Logo placeholder SVG
├── public/                     # Asset statici (favicon, ecc.)
└── reports/                    # Analisi per sezione
    ├── 01-navigation-report.md
    ├── 02-hero-report.md
    ├── 03-card-features-report.md
    └── 02+03-hero-card-combined-report.md  # Refactor stitch 1619
```

### Due varianti a confronto

Il progetto mantiene due approcci per le sezioni hero + card features, accessibili come pagine separate durante il dev:

| URL | Approccio | Stitch |
|---|---|---|
| `http://localhost:5173/` | Sezioni separate: hero (`#cs-hero-571`) + card (`#cs-services-1736`) | Hero Left Aligned + Services 2 Card |
| `http://localhost:5173/custom/` | Sezione unica combinata (`#cs-hero-1619`) — hero full-viewport con card strip in fondo | Stitch 1619 |

**Differenza principale**: la variante `/custom` usa `min-height: 100dvh` e un layout flex colonna che ancora le card in fondo alla viewport, con l'immagine hero che fa da sfondo a entrambi (hero text + card). Più fedele al sito di riferimento. La variante principale (`/`) mantiene le due sezioni distinte per confronto e per documentare i gap dei singoli stitch.

---

## Come è stato sviluppato

### 1. Prima il CLAUDE.md

Il punto di partenza non è stato il codice, ma la definizione del problema. Il file `CLAUDE.md` è stato scritto per strutturare in anticipo:

- **L'obiettivo del test**: verificare CodeStitch su una homepage reale, non su una demo
- **Il mapping sezione per sezione**: ogni blocco di fuelpoint.it è stato associato a una categoria CS prima di aprire un editor
- **La checklist di copertura**: layout, tipografia, immagini, interattività, responsiveness, accessibilità
- **Le regole di sviluppo**: convenzioni di naming, ordine dei breakpoint, come gestire i font

Questo approccio ha permesso di lavorare in modo sistematico invece che "componente per componente senza una mappa" — ogni sessione di lavoro ha un perimetro chiaro.

### 2. Setup Vite

Prima di toccare i componenti, il progetto è stato messo in piedi con la struttura corretta per Vite:

- `package.json` con `vite` come unica dev dependency
- `src/main.js` come entry point (importa CSS e JS)
- `index.html` a root — Vite lo usa come entry point HTML nativo
- Struttura `src/styles/`, `src/js/`, `src/assets/` coerente con il CLAUDE.md

Vite non richiede nessun `vite.config.js` per questa configurazione: tutto funziona out-of-the-box.

### 3. Sezioni costruite

Ogni sezione segue lo stesso workflow:

1. Individuare la categoria CS più vicina al layout richiesto
2. Copiare la struttura HTML del componente CS scelto
3. Adattare contenuti (testi, immagini, link)
4. Sostituire colori hardcoded con variabili `:root`
5. Aggiungere CSS custom scoped all'ID della sezione per i gap
6. Scrivere il report di sezione con PRO, CONTRO e score

| # | Sezione | Componente CS | Score | Report |
|---|---|---|---|---|
| 01 | Navigation + Dropdown | Navigation > With Dropdown | 3.25/5 | [→](reports/01-navigation-report.md) |
| 02 | Hero full-bleed | Hero > Left Aligned | 4.2/5 | [→](reports/02-hero-report.md) |
| 03 | Card Features (2 card) | Services > 2 Card | 3.4/5 | [→](reports/03-card-features-report.md) |
| 02+03 | Hero + Card combinati (`/custom`) | Stitch 1619 | 3.9/5 | [→](reports/02+03-hero-card-combined-report.md) |
| 04 | Società Benefit | Side By Side > Reverse | — | da fare |
| 05 | GPL Energia | Content Flair | — | da fare |
| 06 | Servizi Triplet | Services > 3 Card | — | da fare |
| 07 | Devra Energia | Side By Side > Reverse | — | da fare |
| 08 | Lavora con noi | Side By Side > Standard | — | da fare |
| 09 | Assistenza | Services > 4 Card | — | da fare |
| 10 | News | Blog > 2 Card | — | da fare |
| 11 | Mondo FuelPoint | CTA > Standard | — | da fare |
| 12 | Footer | Footer > Multi Column | — | da fare |

---

## CodeStitch: dove funziona, dove no

Questa è la sintesi pratica dello stress test. Dati aggiornati sulle prime 3 sezioni analizzate.

### Cosa copre bene (score 4-5/5)

**Pattern strutturali HTML**
CodeStitch fornisce strutture HTML pulite e semantiche che si riusano senza modifiche. Il pattern `<picture>` + `<source>` + `object-fit: cover` è il più valido: immagini responsive che non rompono mai il layout indipendentemente dal crop.

**Hero e layout full-bleed**
Il Left Aligned Hero è il componente più maturo della libreria. Overlay, background image, testo posizionato — tutto funziona con il CSS di default e richiede solo override mirati per personalizzazioni di stile (gradiente direzionale vs flat).

**Scoping tramite ID**
La convenzione `#cs-section-####` è efficace. Ogni componente è completamente isolato: si possono afiancare sezioni eterogenee senza rischio di conflitti CSS. Questo è probabilmente il valore architetturale più solido di CS.

**Variabili CSS globali**
Il sistema `:root` di CS si integra immediatamente con le variabili custom del progetto. Cambiare il colore primario da qualsiasi shade di CS al verde FuelPoint è una modifica su una riga.

**Mobile-first con media queries raggruppate**
La convenzione CS di raggruppare tutte le media queries in fondo alla sezione (prima mobile, poi tablet, poi desktop) è una scelta di leggibilità ottima — non è comune nei CSS "scritti a mano" ma risulta più manutenibile.

---

### Dove mostra i limiti (score 1-3/5)

**Mega-menu e navigazione complessa**
CS offre dropdown semplici (una lista verticale). Appena si richiede un mega-menu multi-colonna con voci raggruppate — come quello reale di FuelPoint — CS non copre e bisogna costruire da zero. Il gap è strutturale, non cosmetico.

**Icon group e badge**
Nessun pattern CS prevede raggruppamenti di icone con label (veicoli compatibili, tipi di carburante, feature list con icone). Ogni volta che serve un elemento di questo tipo è CSS e HTML completamente custom.

**Varianti bottone**
CS ha un solo stile di bottone nativo: `.cs-button-solid`. Non esiste `.cs-button-outline`, `.cs-button-secondary`, `.cs-button-ghost`. Appena il design richiede più di un tipo di CTA — come nella hero (verde + outline bianco) o nelle card (verde + blu) — va tutto costruito a mano. Per un sistema di design vero questo è un gap significativo.

**Differenziazione visiva tra componenti simili**
CS non usa modificatori BEM né varianti di classe. Tutti i componenti dello stesso tipo sono identici stilisticamente. Per differenziare due card (una verde, una blu) serve aggiungere classi custom e override scoped — non è qualcosa che CS prevede nella sua architettura.

**CTA multipli in un singolo blocco**
La maggior parte dei componenti CS prevede 1 CTA per sezione. Appena si sale a 2 (es. hero con due bottoni, header con link + bottone) serve un contenitore wrapper custom con flexbox. Piccolo intervento, ma ricorrente.

---

### Quando usare CodeStitch

| Scenario | CS è adatto? |
|---|---|
| Landing page semplice (hero + servizi + footer) | ✅ Molto adatto |
| Blog / sito editoriale con sezioni standard | ✅ Molto adatto |
| Homepage istituzionale con layout classici | ✅ Adatto con piccoli override |
| Sito con navigazione complessa (mega-menu) | ⚠️ Richiede custom significativo |
| Design system con varianti sistematiche | ❌ Non è pensato per questo |
| UI con molti tipi di componenti interattivi | ❌ CS è statico by design |

---

## Palette colori

```css
--primary:     #00843D   /* Verde FuelPoint */
--primaryDark: #006B31   /* Verde scuro hover */
--secondary:   #003DA5   /* Blu corporate */
--accent:      #7AB648   /* Verde chiaro highlights */
--dark:        #1D1D1B   /* Testo body */
--grey:        #F5F5F5   /* Sfondi sezioni alternate */
--white:       #FFFFFF
```
