function structuredNotePayoff(r) {
  if (r >= 0) return 1000 * (1 + 1.5 * r);
  if (r >= -0.20) return 1000;
  return 1000 * (1 + (r + 0.20));
}
function structuredNoteReturn(r) { return structuredNotePayoff(r) / 1000 - 1; }
function formatPercent(r) { const p = Math.round(r * 100); return `${p >= 0 ? '+' : ''}${p}%`; }
function formatCurrency(v) { return v.toLocaleString('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0}); }
function scenarioExplanation(r) {
  if (r >= 0) return 'Upside participation is active.';
  if (r >= -0.20) return 'The buffer absorbs the market loss. Investor principal is unchanged.';
  return 'The buffer is breached. Principal is now exposed.';
}
