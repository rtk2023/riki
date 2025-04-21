// Common utility functions used across multiple tabs

function csvToTable(csvString, targetElement, highlightRow = null, achievedNorm = null) {
    if (!csvString || csvString.trim() === '') {
        $(targetElement).html('<div class="alert alert-warning">Nav pieejamu datu</div>');
        return null;
    }

    try {
        const rows = csvString.trim().split('\n');
        const headers = rows[0].split(',').map(h => h.trim());
        const data = [];
        
        const table = $('<table class="table table-striped table-hover table-bordered">');
        const thead = $('<thead class="table-dark">');
        const tbody = $('<tbody>');
        
        const headerRow = $('<tr>');
        headers.forEach(header => {
            headerRow.append($('<th>').text(header));
        });
        thead.append(headerRow);
        
        for (let i = 1; i < rows.length; i++) {
            const rowData = rows[i].split(',').map(d => d.trim());
            const row = $('<tr>');
            
            const rowObj = {};
            
            rowData.forEach((cell, index) => {
                const cellElement = $('<td>').text(cell);
                if (achievedNorm && headers[index] === achievedNorm) {
                    cellElement.addClass('table-success');
                }
                row.append(cellElement);
                rowObj[headers[index]] = cell;
            });
            
            if (highlightRow !== null && highlightRow === rowObj['Weight category']) {
                row.addClass('table-primary');
            }
            
            tbody.append(row);
            data.push(rowObj);
        }
        
        table.append(thead).append(tbody);
        $(targetElement).html(table);
        
        return data;
    } catch (error) {
        console.error('Kļūda datu parsēšanā:', error);
        $(targetElement).html('<div class="alert alert-danger">Kļūda datu parsēšanā: ' + error.message + '</div>');
        return null;
    }
}

function displayCategoryRow(csvString, targetElement, weightCategory, federation = null, achievedNorm = null) {
    if (!csvString || csvString.trim() === '') {
        $(targetElement).html('<div class="alert alert-warning">Nav pieejamu datu</div>');
        return null;
    }

    try {
        const rows = csvString.trim().split('\n');
        const headers = rows[0].split(',').map(h => h.trim());
        
        let matchedRow = null;
        let rowData = null;
        
        for (let i = 1; i < rows.length; i++) {
            const currentRowData = rows[i].split(',').map(d => d.trim());
            const rowObj = {};
            
            headers.forEach((header, index) => {
                rowObj[header] = currentRowData[index];
            });
            
            if (rowObj['Weight category'] === weightCategory) {
                matchedRow = rowObj;
                rowData = currentRowData;
                break;
            }
        }
        
        if (matchedRow) {
            const resultDiv = $('<div>');

            if (federation) {
                resultDiv.append($('<h5>').text(`Federācija: ${federation}`));
            }
            
            resultDiv.append($('<h5>').text(`Jūsu svara kategorija: ${weightCategory}`));
        
            const normsDiv = $('<div class="d-flex justify-content-between flex-wrap mt-3">');
            
            for (let i = 1; i < headers.length; i++) {
                const isAchievedNorm = achievedNorm && headers[i] === achievedNorm;
                
                const cardClass = isAchievedNorm ? 'bg-success text-white' : 'bg-secondary text-white';
                const bodyClass = isAchievedNorm ? 'bg-light-success' : '';
                
                const normCard = $(`
                    <div class="card mb-2 norm-card" style="min-width: 120px;">
                        <div class="card-header py-1 px-2 text-center ${cardClass}">
                            <strong>${headers[i]}</strong>
                        </div>
                        <div class="card-body py-2 px-3 text-center ${bodyClass}" ${isAchievedNorm ? 'style="background-color: rgba(25, 135, 84, 0.15);"' : ''}>
                            <h5>${rowData[i]} kg</h5>
                        </div>
                    </div>
                `);
                normsDiv.append(normCard);
            }
            
            resultDiv.append(normsDiv);
            $(targetElement).html(resultDiv);
            return matchedRow;
        } else {
            $(targetElement).html(`<div class="alert alert-warning">Netika atrasti dati svara kategorijai: ${weightCategory}</div>`);
            return null;
        }
    } catch (error) {
        console.error('Kļūda CSV parsēšanā:', error);
        $(targetElement).html('<div class="alert alert-danger">Kļūda datu parsēšanā: ' + error.message + '</div>');
        return null;
    }
}

function calculate1RM(weight, reps) {
    const brzycki = weight * (36 / (37 - reps));
    const epley = weight * (1 + (reps / 30));
    const lombardi = weight * Math.pow(reps, 0.10);
    const mayhew = weight * 100 / (52.2 + 41.9 * Math.exp(-0.055 * reps));
    const oconner = weight * (1 + (reps / 40));
    const wathan = weight * 100 / (48.8 + 53.8 * Math.exp(-0.075 * reps));
    const lander = weight * 100 / (101.3 - 2.67123 * reps);
    const wendler = weight + (weight * 0.0333 * reps);

    if (reps <= 1) {
        return weight; 
    } else {
        const average1RM = (brzycki + epley + lombardi + mayhew + oconner + wathan + lander + wendler) / 8;
        return average1RM;
    }
}

function findWeightCategory(bodyWeight, csvString) {
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
            categories.push(category);
        }
        
        const categoryValues = categories.map(cat => {
            const match = cat.match(/^(\d+(\.\d+)?)/);
            return match ? parseFloat(match[1]) : 999;
        });
        
        for (let i = 0; i < categoryValues.length; i++) {
            if (bodyWeight <= categoryValues[i]) {
                return categories[i];
            }
        }
        
        const maxIndex = categoryValues.indexOf(Math.max(...categoryValues));
        return categories[maxIndex];
    } catch (error) {
        console.error('Kļūda meklējot svara kategoriju:', error);
        return null;
    }
}

function determineNormLevel(oneRM, csvString, weightCategory, exerciseType, bodyWeight) {
    if (!csvString || !weightCategory) return null;

    let comparisonRM = oneRM;
    if ((exerciseType === 'weightedPullUp' || exerciseType === 'weightedDip') && bodyWeight > 0) {
        comparisonRM = oneRM - bodyWeight;
    }

    try {
        const rows = csvString.trim().split('\n');
        const headers = rows[0].split(',').map(h => h.trim());

        let categoryRow = null;
        for (let i = 1; i < rows.length; i++) {
            const rowData = rows[i].split(',').map(d => d.trim());
            if (rowData[0].trim() === weightCategory) {
                categoryRow = rowData;
                break;
            }
        }

        if (!categoryRow) return null;

        let achievedNorm = null;
        let achievedValue = null;

        for (let i = 1; i < headers.length; i++) {
            const normValue = parseFloat(categoryRow[i]);
            if (!isNaN(normValue) && comparisonRM >= normValue) {
                achievedNorm = headers[i];
                achievedValue = normValue;
                break; 
            }
        }

        if (!achievedNorm) {
            const lowestNormHeader = headers[headers.length - 1];
            const lowestNormValue = parseFloat(categoryRow[headers.length - 1]);
            return {
                norm: "Zem " + lowestNormHeader,
                value: lowestNormValue,
                nextNorm: lowestNormHeader,
                nextValue: lowestNormValue,
                weightCategory: weightCategory,
                comparisonRM: comparisonRM
            };
        }

        let nextNorm = null;
        let nextValue = null;

        const achievedIndex = headers.indexOf(achievedNorm);

        if (achievedIndex > 1) {
            nextNorm = headers[achievedIndex - 1];
            nextValue = parseFloat(categoryRow[achievedIndex - 1]);
        }

        return {
            norm: achievedNorm,
            value: achievedValue,
            nextNorm: nextNorm,
            nextValue: nextValue,
            weightCategory: weightCategory,
            comparisonRM: comparisonRM
        };
    } catch (error) {
        console.error('Kļūda nosakot normatīvu līmeni:', error);
        return null;
    }
}

function formatTimePeriod(days) {
    if (days < 7) {
        return days + " dienas";
    } else if (days < 30) {
        const weeks = Math.floor(days / 7);
        const remainingDays = days % 7;
        return weeks + " nedēļa" + (weeks > 1 ? "s" : "") + 
            (remainingDays > 0 ? " un " + remainingDays + " diena" + (remainingDays > 1 ? "s" : "") : "");
    } else if (days < 365) {
        const months = Math.floor(days / 30);
        const remainingDays = days % 30;
        const weeks = Math.floor(remainingDays / 7);
        return months + " mēnesis" + (months > 1 ? "i" : "") + 
            (weeks > 0 ? " un " + weeks + " nedēļa" + (weeks > 1 ? "s" : "") : "");
    } else {
        const years = Math.floor(days / 365);
        const remainingDays = days % 365;
        const months = Math.floor(remainingDays / 30);
        return years + " gads" + (years > 1 ? "i" : "") + 
            (months > 0 ? " un " + months + " mēnesis" + (months > 1 ? "i" : "") : "");
    }
}

function checkDrugTestSwitchVisibility(exercise, tabType) {
    const drugTestSwitchSelector = tabType === 'tables' ? '#tableDrugTested' : '#drugTested';
    const drugTestSwitchContainer = $(drugTestSwitchSelector).closest('.form-check');

    if (!exercise) {
        drugTestSwitchContainer.show();
        return;
    }

    const existsInDrugTest = normData.drugTest && normData.drugTest[exercise];
    const existsInNoDrugTest = normData.noDrugTest && normData.noDrugTest[exercise];

    if (existsInDrugTest && existsInNoDrugTest) {
        drugTestSwitchContainer.show();
    } else {
        drugTestSwitchContainer.hide();
        $(drugTestSwitchSelector).prop('checked', existsInDrugTest);
    }
}

function syncFederationSelectors() {
    const normCalcValue = $('#federation').val();
    const tableValue = $('#tableFederation').val();
    
    if (normCalcValue && !tableValue) {
        $('#tableFederation').val(normCalcValue);
    } else if (!normCalcValue && tableValue) {
        $('#federation').val(tableValue);
    }
}
