function drawPayoffChart(canvas, currentReturn) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = '#081322'; ctx.fillRect(0,0,w,h);
  const padL=56,padR=24,padT=28,padB=44;
  const xMin=-0.5,xMax=0.5,yMin=650,yMax=1750;
  const x=r=>padL+(r-xMin)/(xMax-xMin)*(w-padL-padR);
  const y=v=>h-padB-(v-yMin)/(yMax-yMin)*(h-padT-padB);
  ctx.strokeStyle='#64748b'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(padL,padT); ctx.lineTo(padL,h-padB); ctx.lineTo(w-padR,h-padB); ctx.stroke();
  ctx.fillStyle='#f8fafc'; ctx.font='16px Segoe UI'; ctx.fillText('Payoff at Maturity',padL,22);
  const zones=[[-.5,-.2,'#ef4444'],[-.2,0,'#fbbf24'],[0,.5,'#86efac']];
  zones.forEach(([a,b,c])=>{ctx.beginPath(); for(let i=0;i<=70;i++){const r=a+(b-a)*i/70; const px=x(r), py=y(structuredNotePayoff(r)); if(i===0)ctx.moveTo(px,py); else ctx.lineTo(px,py);} ctx.strokeStyle=c; ctx.lineWidth=6; ctx.stroke();});
  [-.5,-.2,0,.5].forEach(r=>{ctx.fillStyle=r===-.2?'#fbbf24':'#a8b3c7'; ctx.font='13px Segoe UI'; ctx.fillText(formatPercent(r),x(r)-16,h-18);});
  const dx=x(currentReturn), dy=y(structuredNotePayoff(currentReturn));
  ctx.beginPath(); ctx.arc(dx,dy,9,0,Math.PI*2); ctx.fillStyle='#fff'; ctx.fill(); ctx.lineWidth=5; ctx.strokeStyle=currentReturn<-.2?'#ef4444':currentReturn<0?'#fbbf24':'#22c55e'; ctx.stroke();
}
