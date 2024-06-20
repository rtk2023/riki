// ! UZDOŠANA
// Rīka darbība sākas ar šo funkciju
async function questing() {
    const container = document.querySelector("#output");
    const arr = await fetch('./demo.json').then(response => response.json());
    let length = arr.length;

    if (length==0) {
        container.insertAdjacentHTML('beforeend', `<p>Jautājumu nav!</p>`);
        return;
    }

    let i = 0;
    arr.forEach(element => {
        container.insertAdjacentHTML('beforeend', `<label for="question">${i+1}. ${element.question}</label><br>`);
        container.insertAdjacentHTML('beforeend', `<input type="text" id="q_${i}" name="question" value=""><br>`);        
        i++;
    });
    container.insertAdjacentHTML('beforeend', `<button type="button" onclick="submit()">Submit</button>`);
}

// ! ATBILDES
async function submit() {
    const arr = await fetch('./demo.json').then(response => response.json());
    let wrongAns = 0;
    let wrongArr = [];
    
    let n=0;
    arr.forEach(element => {
        if (formatText(document.getElementById("q_"+n).value) !== formatText(element.answer)) {
            wrongArr[wrongAns] = n;
            wrongAns++;
        }
        n++;
    });

    let correct = arr.length - wrongAns;
    const container = document.querySelector("#output");
    container.insertAdjacentHTML('beforeend', `<p>Pareizo atbilžu skaits: ${correct} (${(correct/arr.length*100)}%)</p>`);

    if (wrongAns==0) {
        container.insertAdjacentHTML('beforeend', `<p>Viss pareizi!</p>`);
    }
    else {
        container.insertAdjacentHTML('beforeend', `<p>Pareizās atbildes:</p>`);
        n = 0;
        let m = 0;

        arr.forEach(element => {
            if (n==wrongArr[m]) {
                container.insertAdjacentHTML('beforeend',
                    `<p>${(wrongArr[m]+1)}. ${element.question}: ${element.answer}</p>`);
                m++;
            }
            n++;
        });
    }
}

// ! TEKSTA FORMATĒTĀJI
function formatText(str) {
    let result = str.toLowerCase();
    result = result.replace(/\s/g, "");
    return result;
}