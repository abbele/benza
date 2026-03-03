# Report: 03 - Card Features
**Categoria CS**: Services -> 2 Card
**Score copertura**: 3/5
**Data**: 2026-03-03
**Nota CLAUDE.md**: "Layout custom, probabilmente il test più impegnativo"

---

## Componente CodeStitch utilizzato

**Categoria**: Services > 2 Card
**Riferimento libreria**: https://codestitch.app/app → sezione "Services" → variante "2 Cards"

### Perché questo componente

La sezione ha due feature principali affiancate, ognuna con immagine, contenuto testuale e CTA. Il componente CS "Services 2 Card" è la base più vicina al layout richiesto.

| Variante CS | Motivo esclusione / inclusione |
|---|---|
| **Services 2 Card** ✅ scelto | Grid 2 colonne, struttura card con immagine + contenuto |
| Side By Side | Per sezioni singole non-card |
| Services 3/4 Card | Numero colonne errato |
| Content Flair | Nessuna struttura card con immagine |

---

## Struttura HTML adottata

```html
<section id="cs-services-1736">
  <div class="cs-container">
    <div class="cs-content">              <!-- header sezione (topper + title) -->
    <ul class="cs-card-group">
      <li class="cs-item cs-item--card">  <!-- variante con border accent verde -->
        <picture class="cs-picture">      <!-- immagine aspect-ratio fisso -->
        <div class="cs-info">
          <span class="cs-topper">
          <h3 class="cs-h3">
          <p class="cs-item-text">
          <ul class="cs-icon-group">      <!-- CUSTOM: non in CS nativo -->
            <li class="cs-icon-li">
              <svg class="cs-icon">
              <span>Auto</span>
          <a class="cs-button-solid">
      <li class="cs-item cs-item--stations"> <!-- variante con border accent blu -->
        ...
```

---

## PRO del componente scelto

| PRO | Dettaglio |
|---|---|
| Grid 2 colonne | `grid-template-columns: 1fr 1fr` — CSS standard, zero JS |
| `<picture>` + `object-fit: cover` | Immagine responsive che non rompe il layout — pattern CS nativo |
| Hover scale sull'immagine | `transform: scale(1.04)` — effetto polished senza JS |
| `flex: 1` su `.cs-info` | Le due card si allineano in altezza anche con contenuto diverso |
| `margin-top: auto` sul CTA | Il bottone si ancora sempre in fondo alla card |
| `aspect-ratio` fisso sull'immagine | Garantisce coerenza visiva tra le due card indipendentemente dall'immagine |
| Modificatori BEM su `.cs-item` | `.cs-item--card` e `.cs-item--stations` per differenziare i due temi visivi |

---

## Problematiche e gap riscontrati

### 1. Icon group — NON presente in CS nativo (il gap più importante)
**Problema**: La sezione richiede un gruppo di icone SVG con label (veicoli compatibili / carburanti disponibili). CS non prevede nessun pattern di questo tipo nelle Services card.
**Soluzione adottata**: Struttura custom `.cs-icon-group > .cs-icon-li > svg + span` con layout `flex-column` per ogni icona + label.
**Impatto**: Alto. Richiede:
  - SVG inline per ogni icona (auto, moto, camion, benzina, diesel, GPL)
  - CSS custom per il layout icona + testo
  - Colorazione diversa per le due card (verde vs blu)
**Nota**: Gli SVG inline sono costruiti da zero — non è una limitazione di CS ma un'assenza di asset.

### 2. Differenziazione visiva delle due card — Non standard in CS
**Problema**: CS "2 Card" usa card stilisticamente identiche. La sezione FuelPoint richiede che le due card abbiano identità visiva distinta (verde per FuelPoint Card, blu per Stazioni).
**Soluzione adottata**: Modificatori CSS `.cs-item--card` (border-top verde) e `.cs-item--stations` (border-top blu + override colori topper/icone/bottone).
**Impatto**: Medio. Pattern BEM aggiunto che CS non usa (CS usa classi flat, non modificatori).

### 3. Intestazione sezione sopra le card — Gestione ridondanza
**Problema**: CS "2 Card" ha `.cs-content` come header della sezione con topper + title. Ma ogni card ha anche il proprio `.cs-topper` e `.cs-h3`. Risultano due livelli di titolazione: uno per la sezione, uno per ogni card.
**Soluzione adottata**: Section header centrato con `h2.cs-title`, card header con `span.cs-topper` + `h3.cs-h3` — gerarchia HTML semanticamente corretta (`h2 > h3`).
**Impatto**: Basso. Comportamento atteso, ma richiede attenzione alla gerarchia.

### 4. Immagine decorativa vs immagine di contenuto
**Problema**: Il CLAUDE.md descrive "immagine decorativa (carta/marker)" — ovvero un'immagine non reale (carta fisica, pin mappa) usata come elemento grafico, non come foto. CS usa sempre `<picture>` con foto reali.
**Soluzione adottata**: Usato `<picture>` con placeholder Unsplash. Su produzione andrebbero asset grafici vettoriali o PNG trasparenti.
**Impatto**: Nessuno tecnico. Da risolvere con gli asset reali.

### 5. Bottone colore secondario — Override del globale
**Problema**: Il bottone della card "Stazioni" deve essere blu (`--secondary`) non verde (`--primary`). Il globale `.cs-button-solid` è verde.
**Soluzione adottata**: Override scoped `#cs-services-1736 .cs-item--stations .cs-button-solid` con `background-color: var(--secondary)`.
**Impatto**: Basso, ma evidenzia che CS non ha un sistema di varianti bottone integrato (es. `.cs-button-solid--secondary`).

---

## Cosa ha confermato il CLAUDE.md

> "Layout custom, probabilmente il test più impegnativo"

Confermato: questa sezione è effettivamente la più costosa in termini di custom CSS rispetto al template CS base. I motivi:

1. L'icon group non esiste in nessuna variante CS
2. La differenziazione a tema delle card richiede modificatori non standard CS
3. Gli SVG inline sono completamente custom
4. Il sistema di bottoni colorati mostra il limite del sistema di varianti CS

---

## Score per criterio

| Criterio | Voto | Note |
|---|---|---|
| Grid 2 colonne responsive | 5/5 | `grid-template-columns: 1fr 1fr` — CS copre perfettamente |
| Immagine `<picture>` + `object-fit` | 5/5 | Pattern CS nativo |
| Struttura card (topper/title/text/cta) | 4/5 | CS copre, piccoli aggiustamenti layout |
| Icon group (veicoli/carburanti) | 1/5 | Non in CS — completamente custom |
| Differenziazione visiva tra card | 2/5 | Non in CS — modificatori BEM custom |
| Bottone variante colore | 2/5 | Non in CS — override scoped |
| Hover image scale | 4/5 | Non in CS ma 1 riga CSS, semplice |
| Allineamento card altezza | 4/5 | `flex: 1` + `margin-top: auto` — pattern noto CS |

**TOTALE CARD FEATURES**: **3.4/5** — copertura media-bassa per la parte icone e differenziazione visiva.

---

## Azioni follow-up

- [ ] Sostituire placeholder Unsplash con illustrazioni reali (FuelPoint Card fisica, pin mappa)
- [ ] Valutare SVG sprite esterno per le icone veicolo/carburante
- [ ] Aggiungere `.cs-button-solid--secondary` in `global.css` come variante riutilizzabile
