# Structured Product Machine

An interactive classroom illustration for a **Buffered Growth Note**. The app helps students see how a structured product transforms an underlying market return into an investor payoff.

## Current Product Example

This version uses a more realistic teaching structure than the earlier 150% upside / 20% buffer example:

```text
Buffered Growth Note
Initial investment: $1,000
Downside buffer: 10%
Upside participation: 125%
Maximum return cap: 25%
Underlying return range: -50% to +50%
```

The key tradeoff is that the investor receives some downside protection and enhanced upside participation, but gives up gains above the cap.

## Teaching Objective

The purpose of the app is to make the mechanics of a structured note visible:

```text
Market Return → Active Product Rule → Investor Payoff
```

Instead of presenting structured products as static payoff diagrams, the app shows the logic one scenario at a time:

1. The market return enters the note.
2. The note applies the active rule.
3. The investor payoff is displayed.
4. The same result is shown on a payoff chart.

## Product Rules

### Rule 1: Upside Option Engine

If the underlying return is positive, the note pays **125% of the gain**, subject to a **25% maximum return cap**.

Example:

```text
Market return: +8%
Participation: 125%
Note return: +10%
Investor value: $1,100
```

Bull market example:

```text
Market return: +40%
Uncapped participation payoff: +50%
Maximum return cap: +25%
Investor value: $1,250
```

### Rule 2: 10% Buffer Shield

If the underlying return is negative but not worse than -10%, the buffer absorbs the loss.

Example:

```text
Market return: -8%
Note return: 0%
Investor value: $1,000
```

### Rule 3: Buffer Breach

If the underlying return falls below -10%, the first 10% loss is absorbed, but losses beyond the buffer pass through to the investor.

Example:

```text
Market return: -35%
Buffer: first 10% absorbed
Investor loss: -25%
Investor value: $750
```

### Rule 4: Bond Core

The bond core represents the fixed-income foundation of the structured note. It supports repayment mechanics at maturity and helps explain why structured products are often described as combinations of debt and derivatives.

### Rule 5: Issuer Spread

The issuer spread represents embedded product economics, such as structuring costs, hedging costs, distribution compensation, and issuer margin. The app includes this as a reminder that structured notes are packaged financial products, not free payoff enhancements.

## Color System

| Color | Layer | Meaning |
|---|---|---|
| Green | Upside Option Engine | Enhanced upside participation, subject to cap |
| Orange | Buffer Shield | Partial downside protection |
| Blue | Bond Core | Principal foundation / debt component |
| Gray | Issuer Spread | Embedded costs and issuer economics |
| Red | Breach / Stress | Losses beyond the protected zone |
| Purple | Behavioral Prompt | Student decision reflection |

## Scenario Buttons

The app includes four preset scenarios:

| Scenario | Market Return | Main Lesson |
|---|---:|---|
| Bear | -35% | Buffer is breached; investor loses beyond the buffer |
| Mild Loss | -8% | Buffer absorbs the loss; investor remains at $1,000 |
| Base | +8% | 125% participation creates a +10% note return |
| Bull | +40% | Upside cap limits the investor return to +25% |

## Student Activity Prompt

Have students test the four scenarios and complete the table below:

| Scenario | Market Return | Note Return | Investor Value | Active Rule | Better than owning the underlying? |
|---|---:|---:|---:|---|---|
| Bear | -35% | -25% | $750 | Buffer breached | Discuss |
| Mild Loss | -8% | 0% | $1,000 | Buffer shield | Discuss |
| Base | +8% | +10% | $1,100 | Upside option engine | Discuss |
| Bull | +40% | +25% | $1,250 | Upside cap | Discuss |

Reflection question:

> Would you recommend this note to a conservative investor? Why or why not?

Suggested follow-up discussion:

- What does the investor gain from the buffer?
- What does the investor give up because of the cap?
- How does issuer credit risk matter?
- How might embedded fees affect fair value?
- When would owning the underlying directly be better?

## Deployment

This version is intentionally a **single-file GitHub Pages app**.

Upload only this file to the root of the GitHub repository:

```text
index.html
```

Optional supporting files:

```text
README.md
.nojekyll
```

Recommended GitHub Pages settings:

```text
Settings → Pages → Deploy from branch → main → /root
```

Because the CSS and JavaScript are embedded directly in `index.html`, the app does not require external libraries, CDNs, or separate `css/` and `js/` folders.

## Repository Structure

Recommended simple structure:

```text
structured-product-machine/
│
├── index.html
├── README.md
└── .nojekyll        optional
```

## Notes for Future Improvements

Possible extensions:

1. Add a toggle for different note structures:
   - Buffered growth note
   - Dual directional note
   - Autocallable note
   - Principal-protected note
   - Reverse convertible

2. Add adjustable parameters:
   - Buffer level
   - Participation rate
   - Cap
   - Initial investment
   - Underlying return

3. Add issuer economics:
   - Estimated fair value
   - Embedded spread
   - Distribution cost
   - Comparison to direct underlying exposure

4. Add classroom mode:
   - Student vote before reveal
   - Prompt: Would you buy this note?
   - Reveal payoff, cap, buffer breach, and issuer economics

## Current Version Summary

This version is designed to prioritize instructional clarity over visual complexity. The core message is:

```text
A structured product is a rule-based transformation of market returns into investor payoffs.
```

The app is intended for investments, derivatives, financial engineering, risk management, and behavioral finance discussions.
