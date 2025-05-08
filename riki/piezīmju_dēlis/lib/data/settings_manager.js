const optionsContainer = document.getElementById("optionContainer");
const exportDataButton = document.getElementById("exportDataBtn");
const importDataBtn = document.getElementById("importDataBtn");
const clearDataBtn = document.getElementById("clearDataBtn");
const taskBoardBgColor = document.getElementById("taskBoardBgColor");
const desktopBgColor = document.getElementById("desktopBgColor");
const settingsCloseBtn = document.getElementById("settingsCloseBtn");

function exportToJsonFile(obj, obj2, filename) {
	const taskDataStr = JSON.stringify(obj);
	const tagDataStr = JSON.stringify(obj2);
	dataStr = taskDataStr + "ࣿ" + tagDataStr;
	const blob = new Blob([dataStr], { type: "application/json" });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();

	URL.revokeObjectURL(url);
}

// Returns text inside a file
function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	};
	rawFile.send(null);
}

// Data export
exportDataButton.addEventListener("click", () => {
	exportToJsonFile(data_temp, tagData, "taskBoardData.json");
});

// Data import
importDataBtn.addEventListener("change", () => {
	const dataURL = URL.createObjectURL(importDataBtn.files[0]);
	readTextFile(dataURL, (val) => {
		const separatedVal = val.split("ࣿ");
		console.log(separatedVal);
		window.localStorage.setItem("task_data", separatedVal[0]);
		window.localStorage.setItem("tag_data", separatedVal[1]);
		data_temp = JSON.parse(separatedVal[0]);
		tagData = JSON.parse(separatedVal[1]);
		initializeData();
	});
});

// Data anihilation
clearDataBtn.addEventListener("click", () => {
	window.localStorage.clear();
	data_temp = {};
	initializeData();
});

// Sets background colors if they exist in local storage
if (window.localStorage.getItem("desktopColor")) {
	document.body.style.backgroundColor =
		window.localStorage.getItem("desktopColor");
	desktopBgColor.value = window.localStorage.getItem("desktopColor");
}
if (window.localStorage.getItem("taskBoardColor")) {
	const taskBoardContainer = document.getElementById("folder_container");
	taskBoardContainer.style.backgroundColor =
		window.localStorage.getItem("taskBoardColor");
	taskBoardBgColor.value = window.localStorage.getItem("taskBoardColor");
}

desktopBgColor.addEventListener("input", () => {
	document.body.style.backgroundColor = desktopBgColor.value;
	window.localStorage.setItem("desktopColor", desktopBgColor.value);
});

taskBoardBgColor.addEventListener("input", () => {
	const taskBoardContainer = document.getElementById("folder_container");
	taskBoardContainer.style.backgroundColor = taskBoardBgColor.value;
	window.localStorage.setItem("taskBoardColor", taskBoardBgColor.value);
});

settingsCloseBtn.addEventListener("click", () => {
	windowHistory.pop();
	optionsContainer.style.display = "none";
});
