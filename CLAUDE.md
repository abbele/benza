# FuelPoint x CodeStitch - Stress Test Project

## Obiettivo del progetto

Questo progetto nasce con un duplice scopo:

1. **Testare le potenzialita di CodeStitch** (https://codestitch.app/app) come design system / component library per la costruzione di siti web completi, verificando se i suoi Stitches (componenti HTML/CSS puri) sono in grado di coprire tutte le casistiche che una homepage reale e complessa richiede.

2. **Riprodurre la homepage di FuelPoint S.p.A.** (https://www.fuelpoint.it/) come caso di studio concreto, mappando ogni sezione del sito reale a uno o piu componenti CodeStitch.

---

## Stack tecnico

- **Build tool**: Vite (vanilla, no framework)
- **Linguaggi**: HTML, CSS (vanilla), JS minimale
- **Design system**: CodeStitch - componenti HTML/CSS puri, mobile-first, framework-free
- **Preprocessore CSS**: Nessuno (CSS vanilla, filosofia CodeStitch)
- **Struttura**: Multi-file per sezione, assemblati in index.html

---

## Come funziona CodeStitch

CodeStitch e una libreria di componenti puro HTML e CSS, senza framework ne dipendenze. Ogni componente (Stitch) e:

- **Mobile-first** e fully responsive
- **Scoped** tramite ID univoci (es. #cs-section-1234) per evitare conflitti CSS
- **Autonomo**: ogni Stitch include tutto il CSS necessario in un blocco style con media queries raggruppate
- **Basato su object-fit: cover** per le immagini, cosi qualsiasi crop funziona senza rompere il layout
- **Usa il tag picture con source** per servire immagini diverse a mobile e desktop

### Convenzioni CSS di CodeStitch

- Variabili :root per colori, font e spacing globali
- Classi standard: .cs-topper (eyebrow), .cs-title (heading), .cs-text (body copy)
- Media queries raggruppate per sezione, da mobile (top) a desktop (bottom)
- Font base: Roboto (placeholder, da sostituire con il font del progetto)

### Workflow tipico

1. Scegliere lo Stitch dalla libreria per categoria
2. Copiare HTML + CSS
3. Adattare contenuti, immagini e variabili CSS al progetto
4. Rimuovere font-family inline dallo Stitch (eredita dal globale)

---

## Struttura del progetto

```
fuelpoint-codestitch/
  claude.md                    # Questo file
  index.html                   # Entry point - assembla tutte le sezioni
  package.json
  public/
    favicon.svg
  src/
    main.js                    # JS entry (import CSS + minimal logic)
    styles/
      global.css               # :root variables, reset, typography
      sections.css             # Import aggregato CSS sezioni
    sections/                  # Ogni sezione = un file HTML partial
      01-navigation.html
      02-hero.html
      03-card-features.html
      04-societa-benefit.html
      05-gpl-energia.html
      06-servizi-triplet.html
      07-devra-energia.html
      08-lavora-con-noi.html
      09-assistenza.html
      10-news.html
      11-mondo-fuelpoint.html
      12-footer.html
    components/                # Micro-componenti riutilizzabili
    assets/
      images/                  # Immagini (placeholder o reali)
      icons/                   # SVG e icone
    js/
      navigation.js            # Script nav mobile
```

---

## Mapping sezioni FuelPoint -> categorie CodeStitch

### 01 - Navigation (logo + mega menu + CTA)
- **Categoria CS**: Navigation -> + Dropdown
- **Tipo**: Nav con dropdown multipli
- **Note**: Mega-menu complesso con sotto-voci raggruppate per categoria (GPL combustibili, Distributori, Aziende). Include CTA header: Trova stazione, Richiedi assistenza. Testare se CS supporta dropdown multi-level e grouping.

### 02 - Hero (claim principale + 2 CTA + sfondo full)
- **Categoria CS**: Hero Section -> Left Aligned / Centered
- **Tipo**: Hero con background image full-bleed
- **Note**: H1 "GPL, l'energia pulita che arriva ovunque", sottotitolo corporate dal 1956, 2 bottoni (Combustibili + Carburanti). Testo bianco su overlay scuro.

### 03 - Card Features (FuelPoint Card + Stazioni di servizio)
- **Categoria CS**: Services -> 2 Card oppure Side By Side -> Non Standard
- **Tipo**: Due card affiancate con immagine, icone, testo e CTA
- **Note**: Ogni card ha eyebrow, titolo, immagine decorativa (carta/marker), icone veicolo, e un CTA. Layout custom, probabilmente il test piu impegnativo.

### 04 - Societa Benefit (immagine + testo + 3 link PDF)
- **Categoria CS**: Side By Side -> Standard o Reverse
- **Tipo**: Immagine sx + blocco testo dx con CTA multipli
- **Note**: Contiene 3 link a PDF (bilanci sostenibilita annuali). Testare gestione CTA multipli (>2 bottoni) in Side By Side.

### 05 - GPL Energia (icona SVG + titolo + testo + CTA)
- **Categoria CS**: Content Flair oppure Side By Side con icona
- **Tipo**: Sezione centrata con icona decorativa grande
- **Note**: Icona SVG casa/fiamma sopra al titolo. Layout centrato, sfondo colorato.

### 06 - Servizi Triplet (Passa al GPL + BBox + Offerte Aziende)
- **Categoria CS**: Services -> 3 Card oppure Content Flair -> Button Boxes
- **Tipo**: Tre card informative affiancate
- **Note**: Ogni card ha icona, eyebrow, titolo, testo e CTA. Su fuelpoint.it sono blocchi separati ma visivamente formano un trittico.

### 07 - Devra Energia (brand secondario)
- **Categoria CS**: Side By Side -> Reverse
- **Tipo**: Immagine sx + testo dx con CTA
- **Note**: Promozione sub-brand Devra Energia. Immagine brand + testo + bottone.

### 08 - Lavora con noi
- **Categoria CS**: Side By Side -> Standard
- **Tipo**: Immagine + testo + CTA
- **Note**: Sezione HR/recruiting con foto team e testo motivazionale.

### 09 - Assistenza (numeri verdi + contatti)
- **Categoria CS**: Services -> 3/4 Card oppure Contact
- **Tipo**: Grid di card con numeri verdi e CTA contatto
- **Note**: Mix card informative (numero verde emergenze reti, numero verde serbatoi) + CTA generico Contattaci. Card con contenuto eterogeneo: immagini numeri verdi, icone, testi diversi.

### 10 - News (ultime 2 notizie)
- **Categoria CS**: Blog -> 2/3 Card
- **Tipo**: Card articolo con immagine, data e titolo
- **Note**: Preview ultime 2 news con data DD/MM/YYYY, titolo, immagine e link.

### 11 - Mondo FuelPoint (banner CTA di chiusura)
- **Categoria CS**: CTA -> Standard
- **Tipo**: Banner full-width con testo e CTA
- **Note**: Sezione chiusura "Sempre al tuo fianco" con invito a esplorare.

### 12 - Footer (logo + link + contatti)
- **Categoria CS**: Footer -> Multi Column
- **Tipo**: Footer multi-colonna con logo e legal
- **Note**: Logo bianco, colonne link, info legali, social.

---

## Casistiche da verificare (checklist stress test)

### Layout e struttura
- [ ] Navigation con mega-menu multi-livello (dropdown annidati)
- [ ] Hero full-bleed con immagine di sfondo e overlay scuro
- [ ] Side-by-side con immagine a sinistra
- [ ] Side-by-side reverse con immagine a destra
- [ ] Grid di card (2, 3, 4 colonne)
- [ ] Sezione full-width con background colorato
- [ ] Banner CTA centrato

### Tipografia e contenuto
- [ ] Eyebrow text (.cs-topper) sopra i titoli
- [ ] Titoli H2/H3 con sizing responsive
- [ ] Body text con line-height ottimale
- [ ] Liste inline (link PDF, voci menu)
- [ ] CTA multipli nella stessa sezione (2-3 bottoni)

### Immagini e media
- [ ] Immagini responsive via picture + source
- [ ] Immagini con object-fit che non rompono il layout
- [ ] Icone SVG inline come decorazione
- [ ] Logo SVG nella navigation e nel footer
- [ ] Immagini con bordi arrotondati o forme custom

### Interattivita
- [ ] Menu mobile hamburger con toggle JS
- [ ] Dropdown al hover/click su navigation
- [ ] Hover states su card e bottoni
- [ ] Smooth scroll (se applicabile)

### Responsiveness
- [ ] Mobile (< 480px): stack verticale, menu hamburger
- [ ] Tablet (481-768px): layout intermedio
- [ ] Desktop (> 1024px): layout completo multi-colonna
- [ ] Large screen (> 1440px): contenuto centrato con max-width

### Accessibilita
- [ ] Semantic HTML (header, nav, main, section, footer)
- [ ] Alt text su tutte le immagini
- [ ] Focus states su elementi interattivi
- [ ] Aria labels sulla navigazione mobile
- [ ] Contrasto colori adeguato (WCAG AA)

### Temi e personalizzazione
- [ ] Variabili CSS per cambio colori globale
- [ ] Font swap (da Roboto al font FuelPoint)
- [ ] Spacing consistente tramite variabili
- [ ] Dark section (sfondo scuro, testo chiaro)

---

## Palette colori FuelPoint

- --primary: #00843D (Verde FuelPoint quadrifoglio)
- --primary-dark: #006B31 (Verde scuro hover/accenti)
- --secondary: #003DA5 (Blu corporate)
- --accent: #7AB648 (Verde chiaro highlights)
- --dark: #1D1D1B (Testo body)
- --grey: #F5F5F5 (Sfondi sezioni alternate)
- --white: #FFFFFF (Sfondi e testo su scuro)

---

## Regole per lo sviluppo

### Quando si aggiunge un nuovo Stitch

1. Identificare la sezione FuelPoint da riprodurre
2. Cercare nel catalogo CodeStitch la categoria piu vicina
3. Copiare HTML e CSS dello Stitch scelto
4. Sostituire ID dello Stitch se serve (evitare collisioni)
5. Adattare contenuti (testi, immagini, link) al contenuto FuelPoint
6. Sostituire colori con variabili :root del progetto
7. Rimuovere font-family dallo Stitch (eredita dal globale)
8. Verificare responsive su mobile, tablet e desktop
9. Documentare nello score cosa ha funzionato e cosa no

### Convenzioni di naming

- File sezione: ##-nome-sezione.html (numerati per ordine)
- ID CSS: mantenere ID CodeStitch originali dove possibile
- Classi custom: prefisso bf- per override FuelPoint-specifici

### Performance

- Immagini: WebP con fallback JPG/PNG
- SVG: inline per icone, img per illustrazioni complesse
- CSS: un unico file aggregato, no import a cascata in prod
- JS: solo per nav mobile e interazioni essenziali

---

## Risultato atteso

1. **Homepage funzionante** che replica fedelmente il layout di fuelpoint.it
2. **Mappatura completa** Stitch <-> sezione reale, con score di copertura
3. **Report dei gap** - casistiche che CS non copre nativamente e richiedono CSS custom
4. **Template riutilizzabile** per futuri progetti CodeStitch + Vite

---

## Score di copertura (da compilare durante lo sviluppo)

Scala: 1 = non coperto, 2 = molto custom, 3 = adattabile, 4 = buona copertura, 5 = perfetto

- Navigation: copertura ? | custom CSS ? | voto ?
- Hero: copertura ? | custom CSS ? | voto ?
- Services/Cards: copertura ? | custom CSS ? | voto ?
- Side by Side: copertura ? | custom CSS ? | voto ?
- Blog/News: copertura ? | custom CSS ? | voto ?
- CTA: copertura ? | custom CSS ? | voto ?
- Footer: copertura ? | custom CSS ? | voto ?
- **TOTALE**: media ? | voto complessivo ?
