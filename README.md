# Vanguard Travel Marketplace

A performance-first React/Vite travel package marketplace with a short scroll-driven airplane intro and a full marketplace experience.

## Run

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Performance decisions
- No Three.js canvas or particle/cloud simulation in the intro.
- Scroll animation uses one passive listener and GPU-friendly `translate3d`.
- No scroll event updates React state; only the airplane transform is updated.
- Images use lazy loading below the fold.
- No post-processing, WebGL effects, or animated blur layers.
- The intro is intentionally short (135vh) with a flight path of roughly one quarter of the previous concept.
