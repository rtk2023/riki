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
	[{title : "Griggs of Vinheim",content : "A sorcerer found imprisoned, upon freeing him, he continues on his quest following his master, Big Hat Logan, in return for saving him, he will teach the player various sorceries."},{title : "Griggs' location",content : "Lower Undead Burg, behind a closed door. (key can be obtained from the Undead Merchant or you can use starting gift Master Key.)"}],
	[{title : "Big Hat Logan",content : "A master sorcerer with a big hat covering his face. Pursues knowledge and wisdom."},{title : "Logans' location",content : "Sen's Fortress, behind a wall that a snake rests upon, can be freed by either using a key of Sen's Fortress or the Master Key."}],
	[{title : "Knight Lautrec of Carim",content : "A very wise-cracking man that helps the player at first."},{title : "Lautrecs' location",content : "Locked in a cell within Bell Gargoyle's tower."}],
	[{title : "Patches the Hyena",content : "Bald, slippery bastard that stabs you in the back, if you have the heart to forgive him, he will return to the Firelink Shrine and become a merchant."},{title : "Patches' location",content : "Found at the Tomb of The Giants beneath the Catacombs that can be accessed through the graveyard of Firelink Shrine."}],
	[{title : "Elizabeth",content : "A mushroom lady."},{title : "Elizabeths' location",content : "Found in the Artorias DLC, the first NPC you meet."}],
	[{title : "Reah of Thorolund",content : "A maiden from House of Thorolund. Is on a misson to find the Rite of Kindling."},{title : "Reah's location",content : "After defeating the Capra Demon in Lower Undead Burg will appear next to Petrus and her two guards."}],
	[{title : "Dusk of Oolacile",content : "A mysterious woman trapped inside a Crystal Golem next to the Hydra. A neccesary NPC to access the Artorias' dlc."},{title : "Dusks' location",content : "Darkroot Basin, spawns next to defeated Hydra, upon giving her a talisman obtained from Duke's Archives, you can access the DLC."}],
	[{title : "Kingseeker Frampt",content : "A primordial serpent serving the Lord Gwyn."},{title : "Frampts' location",content : "Appears in the Firelink Shrine after ringing the both bells of awakening."}],
	[{title : "Daughter of Izalith",content : "Sister of Quelaag. Half spider half human hybrid."},{title : "Quelaags' sisters location",content : "Found behind an illusory wall after defeating Quelaag."}],
	[{title : "Alvina of the Darkwood Wood",content : "A feline that can give you the access to a covenant."},{title : "Alvinas' location",content : "Found in temple ruins behind the door locked with Crest of Artorias (you can buy it from Blacksmith Andre.) "}],
	[{title : "Rickert of Vinheim",content : "A blacksmith locked behind bars for unknown reason."},{title : "Rickerts' location",content : "Found in New Londo Ruins right next to elevator, player needs to find the hidden path to him."}],
	[{title : "Quelana of Izalith",content : "One of 7 daughters of Izalith."},{title : "Quelanas' location",content : "Found in the Great Swamps."}]
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