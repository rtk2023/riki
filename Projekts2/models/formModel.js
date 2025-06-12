const STORAGE_KEY = 'forms';

function getAllForms() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveForms(forms) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
}

function createForm(form) {
  const forms = getAllForms();
  form.id = Date.now().toString(); // unikāls ID
  form.createdAt = new Date().toISOString();
  forms.push(form);
  saveForms(forms);
}

function deleteFormById(id) {
  let forms = getAllForms();
  forms = forms.filter(f => f.id !== id);
  saveForms(forms);
}

function getFormById(id) {
  return getAllForms().find(form => form.id === id);
}
function saveForm(form) {
    const forms = getAllForms();
    forms.push(form);
    localStorage.setItem('forms', JSON.stringify(forms));
}

function updateForm(updatedForm) {
  const forms = getAllForms().map(f => f.id === updatedForm.id ? updatedForm : f);
  localStorage.setItem('forms', JSON.stringify(forms));
}
function addExpenseToForm(formId, expense) {
  const form = getFormById(formId);
  if (!form.expenses) form.expenses = [];

  form.expenses.push(expense);
  updateForm(form);
}
function deleteExpenseFromForm(formId, expenseId) {
  const form = getFormById(formId);
  form.expenses = form.expenses.filter(e => e.id !== expenseId);
  updateForm(form);
}
export {
  getAllForms,
  createForm,
  deleteFormById,
  getFormById,
  saveForm,
  updateForm,
  deleteExpenseFromForm,
  addExpenseToForm
};

