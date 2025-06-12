
import { saveForm } from '../models/formModel.js';
import { navigateTo } from '../router/router.js';
import { createBackButton } from '../utils/navigation.js';
export function renderFormCreateView() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'section card';

  container.appendChild(createBackButton('#/'));

  
  const title = document.createElement('h2');
  title.textContent = 'Izveidot jaunu formu';
  container.appendChild(title);

  const form = document.createElement('form');
  form.className = 'form-create-form';

  // nosaukums
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Formas nosaukums *';
  nameInput.required = true;
  nameInput.className = 'form-control';

  // apraksts
  const descInput = document.createElement('textarea');
  descInput.placeholder = 'Apraksts (neobligāts)';
  descInput.rows = 3;
  descInput.className = 'form-control';

  // valūta
  const currencySelect = document.createElement('select');
  currencySelect.className = 'form-control';
  ['EUR','USD','GBP'].forEach(cur => {
    const opt = document.createElement('option');
    opt.value = cur; opt.textContent = cur;
    currencySelect.appendChild(opt);
  });

  // save poga
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Saglabāt formu';
  submitBtn.className = 'btn btn-success';

  form.addEventListener('submit', e => {
    e.preventDefault();
    const newForm = {
      id: crypto.randomUUID(),
      name: nameInput.value.trim(),
      description: descInput.value.trim(),
      currency: currencySelect.value,
      createdAt: Date.now(),
      users: [],
      expenses: []
    };
    saveForm(newForm);
    navigateTo('#/');
  });

  form.append(nameInput, descInput, currencySelect, submitBtn);
  container.appendChild(form);
  app.appendChild(container);
}
