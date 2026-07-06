# Structured Product Machine — Clean V2

A cleaner, more intuitive GitHub Pages version of the Structured Product Machine.

## What changed from the first version

- Replaced messy pseudo-3D layering with a clean SVG explanatory diagram.
- Reduced visual clutter and removed excessive particle effects.
- Organized the experience into a three-step instructional flow:
  1. Choose scenario
  2. Read the machine from inside out
  3. Connect to payoff
- Added clear labels for the four economic layers:
  - Blue Bond Core
  - Orange 20% Buffer Shield
  - Green 150% Upside Option Engine
  - Gray Issuer Spread
- Kept everything CDN-free for reliable GitHub Pages deployment.

## Deployment

Upload these files to the root of the GitHub repository:

```text
index.html
README.md
css/styles.css
js/payoff.js
js/chart.js
js/app.js
```

Then use GitHub Pages with:

```text
Settings > Pages > Deploy from branch > main > /root
```
