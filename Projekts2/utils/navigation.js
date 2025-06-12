export function createBackButton(targetHash = '#/') {
  const backBtn = document.createElement('button');
  backBtn.textContent = '← Atpakaļ';
  backBtn.className = 'btn btn-secondary';
  backBtn.style.marginBottom = '1rem';
  backBtn.addEventListener('click', () => {
    location.hash = targetHash;
  });
  return backBtn;
}
