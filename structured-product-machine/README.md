# Structured Product Machine

Interactive classroom illustration for a **Buffered Step-Up Note** with:

- Initial investment: $1,000
- Downside buffer: 20%
- Upside participation: 150%
- Underlying return range: -50% to +50%

## Teaching Objective

The app helps students see a structured note as a financial machine:

```text
Structured Note = Bond Core + Buffer Protection + Upside Option Engine - Issuer Spread
```

## Color System

| Layer | Color | Meaning |
|---|---|---|
| Bond Core | Blue | Principal repayment foundation |
| Buffer Shield | Orange | First 20% downside protection |
| Option Engine | Green | 150% upside participation |
| Issuer Spread | Gray | Embedded costs and issuer economics |
| Market Shocks | Red | Downside stress scenarios |
| Probability Cloud | Cyan | Distribution/context layer |
| Decision Layer | Purple | Behavioral finance prompt |

## Files

```text
index.html
css/styles.css
js/payoff.js
js/chart.js
js/app.js
README.md
```

## Deploy on GitHub Pages

1. Create a new repository named `structured-product-machine`.
2. Upload all files and folders in this package.
3. Go to **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/root`.
6. Your app will publish at:

```text
https://your-username.github.io/structured-product-machine/
```

For Zachary Smith's GitHub account, the expected URL would be:

```text
https://Prof-Smith.github.io/structured-product-machine/
```

## Student Activity Prompt

Test these scenarios:

- +30%
- +10%
- -10%
- -30%

For each scenario, record:

1. Market return
2. Note return
3. Whether the buffer helped
4. Whether the investor would be better off owning the underlying directly

Then answer:

> Would you recommend this product to a conservative investor? Why or why not?
