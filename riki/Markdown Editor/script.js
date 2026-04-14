const inputField = document.getElementById("userInputField");
const outputField = document.getElementById("display");

inputField.addEventListener("input", (event) => {
    const rawInput = event.target.value;
    processInput(rawInput);
});

function processInput(rawInput) {
	const processedInput = parseMarkdown(rawInput);
    outputField.innerHTML = processedInput;
};

const fileInput = document.getElementById('fileInput');
 
fileInput.addEventListener('change', (e) => {
	const file = e.target.files[0];
	if (!file) return;

	const reader = new FileReader();

	reader.readAsText(file, 'utf8');

	reader.onload = (event) => {
		const content = event.target.result;
		inputField.value = content;

		processInput(content);
	};

	reader.onerror = () => {
		console.error('Error reading file:', reader.error);
	};
});

function downloadFile() {
	const content = inputField.value;
	const blob = new Blob([content], { type: 'text/plain' });
	
	const url = URL.createObjectURL(blob);
	
	const a = document.createElement('a');
	a.href = url;
	a.download = 'your-markdown-doc.md';
	a.click();
	
	URL.revokeObjectURL(url);
}

const RX = {
	lineBreaks: /\r\n?/g,

	amp: /&/g,
	lt: /</g,
	gt: />/g,

	fencedCode: /(^|\n)```([a-zA-Z0-9_-]+)?\n([\s\S]*?)\n```(?=\n|$)/g,
	heading: /(^|\n)(#{1,6})[ \t]+(.+?)(?=\n|$)/g,
	hr: /(^|\n)[ \t]*([-*_])[ \t]*(?:\2[ \t]*){2,}(?=\n|$)/g,
	blockquote: /(^|\n)[ \t]*>[ \t]?(.+?)(?=\n|$)/g,
	ulItem: /(^|\n)[ \t]*[-*+][ \t]+(.+?)(?=\n|$)/g,
	olItem: /(^|\n)[ \t]*\d+\.[ \t]+(.+?)(?=\n|$)/g,

	inlineCode: /`([^`\n]+?)`/g,
	image: /!\[([^\]]*?)\]\(([^)\s]+)(?:\s+"([^"]*?)")?\)/g,
	link: /\[([^\]]+?)\]\(([^)\s]+)(?:\s+"([^"]*?)")?\)/g,
	strong: /(\*\*|__)(?=\S)([\s\S]*?\S)\1/g,
	em: /(\*|_)(?=\S)([\s\S]*?\S)\1/g,
	strike: /~~(?=\S)([\s\S]*?\S)~~/g,

	blockSplit: /\n{2,}/g
};

function parseInline(text) {
	return text
    .replace(RX.inlineCode, '<code>$1</code>')
    .replace(RX.image, (_, alt, url, title) =>
      `<img src="${url}" alt="${alt}"${title ? ` title="${title}"` : ""} />`)
    .replace(RX.link, (_, text, url, title) =>
      `<a href="${url}"${title ? ` title="${title}"` : ""}>${text}</a>`)
    .replace(RX.strong, '<strong>$2</strong>')
    .replace(RX.em, '<em>$2</em>')
    .replace(RX.strike, '<del>$1</del>');
}

function parseMarkdown(text) {
	let src = text.replace(RX.lineBreaks, "\n");

	src = src.replace(RX.amp, "&amp;");
	src = src.replace(RX.lt, "&lt;");
	src = src.replace(RX.gt, "&gt;");

	const stash = [];
	src = src.replace(RX.fencedCode, function (_, before, _, codeText) {
		const html = `${before}<pre><code>${codeText}</code></pre>`;

		const index = stash.push(html) - 1;
		return '@@CODE_' + index + '@@';
	});

	src = src.replace(RX.heading, (_, before, hashes, text) => `${before}<h${hashes.length}>${parseInline(text)}</h${hashes.length}>`);
	src = src.replace(RX.hr, "$1<hr>");
	src = src.replace(RX.blockquote, (_, before, text) => `${before}<blockquote>${parseInline(text)}</blockquote>`);
	src = src.replace(RX.ulItem, (_, before, text) => `${before}<li data-ul="1">${parseInline(text)}</li>`);
	src = src.replace(RX.olItem, (_, before, text) => `${before}<li data-ol="1">${parseInline(text)}</li>`);

	src = src
    .replace(/(?:^|\n)(<li data-ul="1">[\s\S]*?<\/li>(?:\n<li data-ul="1">[\s\S]*?<\/li>)*)/g, (_, group) =>
      `\n<ul>${group.replace(/ data-ul="1"/g, "")}</ul>`)
    .replace(/(?:^|\n)(<li data-ol="1">[\s\S]*?<\/li>(?:\n<li data-ol="1">[\s\S]*?<\/li>)*)/g, (_, group) =>
      `\n<ol>${group.replace(/ data-ol="1"/g, "")}</ol>`);

	const blocks = src.split(RX.blockSplit).map(s => s.trim()).filter(Boolean);
	src = blocks.map(b => {
		if (/^<h\d|^<pre>|^<ul>|^<ol>|^<blockquote>|^<hr>/.test(b)) return b;
		if (/^@@CODE_\d+@@$/.test(b)) return b;
		return `<p>${parseInline(b)}</p>`;
	}).join("\n");

	src = src.replace(/@@CODE_(\d+)@@/g, (_, i) => stash[Number(i)]);

	return src;
}