/* FUELPOINT x CODESTITCH — Navigation JS
   Pattern CS: cs-active su #cs-navigation per menu mobile
   + cs-active su singolo .cs-dropdown per apertura dropdown */

const nav = document.querySelector('#cs-navigation');
const toggle = document.querySelector('#cs-toggle');
const dropdownButtons = document.querySelectorAll('#cs-navigation .cs-dropdown-button');

if (!nav) {
  console.warn('[nav] #cs-navigation non trovato nel DOM');
}

// --- Mobile menu toggle ---
toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('cs-active');
  toggle.setAttribute('aria-expanded', String(isOpen));
  document.querySelector('#cs-expanded')?.setAttribute('aria-expanded', String(isOpen));

  // Chiudi tutti i dropdown aperti quando si chiude il menu
  if (!isOpen) closeAllDropdowns();
});

// --- Mobile dropdown toggle ---
dropdownButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const parent = btn.closest('.cs-dropdown');
    const isOpen = parent.classList.contains('cs-active');

    // Chiudi gli altri dropdown aperti (accordion)
    closeAllDropdowns();

    if (!isOpen) {
      parent.classList.add('cs-active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// --- Chiudi tutto cliccando fuori ---
document.addEventListener('click', (e) => {
  if (!nav?.contains(e.target)) {
    nav?.classList.remove('cs-active');
    toggle?.setAttribute('aria-expanded', 'false');
    document.querySelector('#cs-expanded')?.setAttribute('aria-expanded', 'false');
    closeAllDropdowns();
  }
});

// --- Chiudi menu mobile al resize desktop ---
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    nav?.classList.remove('cs-active');
    toggle?.setAttribute('aria-expanded', 'false');
  }
});

// --- Escape key ---
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    nav?.classList.remove('cs-active');
    toggle?.setAttribute('aria-expanded', 'false');
    closeAllDropdowns();
    toggle?.focus();
  }
});

function closeAllDropdowns() {
  dropdownButtons.forEach((btn) => {
    btn.closest('.cs-dropdown').classList.remove('cs-active');
    btn.setAttribute('aria-expanded', 'false');
  });
}
