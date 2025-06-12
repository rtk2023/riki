
export function createFormCard(form, onDelete) {

  const card = document.createElement('div');
  card.className = 'form-card card';


  const title = document.createElement('h3');
  title.textContent = form.name;
  title.style.marginBottom = '0.5rem';


  const desc = document.createElement('p');
  desc.textContent = form.description || 'Bez apraksta';
  desc.style.marginBottom = '0.5rem';


  const createdAt = document.createElement('small');
  createdAt.textContent = `Izveidots: ${new Date(form.createdAt).toLocaleString('lv-LV')}`;
  createdAt.style.display = 'block';
  createdAt.style.marginBottom = '1rem';


  const btnContainer = document.createElement('div');
  btnContainer.className = 'card-buttons';


  const viewBtn = document.createElement('button');
  viewBtn.textContent = 'Skatīt';
  viewBtn.className = 'btn btn-secondary view-button';
  viewBtn.addEventListener('click', () => location.hash = `#/form/${form.id}`);


  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Dzēst';
  deleteBtn.className = 'btn btn-danger delete-button';
  deleteBtn.addEventListener('click', onDelete);


  btnContainer.append(viewBtn, deleteBtn);


  card.append(title, desc, createdAt, btnContainer);
  return card;
}