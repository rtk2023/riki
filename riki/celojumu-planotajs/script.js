
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



		if (isNaN(budget) || budget <= 0) {
	        suggestionEl.textContent = "Lūdzu ievadiet korektu budžetu >0 ";
	        return;
	    }
	
	    if (isNaN(duration) ||  duration <= 0) {
	        suggestionEl.textContent = "Lūdzu ievadiet derīgu ceļojuma ilgumu >0 ";
	        return;
	    }
	    if (interests.length === 0) {
	        suggestionEl.textContent = "Lūdzu izvēlieties vismaz vienu interesi";
	        return;
	    }
	
			
		// -
	
		const filtered = destinations.filter(dest => {
			
	            return dest.budžets <= budget &&
	                   dest.ilgums <= duration   &&
	                   dest.tips.some(t => interests.includes(t));
	    });
	
	    if (filtered.length === 0) {
	        suggestionEl.textContent = "Diemžēl nav piemērotu galamērķu ar šiem kritērijiem";
			
	    	return;
	    }
	
		// Pieskir katram galamerķim punktus pēc interešu atbilstības
		const scored = filtered.map(dest => {
			
	            const matchCount = dest.tips.filter(t => interests.includes(t)).length;
	
	            const budgetScore = budget - dest.budžets;
	            const durationScore = duration - dest.ilgums;
			
				// -intereses svars + budzets + ilgums
	            const totalScore = matchCount * 10 + budgetScore * 0.1 + durationScore * 0.2;
	
	
	            return { ...dest, score: totalScore };
	     });


		//  maksimums pēc score
        const maxScore = Math.max(...scored.map(d => d.score));
        const topDestinations = scored.filter(d => d.score === maxScore);

		// + random ja vairakas iepējas
        const selected = topDestinations[Math.floor(Math.random() * topDestinations.length)];


		
		suggestionEl.innerHTML = `
            <strong> Galamērķis: </strong> ${selected.valsts}<br>
            <strong>Tips: </strong> ${selected.tips.join(", ")}<br>
            <strong> Budžets: </strong> €${selected.budžets}<br>
			
            <strong>Ilgums:</strong> ${selected.ilgums} dienas<br>
            <strong> Aktivitātes: </strong> ${selected.aktivitātes.join(", ")}<br>
            <strong> Apraksts: </strong> ${selected.apraksts}
        `;
		
		
	});
});


