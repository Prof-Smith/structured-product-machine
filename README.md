# Structured Product Machine V3 Stable Clean

This version intentionally returns to the working CSS-based architecture, but cleans up the visual hierarchy.

## Why this version

- No SVG scaling issues.
- No external libraries.
- No CDN dependency.
- Clear visual hierarchy: bond core, buffer shield, option engine, issuer spread.
- Keeps the previous working dashboard feel, but makes the center visual easier to interpret.

## Upload

Upload these files directly to the repository root:

```text
index.html
README.md
css/styles.css
js/payoff.js
js/chart.js
js/app.js
```

GitHub Pages settings:

```text
Deploy from branch > main > /root
```
