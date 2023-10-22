import {stableMatchMembers} from "./stableMatch.js";

export function getData(formId) {
    getSpreadsheetId(formId).then(function (spreadsheetId) {
        const queryString = window.location.href;
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('access_token');
        const range = 'A1:Z100';

        // Get associated spreadsheet id
        const formUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`;

        fetch(formUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(result => {
                // Turn data in correct format
                let memberData = [];
                let memberName;

                for (let i = 1; i < result.values.length; i++) {
                    result.values[i] = result.values[i].slice(1);
                    memberName = result.values[i][0];
                    result.values[i] = result.values[i].slice(1);
                    memberData[i-1] = {name: memberName,  preferences: result.values[i]}
                }

                // Execute algorithm


                console.log(stableMatchMembers(memberData, 3));
            })
            .catch(error => {
                alert("Kļūda meklējot izklājlapu. Pārbaudiet vai ir pievienota izklājlapa formai.");
            });
    }).catch(function () {
        alert("Nepareizs Formas ID");
    });
}

function getSpreadsheetId(formId){
    // Get OAuth2 Access TOKEN
    const queryString = window.location.href;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('access_token');

    // Get associated spreadsheet id
    const formUrl = `https://forms.googleapis.com/v1/forms/${formId}`;

    return new Promise(function(resolve, reject) {
        fetch(formUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(result => {
                resolve(result.linkedSheetId);
            })
            .catch(error => {
                reject(error);
            });
    })
}