// Calorie Calculator Tab functionality

let weightChart = null;

function initCalorieCalculator() {
    const html = `
        <div class="row">
            <div class="col-lg-6 mb-4">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h4 class="m-0">Personīgā informācija</h4>
                    </div>
                    <div class="card-body">
                        <form id="calorieForm">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="gender" class="form-label">Dzimums</label>
                                    <select class="form-select calorie-calculate" id="gender" required>
                                        <option value="male">Vīrietis</option>
                                        <option value="female">Sieviete</option>
                                    </select>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="age" class="form-label">Vecums</label>
                                    <input type="number" class="form-control calorie-calculate" id="age" min="12" max="100" required>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="calorieWeight" class="form-label">Pašreizējais svars (kg)</label>
                                    <input type="number" class="form-control calorie-calculate" id="calorieWeight" step="0.1" min="30" max="250" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="height" class="form-label">Augums (cm)</label>
                                    <input type="number" class="form-control calorie-calculate" id="height" min="100" max="250" required>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="activityLevel" class="form-label">Aktivitātes līmenis</label>
                                <select class="form-select calorie-calculate" id="activityLevel" required>
                                    <option value="1.2">Mazkustīgs (maz vai nemaz nekustas)</option>
                                    <option value="1.375" selected>Viegli aktīvs (viegla slodze 1-3 dienas/nedēļā)</option>
                                    <option value="1.55">Vidēji aktīvs (vidēja slodze 3-5 dienas/nedēļā)</option>
                                    <option value="1.725">Ļoti aktīvs (smaga slodze 6-7 dienas/nedēļā)</option>
                                    <option value="1.9">Ārkārtīgi aktīvs (ļoti smaga slodze & fizisks darbs)</option>
                                </select>
                            </div>
                            
                            <div class="mb-3">
                                <label for="goalType" class="form-label">Mērķa tips</label>
                                <select class="form-select calorie-calculate" id="goalType" required>
                                    <option value="weight">Konkrēts svars</option>
                                    <option value="category">Svara kategorija</option>
                                </select>
                            </div>
                            
                            <div id="specificWeightGoal">
                                <div class="mb-3">
                                    <label for="targetWeight" class="form-label">Mērķa svars (kg)</label>
                                    <input type="number" class="form-control calorie-calculate" id="targetWeight" step="0.1" min="30" max="250">
                                </div>
                            </div>
                            
                            <div id="categoryWeightGoal" style="display:none;">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label for="categoryExercise" class="form-label">Vingrinājums</label>
                                        <select class="form-select calorie-calculate" id="categoryExercise">
                                            <option value="benchPress">Spiešana guļus</option>
                                            <option value="squat">Pietupieni</option>
                                            <option value="deadlift">Vilkme</option>
                                            <option value="bicepsCurl">Bicepsu saliekšana</option>
                                            <option value="weightedPullUp">Pievilkšanās ar svaru</option>
                                            <option value="weightedDip">Atspiedieni uz līdztekas ar svaru</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="categoryFederation" class="form-label">Federācija</label>
                                        <select class="form-select calorie-calculate" id="categoryFederation"></select>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Virziens</label>
                                    <div class="form-check">
                                        <input class="form-check-input calorie-calculate" type="radio" name="categoryDirection" id="categoryUp" value="up" checked>
                                        <label class="form-check-label" for="categoryUp">
                                            Pāriet uz iepriekšējo kategoriju
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input calorie-calculate" type="radio" name="categoryDirection" id="categoryDown" value="down">
                                        <label class="form-check-label" for="categoryDown">
                                            Pāriet uz nākamo kategoriju
                                        </label>
                                    </div>
                                </div>
                                <div id="targetCategoryDisplay" class="alert alert-info">
                                    Izvēlieties opcijas, lai redzētu mērķa svara kategoriju
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label class="form-label">Ikdienas kaloriju pielāgojums</label>
                                <div class="input-group">
                                    <span class="input-group-text">±</span>
                                    <input type="number" class="form-control calorie-calculate" id="calorieAdjustment" value="500" min="0" max="1500" step="50">
                                    <span class="input-group-text">kalorijas</span>
                                </div>
                                <small class="form-text text-muted">Ieteicams: 250-750 pakāpeniskām izmaiņām, 500-1000 ātrākiem rezultātiem</small>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-6 mb-4">
                <div class="card mb-4">
                    <div class="card-header bg-success text-white">
                        <h4 class="m-0">Jūsu kaloriju prasības</h4>
                    </div>
                    <div class="card-body">
                        <div id="calorieResults">
                            <div class="alert alert-info">
                                Ievadiet savu informāciju, lai redzētu kaloriju prasības
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card" id="weightPredictionCard" style="display:none;">
                    <div class="card-header bg-dark text-white">
                        <h4 class="m-0">Svara izmaiņu prognoze</h4>
                    </div>
                    <div class="card-body">
                        <div id="weightPredictionResults"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card mb-4" id="timelineCard" style="display:none;">
            <div class="card-header bg-info text-white">
                <h4 class="m-0">Jūsu svara izmaiņu laika grafiks</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-8">
                        <canvas id="weightProgressChart"></canvas>
                    </div>
                    <div class="col-lg-4">
                        <div id="timelineMilestones" class="mt-3"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card mb-4" id="weightCategoriesCard" style="display:none;">
            <div class="card-header bg-secondary text-white">
                <h4 class="m-0">Svara kategoriju atsauce</h4>
            </div>
            <div class="card-body">
                <div id="weightCategoriesReference"></div>
            </div>
        </div>
    `;

    $('#caloryCalculatorContent').html(html);
    
    $('.calorie-calculate').on('input change', function() {
        performCalorieCalculations();
    });

    $('#goalType').on('change', function() {
        const goalType = $(this).val();
        if (goalType === 'weight') {
            $('#specificWeightGoal').show();
            $('#categoryWeightGoal').hide();
        } else {
            $('#specificWeightGoal').hide();
            $('#categoryWeightGoal').show();
            updateCategoryFederations();
        }
        performCalorieCalculations();
    });

    $('#categoryExercise').on('change', function() {
        updateCategoryFederations();
    });

    $('#bodyWeight').on('input', function() {
        const newWeight = $(this).val();
        $('#calorieWeight').val(newWeight);
        if ($('#calory-calculator-tab').hasClass('active')) {
            performCalorieCalculations();
        }
    });

    $('#calorieWeight').on('input', function() {
        const newWeight = $(this).val();
        $('#bodyWeight').val(newWeight);
        if ($('#norm-calculator-tab').hasClass('active')) {
            performCalculations();
        }
    });
}

function calculateBMR(gender, weight, height, age) {
    if (gender === 'male') {
        return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
}

function calculateTDEE(bmr, activityLevel) {
    return bmr * activityLevel;
}

function getDailyCalories(tdee, goal, adjustment) {
    if (goal === 'gain') {
        return tdee + adjustment;
    } else if (goal === 'lose') {
        return tdee - adjustment;
    }
    return tdee;
}

function getWeightChangeTimeEstimate(currentWeight, targetWeight, calorieAdjustment) {
    const weightDifference = Math.abs(targetWeight - currentWeight);
    const totalCaloriesNeeded = weightDifference * 7700;
    const daysNeeded = Math.ceil(totalCaloriesNeeded / calorieAdjustment);
    return daysNeeded;
}

function getAdjacentWeightCategory(currentWeight, csvString, direction) {
    if (!csvString) return null;
    
    try {
        const rows = csvString.trim().split('\n');
        const headers = rows[0].split(',').map(h => h.trim());
        const weightCategoryIndex = headers.findIndex(h => h.toLowerCase().includes('weight'));
        
        if (weightCategoryIndex === -1) return null;
        
        const categories = [];
        for (let i = 1; i < rows.length; i++) {
            const rowData = rows[i].split(',').map(d => d.trim());
            const category = rowData[weightCategoryIndex];
            if (category) {
                categories.push(category);
            }
        }
        
        const categoryValues = categories.map(cat => {
            const match = cat.match(/^(\d+(\.\d+)?)/);
            return match ? parseFloat(match[1]) : 999;
        });
        
        let currentCategoryIndex = -1;
        for (let i = 0; i < categoryValues.length; i++) {
            if (currentWeight <= categoryValues[i]) {
                currentCategoryIndex = i;
                break;
            }
        }
        
        if (currentCategoryIndex === -1) {
            currentCategoryIndex = categoryValues.length - 1;
        }
        
        let targetCategory, targetWeight;
        if (direction === 'up') {
            if (currentCategoryIndex > 0) {
                targetCategory = categories[currentCategoryIndex - 1];
                const match = targetCategory.match(/^(\d+(\.\d+)?)/);
                targetWeight = match ? parseFloat(match[1]) : null;
            } else {
                return null;
            }
        } else {
            if (currentCategoryIndex < categories.length - 1) {
                targetCategory = categories[currentCategoryIndex + 1];
                const currentCatThreshold = categoryValues[currentCategoryIndex];
                targetWeight = currentCatThreshold - 0.1;
            } else {
                return null;
            }
        }
        
        return {
            category: targetCategory,
            weight: targetWeight,
            currentCategory: categories[currentCategoryIndex]
        };
        
    } catch (error) {
        console.error('Kļūda meklējot blakus esošu svara kategoriju:', error);
        return null;
    }
}

function generateWeightMilestones(startWeight, endWeight, totalDays) {
    const milestones = [];
    const weightDifference = endWeight - startWeight;
    const isGaining = weightDifference > 0;
    const totalChange = Math.abs(weightDifference);
    
    milestones.push({
        day: 0,
        weight: startWeight,
        description: "Sākuma punkts"
    });
    
    milestones.push({
        day: Math.round(totalDays * 0.25),
        weight: startWeight + (weightDifference * 0.25),
        description: "25% progress"
    });
    
    milestones.push({
        day: Math.round(totalDays * 0.5),
        weight: startWeight + (weightDifference * 0.5),
        description: "Pusceļš"
    });
    
    milestones.push({
        day: Math.round(totalDays * 0.75),
        weight: startWeight + (weightDifference * 0.75),
        description: "75% progress"
    });
    
    milestones.push({
        day: totalDays,
        weight: endWeight,
        description: "Mērķis sasniegts!"
    });
    
    return milestones;
}

function createWeightChart(milestones) {
    if (weightChart) {
        weightChart.destroy();
    }
    
    const ctx = document.getElementById('weightProgressChart').getContext('2d');
    
    const labels = milestones.map(m => `Diena ${m.day}`);
    const data = milestones.map(m => m.weight);
    
    weightChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Prognozētais svars (kg)',
                data: data,
                borderColor: '#0d6efd',
                backgroundColor: 'rgba(13, 110, 253, 0.1)',
                fill: true,
                tension: 0.3,
                pointRadius: 5,
                pointBackgroundColor: '#0d6efd'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Svars (kg)'
                    },
                    ticks: {
                        precision: 1
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Laika grafiks'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Svars: ${context.parsed.y.toFixed(1)} kg`;
                        },
                        title: function(context) {
                            const index = context[0].dataIndex;
                            return `Diena ${milestones[index].day}: ${milestones[index].description}`;
                        }
                    }
                }
            }
        }
    });
}

function renderTimelineMilestones(milestones) {
    const container = document.getElementById('timelineMilestones');
    container.innerHTML = '<h5 class="mb-3">Galvenie atskaites punkti</h5>';
    
    const timeline = document.createElement('div');
    timeline.className = 'timeline';
    
    milestones.forEach((milestone, index) => {
        const point = document.createElement('div');
        point.className = 'timeline-point';
        
        const title = document.createElement('h6');
        title.className = 'mb-1';
        title.textContent = milestone.description;
        
        const details = document.createElement('div');
        details.className = 'small text-muted';
        details.innerHTML = `
            Diena ${milestone.day}: ${formatTimePeriod(milestone.day)}<br>
            Prognozētais svars: <strong>${milestone.weight.toFixed(1)} kg</strong>
        `;
        
        point.appendChild(title);
        point.appendChild(details);
        timeline.appendChild(point);
    });
    
    container.appendChild(timeline);
}

function updateCategoryFederations() {
    const exercise = $('#categoryExercise').val();
    
    let drugTestStatus;
    const existsInDrugTest = normData.drugTest && normData.drugTest[exercise];
    const existsInNoDrugTest = normData.noDrugTest && normData.noDrugTest[exercise];
    
    if (existsInDrugTest) {
        drugTestStatus = 'drugTest';
    } else if (existsInNoDrugTest) {
        drugTestStatus = 'noDrugTest';
    } else {
        return;
    }
    
    let federations = [];
    if (exercise && normData[drugTestStatus] && normData[drugTestStatus][exercise]) {
        federations = Object.keys(normData[drugTestStatus][exercise]);
    }
    
    const federationSelector = $('#categoryFederation');
    federationSelector.empty();
    federations.forEach(fed => {
        federationSelector.append($('<option>').val(fed).text(fed));
    });
    
    if ($('#calorieWeight').val() && $('#height').val() && $('#age').val()) {
        performCalorieCalculations();
    }
}

function performCalorieCalculations() {
    const gender = $('#gender').val();
    const age = parseInt($('#age').val()) || 0;
    const currentWeight = parseFloat($('#calorieWeight').val()) || 0;
    const height = parseInt($('#height').val()) || 0;
    const activityLevel = parseFloat($('#activityLevel').val()) || 1.2;
    const calorieAdjustment = parseInt($('#calorieAdjustment').val()) || 500;
    const goalType = $('#goalType').val();
    
    if (age < 12 || currentWeight < 30 || height < 100) {
        $('#calorieResults').html('<div class="alert alert-warning">Lūdzu, aizpildiet visus nepieciešamos laukus ar derīgām vērtībām.</div>');
        $('#weightPredictionCard').hide();
        $('#timelineCard').hide();
        $('#weightCategoriesCard').hide();
        return;
    }
    
    const bmr = calculateBMR(gender, currentWeight, height, age);
    const tdee = calculateTDEE(bmr, activityLevel);
    
    let targetWeight, weightGoal, weightDiff, goalDirection, daysNeeded;
    let categoryInfo = null;
    
    if (goalType === 'weight') {
        targetWeight = parseFloat($('#targetWeight').val());
        if (isNaN(targetWeight) || targetWeight <= 0) {
            $('#calorieResults').html('<div class="alert alert-warning">Lūdzu, ievadiet derīgu mērķa svaru.</div>');
            $('#weightPredictionCard').hide();
            $('#timelineCard').hide();
            $('#weightCategoriesCard').hide();
            return;
        }
        
        weightDiff = targetWeight - currentWeight;
        goalDirection = weightDiff > 0 ? 'gain' : 'lose';
    } else if (goalType === 'category') {
        const categoryExercise = $('#categoryExercise').val();
        const categoryFederation = $('#categoryFederation').val();
        const direction = $('input[name="categoryDirection"]:checked').val();
        
        if (!categoryExercise || !categoryFederation) {
            $('#calorieResults').html('<div class="alert alert-warning">Lūdzu, izvēlieties vingrojumu un federāciju svara kategorijas mērķim.</div>');
            $('#weightPredictionCard').hide();
            $('#timelineCard').hide();
            $('#weightCategoriesCard').hide();
            return;
        }
        
        let drugTestStatus;
        const existsInDrugTest = normData.drugTest && normData.drugTest[categoryExercise];
        const existsInNoDrugTest = normData.noDrugTest && normData.noDrugTest[categoryExercise];
        
        if (existsInDrugTest) {
            drugTestStatus = 'drugTest';
        } else if (existsInNoDrugTest) {
            drugTestStatus = 'noDrugTest';
        } else {
            $('#calorieResults').html('<div class="alert alert-warning">Nav pieejami normatīvu dati izvēlētajam vingrojumam.</div>');
            $('#weightPredictionCard').hide();
            $('#timelineCard').hide();
            $('#weightCategoriesCard').hide();
            return;
        }
        
        const csvData = normData[drugTestStatus][categoryExercise][categoryFederation];
        if (!csvData) {
            $('#calorieResults').html('<div class="alert alert-warning">Nav pieejami normatīvu dati izvēlētajai federācijai.</div>');
            $('#weightPredictionCard').hide();
            $('#timelineCard').hide();
            $('#weightCategoriesCard').hide();
            return;
        }
        
        categoryInfo = getAdjacentWeightCategory(currentWeight, csvData, direction);
        
        if (!categoryInfo || categoryInfo.weight === null) {
            $('#calorieResults').html('<div class="alert alert-warning">Nevar noteikt ' + (direction === 'up' ? 'augstāko' : 'zemāko') + ' svara kategoriju. Iespējams, jūs jau esat ' + (direction === 'up' ? 'augstākajā' : 'zemākajā') + ' kategorijā.</div>');
            $('#weightPredictionCard').hide();
            $('#timelineCard').hide();
            $('#weightCategoriesCard').hide();
            return;
        }
        
        targetWeight = categoryInfo.weight;
        weightDiff = targetWeight - currentWeight;
        goalDirection = weightDiff > 0 ? 'gain' : 'lose';
        
        $('#targetCategoryDisplay').html(`
            <strong>Pašreizējā kategorija:</strong> ${categoryInfo.currentCategory}<br>
            <strong>Mērķa kategorija:</strong> ${categoryInfo.category}<br>
            <strong>Mērķa svars:</strong> ${targetWeight.toFixed(1)} kg (${Math.abs(weightDiff).toFixed(1)} kg līdz ${goalDirection === 'gain' ? 'pieņemšanai' : 'zaudēšanai'})
        `);
    }
    
    const maintenanceCalories = Math.round(tdee);
    const goalCalories = Math.round(getDailyCalories(tdee, goalDirection, calorieAdjustment));
    
    daysNeeded = getWeightChangeTimeEstimate(currentWeight, targetWeight, calorieAdjustment);
    
    let resultsHtml = `
        <div class="result-item">
            <span class="result-label">Bazālais metaboliskais ātrums (BMR):</span>
            <span class="result-value"><span class="badge bg-secondary">${Math.round(bmr)} kalorijas</span></span>
        </div>
        <div class="result-item">
            <span class="result-label">Uzturošās kalorijas:</span>
            <span class="result-value"><span class="badge bg-primary">${maintenanceCalories} kalorijas</span></span>
        </div>
        <div class="result-item">
            <span class="result-label">Mērķis:</span>
            <span class="result-value"><span class="badge ${goalDirection === 'gain' ? 'bg-success' : 'bg-warning text-dark'}">${goalDirection === 'gain' ? 'Svara pieņemšana' : 'Svara zaudēšana'}</span></span>
        </div>
        <div class="result-item">
            <span class="result-label">Dienas kaloriju mērķis:</span>
            <span class="result-value"><span class="badge bg-danger">${goalCalories} kalorijas</span></span>
        </div>
        <div class="result-item">
            <span class="result-label">Kaloriju ${goalDirection === 'gain' ? 'pārpalikums' : 'deficīts'}:</span>
            <span class="result-value"><span class="badge bg-info text-dark">${calorieAdjustment} kalorijas</span></span>
        </div>
    `;
    
    $('#calorieResults').html(resultsHtml);
    
    let predictionHtml = `
        <div class="result-item">
            <span class="result-label">Pašreizējais svars:</span>
            <span class="result-value">${currentWeight.toFixed(1)} kg</span>
        </div>
        <div class="result-item">
            <span class="result-label">Mērķa svars:</span>
            <span class="result-value">${targetWeight.toFixed(1)} kg</span>
        </div>
        <div class="result-item">
            <span class="result-label">Svars, ko ${goalDirection === 'gain' ? 'pieņemt' : 'zaudēt'}:</span>
            <span class="result-value"><strong>${Math.abs(weightDiff).toFixed(1)} kg</strong></span>
        </div>
        <div class="result-item">
            <span class="result-label">Novērtētais laiks līdz mērķim:</span>
            <span class="result-value"><strong>${formatTimePeriod(daysNeeded)}</strong></span>
        </div>
    `;
    
    if (categoryInfo) {
        predictionHtml += `
            <div class="result-item">
                <span class="result-label">Svara kategorijas maiņa:</span>
                <span class="result-value">No ${categoryInfo.currentCategory} līdz ${categoryInfo.category}</span>
            </div>
        `;
    }
    
    $('#weightPredictionResults').html(predictionHtml);
    $('#weightPredictionCard').show();
    
    const milestones = generateWeightMilestones(currentWeight, targetWeight, daysNeeded);
    createWeightChart(milestones);
    renderTimelineMilestones(milestones);
    $('#timelineCard').show();
    
    if (goalType === 'category') {
        const categoryExercise = $('#categoryExercise').val();
        const categoryFederation = $('#categoryFederation').val();
        
        let drugTestStatus;
        const existsInDrugTest = normData.drugTest && normData.drugTest[categoryExercise];
        const existsInNoDrugTest = normData.noDrugTest && normData.noDrugTest[categoryExercise];
        
        if (existsInDrugTest) {
            drugTestStatus = 'drugTest';
        } else if (existsInNoDrugTest) {
            drugTestStatus = 'noDrugTest';
        }
        
        const csvData = normData[drugTestStatus][categoryExercise][categoryFederation];
        if (csvData) {
            csvToTable(csvData, '#weightCategoriesReference', categoryInfo ? categoryInfo.currentCategory : null);
            $('#weightCategoriesCard').show();
        } else {
            $('#weightCategoriesCard').hide();
        }
    } else {
        $('#weightCategoriesCard').hide();
    }
}
