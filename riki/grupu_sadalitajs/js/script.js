import {readForm} from "./readForm.js";

let submit = document.form.submit;
submit.addEventListener("click", function (){
    let formId = document.form.formId.value;
    let form = new readForm();

    form.readForm(formId);
})