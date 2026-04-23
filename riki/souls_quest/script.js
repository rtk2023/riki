let filterList = [];
let btnContainer = document.getElementById("myBtnContainer");
let btns = btnContainer.getElementsByClassName("btn");
let pageNumber = 0;
let currentId = 0;
let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
const modalContent = [
	[{title : "Petrus of Thorolund",content : "Blonde cleric with a very sharp tongue and slippery attitude, despising the people from higher bloodlines."},{title : "Petrus' location",content : "Firelink Shrine, on the way to the elevator shaft."}],
	[{title : "Crestfallen Warrior",content : "Weary and tired man, speaking softly, with a snarky attitude, the first NPC welcoming the Chosen Undead."},{title : "Cresfallen Warriors' location",content : "Right next to the bonfire in the Firelink Shrine"}],
	[{title : "Solaire of Astora",content : "Very positive and encouraging man, found first praising the sun and offering the player help in upcoming boss fights. Hailing from the lands of Astora, he found himself in Lordran, the land where goddess of sun Gwynevere resides."},{title : "Solaires' location",content : "Under the bridge after beating Taurus Demon."}],
	[{title : "Siegmeyer of Catarina",content : "A man with wierd, onion shaped armor, behaving very confused every time you meet him."},{title : "Siegmeyers' location",content : "Found next to Sen's Fortress gate "}],
	[{title : "Laurentius of the Great Swamp",content : "A very emotional and human man, a scholar of pyromancy, that can teach the player to use it."},{title : "Laurentius' location",content : "Upon going into depths, drop down next to the butcher enemy, after entering a room full of barrels, he will call out to you to free him."}],
	[{title : "Ingward",content : "A mysterious sorcerer that covers his face with a mask. He can reverse a curse that the player can obtain either from Obelisk enemies un the Depths or Seath the Scaleless at Duke's Archives."},{title : "Ingwards' location",content : "Deep inside of New Londo Ruins beneath Firelink Shrine."}],
	[{title : "",content : ""},{title : "",content : ""}],
	[{title : "",content : ""},{title : "",content : ""}],
	[{title : "",content : ""},{title : "",content : ""}],
	[{title : "",content : ""},{title : "",content : ""}],
	[{title : "",content : ""},{title : "",content : ""}],
	[{title : "",content : ""},{title : "",content : ""}],
	[{title : "",content : ""},{title : "",content : ""}],
	[{title : "",content : ""},{title : "",content : ""}],
	[{title : "",content : ""},{title : "",content : ""}],
	[{title : "",content : ""},{title : "",content : ""}],
	[{title : "",content : ""},{title : "",content : ""}],
	[{title : "",content : ""},{title : "",content : ""}]
	];
document.getElementById("nextPageButton").addEventListener("click", function() {
		pageNumber++;
		if(pageNumber>=modalContent[currentId].length){
			modal.hide();
		}
		else{
			document.getElementById("exampleModalLabel").innerHTML = (modalContent[currentId][pageNumber].title);
			document.getElementById("exampleModalContent").innerHTML = (modalContent[currentId][pageNumber].content);
		}
    });
function changeModalContent(id){
	pageNumber = 0;
	currentId = id;
	document.getElementById("exampleModalLabel").innerHTML = (modalContent[id][pageNumber].title);
	document.getElementById("exampleModalContent").innerHTML = (modalContent[id][pageNumber].content);
	modal.show();
}

function filterSelection(c) {
	let x = document.getElementsByClassName("filterDiv");
		for (let i = 0; i < x.length; i++) {
			w3RemoveClass(x[i], "show");
			if (x[i].className.indexOf("") > -1) w3AddClass(x[i], "show");
		}
	if(filterList.indexOf(c) != -1){
		let itemIndex = filterList.indexOf(c);
		filterList = filterList.filter(function(itemIndex) {
		return itemIndex !== c
		})
	}
	else{
		filterList.push(c);
	}
	if (c == "all") {
		c = "";
		filterList = [];
	}
	console.log(filterList);
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
	for (let i = 0; i < filterList.length;i++){
		for (let j = 0; j < x.length; j++) {
			if(x[j].classList.contains("show")== true){
				console.log(filterList[i]);
				w3RemoveClass(x[j], "show");
				if (x[j].className.indexOf(filterList[i]) > -1) w3AddClass(x[j], "show");
			}
		}
	}
}
filterSelection("all");
// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for (i = 0; i < arr2.length; i++) {
		while (arr1.indexOf(arr2[i]) > -1) {
			arr1.splice(arr1.indexOf(arr2[i]), 1);
			}
		}
	element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
	for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
		if(this == document.getElementById("showAll")){
			let current = btnContainer.getElementsByClassName("btn");
			for(let j = 0;j<current.length;j++){
				w3RemoveClass(current[j]," active");
			}
		}
		else if(this.classList.contains("active")){
			w3RemoveClass(this," active");
		}
		else if(!this.classList.contains("active")){
			this.className += " active";
		}
    });
  }