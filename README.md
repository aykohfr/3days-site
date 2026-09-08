# AYKOH — Digital Experience

Experimental high-end portfolio / creative developer experience.

## Stack

- React 19 + TypeScript
- Vite 8
- Three.js + React Three Fiber
- GSAP / ScrollTrigger
- Lenis smooth scrolling
- Lottie runtime

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Visual direction

The UI is authored directly in code from a Figma-style design system: strict spacing grid, editorial typography, monochrome palette with acid accent, oversized display type, high-contrast cards and responsive states.

## After Effects / Lottie handoff

The repository is wired for Lottie playback. `src/ae/loader.json` is a **temporary web-authored placeholder** used so the loading experience works immediately; it is not claimed to be an After Effects export.

To satisfy a strict “animations created in After Effects” production requirement, create the final motion compositions in After Effects, export them through Bodymovin/Lottie, then replace the corresponding JSON file(s) in `src/ae/` while preserving their paths. The React integration will continue to work without structural changes.

This repository does not contain `.aep` or `.fig` source files because those applications are not available in the execution environment used for this build.
