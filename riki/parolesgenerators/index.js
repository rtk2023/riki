const passLen = document.getElementById('userInputPassLen');
const nums = document.getElementById('userInputNums');
const words = document.getElementById('userInputWords');
const symbols = document.getElementById('userInputSymbols');
const caps = document.getElementById('userInputCaps');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const alphabetCaps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'

let passStr = ""

function generatePassword() {
    passStr = ""
    while (passStr.length < +passLen.value) {
        let choice = randomInt(1, 4);

        let str = ""
        switch (choice) {
            case 1:
                str = randomArrEl(nums.value.split(','))
                break;
            case 2:
                str = randomArrEl(words.value.split(','))
                break;
            case 3:
                str = randomArrEl(symbols.value.split(','))
                break;
            default:
                str = randomizeString((caps.checked ? alphabet + alphabetCaps : alphabet) + numbers).split('')[0]
                break;
        }
        if ((passStr + str).length <= +passLen.value) passStr += str
    }
    alert(passStr)
}

function toggleElement(checkbox, divId) {
    const div = document.getElementById(divId);
    div.style.display = checkbox.checked ? "block" : "none";
    if (!checkbox.checked) {
        div.value = ""
    }
}

function randomizeString(string) {
    return randomizeStrArr(string.split('')).join('')
}

function randomizeStrArr(arr) {
    return arr.sort(() => 0.5 - Math.random())
}

function randomInt(min, max) {
    return Math.round(randomFloat(min, max));
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function randomArrEl(arr) {
    return randomizeStrArr(arr)[0]
}