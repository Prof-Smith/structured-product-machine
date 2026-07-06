function structuredNotePayoff(returnDecimal) {
  if (returnDecimal >= 0) return 1000 * (1 + 1.5 * returnDecimal);
  if (returnDecimal >= -0.20) return 1000;
  return 1000 * (1 + (returnDecimal + 0.20));
}

function structuredNoteReturn(returnDecimal) {
  return structuredNotePayoff(returnDecimal) / 1000 - 1;
}

function bufferStatus(returnDecimal) {
  if (returnDecimal >= 0) return "Unused / intact";
  if (returnDecimal >= -0.20) {
    const remaining = Math.round((0.20 + returnDecimal) * 100);
    return `Absorbing loss: ${remaining}% buffer left`;
  }
  return "Breached: principal exposed";
}

function formatPercent(decimal) {
  const pct = Math.round(decimal * 100);
  return `${pct >= 0 ? "+" : ""}${pct}%`;
}

function formatCurrency(value) {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
