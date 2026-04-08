
document.addEventListener("DOMContentLoaded", () => {
	
    const form = document.getElementById("travel-form");
    const suggestionEl = document.getElementById("suggestion");

    let destinations = [];
	
	fetch("destinations.json")
		
        .then(response => {
            if (!response.ok) throw new Error("Neizdevas ielādēt datus");
            return response.json();
        })
        .then( data => {
            destinations = data;
        })
		
        .catch(error =>  {
            suggestionEl.textContent = "Klūda datu ielādē: " + error.message;
        });

	// --

	form.addEventListener("submit", event => {
        event.preventDefault();


	});




	
});
