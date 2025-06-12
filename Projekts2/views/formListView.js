
import { getAllForms, deleteFormById } from '../models/formModel.js';
import { createFormCard } from '../components/formCard.js';
import { createConfirmDialog } from '../components/confirmDialog.js';

export function renderFormListView() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  // Sekcija
  const container = document.createElement('div');
  container.className = 'section';

  const header = document.createElement('div');
  header.className = 'card form-list-header';

  const leftGroup = document.createElement('div');
  const createBtn = document.createElement('button');
  createBtn.textContent = 'Izveidot jaunu formu';
  createBtn.className = 'btn btn-primary';
  createBtn.addEventListener('click', () => location.hash = '#/create');
  leftGroup.appendChild(createBtn);

  const rightGroup = document.createElement('div');
  const profileBtn = document.createElement('button');
  profileBtn.textContent = 'Profili';
  profileBtn.className = 'btn btn-secondary';
  profileBtn.addEventListener('click', () => location.hash = '#/profiles');
  rightGroup.appendChild(profileBtn);

  header.append(leftGroup, rightGroup);
  container.appendChild(header);

  const forms = getAllForms();
  if (!forms.length) {
    const emptyCard = document.createElement('div');
    emptyCard.className = 'card';
    const msg = document.createElement('p');
    msg.textContent = 'Nav nevienas formas. Izveido pirmo!';
    msg.style.textAlign = 'center';
    msg.style.padding = '2rem 0';
    emptyCard.appendChild(msg);
    container.appendChild(emptyCard);
  } else {
    const grid = document.createElement('div');
    grid.className = 'form-card-grid';

    forms.forEach(form => {
      const card = createFormCard(form, () => {
        createConfirmDialog({
          message: `Vai tiešām vēlies dzēst formu "${form.name}"?`,
          onConfirm: () => {
            deleteFormById(form.id);
            renderFormListView();
          }
        });
      });

      card.classList.add('card');
      grid.appendChild(card);
    });

    container.appendChild(grid);
  }

  app.appendChild(container);
}
