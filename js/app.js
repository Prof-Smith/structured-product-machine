const slider = document.getElementById('returnSlider');
const returnLabel = document.getElementById('returnLabel');
const noteValue = document.getElementById('noteValue');
const resultExplanation = document.getElementById('resultExplanation');
const scenarioText = document.getElementById('scenarioText');
const canvas = document.getElementById('payoffCanvas');
const machine = document.getElementById('machine');
const feeLayer = document.getElementById('feeLayer');
const marketBadge = document.getElementById('marketBadge');
const payoffBadge = document.getElementById('payoffBadge');
const marketStory = document.getElementById('marketStory');
const payoffStory = document.getElementById('payoffStory');
const payoffRule = document.getElementById('payoffRule');
const optionStatus = document.getElementById('optionStatus');
const bufferStatus = document.getElementById('bufferStatus');
const reader = document.getElementById('layerReader');
let feesVisible = false;

const copy = {
  option: ['Green Upside Option Engine', 'green', 'When the underlying return is positive, the note pays 150% of that gain. A +8% market return becomes a +12% note return.'],
  buffer: ['Orange 20% Buffer Shield', 'orange', 'The buffer absorbs the first 20% of downside. A -12% market return leaves the investor at $1,000. Losses begin only beyond -20%.'],
  bond: ['Blue Bond Core', 'blue', 'The bond component is the principal foundation. It supports repayment at maturity and anchors the structure.'],
  fees: ['Gray Issuer Spread', 'gray', 'This represents embedded structuring economics: issuer margin, hedging cost, and distribution compensation.'],
  shock: ['Red Downside Shock', 'red', 'A negative market return hits the buffer first. If the decline exceeds -20%, the shock reaches investor principal.']
};

function describe(key) {
  const [title, color, body] = copy[key];
  reader.innerHTML = `<div class="reader-chip ${color}"></div><div><h3>${title}</h3><p>${body}</p></div>`;
  document.querySelectorAll('.product-layer').forEach(x => x.classList.remove('active'));
  const layer = document.querySelector(`[data-layer="${key}"]`);
  if (layer && layer.classList.contains('product-layer')) layer.classList.add('active');
}

function setBadgeState(el, r) {
  el.classList.remove('positive','buffer','negative');
  if (r >= 0) el.classList.add('positive');
  else if (r >= -0.20) el.classList.add('buffer');
  else el.classList.add('negative');
}

function updateStories(r, noteR) {
  if (r >= 0) {
    marketStory.textContent = 'Positive market return enters the upside engine.';
    payoffStory.textContent = 'The option engine converts market upside into amplified note upside.';
    payoffRule.textContent = `${formatPercent(r)} × 150% = ${formatPercent(noteR)}`;
    optionStatus.textContent = 'Active';
    bufferStatus.textContent = 'Unused';
    describe('option');
  } else if (r >= -0.20) {
    marketStory.textContent = 'A moderate loss enters the buffer shield.';
    payoffStory.textContent = 'The buffer absorbs the decline, so investor principal is unchanged.';
    payoffRule.textContent = 'Inside buffer zone: payoff stays at $1,000';
    optionStatus.textContent = 'Inactive';
    bufferStatus.textContent = 'Absorbing';
    describe('buffer');
  } else {
    marketStory.textContent = 'A severe loss overwhelms the buffer shield.';
    payoffStory.textContent = 'Losses beyond -20% pass through to the investor.';
    payoffRule.textContent = `${formatPercent(r)} market → ${formatPercent(noteR)} note`;
    optionStatus.textContent = 'Inactive';
    bufferStatus.textContent = 'Breached';
    describe('shock');
  }
}

function update() {
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
  updateStories(r, noteR);

  document.querySelectorAll('.scenario').forEach(b => b.classList.toggle('active', Number(b.dataset.return) === Number(slider.value)));
  document.querySelector('.option-layer').classList.toggle('dim', r <= 0);
  document.querySelector('.buffer-layer').classList.toggle('dim', r >= 0);
  drawPayoffChart(canvas, r);
}

document.querySelectorAll('.scenario').forEach(btn => btn.addEventListener('click', () => { slider.value = btn.dataset.return; update(); }));
slider.addEventListener('input', update);

document.getElementById('assembleBtn').addEventListener('click', () => {
  machine.classList.remove('exploded');
  document.getElementById('assembleBtn').classList.add('active');
  document.getElementById('explodeBtn').classList.remove('active');
});
document.getElementById('explodeBtn').addEventListener('click', () => {
  machine.classList.add('exploded');
  document.getElementById('explodeBtn').classList.add('active');
  document.getElementById('assembleBtn').classList.remove('active');
});
document.getElementById('feesBtn').addEventListener('click', () => {
  feesVisible = !feesVisible;
  feeLayer.classList.toggle('hidden', !feesVisible);
  describe('fees');
});

document.querySelectorAll('[data-layer]').forEach(el => el.addEventListener('click', () => describe(el.dataset.layer)));
document.getElementById('yesBtn').addEventListener('click', () => document.getElementById('voteText').textContent = 'Good. Now reveal fees and test the bear case before making the recommendation.');
document.getElementById('noBtn').addEventListener('click', () => document.getElementById('voteText').textContent = 'Good. Is the concern embedded fees, buffer breach risk, complexity, or opportunity cost versus owning the underlying?');

update();
