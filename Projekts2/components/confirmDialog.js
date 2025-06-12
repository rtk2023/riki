export function createConfirmDialog({ message, onConfirm, onCancel }) {
  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';

  const dialog = document.createElement('div');
  dialog.className = 'dialog-box';

  const msg = document.createElement('p');
  msg.textContent = message;

  const btnYes = document.createElement('button');
  btnYes.textContent = 'Jā';
  btnYes.className = 'confirm-button';

  const btnNo = document.createElement('button');
  btnNo.textContent = 'Atcelt';
  btnNo.className = 'cancel-button';

  const btnGroup = document.createElement('div');
  btnGroup.className = 'dialog-buttons';
  btnGroup.append(btnYes, btnNo);

  dialog.append(msg, btnGroup);
  overlay.append(dialog);
  document.body.appendChild(overlay);

  btnYes.addEventListener('click', () => {
    onConfirm();
    document.body.removeChild(overlay);
  });
  btnNo.addEventListener('click', () => {
    if (onCancel) onCancel();
    document.body.removeChild(overlay);
  });
}