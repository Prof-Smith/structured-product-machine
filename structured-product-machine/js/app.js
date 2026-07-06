const slider = document.getElementById("returnSlider");
const returnLabel = document.getElementById("returnLabel");
const noteValue = document.getElementById("noteValue");
const bufferStatusEl = document.getElementById("bufferStatus");
const scenarioText = document.getElementById("scenarioText");
const stage = document.getElementById("machineStage");
const feeLayer = document.getElementById("feeLayer");
const layerDescription = document.getElementById("layerDescription");
const canvas = document.getElementById("payoffCanvas");

const layerCopy = {
  bond: {
    title: "Blue Bond Core",
    body: "This represents the fixed-income component that supports repayment of principal at maturity. The key lesson: a structured note is partly a bond, not just an upside bet."
  },
  buffer: {
    title: "Orange 20% Buffer Shield",
    body: "The first 20% of market decline is absorbed before investor principal is exposed. At -10%, the buffer works. At -30%, the buffer is breached."
  },
  option: {
    title: "Green 150% Upside Option Engine",
    body: "The option package creates leveraged upside participation. A +10% market return becomes a +15% note return."
  },
  fees: {
    title: "Gray Issuer Spread Layer",
    body: "This layer represents embedded structuring economics, hedging costs, distribution compensation, and issuer margin. It is hidden by default because product economics are often not obvious to investors."
  },
  shock: {
    title: "Red Market Shock Particles",
    body: "Red particles represent negative market scenarios. They bounce off the buffer in moderate losses and penetrate the note once the downside exceeds the 20% buffer."
  }
};

function updateApp() {
  const r = Number(slider.value) / 100;
  const payoff = structuredNotePayoff(r);
  const noteR = structuredNoteReturn(r);

  returnLabel.textContent = formatPercent(r);
  noteValue.textContent = formatCurrency(payoff);
  bufferStatusEl.textContent = bufferStatus(r);
  scenarioText.textContent = `Market ${formatPercent(r)} → Note ${formatPercent(noteR)}`;

  stage.classList.toggle("breach", r < -0.20);
  stage.classList.toggle("positive", r > 0);

  const option = document.getElementById("optionLayer");
  const scale = 1 + Math.max(r, 0) * 0.45;
  option.style.scale = scale;

  drawPayoffChart(canvas, r);
}

function setReturn(percent) {
  slider.value = percent;
  updateApp();
}

document.getElementById("assembleBtn").addEventListener("click", () => stage.classList.remove("exploded"));
document.getElementById("explodeBtn").addEventListener("click", () => stage.classList.add("exploded"));
document.getElementById("bearBtn").addEventListener("click", () => setReturn(-35));
document.getElementById("baseBtn").addEventListener("click", () => setReturn(8));
document.getElementById("bullBtn").addEventListener("click", () => setReturn(40));
document.getElementById("feesBtn").addEventListener("click", () => {
  feeLayer.classList.toggle("hidden");
  if (!feeLayer.classList.contains("hidden")) describeLayer("fees");
});

slider.addEventListener("input", updateApp);

document.querySelectorAll(".layer").forEach(layer => {
  layer.addEventListener("click", () => describeLayer(layer.dataset.layer));
});

function describeLayer(key) {
  const copy = layerCopy[key];
  if (!copy) return;
  layerDescription.innerHTML = `<h3>${copy.title}</h3><p>${copy.body}</p>`;
}

document.getElementById("yesBtn").addEventListener("click", () => revealVote("yes"));
document.getElementById("noBtn").addEventListener("click", () => revealVote("no"));

function revealVote(choice) {
  document.getElementById("voteReveal").textContent =
    choice === "yes"
      ? "Good. Now inspect the fee layer, downside breach zone, and probability cloud before making a final recommendation."
      : "Good. Now identify whether your concern is downside breach risk, embedded fees, complexity, or opportunity cost versus owning the underlying.";
}

updateApp();
