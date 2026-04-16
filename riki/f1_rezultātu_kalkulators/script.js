function toArrayPayload(payload, endpointName) {
	if (Array.isArray(payload)) return payload;
	console.error(`${endpointName} returned non-array payload:`, payload);
	return [];
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const inFlightJsonByUrl = new Map();

async function fetchJsonWithRetry(url, endpointName, { retries = 2 } = {}) {
	if (inFlightJsonByUrl.has(url)) return inFlightJsonByUrl.get(url);

	const p = (async () => {
		for (let attempt = 0; attempt <= retries; attempt++) {
			const response = await fetch(url);

			if (response.status === 429) {
				const backoffMs = 400 * Math.pow(2, attempt);
				await sleep(backoffMs);
				continue;
			}

			if (!response.ok) {
				let body = null;
				try {
					body = await response.json();
				} catch {
					// ignore
				}
				console.error(`${endpointName} HTTP error ${response.status}`, body);
				return [];
			}

			const payload = await response.json();
			return toArrayPayload(payload, endpointName);
		}

		console.error(`${endpointName} failed.`);
		return [];
	})();

	inFlightJsonByUrl.set(url, p);
	try {
		return await p;
	} finally {
		inFlightJsonByUrl.delete(url);
	}
}

async function getPointsData() {
	const url = "https://api.openf1.org/v1/championship_drivers?meeting_key=1281";

	const data = await fetchJsonWithRetry(url, "championship_drivers");

	const currentPoints = data
		.map(driver => ({ driver_number: driver.driver_number, points: driver.points_current }))
		.sort((a, b) => b.points - a.points);

	return currentPoints;
}

async function getDriversData() {
	const points = await getPointsData();
	const url = "https://api.openf1.org/v1/drivers?session_key=latest";
	const data = await fetchJsonWithRetry(url, "drivers");

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

async function showPointsTable(driversOverride) {

	const btnCurrent = document.getElementById("btnCurrent");
	btnCurrent.setAttribute("class", "btn btn-secondary");
	btnCurrent.classList.remove("is-selected");

	const btnOriginal = document.getElementById("btnOriginal");
	btnOriginal.setAttribute("class", "btn btn-primary is-selected");

	const driverData = driversOverride ?? await getDriversData();
	const tableBody = document.getElementById("pointsTableBody");
	tableBody.innerHTML = "";
	let driverPosition = 1;

	const predictedWins = (() => {
		const all = Object.values(readSavedWinners());
		const winsByDriver = new Map();
		for (const w of all) {
			const num = w?.driverNumber;
			if (!num) continue;
			winsByDriver.set(String(num), (winsByDriver.get(String(num)) ?? 0) + 1);
		}
		return winsByDriver;
	})();

	const enriched = (driverData ?? []).map(d => {
		const basePoints = Number(d.points ?? 0);
		const winCount = predictedWins.get(String(d.driver_number)) ?? 0;
		const bonusPoints = winCount * 25;
		return {
			...d,
			basePoints,
			bonusPoints,
			totalPoints: basePoints + bonusPoints,
		};
	}).sort((a, b) => b.totalPoints - a.totalPoints);

	for (const driver of enriched) {
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
		driverPointsItem.textContent = String(driver.totalPoints);
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
	const url = "https://api.openf1.org/v1/meetings?year=2026&date_start>=2026-03-06";

	const data = await fetchJsonWithRetry(url, "meetings");

	const races = data
		.map(race => ({
			key: race.meeting_key,
			flag: race.country_flag,
			country: race.country_name,
			full_name: race.meeting_name,
			start_date:
				race.date_start ??
				race.meeting_start_date ??
				race.start_date ??
				race.session_start_date ??
				null,
			order: race.meeting_key
		}))
		.sort((a, b) => a.order - b.order);

	return races;
}

const WINNERS_STORAGE_KEY = "f1_upcoming_winner_by_meeting_key";

function readSavedWinners() {
	try {
		const raw = localStorage.getItem(WINNERS_STORAGE_KEY);
		if (!raw) return {};
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" ? parsed : {};
	} catch {
		return {};
	}
}

function saveWinner(meetingKey, winner) {
	const all = readSavedWinners();
	all[String(meetingKey)] = winner;
	localStorage.setItem(WINNERS_STORAGE_KEY, JSON.stringify(all));
}

function getSavedWinner(meetingKey) {
	const all = readSavedWinners();
	return all[String(meetingKey)] ?? null;
}

function isUpcomingRace(race) {
	if (!race?.start_date) return false;
	const start = new Date(race.start_date);
	if (Number.isNaN(start.getTime())) return false;
	return start.getTime() > Date.now();
}

async function showRaceTable(racesOverride) {

	const raceData = racesOverride ?? await getRaceData();
	const tableBody = document.getElementById("racesTableBody");
	tableBody.innerHTML = "";

	for (const race of raceData) {
		const upcoming = isUpcomingRace(race);
		const savedWinner = upcoming ? getSavedWinner(race.key) : null;

		const row = document.createElement("tr");
		const raceFlagItem = document.createElement("td");
		raceFlagItem.innerHTML = `<img src="${race.flag}" width="100" alt="${race.flag ?? ""}">`;
		const raceCountryItem = document.createElement("td");
		raceCountryItem.textContent = race.country;
		const raceNameItem = document.createElement("td");
		raceNameItem.textContent = race.full_name;
		const raceWinnerItem = document.createElement("td");
		raceWinnerItem.textContent = upcoming ? (savedWinner?.driverLabel ?? "") : "";
		raceWinnerItem.dataset.raceWinnerForKey = String(race.key);
		const editButtonItem = document.createElement("td");
		editButtonItem.innerHTML = upcoming
			? `<button type="button" class="btn btn-primary open-modal" data-race-key="${race.key}" data-race-name="${race.full_name ?? ""}">Edit</button>`
			: `<button type="button" class="btn btn-secondary" disabled title="Race already happened">Edit</button>`;
		row.appendChild(raceFlagItem);
		row.appendChild(raceCountryItem);
		row.appendChild(raceNameItem);
		row.appendChild(raceWinnerItem);
		row.appendChild(editButtonItem);
		tableBody.appendChild(row);
	}

}

async function setup() {
	const driversPromise = getDriversData();
	const racesPromise = getRaceData();

	const [drivers, races] = await Promise.all([driversPromise, racesPromise]);
	showPointsTable(drivers);
	showRaceTable(races);

	const tableBody = document.getElementById("racesTableBody");
	tableBody.addEventListener("click", async (e) => {
		const btn = e.target.closest?.("button.open-modal");
		if (!btn) return;

		const modal = window.Modal;
		if (!modal) {
			console.error("Modal is not initialized. Did modal.js load?");
			return;
		}

		const raceName = btn.dataset.raceName || "Race";
		const raceKey = btn.dataset.raceKey;
		const race = races.find(r => String(r.key) === String(raceKey));
		if (!race || !isUpcomingRace(race)) return;

		const existing = getSavedWinner(race.key);
		const result = await modal.show(raceName, drivers, {
			preselectedDriverNumber: existing?.driverNumber ?? null
		});

		if (!result?.confirmed) return;
		if (!isUpcomingRace(race)) return;

		const driverNumber = result.driverNumber;
		const driverLabel = result.driverLabel;
		if (!driverNumber) return;

		saveWinner(race.key, {
			driverNumber,
			driverLabel
		});

		const winnerCell = tableBody.querySelector(`td[data-race-winner-for-key="${CSS.escape(String(race.key))}"]`);
		if (winnerCell) winnerCell.textContent = driverLabel ?? "";

		showPointsTable(drivers);
	});
}

async function resetRaces(){
	const btnCurrent = document.getElementById("btnCurrent");
	btnCurrent.setAttribute("class", "btn btn-primary is-selected");

	const btnOriginal = document.getElementById("btnOriginal");
	btnOriginal.setAttribute("class", "btn btn-secondary");

	const driverData = await getDriversData();
	const tableBody = document.getElementById("pointsTableBody");
	tableBody.innerHTML = "";
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
		driverPointsItem.textContent = String(driver.points);
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

