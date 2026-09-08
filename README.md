# AYKOH — Digital Experience

Portfolio expérimental premium orienté creative development, motion et 3D temps réel.

## Stack

- React 19 + TypeScript
- Vite 8
- Three.js + React Three Fiber
- GSAP / ScrollTrigger
- Lenis
- Lottie React v3

## Lancer le projet

```bash
npm install
npm run dev
```

Build production :

```bash
npm run build
```

## Animations de scroll

Les animations sont pilotées par `ScrollTrigger` avec `scrub` : elles suivent réellement la position du scroll. En descendant elles avancent, et en remontant elles se rejouent naturellement dans le sens inverse.

## Performance / accessibilité

La scène Three.js est chargée après l'écran d'introduction et uniquement sur les appareils suffisamment larges qui n'ont pas demandé une réduction des animations. Une alternative CSS légère reste visible ailleurs. Le site respecte aussi `prefers-reduced-motion`, utilise des styles de focus clavier, un lien d'évitement et du HTML sémantique.

## After Effects / Lottie

`public/ae/loader.json` est le fichier Lottie utilisé par le loading screen. L'intégration web est finalisée et accepte directement un export Bodymovin/Lottie d'After Effects à ce même emplacement.

Important : l'environnement ayant servi à construire ce dépôt ne contient pas l'application Adobe After Effects ni Figma. Le JSON fourni sert de motion asset compatible Lottie et de point de remplacement ; il ne doit pas être présenté comme un fichier `.aep` créé dans After Effects. Pour une conformité stricte « animation créée dans After Effects », remplacez ce JSON par l'export Bodymovin de la composition AE finale.

## Figma

La direction visuelle suit un système de design de type Figma (grille, spacing, hiérarchie, contrastes, composants, responsive), mais aucun fichier `.fig` natif n'est généré par cet environnement.
