# Report: 01 - Navigation
**Categoria CS**: Navigation -> + Dropdown
**Score copertura**: 3/5
**Data**: 2026-03-03

---

## Componente CodeStitch utilizzato

**Categoria**: Navigation > Navigation with Dropdown
**Riferimento libreria**: https://codestitch.app/app → sezione "Navigation" → variante "With Dropdown"

### Perché questo componente

La navigation di FuelPoint richiede: logo, menu desktop con dropdown, hamburger mobile, e CTA header. Tra le varianti CS disponibili:

| Variante CS | Motivo esclusione / inclusione |
|---|---|
| **Navigation + Dropdown** ✅ scelto | Unica variante con dropdown su hover/click desktop |
| Navigation Standard | Solo link diretti, nessun dropdown |
| Mega Menu | Non presente in CS — avrebbe richiesto build completamente custom |
| Sidebar Nav | Non pertinente — FuelPoint usa topbar orizzontale |

---

## Struttura HTML adottata

```html
<header id="cs-navigation">
  <div class="cs-container">
    <a class="cs-logo">...</a>           <!-- logo -->
    <nav class="cs-nav">
      <button class="cs-toggle">...</button>       <!-- hamburger mobile -->
      <div class="cs-ul-wrapper">                  <!-- pannello mobile -->
        <ul class="cs-ul">
          <li class="cs-li cs-dropdown">           <!-- voce con dropdown -->
            <button class="cs-dropdown-button">    <!-- CUSTOM: button invece di a -->
            <ul class="cs-drop-ul">...</ul>
          </li>
          <li class="cs-li"><a class="cs-li-link"> <!-- voce semplice -->
          <li class="cs-mobile-cta">               <!-- CUSTOM: CTA mobile -->
        </ul>
      </div>
    </nav>
    <div class="cs-header-cta">...</div>           <!-- CUSTOM: CTA desktop -->
  </div>
</header>
```

---

## PRO del componente scelto

| PRO | Dettaglio |
|---|---|
| Pattern `cs-active` su header | JS minimo: una classe CSS fa tutto il lavoro |
| Hamburger animato CSS-only | Transizione linee → X via `transform` senza JS per l'animazione |
| `max-height` trick per dropdown mobile | Transizione fluida senza `display:none` → block |
| `position: fixed` nella convenzione CS | Pattern standard, scoped all'ID |
| Scoping ID | Zero collisioni con altri `header`, `nav`, `ul` globali |
| Media queries raggruppate | Mobile base + singolo breakpoint `64rem` |

---

## Problematiche e gap riscontrati

### 1. Button vs Anchor per i trigger dropdown — MODIFICA NECESSARIA
**Problema**: Nel template CS standard, tutti i `.cs-li-link` sono `<a>`. Ma i dropdown trigger non hanno una destinazione URL: sono pulsanti che aprono un pannello. Usare `<a href="#">` sarebbe scorretto semanticamente e romperebbe la navigazione da tastiera.
**Soluzione adottata**: Tag `<button class="cs-li-link cs-dropdown-button">` per i trigger, con `aria-expanded` e `aria-haspopup`. Questo richiede un reset CSS completo del `<button>` (`background: none; border: none; cursor: pointer; width: 100%`).
**Impatto**: Medio. Richiede ~10 righe CSS custom di reset button. Non previsto dal template CS.

### 2. CTA group doppio (link + bottone) nell'header — NON previsto in CS
**Problema**: CS Navigation prevede al massimo un singolo `.cs-button-solid` nell'header. FuelPoint ha due CTA: un link testuale ("Richiedi assistenza") + un bottone verde ("Trova stazione").
**Soluzione adottata**: Contenitore custom `.cs-header-cta` con `display: flex; gap` su desktop, hidden su mobile. Il CTA mobile viene inserito come ultimo `<li>` nella lista nav.
**Impatto**: Medio. Pattern non presente in CS nativo.

### 3. Mega-menu multi-colonna con voci raggruppate — NON SUPPORTATO da CS
**Problema**: La navigation reale di FuelPoint ha un mega-menu con sotto-voci raggruppate per categoria (es. "GPL combustibili" → colonne: Privati, Distributori, Professionisti). CS non ha un componente mega-menu.
**Soluzione adottata**: Dropdown semplice con lista verticale. Il grouping multi-colonna è stato rinunciato — richiede un layout `display: grid` custom che va oltre il pattern CS.
**Impatto**: Alto. Questa è la funzionalità più complessa della nav reale e CS non la copre nativamente. **GAP REALE** nello stress test.
**Raccomandazione**: Per mega-menu reali, CS non è sufficiente. Richiede CSS completamente custom.

### 4. Dropdown su hover vs click — Comportamento ibrido
**Problema**: Su desktop, il dropdown si apre al CSS hover (`:hover` su `.cs-dropdown`). Su mobile, si apre al click (JS). Il JS gestisce anche la chiusura via Escape e click esterno. CS fornisce solo il pattern mobile click — il hover desktop è CSS puro.
**Soluzione adottata**: Desktop hover gestito da CSS (`:hover .cs-drop-ul`), mobile click gestito da JS (`cs-active`). I due sistemi coesistono senza conflitti grazie al breakpoint nel CSS.
**Impatto**: Basso. Pattern funzionante, ma leggermente più complesso da capire a colpo d'occhio.

### 5. Animazione hamburger — Calcolo manuale del translateY
**Problema**: L'animazione hamburger → X richiede di calcolare il `translateY` esatto per le linee 1 e 3. Con `height: 0.875rem` e gap uniforme tra 3 linee da 2px, il valore corretto è `±6px`. CS non documenta questo calcolo.
**Soluzione adottata**: Valore `6px` calcolato manualmente: `(container_height - 3 * line_height) / 2 + line_height = (14px - 6px) / 2 + 2px = 6px`.
**Impatto**: Minimo, ma da ricordare per ogni altezza diversa del hamburger.

### 6. Logo SVG: placeholder creato da zero
**Problema**: Nessuna asset reale FuelPoint disponibile. Il logo reale è un quadrifoglio con wordmark.
**Soluzione adottata**: SVG inline con quadrifoglio stilizzato (cerchi sovrapposti) + wordmark "fuelpoint" in Roboto 900.
**Nota**: Da sostituire con il file SVG ufficiale FuelPoint in produzione.

---

## JavaScript: pattern usato

```javascript
// CS pattern standard: toggle cs-active sull'header
nav.classList.toggle('cs-active')

// Dropdown mobile: cs-active sul singolo .cs-dropdown (accordion)
parent.classList.toggle('cs-active')

// Chiusura globale: click fuori, Escape key, resize a desktop
document.addEventListener('click', ...)
document.addEventListener('keydown', e => e.key === 'Escape' ...)
window.addEventListener('resize', ...)
```

Il JS è più ricco del template CS base (che prevede solo il toggle) — sono stati aggiunti:
- Accordion behavior (chiude altri dropdown quando ne apri uno)
- Escape key handling
- Resize listener per reset mobile su desktop

---

## Score per criterio

| Criterio | Voto | Note |
|---|---|---|
| Logo + container | 5/5 | Pattern CS standard |
| Hamburger mobile | 4/5 | CSS-only animation, JS toggle — CS copre quasi tutto |
| Dropdown semplice mobile | 4/5 | `max-height` trick — CS copre, qualche override |
| Dropdown semplice desktop | 4/5 | CSS hover — CS copre |
| CTA group header | 2/5 | Non in CS — custom completo |
| Mega-menu multi-colonna | 1/5 | Non supportato da CS — **gap critico** |
| Button trigger per dropdown | 2/5 | CS usa `<a>`, button richiede reset custom |
| Accessibilità (aria) | 4/5 | `aria-expanded`, `aria-haspopup`, `aria-controls`, Escape key |

**TOTALE NAVIGATION**: **3.25/5** — copertura media, gap significativo sul mega-menu reale.

---

## Gap critici per il report finale

- **Mega-menu**: CodeStitch non ha nativa supporto per dropdown multi-colonna con gruppi. È il gap più rilevante dell'intero test sulla navigation.
- **Button trigger**: Il pattern CS assume `<a>` per tutti i link nav — non è accessibilità-first per le voci senza URL.
- **CTA multipli header**: CS prevede 1 CTA max, FuelPoint ne richiede 2.

---

## Azioni follow-up

- [ ] Sostituire `logo.svg` placeholder con asset ufficiale FuelPoint
- [ ] Valutare implementazione mega-menu custom per sezione GPL Combustibili (multi-colonna)
- [ ] Testare focus trap nel menu mobile (accessibilità avanzata)
- [ ] Verificare comportamento dropdown su touchscreen (hover non funziona su touch)
