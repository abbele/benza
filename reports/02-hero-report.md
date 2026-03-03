# Report: 02 - Hero Section
**Categoria CS**: Hero Section -> Left Aligned
**Score copertura**: 4/5
**Data**: 2026-03-03

---

## Componente CodeStitch utilizzato

**Categoria**: Hero > Left Aligned Hero
**Riferimento libreria**: https://codestitch.app/app → sezione "Hero Sections" → variante "Left Aligned"

### Perché questo componente

La hero di FuelPoint ha tre requisiti chiari: testo allineato a sinistra, background image full-bleed con overlay scuro, e due CTA affiancati. Tra le varianti CS disponibili:

| Variante CS | Motivo esclusione / inclusione |
|---|---|
| **Left Aligned** ✅ scelto | Testo a sx, immagine sfondo, struttura `.cs-flex-group` già predisposta |
| Centered | Testo centrato — non corrisponde al layout FuelPoint |
| Split (immagine + testo 50/50) | L'immagine occupa metà schermo, non full-bleed |
| Full Screen Video | Prevede `<video>` come sfondo, non `<img>` |

Il Left Aligned Hero è l'unico che combina:
- sfondo fotografico full-viewport
- contenuto testuale posizionato liberamente sopra l'overlay
- struttura HTML scalabile mobile-first

### Pattern strutturali ereditati da CS Left Aligned Hero

```html
<!-- Struttura CS nativa Left Aligned Hero -->
<section id="cs-hero-###">
  <div class="cs-container">
    <div class="cs-flex-group">      <!-- contenitore testo -->
      <span class="cs-topper">...</span>
      <h1 class="cs-title">...</h1>
      <p class="cs-text">...</p>
      <a class="cs-button-solid">...</a>
    </div>
  </div>
  <picture class="cs-background">   <!-- img assoluta sul fondo -->
    <source media="..." srcset="..." />
    <img ... />
  </picture>
</section>
```

### PRO del componente scelto

| PRO | Dettaglio |
|---|---|
| Struttura HTML già ottimale | `.cs-flex-group` + `.cs-container` + `.cs-background` — zero HTML custom necessario |
| `picture` + `source` nativo | Serve automaticamente immagine mobile/desktop senza JS |
| `object-fit: cover` sull'img | Il crop dell'immagine non rompe mai il layout |
| Overlay tramite `::before` | Pattern pulito, nessun elemento HTML aggiuntivo |
| Classi globali CS riusabili | `.cs-topper`, `.cs-title`, `.cs-text`, `.cs-button-solid` già nel globale |
| Scoping ID | Zero rischio conflitti CSS con altre sezioni |
| Media queries raggruppate | Convenzione CS rispettata, leggibilità alta |

### CONTRO / Limitazioni del componente

| CONTRO | Impatto | Soluzione adottata |
|---|---|---|
| Solo 1 CTA previsto nativamente | Il template CS Left Aligned mostra un unico bottone | Aggiunto `.cs-button-group` con flex custom (4 righe) |
| Nessuna variante bottone outline | CS non include `.cs-button-transparent` o outline | Classe custom scope-scoped all'hero |
| Overlay uniforme nel template base | CS usa `rgba(0,0,0,0.5)` flat, non gradiente direzionale | Override `::before` con `linear-gradient` desktop |
| Nessuna animazione integrata | CS è statico by design | — (non implementata, opzionale) |

---

## Cosa è stato implementato

- Hero full-bleed con background image (`object-fit: cover`)
- Overlay scuro tramite `::before` con gradiente direzionale
- Eyebrow `.cs-topper`, `h1.cs-title`, `.cs-text` — classi CS standard
- 2 CTA affiancati: `.cs-button-solid` (primario) + `.cs-button-transparent` (outline)
- `<picture>` con `<source>` per immagini diverse mobile/desktop — pattern CS nativo
- Layout left-aligned, mobile-first, responsive su 3 breakpoint
- `min-height: 100svh` (usa `svh` per evitare il problema del chrome bar su mobile)
- Scoped tramite ID `#cs-hero-571` — convenzione CS rispettata

---

## Cosa ha funzionato bene (CS copre nativamente)

| Feature | Note |
|---|---|
| Background image full-bleed | Pattern `<picture>` + `position: absolute` + `object-fit: cover` — perfetto |
| Overlay scuro | `::before` con `background: linear-gradient(rgba...)` — standard CS |
| Eyebrow + titolo + corpo | Classi `.cs-topper`, `.cs-title`, `.cs-text` riusate dal globale |
| Bottone primario `.cs-button-solid` | Già definito in `global.css` — zero codice extra |
| Responsive con `picture` + `source` | CS gestisce nativamente mobile vs desktop image swap |
| Scoping ID | Nessun conflitto CSS possibile con altre sezioni |

---

## Problematiche e gap riscontrati

### 1. Bottone outline/trasparente — NON presente in CS nativo
**Problema**: CodeStitch non include una variante outline/transparent del bottone. Il sistema CS prevede solo `.cs-button-solid`.
**Soluzione adottata**: Classe custom `.cs-button-transparent` con `border: 2px solid var(--white)` aggiunta scope-scoped all'hero.
**Impatto**: Basso. CSS semplice, ma va replicato in ogni sezione che ne ha bisogno — non è un componente globale CS.
**Raccomandazione**: Aggiungere `.cs-button-outline` in `global.css` come variante standard per il progetto.

### 2. Button group a due CTA — layout non previsto nativamente
**Problema**: CS non ha un contenitore `.cs-button-group` per affiancare due CTA. I template CS mostrano di solito 1 solo bottone per hero.
**Soluzione adottata**: `display: flex; gap: 1rem; flex-wrap: wrap` — 4 righe di CSS custom.
**Impatto**: Minimo. Ma evidenzia che il layout "2 CTA affiancati" richiede sempre CSS custom.

### 3. Gradiente overlay direzionale su desktop
**Problema**: CS usa tipicamente un overlay uniforme `rgba(0,0,0,0.X)`. FuelPoint ha un effetto visivo dove il lato sinistro è più scuro e il destro lascia vedere l'immagine.
**Soluzione adottata**: `linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 100%)` — gestito con media query desktop.
**Impatto**: Basso, ma richiede override del `::before` al breakpoint `64rem`.

### 4. `min-height: 100svh` vs `100vh`
**Problema**: Su mobile (Safari/Chrome), `100vh` include la barra browser e causa overflow visivo al primo caricamento.
**Soluzione adottata**: `min-height: 100svh` (Small Viewport Height, supportato da Safari 15.4+, Chrome 108+).
**Impatto**: Nessuno per browser moderni. Da tenere a mente per eventuale supporto legacy.

### 5. Immagine placeholder — non reale
**Problema**: Non abbiamo le immagini reali di FuelPoint. L'immagine usata è un placeholder da Unsplash.
**Nota**: Sostituire con WebP reali (`public/assets/images/hero-desktop.webp` + `hero-mobile.webp`) in produzione.

---

## Struttura CSS adottata (conformità CodeStitch)

```
#cs-hero-571 { ... }               /* mobile base */
#cs-hero-571::before { ... }       /* overlay */
#cs-hero-571 .cs-container { ... }
#cs-hero-571 .cs-flex-group { ... }
#cs-hero-571 .cs-topper { ... }
#cs-hero-571 .cs-title { ... }
#cs-hero-571 .cs-text { ... }
#cs-hero-571 .cs-button-group { ... }      /* CUSTOM */
#cs-hero-571 .cs-button-transparent { ... } /* CUSTOM */
#cs-hero-571 .cs-background { ... }
#cs-hero-571 .cs-background img { ... }

@media (min-width: 48rem) { ... }   /* tablet */
@media (min-width: 64rem) { ... }   /* desktop */
```

Media queries raggruppate in fondo — conforme a convezione CS.

---

## Score copertura sezione

| Criterio | Voto | Note |
|---|---|---|
| Layout full-bleed | 5/5 | Nativo CS |
| Background image responsive | 5/5 | `picture` + `source` nativo |
| Overlay scuro | 4/5 | Gradiente direzionale richiede custom |
| Tipografia (topper/title/text) | 5/5 | Classi globali CS funzionano perfettamente |
| Bottone primario | 5/5 | `.cs-button-solid` globale, zero custom |
| Bottone outline | 2/5 | Non presente in CS, custom completo |
| Button group 2 CTA | 3/5 | Flex custom minimo ma necessario |
| Responsiveness | 5/5 | Mobile/tablet/desktop ok |
| Accessibilità | 4/5 | `aria-hidden` sull'img decorativa, alt text presente |

**TOTALE HERO**: **4.2/5** — ottima copertura, custom limitato e circoscritto.

---

## Azioni follow-up suggerite

- [ ] Aggiungere `.cs-button-outline` come classe globale in `global.css`
- [ ] Sostituire placeholder Unsplash con WebP reali FuelPoint
- [ ] Verificare visivamente su iPhone Safari (svh + gradiente)
- [ ] Valutare animazione fade-in sul testo (CS non prevede animation, tutto custom)
