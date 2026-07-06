function structuredNotePayoff(returnDecimal) {
  if (returnDecimal >= 0) return 1000 * (1 + 1.5 * returnDecimal);
  if (returnDecimal >= -0.20) return 1000;
  return 1000 * (1 + (returnDecimal + 0.20));
}
function structuredNoteReturn(returnDecimal) { return structuredNotePayoff(returnDecimal) / 1000 - 1; }
function bufferStatus(returnDecimal) {
  if (returnDecimal >= 0) return 'Unused';
  if (returnDecimal >= -0.20) return 'Absorbing';
  return 'Breached';
}
function formatPercent(decimal) {
  const pct = Math.round(decimal * 100);
  return `${pct >= 0 ? '+' : ''}${pct}%`;
}
function formatCurrency(value) {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}
function scenarioExplanation(r) {
  if (r >= 0) return 'Upside participation is active.';
  if (r >= -0.20) return 'The buffer absorbs the market loss. Investor principal is unchanged.';
  return 'The buffer is breached. Principal is now exposed.';
}
