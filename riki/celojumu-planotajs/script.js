

document.addEventListener("DOMContentLoaded", () => {

	/* -- */
    const form = document.getElementById("travel-form");
	
    const suggestionEl = document.getElementById("suggestion");
    const tooltip_txt = document.querySelector(".tooltiptext");
    let destinations = [];

	
	const surpriseBtn = document.getElementById("surpriseBtn");
    const seasonEl= document.getElementById("season");
	
    const climateEl = document.getElementById("climate");

    const infoPanel = document.getElementById("infoPanel");
    const infoContent = document.getElementById("infoContent");



	/* fetch */
    let destinationsLoaded = false;

    fetch("destinations.json")

        .then(response => {
            if (!response.ok) throw new Error("Neizdevās ieladēt");

            return response.json();
        })
        .then(data => {
            destinations = data;
            destinationsLoaded = true;
        })

        .catch(error => {
            suggestionEl.textContent = "Kļūda : " + error.message;
        });


	
	
    tooltip_txt.textContent = localStorage.getItem("prev-search") || "Nav rezultātu";


	
    form.addEventListener("submit", event => {

		/* load check*/

		if (!destinationsLoaded) {
            suggestionEl.textContent = " Dati vēl lādējas ";
            return;

        }
		
		
        event.preventDefault();

        const budget = parseFloat(document.getElementById("budget").value);
        const duration = parseInt(document.getElementById("duration").value);
		
        const interestsEls = document.querySelectorAll('input[name="interests"]:checked');
        const interests = Array.from(interestsEls).map(el => el.value);

        
        if (isNaN(budget) || budget <= 0) {
            suggestionEl.textContent = "Lūdzu ievadiet korektu budžetu >0";
            return;
        }

        if (isNaN(duration) || duration <= 0) {
            suggestionEl.textContent = "Lūdzu ievadiet derīgu ceļojuma ilgumu >0";
             return;
        }

        if (interests.length === 0) {
            suggestionEl.textContent = "Lūdzu izvēlieties vismaz vienu interesi";
            return;
        }

        
        const filtered = destinations.filter(dest =>
            dest.budžets <= budget &&
            dest.ilgums <= duration &&
            dest.tips.some(t => interests.includes(t))
											 
        );

        if (filtered.length === 0) {
            suggestionEl.textContent = "Diemžēl nav piemērotu galamērķu ar šiem kritērijiem";
            return;
        }

        

        const scored = filtered.map(dest => {
            const matchCount = dest.tips.filter(t => interests.includes(t)).length;
            const budgetScore = budget - dest.budžets;
            const durationScore = duration - dest.ilgums;
            const totalScore = matchCount * 10 + budgetScore * 0.1 + durationScore * 0.2;
            return { ...dest, score: totalScore };
        });

        const maxScore = Math.max(...scored.map(d => d.score));
        const topDestinations = scored.filter(d => d.score === maxScore);
        const selected = topDestinations[Math.floor(Math.random() * topDestinations.length)];

        
        suggestionEl.innerHTML = `
            <strong>Galamērķis:</strong> ${selected.valsts}<br>
            <strong>Tips:</strong> ${selected.tips.join(", ")}<br>
            <strong>Budžets:</strong> €${selected.budžets}<br>
            <strong>Ilgums:</strong> ${selected.ilgums} dienas<br>
            <strong>Aktivitātes:</strong> ${selected.aktivitātes.join(", ")}<br>
            <strong>Apraksts:</strong> ${selected.apraksts}
        `;


		// --
		
        localStorage.setItem('prev-search', `
			JŪSU VAICĀJUMS: ${budget} € • ${duration} d. • ${interests.join(", ")}
			 
			IETEIKUMS:
			Galamērķis: ${selected.valsts}
			Tips: ${selected.tips.join(", ")}
			Budžets: €${selected.budžets}
			Ilgums: ${selected.ilgums}
			Aktivitātes: ${selected.aktivitātes.join(", ")}
			Apraksts: ${selected.apraksts}
        `);

        tooltip_txt.textContent = localStorage.getItem("prev-search") || "Nav rezultātu";

		
    });
});


