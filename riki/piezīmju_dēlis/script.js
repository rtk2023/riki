const openTaskBoardBtn = document.getElementById("openTaskBoardBtn");
const openSettingsBtn = document.getElementById("openSettingsBtn");

openTaskBoardBtn.addEventListener("click", () => {
	if (windowHistory.length !== 0) return;
	taskBoardContainer.style.display = "flex";
	windowHistory.push("taskBoard");
});

openSettingsBtn.addEventListener("click", () => {
	if (windowHistory.length !== 0) return;
	optionContainer.style.display = "flex";
	windowHistory.push("optionContainer");
});
