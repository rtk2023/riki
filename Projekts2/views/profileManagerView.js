
import {
  getAllProfiles,
  saveProfile,
  updateProfile,
  deleteProfile
} from '../models/profileModel.js';
import { createBackButton } from '../utils/navigation.js';
import { createConfirmDialog } from '../components/confirmDialog.js';

export function renderProfileManagerView() {
  const app = document.getElementById('app');
  app.innerHTML = '';


  const container = document.createElement('div');
  container.className = 'section profile-manager';


  container.appendChild(createBackButton('#/'));


  const title = document.createElement('h2');
  title.textContent = 'Profila pārvaldība';
  container.appendChild(title);


  const form = document.createElement('form');
  form.className = 'profile-form card';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Lietotājvārds';
  input.required = true;
  input.className = 'form-control';

  const addBtn = document.createElement('button');
  addBtn.type = 'submit';
  addBtn.className = 'btn btn-primary';
  addBtn.textContent = 'Pievienot';

  form.append(input, addBtn);
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = input.value.trim();
    if (!name) return;
    saveProfile({ id: crypto.randomUUID(), name });
    input.value = '';
    renderProfileManagerView();
  });

  container.appendChild(form);

  // --- Existing profiles list ---
  const list = document.createElement('ul');
  list.className = 'profile-list card';

  getAllProfiles().forEach(profile => {
    const li = document.createElement('li');

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = profile.name;
    nameInput.className = 'form-control';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-success';
    saveBtn.textContent = '💾';
    saveBtn.title = 'Saglabāt';
    saveBtn.addEventListener('click', () => {
      const newName = nameInput.value.trim();
      if (!newName) return;
      updateProfile({ id: profile.id, name: newName });
      renderProfileManagerView();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.textContent = '🗑️';
    deleteBtn.title = 'Dzēst';
    deleteBtn.addEventListener('click', () => {
      createConfirmDialog({
        message: `Tiešām dzēst profilu "${profile.name}"?`,
        onConfirm: () => {
          deleteProfile(profile.id);
          renderProfileManagerView();
        }
      });
    });

    li.append(nameInput, saveBtn, deleteBtn);
    list.appendChild(li);
  });

  container.appendChild(list);
  app.appendChild(container);
}
