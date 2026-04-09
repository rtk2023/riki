async function getPointsData() {
	const url = "https://api.openf1.org/v1/championship_drivers?session_key=latest";

	const response = await fetch(url);
	let data = await response.json();

	const currentPoints = data
		.map(driver => ({ driver_number: driver.driver_number, points: driver.points_current }))
		.sort((a, b) => b.points - a.points);

	return currentPoints;
}

async function getDriversData() {
	const points = await getPointsData();
	const url = "https://api.openf1.org/v1/drivers?session_key=latest";
	const response = await fetch(url);
	let data = await response.json();

	const driversData = data
		.map(driver => ({ headshot: driver.headshot_url, acronym: driver.name_acronym, driver_number: driver.driver_number, name: driver.full_name, team: driver.team_name }))
		.sort((a, b) => a.driver_number - b.driver_number);

	const driversMap = new Map(driversData.map(d => [d.driver_number, d]));
	const drivers = points
		.map(p => ({
			...(driversMap.get(p.driver_number) || {}),
			...p
		}))
		.filter(d => d.driver_number != null);

	return drivers;
}

async function showPointsTable() {

	const driverData = await getDriversData();
	const tableBody = document.getElementById("pointsTableBody");
	let driverPosition = 1;

	for (const driver of driverData) {
		const row = document.createElement("tr");
		const driverPositionItem = document.createElement("td");
		driverPositionItem.textContent = driverPosition;
		const driverHeadshotItem = document.createElement("td");
		driverHeadshotItem.innerHTML = `<img src="${driver.headshot}" width="100" alt="${driver.name ?? ""}">`;
		const driverAcronymItem = document.createElement("td");
		driverAcronymItem.textContent = driver.acronym;
		const driverNameItem = document.createElement("td");
		driverNameItem.textContent = driver.name;
		const driverTeamItem = document.createElement("td");
		driverTeamItem.textContent = driver.team;
		const driverNumberItem = document.createElement("td");
		driverNumberItem.textContent = driver.driver_number;
		const driverPointsItem = document.createElement("td");
		driverPointsItem.textContent = driver.points;
		row.appendChild(driverPositionItem);
		row.appendChild(driverHeadshotItem);
		row.appendChild(driverAcronymItem);
		row.appendChild(driverNameItem);
		row.appendChild(driverTeamItem);
		row.appendChild(driverNumberItem);
		row.appendChild(driverPointsItem);
		tableBody.appendChild(row);
		driverPosition++;
	}

}

async function getRaceData() {
	const url = "https://api.openf1.org/v1/championship_drivers?session_key=latest";

	const response = await fetch(url);
	let data = await response.json();

	const races = data
		.map(race => ({ driver_number: driver.driver_number, points: driver.points_current }))
		.sort((a, b) => b.points - a.points);

	return races;
}
