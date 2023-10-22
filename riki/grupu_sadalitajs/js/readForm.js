import {Config} from "./loadConfig.js";

export class readForm {
    readForm(formId){
        const queryString = window.location.href;
        const urlParams = new URLSearchParams(queryString);
        const token = urlParams.get('access_token')

        console.log(queryString);

        const config = new Config();

        config.getGoogleAPIKey().then(function (apiKey) {
            console.log(token);
            const formUrl = `https://forms.googleapis.com/v1/forms/${formId}/responses`;

            fetch(formUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(result => {
                    console.log('Form submission result:', result);
                })
                .catch(error => {
                    console.error('Error submitting the form:', error);
                });
        })
    }
}