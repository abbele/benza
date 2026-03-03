# Report 02+03 — Hero + Card Features (Stitch 1619 Refactor)

**Stitch CS di riferimento**: 1619 (Hero + Cards combined)
**Sezioni coperte**: 02 Hero + 03 Card Features → ora un'unica section `#cs-hero-1619`
**Data refactor**: 2026-03-03

---

## Perché il refactor

I report precedenti (02-hero-report.md, 03-card-features-report.md) documentano i due stitch separati.
Il problema principale era visivo: la hero non riempiva l'intera viewport (`100svh` si comporta come "small viewport height", esclude la chrome del browser mobile), e le due sezioni appaivano visivamente disconnesse rispetto al riferimento su beyfin.it.

Lo stitch 1619 risolve entrambi i problemi fondendo hero + card in un'unica sezione full-viewport.

---

## Pattern stitch 1619

### Struttura HTML
```
<section id="cs-hero-1619">
  <div class="cs-container">           ← flex colonna, flex: 1
    <div class="cs-content">           ← hero text, flex: 1 → spinge le card in basso
      ...topper, h1, text, button-group
    </div>
    <ul class="cs-card-group">         ← 2 card ancorate in fondo alla viewport
      <li class="cs-item">...</li>
      <li class="cs-item cs-item--alt">...</li>
    </ul>
  </div>
  <picture class="cs-background">     ← immagine absolute, copre tutto
    ...
  </picture>
</section>
```

Il trucco chiave: `section { display: flex; flex-direction: column }` + `container { flex: 1 }` + `content { flex: 1 }`. Questo fa sì che `.cs-card-group` cada naturalmente in basso, con l'immagine hero che fa da sfondo all'intera sezione, card comprese.

---

## Fix viewport height: svh → dvh

| Unità | Comportamento |
|-------|--------------|
| `100vh` | Viewport fisso, ignora chrome mobile → overflow su mobile |
| `100svh` | Small Viewport Height: viewport con chrome visibile → sezione troppo corta |
| `100dvh` | **Dynamic Viewport Height**: si adatta al resize della chrome del browser |

**Soluzione adottata**: `min-height: 100dvh` su `#cs-hero-1619`.
`min-height` (non `height`) permette alla sezione di espandersi oltre la viewport se il contenuto è molto alto (es. su mobile con le card in colonna singola).

---

## Copertura CodeStitch

### Cosa copre CS 1619 nativamente ✅
- Sezione full-viewport con background image full-bleed
- Pattern `<picture>` + `<source>` per immagini responsive
- `object-fit: cover` per il background
- Overlay scuro tramite `::before`
- Layout flex colonna con content hero + strip in basso
- Struttura card con immagine + info

### Cosa richiede CSS custom ⚠️
- **`min-height: 100dvh`** — CS usa `100svh` o `100vh`. Necessaria la modifica all'unità `dvh`.
- **`.cs-button-transparent`** — bottone outline non presente in CS nativo. Aggiunto manualmente.
- **`.cs-icon-group`** — gruppo icone con label (auto/moto/camion, benzina/diesel/GPL). Pattern 100% custom, non coperto da CS.
- **`.cs-item--alt`** — BEM modifier per differenziare le due card (border-top secondario, topper secondario). CS non ha convenzioni per card alternate.
- **`.cs-button-alt`** — override colore bottone per la card secondaria. CS ha un solo stile `.cs-button-solid`.
- **`border-top` accent** — separatore colorato in cima alle card. Non nel pattern CS standard.
- **Gradient direzionale desktop** — `105deg` da sinistra. CS usa spesso gradient semplici senza angolazione custom.

---

## Differenza rispetto a sezioni separate (precedente approccio)

| Aspetto | Sezioni separate (571 + 1736) | Stitch 1619 combinato |
|---------|-------------------------------|----------------------|
| Viewport fill | ❌ Hero non riempiva (svh) | ✅ 100dvh dinamico |
| Continuità visiva | ❌ Separazione netta hero/card | ✅ Background unico su hero + card |
| Fedeltà a beyfin.it | Media | Alta |
| Complessità CSS | Più file/blocchi | Un blocco unico |
| Scroll | Stacco evidente tra sezioni | Transizione naturale |

---

## PRO
- La sezione fa davvero "wow": le card flottano sopra alla foto hero, esattamente come il sito di riferimento.
- Un solo ID da gestire invece di due.
- `100dvh` risolve definitivamente il problema di viewport su mobile Safari e Chrome Android.
- Il layout flex push automatico (content `flex: 1` → card in fondo) è elegante e non richiede `position: absolute` sulle card.

## CONTRO
- La sezione con card in colonna singola (mobile) è molto alta → l'utente deve scorrere prima di vedere le card. Considerare un breakpoint anticipato o ridurre il padding-bottom del content su mobile.
- Il `min-height: 100dvh` su mobile con le card stacked può fare sì che la sezione superi la viewport. È accettabile ma da monitorare su schermi molto piccoli (< 360px).
- Le card bianche su background scuro richiedono `box-shadow` pesante per separarsi. Trovare il giusto bilanciamento.

---

## Score copertura

| Criterio | Punteggio |
|----------|-----------|
| Struttura HTML base | 5/5 |
| Viewport fill (dvh) | 4/5 (richiede override unità) |
| Background image pattern | 5/5 |
| Card layout | 4/5 (BEM modifier custom) |
| Icon group | 2/5 (completamente custom) |
| Button variants | 3/5 (outline + alt richiedono CSS custom) |
| Responsive | 4/5 |
| **Media** | **3.9/5** |

**Voto complessivo**: 4/5 — Ottima copertura per la struttura, gap concentrati nei pattern CS non supportati (icon group, button variants, card differenziazione).
