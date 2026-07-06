const slider = document.getElementById('returnSlider');
const returnLabel = document.getElementById('returnLabel');
const noteValue = document.getElementById('noteValue');
const resultExplanation = document.getElementById('resultExplanation');
const scenarioText = document.getElementById('scenarioText');
const stage = document.getElementById('machineStage');
const feeLayer = document.getElementById('feeLayer');
const layerDescription = document.getElementById('layerDescription');
const canvas = document.getElementById('payoffCanvas');
const marketBadge = document.getElementById('marketBadge');
const payoffBadge = document.getElementById('payoffBadge');
const marketStory = document.getElementById('marketStory');
const payoffStory = document.getElementById('payoffStory');
const payoffRule = document.getElementById('payoffRule');
const optionStatus = document.getElementById('optionStatus');
const bufferStatusEl = document.getElementById('bufferStatus');
let feesVisible = false;

const layerCopy = {
  option: { title: 'Green Upside Option Engine', body: 'When the underlying return is positive, the note pays 150% of that gain. A +8% market return becomes a +12% note return.' },
  buffer: { title: 'Orange 20% Buffer Shield', body: 'The buffer absorbs the first 20% of downside. A -12% market return leaves the investor at $1,000. Losses begin only beyond -20%.' },
  bond: { title: 'Blue Bond Core', body: 'The bond component supports repayment at maturity. It is the principal foundation of the structured note.' },
  fees: { title: 'Gray Issuer Spread', body: 'This represents embedded structuring economics, including issuer margin, hedging costs, and distribution compensation.' }
};

function setBadgeState(el, r) {
  el.classList.remove('positive','buffer','negative');
  if (r >= 0) el.classList.add('positive');
  else if (r >= -0.20) el.classList.add('buffer');
  else el.classList.add('negative');
}

function describeLayer(key) {
  const copy = layerCopy[key];
  if (!copy) return;
  layerDescription.innerHTML = `<h3>${copy.title}</h3><p>${copy.body}</p>`;
  document.querySelectorAll('.component').forEach(c => c.classList.remove('active'));
  const comp = document.querySelector(`.component[data-layer="${key}"]`);
  if (comp) comp.classList.add('active');
}

function updateStory(r, noteR) {
  if (r >= 0) {
    marketStory.textContent = 'Positive return enters the option engine.';
    payoffStory.textContent = 'The option engine amplifies the positive market return.';
    payoffRule.textContent = `${formatPercent(r)} × 150% = ${formatPercent(noteR)}`;
    optionStatus.textContent = 'Active';
    bufferStatusEl.textContent = 'Unused';
    describeLayer('option');
  } else if (r >= -0.20) {
    marketStory.textContent = 'A moderate loss enters the buffer shield.';
    payoffStory.textContent = 'The buffer absorbs the loss, so investor principal is unchanged.';
    payoffRule.textContent = 'Inside buffer zone: payoff stays at $1,000';
    optionStatus.textContent = 'Inactive';
    bufferStatusEl.textContent = 'Absorbing';
    describeLayer('buffer');
  } else {
    marketStory.textContent = 'A severe loss overwhelms the buffer shield.';
    payoffStory.textContent = 'Losses beyond -20% pass through to the investor.';
    payoffRule.textContent = `${formatPercent(r)} market → ${formatPercent(noteR)} note`;
    optionStatus.textContent = 'Inactive';
    bufferStatusEl.textContent = 'Breached';
    describeLayer('buffer');
  }
}

function updateApp() {
  const r = Number(slider.value) / 100;
  const payoff = structuredNotePayoff(r);
  const noteR = structuredNoteReturn(r);
  returnLabel.textContent = formatPercent(r);
  noteValue.textContent = formatCurrency(payoff);
  resultExplanation.textContent = scenarioExplanation(r);
  scenarioText.textContent = `Market ${formatPercent(r)} → Note ${formatPercent(noteR)}`;
  marketBadge.textContent = formatPercent(r);
  payoffBadge.textContent = formatCurrency(payoff);
  setBadgeState(marketBadge, r);
  setBadgeState(payoffBadge, r);
  updateStory(r, noteR);
  document.querySelectorAll('.component').forEach(c => c.classList.remove('dim'));
  document.querySelector('.component.option').classList.toggle('dim', r <= 0);
  document.querySelector('.component.buffer').classList.toggle('dim', r >= 0);
  document.querySelectorAll('.button-grid .btn').forEach(b => b.classList.remove('active'));
  if (Number(slider.value) === -35) document.getElementById('bearBtn').classList.add('active');
  if (Number(slider.value) === -12) document.getElementById('mildBtn').classList.add('active');
  if (Number(slider.value) === 8) document.getElementById('baseBtn').classList.add('active');
  if (Number(slider.value) === 40) document.getElementById('bullBtn').classList.add('active');
  drawPayoffChart(canvas, r);
}

function setReturn(percent) { slider.value = percent; updateApp(); }

document.getElementById('bearBtn').addEventListener('click', () => setReturn(-35));
document.getElementById('mildBtn').addEventListener('click', () => setReturn(-12));
document.getElementById('baseBtn').addEventListener('click', () => setReturn(8));
document.getElementById('bullBtn').addEventListener('click', () => setReturn(40));
slider.addEventListener('input', updateApp);

document.getElementById('assembleBtn').addEventListener('click', () => {
  stage.classList.remove('component-view');
  document.getElementById('assembleBtn').classList.add('active');
  document.getElementById('explodeBtn').classList.remove('active');
});
document.getElementById('explodeBtn').addEventListener('click', () => {
  stage.classList.add('component-view');
  document.getElementById('explodeBtn').classList.add('active');
  document.getElementById('assembleBtn').classList.remove('active');
});
document.getElementById('feesBtn').addEventListener('click', () => {
  feesVisible = !feesVisible;
  feeLayer.classList.toggle('hidden', !feesVisible);
  describeLayer('fees');
});
document.querySelectorAll('[data-layer]').forEach(el => el.addEventListener('click', () => describeLayer(el.dataset.layer)));
document.getElementById('yesBtn').addEventListener('click', () => {
  document.getElementById('voteReveal').textContent = 'Good. Now reveal fees and test the bear case before making the recommendation.';
});
document.getElementById('noBtn').addEventListener('click', () => {
  document.getElementById('voteReveal').textContent = 'Good. Is the concern embedded fees, buffer breach risk, complexity, or opportunity cost versus owning the underlying?';
});
updateApp();
