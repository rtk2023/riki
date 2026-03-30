// Main application initialization and coordination

let normData = NORMS;

$(document).ready(function() {
    initNormCalculator();
    initCalorieCalculator();
    initTables();
    
    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        if ($(e.target).attr('id') === 'tables-tab') {
            const exercise = $('#tableExercise').val();
            checkDrugTestSwitchVisibility(exercise, 'tables');
            updateTableFederationSelector();
            updateFullTable();
        } else if ($(e.target).attr('id') === 'norm-calculator-tab') {
            const exercise = $('#exerciseType').val();
            checkDrugTestSwitchVisibility(exercise, 'calculator');
            updateFederationSelectors();
            performCalculations();
        } else if ($(e.target).attr('id') === 'calory-calculator-tab') {
            performCalorieCalculations();
        }
    });
    
    const initialExercise = $('#exerciseType').val();
    checkDrugTestSwitchVisibility(initialExercise, 'calculator');
    updateFederationSelectors();
    performCalculations();
});
