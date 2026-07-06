# Deployment Fix Notes

This package restores the previously working static HTML/CSS/JS version and adds `.nojekyll`.

Upload the files directly to the repository root so the root contains:

```text
index.html
.nojekyll
README.md
css/styles.css
js/payoff.js
js/chart.js
js/app.js
```

Recommended GitHub Pages setting for this static app:

```text
Settings > Pages > Build and deployment > Source: Deploy from a branch > Branch: main > /root
```
