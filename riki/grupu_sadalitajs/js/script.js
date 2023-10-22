import {getData} from "./readForm.js";

let submit = document.form.submit;
submit.addEventListener("click", function (){
    let formId = document.form.formId.value;
    let groupAmount = document.form.groupAmount.value;
    getData(formId, groupAmount);
})