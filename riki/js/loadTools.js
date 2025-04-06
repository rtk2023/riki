async function loadTools(jsonUrl) {
	try {
		const response = await fetch(jsonUrl);
		const data = await response.json();

		const table = document.createElement('table');

		// Create table header
		const header = table.insertRow();
		['Rīks', 'Apraksts', 'Pievienots'].forEach(text => {
			const th = document.createElement('th');
			th.textContent = text;
			header.appendChild(th);
		});

		// Populate rows
		data.forEach(item => {
			const row = table.insertRow();

			// Link column
			const linkCell = row.insertCell();
			const link = document.createElement('a');
			item.entry = item.entry  === undefined ? "index.html" : item.entry;
			link.href = `${item.path}/${item.entry}`;
			item.name = item.name === undefined ? item.path : item.name;
			link.textContent = item.name;
			linkCell.appendChild(link);

			// Description column
			const descCell = row.insertCell();
			descCell.textContent = item.description;

			// Added date column
			const dateCell = row.insertCell();
			dateCell.textContent = item.added_date;
		});

		document.getElementById('content').appendChild(table);
	} catch (error) {
		console.error('Error loading or parsing JSON:', error);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	loadTools("saraksts.json");
});
