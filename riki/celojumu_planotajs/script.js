

document.addEventListener("DOMContentLoaded", () => {

	/* -- */
    const form = document.getElementById("travel-form");

    const suggestionEl = document.getElementById("suggestion");
    const tooltip_txt = document.querySelector(".tooltiptext");
    let destinations = [];


	const surpriseBtn = document.getElementById("surpriseBtn");
    const seasonEl = document.getElementById("season");

    const climateEl = document.getElementById("climate");

    const infoPanel = document.getElementById("infoPanel");
    const infoContent = document.getElementById("infoContent");

    const destinationImage = document.getElementById("destinationImage");


	/* fetch */
    let destinationsLoaded = false;

    fetch("destinations.json")

        .then(response => {
            if (!response.ok) throw new Error("Neizdevās ieladēt");

            return response.json();
        })
        .then(data => {
            destinations = data || [];
            destinationsLoaded = true;
        })

        .catch(error => {
            suggestionEl.textContent = "Kļūda : " + error.message;
        });



    tooltip_txt.textContent = localStorage.getItem("prev-search") || "Nav rezultātu";


	/* surprise random-f-l*/
	if (surpriseBtn) {
		surpriseBtn.addEventListener("click", () => {

	        if (!destinationsLoaded || destinations.length === 0) return;

	        const random = destinations[Math.floor(Math.random() * destinations.length)];

	        suggestionEl.innerHTML = `
	            <strong>SURPRISE!</strong><br><br>
	            <strong>${random.valsts}</strong><br>
	            ${random.apraksts}
	        `;

	        infoPanel.style.display = "block";




            if (random.attēls) {
                destinationImage.src = random.attēls;
                destinationImage.style.display = "block";
            } 
            
            else {
                destinationImage.style.display = "none";
            }


        
	        infoContent.innerHTML = `
	            <strong>Kontinents:</strong> ${random.kontinents || "-"}<br>
	            <strong>Klimats:</strong> ${random.klimats || "-"}<br>
	            <strong>Valūta:</strong> ${random.valūta || "-"}<br>
	            <strong>Iedzīvotāji:</strong> ${random.iedzīvotāji || "-"}<br>

	            <strong>Valodas:</strong> ${(random.valodas || []).join(", ")}<br>
	            <strong>Slavenākā vieta:</strong> ${random.slavenākā_vieta || "-"}
	        `;
	    });
	}



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


        /* filtration fixes*/
        const filtered = destinations.filter(dest => {

            const baseMatch =
                dest.budžets <= budget &&
                dest.ilgums <= duration &&
                (dest.tips || []).some(t => interests.includes(t));


            const seasonMatch = !seasonEl?.value || (dest.sezona || []).includes(seasonEl.value);
            const climateMatch = !climateEl?.value || dest.klimats === climateEl.value;

            return baseMatch && seasonMatch && climateMatch;
        });


        if (filtered.length === 0) {
            suggestionEl.textContent = "Diemžēl nav piemērotu galamērķu ar šiem kritērijiem";
            infoPanel.style.display = "none";
            destinationImage.style.display = "none";
            return;
        }


        const scored = filtered.map(dest => {

            const matchCount = (dest.tips || []).filter(t => interests.includes(t)).length;
            const budgetScore = budget - dest.budžets;
            const durationScore = duration - dest.ilgums;

            const totalScore = matchCount * 10 + budgetScore * 0.1 + durationScore * 0.2;

            return { ...dest, score: totalScore };
        });


        const maxScore = Math.max(...scored.map(d => d.score));

        if (!isFinite(maxScore)) {
            suggestionEl.textContent = "Kļūda aprēķinos (nav derīgu rezultātu)";
            return;
        }

        const topDestinations = scored.filter(d => d.score === maxScore);

        const selected = topDestinations[Math.floor(Math.random() * topDestinations.length)];




        if (selected.attēls) {
            destinationImage.src = selected.attēls;
            destinationImage.style.display = "block";
        } 
        
        else {
            destinationImage.style.display = "none";
        }





        suggestionEl.innerHTML = `
            <strong>Galamērķis:</strong> ${selected.valsts}<br>
            <strong>Tips:</strong> ${(selected.tips || []).join(", ")}<br>
            <strong>Budžets:</strong> €${selected.budžets}<br>
            <strong> Ilgums:</strong> ${selected.ilgums} dienas<br>
            <strong>Aktivitātes:</strong> ${(selected.aktivitātes || []).join(", ")}<br>
            <strong>Apraksts:</strong> ${selected.apraksts}
        `;



        document.getElementById("infoPanel").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });




        infoPanel.style.display = "block";

        infoContent.innerHTML = `
            <strong>Kontinents:</strong> ${selected.kontinents || "-"}<br>
            <strong>Klimats:</strong> ${selected.klimats || "-"}<br>
            <strong>Valūta:</strong> ${selected.valūta || "-"}<br>
            <strong>Iedzīvotāji:</strong> ${selected.iedzīvotāji || "-"}<br>

            <strong>Valodas:</strong> ${(selected.valodas || []).join(", ")}<br>
            <strong>Slavenākā vieta:</strong> ${selected.slavenākā_vieta || "-"}
        `;


		// --

        localStorage.setItem('prev-search', `
            Budget: ${budget}€
            Duration: ${duration} days
            Interests: ${interests.join(", ")}

            => ${selected.valsts}
            (${(selected.tips || []).join(", ")})
        `);

        tooltip_txt.textContent =
            localStorage.getItem("prev-search") || "Nav rezultātu";

    });

});
