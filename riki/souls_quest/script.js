let filterList = [];
let btnContainer = document.getElementById("myBtnContainer");
let btns = btnContainer.getElementsByClassName("btn");
function changeModalContent(id){
	let modalContent = [
	{title : "Human with beard and skirt",content : "Dark Souls[a] is a dark fantasy action role-playing game series developed by FromSoftware and published by Bandai Namco Entertainment. Created by Hidetaka Miyazaki, the series began with the release of Dark Souls (2011) and has seen two sequels, Dark Souls II (2014) and Dark Souls III (2016)."},
	{title : "Furry with moustache and jeans",content : "The games take place within the land of Lordran, Drangleic, and Lothric, respectively, where the player's character fights against knights, dragons, phantoms, demons, and other monstrous or supernatural entities. The accretion, loss, and recovery of souls are central to the narrative and gameplay of Dark Souls games."},
	{title : "Dragon with no facial hair and armor",content : "The Dark Souls games are played in a third-person perspective, and focus on exploring interconnected environments while fighting enemies with weapons and magic. Players battle bosses to progress through the story, while interacting with non-playable characters. The protagonist of each Dark Souls game can have a varying gender, appearance, name, and starting class via character creation. Players can choose between classes, including knights, barbarians, thieves, and mages."},
	{title : "Human with no facial hair and armor",content : "One of the core mechanics of the series is the use of how it handles progress, death, and player improvement. Bonfires serve as a checkpoint within the series, restoring all health and other critical resources when used, but also respawning most enemies and obstacles, making repeated trips back to safety untenable for forward progress. Upon losing all of their health points and dying, players lose their souls and appear back at the bonfire where they last rested. If the player can return to their point of death, their bloodstain, without dying again, they can regain all lost souls."},
	{title : "Human with moustache and jeans",content : "Online interaction in the Dark Souls games is integrated into the single-player experience. Throughout areas of the game, players can briefly see the actions of other players as ghosts in the same area that may show hidden passages or switches. When a player dies, a bloodstain can be left in other players game world and when activated can show a ghost playing out their final moments, indicating how that person died and potentially helping other players online to avoid the same fate in advance."},
	{title : "Furry with no facial hair and skirt",content : "Released in 2009 for the PlayStation 3, Demon's Souls is considered the spiritual predecessor to the Dark Souls series.[36][37] It has also been described as a spiritual successor to the King's Field series of games,[5][38] while at the same time being described as a separate entity guided by differing core game design concepts.[39] It also drew inspiration from video games such as Ico,[40][41] The Legend of Zelda,[39] and FromSoftware's Otogi: Myth of Demons,[42] as well as manga such as Berserk, Saint Seiya and JoJo's Bizarre Adventure."}
	];
	document.getElementById("exampleModalLabel").innerHTML = (modalContent[id].title);
	document.getElementById("exampleModalContent").innerHTML = (modalContent[id].content);
	new bootstrap.Modal(document.getElementById('exampleModal')).show();
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
		if(this.classList.contains("showAll")){
			let current = btnContainer.getElementsByClassName("btn");
			for(let j = 0;j<current.length;j++){
				w3RemoveClass(current[j],"active");
			}
			if(!this.classList.contains("active")){
			this.className += " active";
			}
		}
		else if(this.classList.contains("active")){
			w3RemoveClass(this,"active");
		}
		else if(!this.classList.contains("active")){
			this.className += " active";
		}
    });
  }