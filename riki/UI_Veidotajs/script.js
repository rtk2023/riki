const canvas = document.getElementById('canvas');
const exportBtn = document.getElementById('exportBtn');
const exportHtmlBtn = document.getElementById('exportHtmlBtn');
const editor = document.getElementById('editorContent');
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const undoBtn = document.getElementById('undoBtn');
const redoBtn = document.getElementById('redoBtn');
const deleteBtn = document.getElementById('deleteBtn');
const exportModal = document.getElementById('exportModal');
const exportedCode = document.getElementById('exportedCode');
const copyBtn = document.getElementById('copyBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

let elements = [];
let selectedElement = null;
let history = [];
let redoStack = [];

function saveHistory() {
  history.push(JSON.stringify(elements));
  if (history.length > 100) history.shift();
  redoStack = [];
}

function renderFromElements() {
  canvas.innerHTML = '';
  elements.forEach((item, i) => {
    const el = createElement(item.type, item.props.text || '', i, item.props.src);
    el.style.top = item.top;
    el.style.left = item.left;
    if (item.width) el.style.width = item.width;
    if (item.height) el.style.height = item.height;
    if (item.props.color) el.style.color = item.props.color;
    if (item.props.backgroundColor) el.style.backgroundColor = item.props.backgroundColor;
    if (item.props.fontSize) el.style.fontSize = item.props.fontSize;
    canvas.appendChild(el);
  });
}

function undo() {
  if (history.length === 0) return;
  redoStack.push(JSON.stringify(elements));
  const last = history.pop();
  if (last) {
    elements = JSON.parse(last);
    renderFromElements();
  }
}

function redo() {
  if (redoStack.length === 0) return;
  history.push(JSON.stringify(elements));
  const next = redoStack.pop();
  if (next) {
    elements = JSON.parse(next);
    renderFromElements();
  }
}

undoBtn.addEventListener('click', undo);
redoBtn.addEventListener('click', redo);
deleteBtn.addEventListener('click', deleteSelected);

document.addEventListener('keydown', (e) => {
  const active = document.activeElement;
  const isInput = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');

  if (!isInput && (e.key === 'Delete' || e.key === 'Backspace') && selectedElement) {
    e.preventDefault();
    deleteSelected();
  }
});

function deleteSelected() {
  if (!selectedElement) return;
  const index = Array.from(canvas.children).indexOf(selectedElement);
  if (index > -1) {
    elements.splice(index, 1);
    selectedElement.remove();
    selectedElement = null;
    editor.innerHTML = `<p>Select an element</p>`;
    saveHistory();
  }
}

// Component
document.querySelectorAll('.component').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    addComponent(type);
  });
});

function addComponent(type) {
  const index = elements.length;
  const el = createElement(type, getDefaultText(type), index);
  el.style.top = Math.floor(Math.random() * 300) + 'px';
  el.style.left = Math.floor(Math.random() * 300) + 'px';
  canvas.appendChild(el);

  elements.push({
    type: type,
    top: el.style.top,
    left: el.style.left,
    width: el.style.width,
    height: el.style.height,
    props: { text: getDefaultText(type), src: type === 'image' ? 'https://via.placeholder.com/100' : '' }
  });

  saveHistory();
}

function getDefaultText(type) {
  if (type === 'button') return 'Click Me';
  if (type === 'input') return 'Enter text';
  if (type === 'textarea') return 'Enter more text...';
  if (type === 'checkbox') return 'Check me';
  return '';
}

function createElement(type, text, index, src = '') {
  const el = document.createElement('div');
  el.classList.add('canvas-element');
  el.setAttribute('data-type', type);

  if (type === 'button') {
    el.innerText = text;
  } else if (type === 'input') {
    el.innerHTML = `<input type="text" placeholder="${text}" />`;
  } else if (type === 'textarea') {
    el.innerHTML = `<textarea placeholder="${text}"></textarea>`;
  } else if (type === 'checkbox') {
    el.innerHTML = `<label><input type="checkbox" /> ${text}</label>`;
  } else if (type === 'image') {
    el.innerHTML = `<img src="${src || 'https://via.placeholder.com/100'}" width="100" />`;
  }

  makeDraggable(el);
  makeResizable(el, index);

  return el;
}

// Drag
function makeDraggable(el) {
  let offsetX, offsetY, isDragging = false;

  el.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('resize-handle')) return;
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    selectedElement = el;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    el.style.left = (e.pageX - canvas.offsetLeft - offsetX) + 'px';
    el.style.top = (e.pageY - canvas.offsetTop - offsetY) + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      updateElementPosition(el);
      saveHistory();
    }
    isDragging = false;
  });
}

// Resize
function makeResizable(el, index) {
  const handle = document.createElement('div');
  handle.className = 'resize-handle';
  el.appendChild(handle);

  let isResizing = false;
  let startX, startY, startWidth, startHeight;

  handle.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(window.getComputedStyle(el).width, 10);
    startHeight = parseInt(window.getComputedStyle(el).height, 10);
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const newWidth = startWidth + (e.clientX - startX);
    const newHeight = startHeight + (e.clientY - startY);
    el.style.width = newWidth + 'px';
    el.style.height = newHeight + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (isResizing) {
      updateElementSize(el);
      saveHistory();
    }
    isResizing = false;
  });
}

// Editor
document.addEventListener('click', (e) => {
  const el = e.target.closest('.canvas-element');
  if (el && canvas.contains(el)) {
    selectedElement = el;
    showEditor(el);
  }
});

function showEditor(el) {
  const type = el.dataset.type;
  const style = window.getComputedStyle(el);
  const width = parseInt(style.width);
  const height = parseInt(style.height);
  const fontSize = parseInt(style.fontSize);
  const textColor = rgb2hex(style.color);
  const backgroundColor = rgb2hex(style.backgroundColor);

  let currentText = '';
  let currentSrc = '';
  if (type === 'button') {
    currentText = el.innerText;
  } else if (type === 'input' || type === 'textarea') {
    currentText = el.querySelector('input, textarea')?.placeholder || '';
  } else if (type === 'checkbox') {
    currentText = el.querySelector('label')?.innerText.trim() || '';
  } else if (type === 'image') {
    currentSrc = el.querySelector('img')?.src || '';
  }

  editor.innerHTML = `
    <label>${type === 'image' ? 'Image URL' : 'Text/Placeholder'}:</label>
    <input type="text" id="propText" value="${type === 'image' ? currentSrc : currentText}" />
    <label>Font Size (px):</label>
    <input type="number" id="propFontSize" value="${fontSize}" />
    <label>Text Color:</label>
    <input type="color" id="propColor" value="${textColor}" />
    <label>Background Color:</label>
    <input type="color" id="propBgColor" value="${backgroundColor}" />
    <label>Width (px):</label>
    <input type="number" id="propWidth" value="${width}" />
    <label>Height (px):</label>
    <input type="number" id="propHeight" value="${height}" />
  `;

  document.getElementById('propText').addEventListener('input', (e) => {
    const value = e.target.value;
    if (type === 'button') {
      el.innerText = value;
    } else if (type === 'input' || type === 'textarea') {
      el.querySelector('input, textarea').placeholder = value;
    } else if (type === 'checkbox') {
      el.querySelector('label').innerHTML = `<input type="checkbox" /> ${value}`;
    } else if (type === 'image') {
      el.querySelector('img').src = value;
      updateElementData(el, { src: value });
    }
    updateElementData(el, { text: value });
    saveHistory();
  });

  document.getElementById('propFontSize').addEventListener('input', (e) => {
    el.style.fontSize = e.target.value + 'px';
    updateElementData(el, { fontSize: el.style.fontSize });
  });

  document.getElementById('propColor').addEventListener('input', (e) => {
    el.style.color = e.target.value;
    updateElementData(el, { color: el.style.color });
  });

  document.getElementById('propBgColor').addEventListener('input', (e) => {
    el.style.backgroundColor = e.target.value;
    updateElementData(el, { backgroundColor: el.style.backgroundColor });
  });

  document.getElementById('propWidth').addEventListener('input', (e) => {
    el.style.width = e.target.value + 'px';
    updateElementSize(el);
  });

  document.getElementById('propHeight').addEventListener('input', (e) => {
    el.style.height = e.target.value + 'px';
    updateElementSize(el);
  });
}

function updateElementData(el, updates) {
  const index = Array.from(canvas.children).indexOf(el);
  if (elements[index]) {
    elements[index].props = { ...elements[index].props, ...updates };
  }
}

function updateElementPosition(el) {
  const index = Array.from(canvas.children).indexOf(el);
  if (elements[index]) {
    elements[index].top = el.style.top;
    elements[index].left = el.style.left;
  }
}

function updateElementSize(el) {
  const index = Array.from(canvas.children).indexOf(el);
  if (elements[index]) {
    elements[index].width = el.style.width;
    elements[index].height = el.style.height;
  }
}

function rgb2hex(rgb) {
  if (!rgb) return "#000000";
  rgb = rgb.match(/\d+/g);
  return "#" + rgb.map(x => (+x).toString(16).padStart(2, '0')).join('');
}

// Export
exportBtn.addEventListener('click', () => {
  showExportModal(JSON.stringify(elements, null, 2));
});



function showExportModal(code) {
  exportedCode.value = code;
  exportModal.classList.remove('hidden');
}

copyBtn.addEventListener('click', () => {
  exportedCode.select();
  document.execCommand('copy');
  alert('Copied to clipboard!');
});

closeModalBtn.addEventListener('click', () => {
  exportModal.classList.add('hidden');
});

// Save/Load
saveBtn.addEventListener('click', () => {
  localStorage.setItem('ui-builder', JSON.stringify(elements));
  alert('Project saved!');
});

loadBtn.addEventListener('click', () => {
  const saved = localStorage.getItem('ui-builder');
  if (!saved) return alert('Nothing to load!');
  elements = JSON.parse(saved);
  renderFromElements();
  alert('Project loaded!');
  saveHistory();
});

exportHtmlBtn.addEventListener('click', () => {
  let html = '';
  let css = '';

  document.querySelectorAll('.canvas-element').forEach((el, index) => {
    const type = el.dataset.type;
    const props = elements[index]?.props || {};

    if (type === 'button') {
      html += `<button class="el-${index}">${props.text || 'Button'}</button>\n`;
    } else if (type === 'input') {
      html += `<input class="el-${index}" placeholder="${props.text || ''}" />\n`;
    } else if (type === 'textarea') {
      html += `<textarea class="el-${index}" placeholder="${props.text || ''}"></textarea>\n`;
    } else if (type === 'checkbox') {
      html += `<label class="el-${index}"><input type="checkbox" /> ${props.text || 'Checkbox'}</label>\n`;
    } else if (type === 'image') {
      html += `<img class="el-${index}" src="${props.src || 'https://via.placeholder.com/100'}" />\n`;
    }

    const style = window.getComputedStyle(el);
    css += `.el-${index} {\n`;
    css += `  position: absolute;\n`;
    css += `  top: ${style.top};\n`;
    css += `  left: ${style.left};\n`;
    css += `  width: ${style.width};\n`;
    css += `  height: ${style.height};\n`;
    css += `  font-size: ${style.fontSize};\n`;
    css += `  color: ${style.color};\n`;
    css += `  background-color: ${style.backgroundColor};\n`;
    css += `}\n\n`;
  });

  const fullExport = `
<!-- HTML -->
<div style="position: relative;">
${html.trim()}
</div>

<!-- CSS -->
<style>
${css.trim()}
</style>
`.trim();

  showExportModal(fullExport);
});
