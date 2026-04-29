const speciesMult = {
  priede: 1.0,
  ozols: 1.65,
  berzs: 1.2,
  liepa: 0.95,
};

const gradeMult = {
  zagejalais: 1.0,
  iezagets: 1.15,
  evertets: 1.30,
  impregnets: 1.45,
};

function fmt(n) {
  return n.toLocaleString('lv-LV', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' €';
}

function calc() {
  const w = parseFloat(document.getElementById('width').value) / 1000 || 0;
  const h = parseFloat(document.getElementById('height').value) / 1000 || 0;
  const l = parseFloat(document.getElementById('length').value) || 0;
  const qty = parseInt(document.getElementById('qty').value) || 1;
  const basePrice = parseFloat(document.getElementById('price').value) || 0;
  const sp = document.getElementById('species').value;
  const gr = document.getElementById('grade').value;

  const vol1 = w * h * l;
  const volTotal = vol1 * qty;
  const adjPrice = basePrice * speciesMult[sp] * gradeMult[gr];
  const matCost = basePrice * speciesMult[sp] * volTotal;
  const gradeCost = (adjPrice - basePrice * speciesMult[sp]) * volTotal;
  const subtotal = adjPrice * volTotal;
  const vat = subtotal * 0.21;
  const total = subtotal + vat;
  const p1 = adjPrice * vol1;

  document.getElementById('vol1').textContent = vol1.toFixed(4);
  document.getElementById('volTotal').textContent = volTotal.toFixed(4);
  document.getElementById('price1').textContent = p1.toLocaleString('lv-LV', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  document.getElementById('priceTotal').textContent = subtotal.toLocaleString('lv-LV', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  document.getElementById('b-mat').textContent = fmt(matCost);
  document.getElementById('b-grade').textContent = fmt(gradeCost);
  document.getElementById('b-subtotal').textContent = fmt(subtotal);
  document.getElementById('b-vat').textContent = fmt(vat);
  document.getElementById('b-total').textContent = fmt(total);
}

document.getElementById('species').addEventListener('change', calc);
document.getElementById('grade').addEventListener('change', calc);
document.getElementById('width').addEventListener('input', calc);
document.getElementById('height').addEventListener('input', calc);
document.getElementById('length').addEventListener('input', calc);
document.getElementById('qty').addEventListener('input', calc);
document.getElementById('price').addEventListener('input', calc);

calc();
