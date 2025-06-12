import { renderFormListView } from '../views/formListView.js';
import { renderFormCreateView } from '../views/formCreateView.js';
import { renderFormDetailView } from '../views/formDetailView.js';
import { renderProfileManagerView } from '../views/profileManagerView.js';

const routes = {
  '#/': renderFormListView,
  '#/create': renderFormCreateView,
  '#/profiles': renderProfileManagerView
};

function parseHash() {
  const hash = location.hash;
  if (hash.startsWith('#/form/')) {
    const id = hash.split('/')[2];
    return () => renderFormDetailView(id);
  }
  return routes[hash] || renderFormListView;
}

export function initRouter() {
  window.addEventListener('hashchange', () => {
    parseHash()();
  });

  parseHash()(); // Sākotnējā ielāde
}

export function navigateTo(hash) {
  location.hash = hash;
}