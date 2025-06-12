
import { getFormById, updateForm } from '../models/formModel.js';
import { getAllProfiles } from '../models/profileModel.js';
import { calculateDebts } from '../utils/calculateDebts.js';
import { createBackButton } from '../utils/navigation.js';
import { createConfirmDialog } from '../components/confirmDialog.js';

export function renderFormDetailView(id) {
  const app = document.getElementById('app');
  const form = getFormById(id);
  if (!form) {
    app.textContent = 'Forma nav atrasta!';
    return;
  }
  app.innerHTML = '';

  form.users = form.users || [];
  form.expenses = form.expenses || [];
  const profiles = getAllProfiles();


  const section = document.createElement('div');
  section.className = 'section';


  section.append(createBackButton('#/'));

  const grid = document.createElement('div');
  grid.className = 'form-detail';


  function wrapSubsection(titleText, elems = []) {
    const wrap = document.createElement('div');
    wrap.className = 'subsection';
    const h3 = document.createElement('h3');
    h3.textContent = titleText;
    wrap.append(h3, ...elems);
    return wrap;
  }

  const infoElems = [];
  const nameH2 = document.createElement('h2');
  nameH2.textContent = form.name;
  const descP = document.createElement('p');
  descP.textContent = form.description || 'Bez apraksta';
  const curP = document.createElement('p');
  curP.textContent = `Valūta: ${form.currency}`;
  const createdP = document.createElement('p');
  createdP.textContent = `Izveidots: ${new Date(form.createdAt).toLocaleString()}`;
  infoElems.push(nameH2, descP, curP, createdP);
  const infoSub = wrapSubsection('Informācija', infoElems);

  const partList = document.createElement('ul');
  form.users.forEach(uid => {
    const user = profiles.find(p => p.id === uid);
    if (!user) return;
    const li = document.createElement('li');
    li.textContent = user.name;
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-outline';
    removeBtn.textContent = '❌';
    removeBtn.style.marginLeft = '0.5rem';
    removeBtn.addEventListener('click', () => {
      createConfirmDialog({
        message: `Tiešām noņemt ${user.name}?`,
        onConfirm: () => {
          form.users = form.users.filter(i => i !== uid);
          form.expenses = form.expenses.map(e => {
            if (e.paidBy === uid) e.paidBy = null;
            e.splitBetween = e.splitBetween.filter(i => i !== uid);
            return e;
          });
          updateForm(form);
          renderFormDetailView(id);
        }
      });
    });
    li.append(removeBtn);
    partList.append(li);
  });
  const partSub = wrapSubsection('Dalībnieki', [partList]);


  const expElems = [];
  form.expenses.forEach((exp, idx) => {
    const card = document.createElement('div');
    card.className = 'expense-card';

    const main = document.createElement('div');
    main.className = 'expense-main';

    const text = document.createElement('span');
    text.textContent = `${exp.description}: ${exp.amount} ${form.currency}`;

    const toggle = document.createElement('button');
    toggle.className = 'expense-toggle btn btn-secondary';
    toggle.textContent = 'Parādīt detaļas';

    const del = document.createElement('button');
    del.className = 'btn btn-outline';
    del.textContent = '❌';
    del.addEventListener('click', () => {
      createConfirmDialog({
        message: 'Tiešām dzēst šo izdevumu?',
        onConfirm: () => {
          form.expenses.splice(idx, 1);
          updateForm(form);
          renderFormDetailView(id);
        }
      });
    });

    const details = document.createElement('div');
    details.className = 'expense-details';
    details.textContent = `Maksāja: ${profiles.find(p => p.id === exp.paidBy)?.name || '❓'
      }, sadalīts starp: ${exp.splitBetween.map(i => profiles.find(p => p.id === i)?.name || '❓').join(', ')
      }`;
    details.style.display = 'none';

    toggle.addEventListener('click', () => {
      const show = details.style.display !== 'block';
      details.style.display = show ? 'block' : 'none';
      toggle.textContent = show ? 'Slēpt detaļas' : 'Parādīt detaļas';
    });

    main.append(text, toggle, del);
    card.append(main, details);
    expElems.push(card);
  });
  const expSub = wrapSubsection('Izdevumi', expElems);


  const debtList = document.createElement('ul');
  calculateDebts(form.expenses).forEach(tx => {
    const li = document.createElement('li');
    li.textContent = `${profiles.find(p => p.id === tx.from)?.name || '❓'} → ${profiles.find(p => p.id === tx.to)?.name || '❓'
      }: ${tx.amount.toFixed(2)} ${form.currency}`;
    debtList.append(li);
  });
  const debtSub = wrapSubsection('Naudas sadalījums', [debtList]);


  const summary = document.createElement('div');
  summary.className = 'summary-section';
  summary.append(infoSub, partSub, expSub, debtSub);
  grid.append(summary);


  const inputCol = document.createElement('div');
  inputCol.className = 'input-section';


  function wrapSection(title, elems) {
    const wrap = document.createElement('div');
    wrap.className = 'form-section';
    const h3 = document.createElement('h3');
    h3.textContent = title;
    wrap.append(h3, ...elems);
    return wrap;
  }


  const selectMember = document.createElement('select');
  selectMember.className = 'form-control';
  profiles
    .filter(p => !form.users.includes(p.id))
    .forEach(p => {
      const o = document.createElement('option');
      o.value = p.id;
      o.textContent = p.name;
      selectMember.append(o);
    });
  const btnAddMember = document.createElement('button');
  btnAddMember.className = 'btn btn-success';
  btnAddMember.textContent = 'Pievienot';
  btnAddMember.style.marginTop = '0.5rem';
  btnAddMember.addEventListener('click', () => {
    const sel = selectMember.value;
    if (sel) {
      form.users.push(sel);
      updateForm(form);
      renderFormDetailView(id);
    }
  });
  inputCol.append(wrapSection('Pievienot dalībnieku', [selectMember, btnAddMember]));


  const inpDesc = document.createElement('input');
  inpDesc.className = 'form-control';
  inpDesc.type = 'text';
  inpDesc.placeholder = 'Izdevuma apraksts';
  const inpAmt = document.createElement('input');
  inpAmt.className = 'form-control';
  inpAmt.type = 'number';
  inpAmt.placeholder = 'Summa';



  const selPayer = document.createElement('select');
  selPayer.className = 'form-control';
  form.users.forEach(uid => {
    const u = profiles.find(p => p.id === uid);
    if (!u) return;
    const o = document.createElement('option');
    o.value = u.id;
    o.textContent = u.name;
    selPayer.append(o);
  });

  const splitDiv = document.createElement('div');
  splitDiv.className = 'checkbox-group';

  form.users.forEach(uid => {
    const user = profiles.find(p => p.id === uid);
    if (!user) return;

    const label = document.createElement('label');
    label.className = 'checkbox-item';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = `split-${user.id}`;
    cb.value = user.id;
    cb.checked = true;

    const span = document.createElement('span');
    span.textContent = user.name;

    label.append(cb, span);
    splitDiv.append(label);
  });

  const btnSaveExp = document.createElement('button');
  btnSaveExp.className = 'btn btn-success';
  btnSaveExp.textContent = 'Saglabāt izdevumu';
  btnSaveExp.style.marginTop = '0.5rem';
  btnSaveExp.addEventListener('click', () => {
    const descV = inpDesc.value.trim();
    const amtV = parseFloat(inpAmt.value);
    const paidV = selPayer.value;
    const splitV = Array.from(splitDiv.querySelectorAll('input:checked')).map(i => i.value);
    if (!descV || isNaN(amtV) || !paidV || splitV.length === 0) {
      createConfirmDialog({ message: 'Lūdzu aizpildiet visus laukus!', onConfirm: () => { } });
      return;
    }
    form.expenses.push({ description: descV, amount: amtV, paidBy: paidV, splitBetween: splitV });
    updateForm(form);
    renderFormDetailView(id);
  });
  inputCol.append(
    wrapSection('Pievienot izdevumu', [inpDesc, inpAmt, selPayer, splitDiv, btnSaveExp])
  );

  grid.append(inputCol);
  section.append(grid);
  app.append(section);
}
