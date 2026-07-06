const slider = document.getElementById('returnSlider');
const returnLabel = document.getElementById('returnLabel');
const noteValue = document.getElementById('noteValue');
const resultExplanation = document.getElementById('resultExplanation');
const scenarioText = document.getElementById('scenarioText');
const canvas = document.getElementById('payoffCanvas');
const machineSvg = document.getElementById('machineSvg');
const feeGroup = document.getElementById('feeGroup');
const reader = document.getElementById('layerReader');
let feesVisible = false;

const copy = {
  bond: ['Blue Bond Core', 'bond', 'The bond component supports principal repayment at maturity. This is the product’s foundation.'],
  buffer: ['Orange 20% Buffer Shield', 'buffer', 'The buffer absorbs the first 20% of downside. A -12% market return leaves the investor at $1,000. Losses begin only beyond -20%.'],
  option: ['Green 150% Option Engine', 'option', 'The option package creates leveraged upside. A +8% market move becomes a +12% note return.'],
  fees: ['Gray Issuer Spread', 'fees', 'This layer represents embedded issuer economics: structuring spread, hedging cost, distribution compensation, and margin.'],
  shock: ['Red Market Shock', 'red', 'Downside shocks hit the buffer first. If the shock exceeds the 20% shield, principal is exposed.']
};

function updateLayerReader(key){
  const [title, color, body] = copy[key];
  reader.innerHTML = `<div class="color-chip ${color}"></div><div><h3>${title}</h3><p>${body}</p></div>`;
  ['bondGroup','bufferGroup','optionGroup','feeGroup','shockGroup'].forEach(id=>document.getElementById(id).classList.remove('is-highlight'));
  const map={bond:'bondGroup',buffer:'bufferGroup',option:'optionGroup',fees:'feeGroup',shock:'shockGroup'};
  document.getElementById(map[key])?.classList.add('is-highlight');
}

function update(){
  const r = Number(slider.value)/100;
  const noteR = structuredNoteReturn(r);
  returnLabel.textContent = formatPercent(r);
  noteValue.textContent = formatCurrency(structuredNotePayoff(r));
  resultExplanation.textContent = scenarioExplanation(r);
  scenarioText.textContent = `Market ${formatPercent(r)} → Note ${formatPercent(noteR)}`;
  document.querySelectorAll('.scenario').forEach(b=>b.classList.toggle('active', Number(b.dataset.return)===Number(slider.value)));
  document.getElementById('bufferGroup').classList.toggle('is-highlight', r < 0 && r >= -0.20);
  document.getElementById('shockGroup').style.opacity = r < 0 ? '1' : '.25';
  document.getElementById('optionGroup').style.opacity = r > 0 ? '1' : '.45';
  if (r < -0.20) updateLayerReader('shock');
  drawPayoffChart(canvas, r);
}

document.querySelectorAll('.scenario').forEach(btn=>btn.addEventListener('click',()=>{slider.value=btn.dataset.return; update();}));
slider.addEventListener('input', update);
document.getElementById('assembledBtn').addEventListener('click',()=>{machineSvg.classList.remove('exploded'); document.getElementById('assembledBtn').classList.add('active'); document.getElementById('explodedBtn').classList.remove('active');});
document.getElementById('explodedBtn').addEventListener('click',()=>{machineSvg.classList.add('exploded'); document.getElementById('explodedBtn').classList.add('active'); document.getElementById('assembledBtn').classList.remove('active');});
document.getElementById('feesBtn').addEventListener('click',()=>{feesVisible=!feesVisible; feeGroup.classList.toggle('is-hidden',!feesVisible); updateLayerReader('fees');});
document.querySelectorAll('[data-layer]').forEach(el=>el.addEventListener('click',()=>updateLayerReader(el.dataset.layer)));
document.getElementById('yesBtn').addEventListener('click',()=>document.getElementById('voteText').textContent='Good. Now reveal fees and test the -35% bear case before making the recommendation.');
document.getElementById('noBtn').addEventListener('click',()=>document.getElementById('voteText').textContent='Good. Is the concern embedded fees, downside breach risk, complexity, or opportunity cost versus owning the underlying?');
updateLayerReader('bond');
update();
