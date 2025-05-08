// Norm Calculator Tab functionality

let currentExercise = '';
let currentBodyWeight = 0;
let availableFederations = [];

function updateDrugTestSwitchVisibility() {
    const exercise = $('#exerciseType').val();
    checkDrugTestSwitchVisibility(exercise, 'calculator');
}

function updateFederationSelectors() {
    const exercise = $('#exerciseType').val() || $('#tableExercise').val();
    const isCalcTab = $('#calculator-tab').hasClass('active');
    const drugTestSwitch = isCalcTab ? $('#drugTested') : $('#tableDrugTested');
    const isDrugTestedSelected = drugTestSwitch.prop('checked');

    let drugTestStatus;
    const existsInDrugTest = normData.drugTest && normData.drugTest[exercise];
    const existsInNoDrugTest = normData.noDrugTest && normData.noDrugTest[exercise];

    if (existsInDrugTest && existsInNoDrugTest) {
        drugTestStatus = isDrugTestedSelected ? 'drugTest' : 'noDrugTest';
    } else if (existsInDrugTest) {
        drugTestStatus = 'drugTest';
    } else if (existsInNoDrugTest) {
        drugTestStatus = 'noDrugTest';
    } else {
        drugTestStatus = null;
    }

    let federations = [];
    if (exercise && drugTestStatus && normData[drugTestStatus] && normData[drugTestStatus][exercise]) {
        federations = Object.keys(normData[drugTestStatus][exercise]);
    }

    availableFederations = federations;

    const calcSelector = $('#federation');
    const currentCalcValue = calcSelector.val();
    calcSelector.find('option:not(:first)').remove();
    federations.forEach(fed => {
        calcSelector.append($('<option>').val(fed).text(fed));
    });
    if (currentCalcValue && federations.includes(currentCalcValue)) {
        calcSelector.val(currentCalcValue);
    } else {
        calcSelector.val('');
    }

    if (exercise) {
        updateDrugTestSwitchVisibility();
    }
}

function getCurrentCSVData() {
    const exercise = $('#exerciseType').val();
    const federation = $('#federation').val();
    const drugTestSwitch = $('#drugTested');
    const isDrugTestedSelected = drugTestSwitch.prop('checked');

    let drugTestStatus;
    const existsInDrugTest = normData.drugTest && normData.drugTest[exercise];
    const existsInNoDrugTest = normData.noDrugTest && normData.noDrugTest[exercise];

    if (existsInDrugTest && existsInNoDrugTest) {
        drugTestStatus = isDrugTestedSelected ? 'drugTest' : 'noDrugTest';
    } else if (existsInDrugTest) {
        drugTestStatus = 'drugTest';
    } else if (existsInNoDrugTest) {
        drugTestStatus = 'noDrugTest';
    } else {
        return null;
    }

    if (!exercise) return null;

    if (federation) {
        if (normData[drugTestStatus] &&
            normData[drugTestStatus][exercise] &&
            normData[drugTestStatus][exercise][federation]) {
            return normData[drugTestStatus][exercise][federation];
        }
        return null;
    }

    const availableFeds = (normData[drugTestStatus] && normData[drugTestStatus][exercise])
                        ? Object.keys(normData[drugTestStatus][exercise])
                        : [];

    if (availableFeds.length > 0) {
        const firstFed = availableFeds[0];
        if (normData[drugTestStatus] &&
            normData[drugTestStatus][exercise] &&
            normData[drugTestStatus][exercise][firstFed]) {
            return normData[drugTestStatus][exercise][firstFed];
        }
    }

    return null;
}

function displayAllFederations(bodyWeight, exercise, oneRM = null) {
    const drugTestSwitch = $('#drugTested');
    const isDrugTestedSelected = drugTestSwitch.prop('checked');
    let drugTestStatus;
    const existsInDrugTest = normData.drugTest && normData.drugTest[exercise];
    const existsInNoDrugTest = normData.noDrugTest && normData.noDrugTest[exercise];

    if (existsInDrugTest && existsInNoDrugTest) {
        drugTestStatus = isDrugTestedSelected ? 'drugTest' : 'noDrugTest';
    } else if (existsInDrugTest) {
        drugTestStatus = 'drugTest';
    } else if (existsInNoDrugTest) {
        drugTestStatus = 'noDrugTest';
    } else {
        $('#allFederationsSection').hide();
        return;
    }


    if (!exercise || !bodyWeight || !normData[drugTestStatus] || !normData[drugTestStatus][exercise]) {
        $('#allFederationsSection').hide();
        return;
    }

    const allFederationsDiv = $('#allFederationsResults');
    allFederationsDiv.empty();

    let hasAnyResults = false;
    const federationsToShow = Object.keys(normData[drugTestStatus][exercise]);

    if (federationsToShow.length === 0) {
        $('#allFederationsSection').hide();
        return;
    }

    for (const federation of federationsToShow) {
        const csvData = normData[drugTestStatus][exercise][federation];
        const weightCategory = findWeightCategory(bodyWeight, csvData);

        if (weightCategory) {
            hasAnyResults = true;

            const fedCard = $('<div class="card mb-3">');
            const fedHeader = $(`<div class="card-header bg-secondary text-white"><h5>${federation}</h5></div>`);
            const fedBody = $('<div class="card-body">');

            let achievedNorm = null;
            if (oneRM !== null) {
                const normResult = determineNormLevel(oneRM, csvData, weightCategory, exercise, bodyWeight);
                if (normResult && !normResult.norm.startsWith("Zem")) {
                    achievedNorm = normResult.norm;
                }
            }

            displayCategoryRow(csvData, fedBody, weightCategory, null, achievedNorm);

            fedCard.append(fedHeader).append(fedBody);
            allFederationsDiv.append(fedCard);
        }
    }

    if (hasAnyResults) {
        $('#allFederationsSection').show();
    } else {
        allFederationsDiv.html('<div class="alert alert-warning">Neviena svara kategorija nav atrasta nevienā no pieejamajām federācijām ar izvēlētajām opcijām.</div>');
        $('#allFederationsSection').show();
    }
}

function performCalculations() {
    const bodyWeight = parseFloat($('#bodyWeight').val());
    const exercise = $('#exerciseType').val();
    const federation = $('#federation').val();
    const workingWeight = parseFloat($('#workingWeight').val()) || 0;
    const repetitions = parseInt($('#repetitions').val()) || 0;

    if (isNaN(bodyWeight) || !exercise) {
        $('#categoryResultsSection').hide();
        $('#oneRMSection').hide();
        $('#allFederationsSection').hide();
        return;
    }

    currentBodyWeight = bodyWeight;
    currentExercise = exercise;

    const csvDataForCategoryLookup = getCurrentCSVData();
    if (!csvDataForCategoryLookup) {
        $('#categoryResultsSection').hide();
        $('#oneRMSection').hide();
        $('#allFederationsSection').hide();
        $('#normAchieved').html('<div class="alert alert-warning">Nav pieejami normatīvu dati izvēlētajam vingrojumam un dopinga testēšanas statusam.</div>');
        if (workingWeight > 0 && repetitions > 0) {
            const oneRM = calculate1RM(workingWeight, repetitions);
            $('#normAchieved').html(`
                <div class="result-item">
                    <span class="result-label">Aprēķinātais 1RM:</span>
                    <span class="result-value"><span class="badge bg-primary">${oneRM.toFixed(2)} kg</span></span>
                </div>
                <div class="alert alert-warning mt-3">Nav pieejami normatīvu dati izvēlētajam vingrojumam un dopinga testēšanas statusam.</div>
            `);
            $('#oneRMSection').show();
        } else {
            $('#oneRMSection').hide();
        }
        return;
    }

    const userCategory = findWeightCategory(bodyWeight, csvDataForCategoryLookup);

    let oneRM = null;
    let achievedNormForSpecificFed = null;

    if (workingWeight > 0 && repetitions > 0) {
        oneRM = calculate1RM(workingWeight, repetitions);
        $('#oneRMSection').show();

        if (federation) {
            const specificFedCsvData = getCurrentCSVData();
            if (specificFedCsvData && userCategory) {
                const normResult = determineNormLevel(oneRM, specificFedCsvData, userCategory, exercise, bodyWeight);

                let resultsHtml = '';
                const comparisonRM = normResult ? normResult.comparisonRM : oneRM;
                const isWeightedExercise = (exercise === 'weightedPullUp' || exercise === 'weightedDip');
                const displayRM = isWeightedExercise
                    ? `${oneRM.toFixed(2)} kg (Kopā) / ${comparisonRM.toFixed(2)} kg (Papildsvars)`
                    : `${oneRM.toFixed(2)} kg`;

                resultsHtml += `
                    <div class="result-item">
                        <span class="result-label">Aprēķinātais 1RM${isWeightedExercise ? ' (Kopā / Papildsvars)' : ''}:</span>
                        <span class="result-value"><span class="badge bg-primary">${displayRM}</span></span>
                    </div>`;

                resultsHtml += `
                    <div class="result-item">
                        <span class="result-label">Federācija:</span>
                        <span class="result-value">${federation}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Svara kategorija:</span>
                        <span class="result-value">${userCategory}</span>
                    </div>`;


                if (normResult) {
                    if (normResult.norm.startsWith("Zem")) {
                        resultsHtml += `
                            <div class="result-item">
                                <span class="result-label">Sasniegtais normatīvs:</span>
                                <span class="result-value"><span class="badge bg-secondary badge-norm">Zem ${normResult.nextNorm}</span></span>
                            </div>`;
                        const weightNeeded = normResult.nextValue - comparisonRM;
                        resultsHtml += `
                            <div class="result-item">
                                <span class="result-label">Līdz ${normResult.nextNorm}:</span>
                                <span class="result-value"><span class="badge bg-warning text-dark">${weightNeeded.toFixed(2)} kg</span> (Nepieciešami ${normResult.nextValue} kg)</span>
                            </div>`;
                        achievedNormForSpecificFed = null;
                    } else {
                        resultsHtml += `
                            <div class="result-item">
                                <span class="result-label">Sasniegtais normatīvs:</span>
                                <span class="result-value"><span class="badge bg-success badge-norm">${normResult.norm}</span> (${normResult.value} kg)</span>
                            </div>`;
                        achievedNormForSpecificFed = normResult.norm;

                        if (normResult.nextNorm) {
                            const weightNeeded = normResult.nextValue - comparisonRM;
                            resultsHtml += `
                                <div class="result-item">
                                    <span class="result-label">Līdz ${normResult.nextNorm}:</span>
                                    <span class="result-value"><span class="badge bg-info text-dark">${weightNeeded.toFixed(2)} kg</span> (Nepieciešami ${normResult.nextValue} kg)</span>
                                </div>`;
                        } else {
                            resultsHtml += `
                                <div class="result-item">
                                    <span class="result-label">Nākamais normatīvs:</span>
                                    <span class="result-value">Augstākais līmenis sasniegts!</span>
                                </div>`;
                        }
                    }
                    $('#normAchieved').html(resultsHtml);
                } else {
                    resultsHtml += `<div class="alert alert-warning mt-3">Nevar noteikt normatīva līmeni izvēlētajai federācijai un svara kategorijai.</div>`;
                    $('#normAchieved').html(resultsHtml);
                    achievedNormForSpecificFed = null;
                }
            } else {
                let errorHtml = `
                    <div class="result-item">
                        <span class="result-label">Aprēķinātais 1RM:</span>
                        <span class="result-value"><span class="badge bg-primary">${oneRM.toFixed(2)} kg</span></span>
                    </div>`;
                if (federation) {
                    errorHtml += `
                        <div class="result-item">
                            <span class="result-label">Federācija:</span>
                            <span class="result-value">${federation}</span>
                        </div>`;
                }
                errorHtml += `<div class="alert alert-warning mt-3">Nevar noteikt normatīvu līmeni. Iespējams, trūkst datu izvēlētajai federācijai vai svara kategorijai.</div>`;
                $('#normAchieved').html(errorHtml);
                achievedNormForSpecificFed = null;
            }
        } else {
            $('#normAchieved').html(`
                <div class="result-item">
                    <span class="result-label">Aprēķinātais 1RM:</span>
                    <span class="result-value"><span class="badge bg-primary">${oneRM.toFixed(2)} kg</span></span>
                </div>
                <div class="alert alert-info mt-3">Izvēlieties konkrētu federāciju vai skatiet "Visu federāciju normatīvus" zemāk, lai redzētu sasniegtus līmeņus un detalizētus normatīvu salīdzinājumus.</div>
            `);
            achievedNormForSpecificFed = null;
        }

    } else {
        $('#oneRMSection').hide();
        $('#normAchieved').empty();
        achievedNormForSpecificFed = null;
    }

    if (userCategory && federation) {
        const specificFedCsvData = getCurrentCSVData();
        if (specificFedCsvData) {
            displayCategoryRow(specificFedCsvData, '#categoryResults', userCategory, federation, achievedNormForSpecificFed);
            $('#categoryResultsSection').show();
        } else {
            $('#categoryResultsSection').hide();
        }
        $('#allFederationsSection').hide();
    } else if (userCategory && !federation) {
        displayAllFederations(bodyWeight, exercise, oneRM);
        $('#categoryResultsSection').hide();
    } else {
        $('#categoryResultsSection').hide();
        $('#allFederationsSection').hide();
        if (!userCategory && (workingWeight > 0 && repetitions > 0)) {
            if ($('#normAchieved').children('.alert').length === 0) {
                $('#normAchieved').append('<div class="alert alert-warning mt-3">Nevar atrast atbilstošu svara kategoriju izvēlētajos normatīvu datos.</div>');
            }
        } else if (!userCategory) {
            $('#oneRMSection').hide();
        }
    }
}

function initNormCalculator() {
    const html = `
        <div class="card mb-4">
            <div class="card-header bg-primary text-white">
                <h4 class="m-0">Ievadiet savu informāciju</h4>
            </div>
            <div class="card-body">
                <form id="liftingForm">
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label for="bodyWeight" class="form-label">Ķermeņa svars (kg)</label>
                            <input type="number" class="form-control auto-calculate" id="bodyWeight" step="0.1" min="30" max="200" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="exerciseType" class="form-label">Vingrinājums</label>
                            <select class="form-select auto-calculate" id="exerciseType" required>
                                <option value="" selected disabled>Izvēlieties vingrinājumu</option>
                                <option value="benchPress">Spiešana guļus</option>
                                <option value="squat">Pietupieni</option>
                                <option value="deadlift">Vilkme</option>
                                <option value="bicepsCurl">Bicepsu saliekšana</option>
                                <option value="weightedPullUp">Pievilkšanās ar svaru</option>
                                <option value="weightedDip">Atspiedieni uz līdztekas ar svaru</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <div class="form-check form-switch mb-2">
                                <input class="form-check-input auto-calculate" type="checkbox" id="drugTested" checked>
                                <label class="form-check-label" for="drugTested">Dopinga kontrole federācijas</label>
                            </div>
                            <select class="form-select auto-calculate" id="federation">
                                <option value="">Visas federācijas</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="row mt-3">
                        <div class="col-12">
                            <h5>1RM Kalkulators</h5>
                            <p class="text-muted small">Ievadiet savu darba svaru un atkārtojumu skaitu, lai aprēķinātu aptuveno 1RM.</p>
                            <p class="text-muted small">Ja vēlaties noteikt 1RM vingrinājumam, kur ir svarīgs atlēta ķermeņa svars, pareizam aprēķinam pieskaitiet savu svaru slodzes svaram.</p>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="workingWeight" class="form-label">Darba svars (kg)</label>
                            <input type="number" class="form-control auto-calculate" id="workingWeight" step="0.5" min="0">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="repetitions" class="form-label">Atkārtojumi</label>
                            <input type="number" class="form-control auto-calculate" id="repetitions" min="1" max="50">
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6 mb-4" id="oneRMSection" style="display: none;">
                <div class="card h-100">
                    <div class="card-header bg-success text-white">
                        <h4 class="m-0">Jūsu 1RM rezultāti</h4>
                    </div>
                    <div class="card-body">
                        <div id="normAchieved" class="mt-3"></div>
                    </div>
                </div>
            </div>

            <div class="col-lg-6 mb-4" id="categoryResultsSection" style="display: none;">
                <div class="card h-100">
                    <div class="card-header bg-dark text-white">
                        <h4 class="m-0">Jūsu svara kategorijas normatīvi</h4>
                    </div>
                    <div class="card-body">
                        <div id="categoryResults" class="overflow-auto"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="allFederationsSection" style="display: none;">
            <div class="card mb-4">
                <div class="card-header bg-info text-white">
                    <h4 class="m-0">Visu federāciju normatīvi jūsu svara kategorijai</h4>
                </div>
                <div class="card-body">
                    <div id="allFederationsResults"></div>
                </div>
            </div>
        </div>
    `;

    $('#normCalculatorContent').html(html);
    
    $('.auto-calculate').on('input change', function() {
        performCalculations();
    });

    $('#drugTested').on('change', function() {
        const isChecked = $(this).prop('checked');
        $('#tableDrugTested').prop('checked', isChecked);
        updateFederationSelectors();
        performCalculations();
    });

    $('#exerciseType').on('change', function() {
        const newExercise = $(this).val();
        $('#tableExercise').val(newExercise);
        updateDrugTestSwitchVisibility();
        updateFederationSelectors();
        performCalculations();
    });

    $('#federation').on('change', function() {
        const newFederation = $(this).val();
        $('#tableFederation').val(newFederation);
        performCalculations();
    });
}
