// Caesar cipher - shift cipher
function cipherEncode(text, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let encodedText = '';

    for (let char of text) {
        if (alphabet.includes(char)) {
            let charIndex = alphabet.indexOf(char);
            let newCharIndex = (charIndex +  shift ) % 26;
            encodedText += alphabet[newCharIndex];
        } else if (upperAlphabet.includes(char)) {
            let charIndex = upperAlphabet.indexOf(char);
            let newCharIndex = (charIndex + shift ) % 26;
            encodedText += upperAlphabet[newCharIndex];
        } else {
            encodedText += char;
        }
    }
    return encodedText;
}

function cipherDecode(text, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const upperAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let decodedText = '';

    for (let char of text) {
        if (alphabet.includes(char)) {
            let charIndex = alphabet.indexOf(char);
            let newCharIndex = (charIndex - shift + 26) % 26;
            decodedText += alphabet[newCharIndex];
        } else if (upperAlphabet.includes(char)){
            let charIndex = upperAlphabet.indexOf(char);
            let newCharIndex = (charIndex - shift + 26) % 26;
            decodedText += upperAlphabet[newCharIndex];
        } else {
            decodedText += char;
        }
    }
    return decodedText;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { cipherEncode, cipherDecode };
}