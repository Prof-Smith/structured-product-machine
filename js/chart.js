function drawPayoffChart(canvas, currentReturn) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#081322'; ctx.fillRect(0, 0, w, h);
  const padL = 54, padR = 24, padT = 28, padB = 44;
  const xMin = -0.50, xMax = 0.50, yMin = 650, yMax = 1750;
  const xScale = r => padL + ((r - xMin) / (xMax - xMin)) * (w - padL - padR);
  const yScale = v => h - padB - ((v - yMin) / (yMax - yMin)) * (h - padT - padB);
  ctx.strokeStyle = '#64748b'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, h - padB); ctx.lineTo(w - padR, h - padB); ctx.stroke();
  ctx.fillStyle = '#f8fafc'; ctx.font = '16px Segoe UI'; ctx.fillText('Payoff at Maturity', padL, 22);
  const zones = [[-0.5, -0.2, '#ef4444'], [-0.2, 0, '#fbbf24'], [0, 0.5, '#86efac']];
  zones.forEach(([a,b,c]) => {
    ctx.beginPath();
    for (let i = 0; i <= 80; i++) {
      const r = a + (b - a) * i / 80;
      const x = xScale(r), y = yScale(structuredNotePayoff(r));
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = c; ctx.lineWidth = 6; ctx.stroke();
  });
  [-0.5, -0.2, 0, 0.5].forEach(r => {
    ctx.fillStyle = r === -0.2 ? '#fbbf24' : '#a8b3c7';
    ctx.font = '13px Segoe UI';
    ctx.fillText(formatPercent(r), xScale(r) - 16, h - 18);
  });
  const dotX = xScale(currentReturn), dotY = yScale(structuredNotePayoff(currentReturn));
  ctx.beginPath(); ctx.arc(dotX, dotY, 9, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff'; ctx.fill(); ctx.lineWidth = 5;
  ctx.strokeStyle = currentReturn < -0.2 ? '#ef4444' : currentReturn < 0 ? '#fbbf24' : '#22c55e';
  ctx.stroke();
}
