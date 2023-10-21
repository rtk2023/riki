export class Config {
    // Attributes

    // Methods

    // Loads config.json file
    loadConfig() {
        return new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.overrideMimeType("application/json");
            xhr.open('GET', 'config.json', true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let jsonData = JSON.parse(xhr.responseText);
                        resolve(jsonData);
                    } else {
                        reject(new Error('Failed to load JSON'));
                    }
                }
            };
            xhr.send();
        });
    }

    // Get google API Key
    getGoogleAPIKey(){
        // On config load
        return new Promise(function (resolve, reject) {
            const config = new Config();
            config.loadConfig().then(function (data) {
                resolve(data.google_api_key);
            }).catch(function () {
                reject();
            })
        })
    }
}