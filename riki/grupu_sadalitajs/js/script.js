import {Config} from "./loadConfig.js";


const config = new Config();

let submit = document.form.submit;
submit.addEventListener("click", function (){
    config.getGoogleAPIKey().then(function (data) {
        console.log(data);
    });
})