
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

		const budget = parseFloat(document.getElementById("budget").value);
		
        const duration = parseInt(document.getElementById("duration").value);
        const interestsEls = document.querySelectorAll('input[name = "interests"]:checked');
        const interests = Array.from(interestsEls).map(el => el.value);


	});
});
