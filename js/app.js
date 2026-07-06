const slider=document.getElementById('returnSlider');
const returnLabel=document.getElementById('returnLabel');
const noteValue=document.getElementById('noteValue');
const payoffExplanation=document.getElementById('payoffExplanation');
const scenarioText=document.getElementById('scenarioText');
const canvas=document.getElementById('payoffCanvas');
const machine=document.getElementById('machine');
const feeLayer=document.getElementById('feeLayer');
const reader=document.getElementById('reader');
let feesVisible=false;
const copy={
  bond:['Blue Bond Core','blue','The bond component supports repayment at maturity. It is the principal foundation of the structured note.'],
  buffer:['Orange 20% Buffer Shield','orange','The buffer absorbs the first 20% of downside. A -12% market return leaves the investor at $1,000. Losses begin only beyond -20%.'],
  option:['Green 150% Upside Engine','green','The option package creates leveraged upside. A +8% market move becomes a +12% note return.'],
  fees:['Gray Issuer Spread','gray','This layer represents embedded issuer economics: structuring spread, hedging cost, distribution compensation, and margin.'],
  shock:['Red Market Shock','redchip','Downside shocks hit the buffer first. If the shock exceeds the 20% shield, principal is exposed.']
};
function describe(key){const [t,c,b]=copy[key]; reader.innerHTML=`<div class="chip ${c}"></div><div><h3>${t}</h3><p>${b}</p></div>`;}
function update(){const r=Number(slider.value)/100; const nr=structuredNoteReturn(r); returnLabel.textContent=formatPercent(r); noteValue.textContent=formatCurrency(structuredNotePayoff(r)); payoffExplanation.textContent=scenarioExplanation(r); scenarioText.textContent=`Market ${formatPercent(r)} -> Note ${formatPercent(nr)}`; document.querySelectorAll('.scenario').forEach(b=>b.classList.toggle('active',Number(b.dataset.return)===Number(slider.value))); machine.classList.toggle('breach',r<-0.20); machine.classList.toggle('positive',r>0); document.getElementById('shockLayer').style.opacity=r<0?'1':'.28'; document.getElementById('optionLayer').style.opacity=r>0?'1':'.55'; drawPayoffChart(canvas,r);}
document.querySelectorAll('.scenario').forEach(b=>b.addEventListener('click',()=>{slider.value=b.dataset.return; update();}));
slider.addEventListener('input',update);
document.getElementById('assembleBtn').addEventListener('click',()=>{machine.classList.remove('exploded'); document.getElementById('assembleBtn').classList.add('active'); document.getElementById('explodeBtn').classList.remove('active');});
document.getElementById('explodeBtn').addEventListener('click',()=>{machine.classList.add('exploded'); document.getElementById('explodeBtn').classList.add('active'); document.getElementById('assembleBtn').classList.remove('active');});
document.getElementById('feesBtn').addEventListener('click',()=>{feesVisible=!feesVisible; feeLayer.classList.toggle('hidden',!feesVisible); describe('fees');});
document.querySelectorAll('[data-layer]').forEach(el=>el.addEventListener('click',()=>describe(el.dataset.layer)));
document.getElementById('yesBtn').addEventListener('click',()=>document.getElementById('voteText').textContent='Good. Now reveal fees and test the bear case before making the recommendation.');
document.getElementById('noBtn').addEventListener('click',()=>document.getElementById('voteText').textContent='Good. Is the concern embedded fees, downside breach risk, complexity, or opportunity cost versus owning the underlying?');
describe('bond'); update();
