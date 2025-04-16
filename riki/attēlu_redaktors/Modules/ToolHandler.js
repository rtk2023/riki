/*
    Handlo (idk kā ir latviski) rīkus no ./Modules/Tools un pievieno tos sidebaram
*/
import pen from "./Tools/Pen.js";
import eraser from "./Tools/Eraser.js";

let availableTools = {
    "Pen": pen,
    "Eraser": eraser,
}

let toolList = document.getElementById("toolList")
let selectedToolElement = null;

for (let toolName in availableTools) {
    let tool = availableTools[toolName];
    let toolElement = document.createElement("div");
    toolElement.classList.add("flex", "bg-gray-200", "h-16", "w-16", "cursor-pointer");
    toolElement.innerHTML = `<p class="m-auto">${toolName}</p>`;
    
    toolElement.addEventListener("click", () => {
        if (selectedToolElement) {
            selectedToolElement.classList.remove("bg-gray-400");
            selectedToolElement.classList.add("bg-gray-200");
        }
        toolElement.classList.remove("bg-gray-200");
        toolElement.classList.add("bg-gray-400");
        selectedToolElement = toolElement;
        window.currentTool = tool;
    });
    
    toolList.appendChild(toolElement);

    // Izvēlēties pirmo rīko noklusējumā
    if (!selectedToolElement) {
        toolElement.classList.remove("bg-gray-200");
        toolElement.classList.add("bg-gray-400");
        selectedToolElement = toolElement;
        window.currentTool = tool;
    }
}