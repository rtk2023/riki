// Atbash cipher - reverses alphabet
function atbashEncode(text) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reversedAlphabet = alphabet.split('').reverse().join('');
    const upperReversedAlphabet = upperAlphabet.split('').reverse().join('');
    let result = '';

    for (let char of text) {
        if (alphabet.includes(char)) {
            let index = alphabet.indexOf(char);
            result += reversedAlphabet[index];
        } else if (upperAlphabet.includes(char)) {
            let index = upperAlphabet.indexOf(char);
            result += upperReversedAlphabet[index];
        } else {
            result += char;
        }
    }
    return result;
}

// Same as encode - Atbash is symmetric
function atbashDecode(text) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const reversedAlphabet = alphabet.split('').reverse().join('');
    const upperReversedAlphabet = upperAlphabet.split('').reverse().join('');
    let result = '';

    for (let char of text) {
        if (alphabet.includes(char)) {
            let index = alphabet.indexOf(char);
            result += reversedAlphabet[index];
        } else if (upperAlphabet.includes(char)) {
            let index = upperAlphabet.indexOf(char);
            result += upperReversedAlphabet[index];
        } else {
            result += char;
        }
    }
    return result;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { atbashEncode, atbashDecode };
}