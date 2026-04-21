let filterList = [];
let btnContainer = document.getElementById("myBtnContainer");
let btns = btnContainer.getElementsByClassName("btn");
let pageNumber = 0;
let currentId = 0;
let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
const modalContent = [
	[{title : "Human with beard and skirt",content : "Dark Souls[a] is a dark fantasy action role-playing game series developed by FromSoftware and published by Bandai Namco Entertainment. Created by Hidetaka Miyazaki, the series began with the release of Dark Souls (2011) and has seen two sequels, Dark Souls II (2014) and Dark Souls III (2016)."},{title : "Human with beard and skirt V2",content : "SECOND CONTENT OH MY GOD!"}],
	[{title : "Human with beard and skirt",content : "Dark Souls[a] is a dark fantasy action role-playing game series developed by FromSoftware and published by Bandai Namco Entertainment. Created by Hidetaka Miyazaki, the series began with the release of Dark Souls (2011) and has seen two sequels, Dark Souls II (2014) and Dark Souls III (2016)."},{title : "Human with beard and skirt V2",content : "SECOND CONTENT OH MY GOD!"}],
	[{title : "Human with beard and skirt",content : "Dark Souls[a] is a dark fantasy action role-playing game series developed by FromSoftware and published by Bandai Namco Entertainment. Created by Hidetaka Miyazaki, the series began with the release of Dark Souls (2011) and has seen two sequels, Dark Souls II (2014) and Dark Souls III (2016)."},{title : "Human with beard and skirt V2",content : "SECOND CONTENT OH MY GOD!"}],
	[{title : "Human with beard and skirt",content : "Dark Souls[a] is a dark fantasy action role-playing game series developed by FromSoftware and published by Bandai Namco Entertainment. Created by Hidetaka Miyazaki, the series began with the release of Dark Souls (2011) and has seen two sequels, Dark Souls II (2014) and Dark Souls III (2016)."},{title : "Human with beard and skirt V2",content : "SECOND CONTENT OH MY GOD!"}],
	[{title : "Human with beard and skirt",content : "Dark Souls[a] is a dark fantasy action role-playing game series developed by FromSoftware and published by Bandai Namco Entertainment. Created by Hidetaka Miyazaki, the series began with the release of Dark Souls (2011) and has seen two sequels, Dark Souls II (2014) and Dark Souls III (2016)."},{title : "Human with beard and skirt V2",content : "SECOND CONTENT OH MY GOD!"}],
	[{title : "Human with beard and skirt",content : "Dark Souls[a] is a dark fantasy action role-playing game series developed by FromSoftware and published by Bandai Namco Entertainment. Created by Hidetaka Miyazaki, the series began with the release of Dark Souls (2011) and has seen two sequels, Dark Souls II (2014) and Dark Souls III (2016)."},{title : "Human with beard and skirt V2",content : "SECOND CONTENT OH MY GOD!"}]
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