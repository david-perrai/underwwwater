<script setup lang="ts">
</script>

<template>
  <div class="layout layout--default">
    <MenuDrawer />
    <Header />

    <slot />

    <div id="modals" class="modals" data-id="modals">
      <FormDive />
    </div>
  </div>
</template>

<!--
  Styles globaux (non scopés) : tout ce qui ne peut pas vivre en design token PrimeVue.
  → Fond de page, scrollbar, typographie de base, helpers layout.
  Les composants PrimeVue sont stylés exclusivement via les tokens dans /theme/.
-->
<style lang="scss">
/* ── Google Fonts ───────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ── CSS Custom Properties ──────────────────────────── */
/*
  On expose ici uniquement des variables utiles au code Vue applicatif
  (layouts, pages, composants métier). Les composants PrimeVue eux
  utilisent les design tokens via var(--p-*).
*/
:root {
    /* Ocean depth */
    --ocean-bg-base:    #020818;
    --ocean-bg-deep:    #010412;

    /* Bioluminescent accent — miroir du primary token */
    --ocean-accent:     #00c4b4;
    --ocean-accent-glow: rgba(0, 196, 180, 0.2);
    --ocean-accent-dim:  rgba(0, 196, 180, 0.1);

    /* Text */
    --ocean-text:       #e8eeff;
    --ocean-text-muted: rgba(163, 179, 217, 0.6);

    /* Borders */
    --ocean-border:     rgba(0, 196, 180, 0.12);
    --ocean-border-hover: rgba(0, 196, 180, 0.28);

    /* Glass surface */
    --ocean-glass:      rgba(3, 8, 28, 0.6);
    --ocean-glass-blur: 16px;
}

/* ── Reset ──────────────────────────────────────────── */
*, *::before, *::after {
    box-sizing: border-box;
}

// html {
//     color-scheme: dark;
//     font-size: 16px;
// }

/* ── Body — deep ocean background ──────────────────── */
body {
    margin: 0;
    font-family: 'Inter Tight', sans-serif;
    color: var(--ocean-text);
    background-color: var(--ocean-bg-base);

    /*
      Layered background :
        1. Lumière de surface (bioluminescent, coin haut-gauche)
        2. Profondeur bleue (côté droit)
        3. Gradient abysse de base
    */
    background-image:
        radial-gradient(
            ellipse 65% 45% at 12% -8%,
            rgba(0, 196, 180, 0.07) 0%,
            transparent 60%
        ),
        radial-gradient(
            ellipse 55% 55% at 92% 38%,
            rgba(0, 84, 180, 0.06) 0%,
            transparent 60%
        ),
        linear-gradient(
            175deg,
            #030e26 0%,
            #020818 28%,
            #010412 65%,
            #010309 100%
        );

    background-attachment: fixed;
    min-height: 100vh;
}

/* ── Scrollbar ──────────────────────────────────────── */
::-webkit-scrollbar       { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: rgba(3, 8, 28, 0.4); }
::-webkit-scrollbar-thumb {
    background: rgba(0, 196, 180, 0.28);
    border-radius: 3px;
    transition: background 0.2s ease;
}
::-webkit-scrollbar-thumb:hover { background: rgba(0, 196, 180, 0.5); }

/* ── Typography applicative (hors PrimeVue) ─────────── */
// h1, h2, h3, h4 {
//     font-family: 'Inter Tight', serif;
//     color: var(--ocean-text);
//     margin: 0;
//     line-height: 1.25;
// }

// h1 {
//     font-size: 2.25rem;
//     font-weight: 700;
//     text-shadow: 0 0 40px var(--ocean-accent-glow);
// }

// h2 { font-size: 1.6rem;  font-weight: 600; }
// h3 { font-size: 1.25rem; font-weight: 600; }
// h4 { font-size: 1rem;    font-weight: 600; }

// p  { font-family: 'Inter Tight', sans-serif; color: rgba(197, 208, 247, 0.85); line-height: 1.65; }

/* ── Layout ─────────────────────────────────────────── */
.layout--default {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    z-index: 0;
}

/* ── Utility: glass surface (composants métier) ─────── */
.glass {
    background:    var(--ocean-glass);
    backdrop-filter: blur(var(--ocean-glass-blur));
    border: 1px solid var(--ocean-border);
    border-radius: 14px;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;

    &:hover {
        border-color: var(--ocean-border-hover);
        box-shadow:
            0 8px 40px rgba(0, 0, 0, 0.4),
            0 0 0 1px var(--ocean-accent-dim);
    }
}

/* ── Utility: teal accent divider ───────────────────── */
.teal-divider {
    height: 1px;
    background: linear-gradient(
        90deg,
        transparent 0%,
        var(--ocean-accent) 50%,
        transparent 100%
    );
    opacity: 0.25;
    margin: 1.5rem 0;
}

/* ── Utility: chip badges ───────────────────────────── */
// .chip {
//     display: inline-flex;
//     align-items: center;
//     gap: 0.35rem;
//     padding: 0.2rem 0.7rem;
//     border-radius: 100px;
//     font-family: 'Inter Tight', sans-serif;
//     font-size: 0.78rem;
//     font-weight: 500;
//     letter-spacing: 0.025em;
//     border: 1px solid;

//     &--teal {
//         background:   rgba(0, 196, 180, 0.08);
//         border-color: rgba(0, 196, 180, 0.3);
//         color:        var(--ocean-accent);
//     }

//     &--navy {
//         background:   rgba(61, 87, 178, 0.1);
//         border-color: rgba(61, 87, 178, 0.3);
//         color:        #a3b3d9;
//     }
// }

/* ── PrimeVue — overrides minimes qui ne peuvent pas
      être exprimés en design token ─────────────────── */

/* Form field helper */
// .form__field {
//     display: flex;
//     flex-direction: column;
//     gap: 0.4rem;
//     flex: 1;
// }

// .form__row {
//     display: flex;
//     gap: 1.25rem;
//     flex-wrap: wrap;
// }
</style>
