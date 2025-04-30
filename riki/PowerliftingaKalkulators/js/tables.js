// Tables Tab functionality

function initTables() {
    const html = `
        <div class="card">
            <div class="card-header bg-dark text-white">
                <div class="row align-items-center">
                    <div class="col">
                        <h4 class="m-0">Pilnas normatīvu tabulas</h4>
                    </div>
                    <div class="col-auto">
                        <div class="d-flex flex-wrap">
                            <div class="form-check form-switch me-3 mt-1">
                                <input class="form-check-input" type="checkbox" id="tableDrugTested" checked>
                                <label class="form-check-label" for="tableDrugTested">Ar dopinga kontroli</label>
                            </div>
                            <select class="form-select me-2 mb-1" id="tableExercise">
                                <option value="benchPress">Spiešana guļus</option>
                                <option value="squat">Pietupieni</option>
                                <option value="deadlift">Vilkme</option>
                                <option value="bicepsCurl">Bicepsu saliekšana</option>
                                <option value="weightedPullUp">Pievilkšanās ar svaru</option>
                                <option value="weightedDip">Atspiedieni uz līdztekas ar svaru</option>
                            </select>
                            <select class="form-select mb-1" id="tableFederation">
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div id="fullNormTable" class="table-responsive"></div>
            </div>
        </div>
    `;

    $('#tablesContent').html(html);
    
    $('#tableDrugTested').on('change', function() {
        const isChecked = $(this).prop('checked');
        $('#drugTested').prop('checked', isChecked);
        updateFederationSelectors();
        updateTableFederationSelector();
        updateFullTable();
    });

    $('#tableExercise').on('change', function() {
        const newExercise = $(this).val();
        $('#exerciseType').val(newExercise);
        checkDrugTestSwitchVisibility(newExercise, 'tables');
        updateFederationSelectors();
        updateTableFederationSelector();
        updateFullTable();
    });

    $('#tableFederation').on('change', function() {
        const newFederation = $(this).val();
        $('#federation').val(newFederation);
        updateFullTable();
    });
    
    updateTableFederationSelector();
    
    const initialExercise = $('#tableExercise').val();
    checkDrugTestSwitchVisibility(initialExercise, 'tables');
}

function updateTableFederationSelector() {
    const exercise = $('#tableExercise').val();
    const drugTestSwitch = $('#tableDrugTested');
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

    const tableSelector = $('#tableFederation');
    const currentTableValue = tableSelector.val();
    tableSelector.find('option').remove();
    tableSelector.append($('<option>').val('').text('Visas federācijas'));
    federations.forEach(fed => {
        tableSelector.append($('<option>').val(fed).text(fed));
    });
    
    const normCalcValue = $('#federation').val();
    if (normCalcValue && federations.includes(normCalcValue)) {
        tableSelector.val(normCalcValue);
    } else if (currentTableValue && federations.includes(currentTableValue)) {
        tableSelector.val(currentTableValue);
    } else {
        tableSelector.val('');
    }
}

function updateFullTable() {
    const exercise = $('#tableExercise').val();
    const selectedFederation = $('#tableFederation').val();
    const drugTestSwitch = $('#tableDrugTested');
    const isDrugTestedSelected = drugTestSwitch.prop('checked');
    const bodyWeight = parseFloat($('#bodyWeight').val());

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
        $('#fullNormTable').html('<div class="alert alert-warning">Nav pieejami dati izvēlētajam vingrojumam un dopinga testēšanas statusam.</div>');
        return;
    }

    if (!exercise || !normData[drugTestStatus] || !normData[drugTestStatus][exercise]) {
        $('#fullNormTable').html('<div class="alert alert-warning">Nav pieejami dati izvēlētajām opcijām.</div>');
        return;
    }

    let oneRM = null;
    const workingWeight = parseFloat($('#workingWeight').val()) || 0;
    const repetitions = parseInt($('#repetitions').val()) || 0;
    if (workingWeight > 0 && repetitions > 0) {
        oneRM = calculate1RM(workingWeight, repetitions);
    }

    const targetElement = $('#fullNormTable');
    targetElement.empty();

    const federationsToShow = selectedFederation ? [selectedFederation] : Object.keys(normData[drugTestStatus][exercise]);

    if (federationsToShow.length === 0 || (selectedFederation && !normData[drugTestStatus][exercise][selectedFederation])) {
        targetElement.html('<div class="alert alert-warning">Nav pieejami dati izvēlētajai federācijai.</div>');
        return;
    }

    let hasDisplayedTable = false;

    for (const federation of federationsToShow) {
        const csvData = normData[drugTestStatus][exercise][federation];
        if (!csvData) continue;

        if (!selectedFederation) {
            targetElement.append($(`<h4 class="mt-4 mb-3 text-center">${federation}</h4>`));
        }

        let userCategory = null;
        let achievedNorm = null;
        if (!isNaN(bodyWeight)) {
            userCategory = findWeightCategory(bodyWeight, csvData);
            if (oneRM !== null && userCategory) {
                const normResult = determineNormLevel(oneRM, csvData, userCategory, exercise, bodyWeight);
                if (normResult && !normResult.norm.startsWith("Zem")) {
                    achievedNorm = normResult.norm;
                }
            }
        }

        const tableContainerId = `table-container-${federation.replace(/\s+/g, '-')}`;
        const tableContainer = selectedFederation ? targetElement : $(`<div id="${tableContainerId}"></div>`).appendTo(targetElement);

        csvToTable(csvData, selectedFederation ? targetElement : `#${tableContainerId}`, userCategory, achievedNorm);
        hasDisplayedTable = true;
    }

    if (!hasDisplayedTable) {
        targetElement.html('<div class="alert alert-warning">Nav pieejami dati izvēlētajām opcijām.</div>');
    }
}
