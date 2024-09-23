function randomString(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

function generet() {
	let p = document.getElementById("prefix").value;
	let q = parseInt(document.getElementById("quantity").value);
	let l = parseInt(document.getElementById("length").value);

	// Validācija
	if (p == "") p = "RTKCTF";
	if (isNaN(q)) q = 10;
	if (isNaN(l)) l = 20;

	ul = document.getElementById("list");
	ul.innerHTML = ""; // Notīrīt sarakstu
	for (let i = 0; i < q; i++) {
		let li = document.createElement('li');
		li.textContent = p + "{" + randomString(l) + "}";
		ul.appendChild(li);
	}
}
