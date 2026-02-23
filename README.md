# Roller Coaster Presentation

A 3D roller coaster that doubles as a slide deck. The camera rides along a track through 10 stations, each revealing a presentation slide.

## Demo

Navigate between slides using:

- **Click** or **Space/Enter** — next slide
- **Arrow keys** — forward/back (Up/Down jump to first/last)
- **Number keys 1–0** — jump to a specific slide
- **Dot indicators** — click to jump

## Running locally

```
npm install
npm start
```

Opens on `http://localhost:3000`.

## How it works

Everything lives in a single `index.html`. The 3D scene is built with [Three.js](https://threejs.org/) and slide transitions are animated with [GSAP](https://gsap.com/). The camera follows a CatmullRom spline through the scene, with per-segment easing, camera shake, and speed particles for variety.

## Deployment

Configured for [Railway](https://railway.app/) via the `serve` package. Just connect the repo and deploy.
