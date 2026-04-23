// Vigenère cipher - polyalphabetic substring encoding
function vigenereEncode(text, keyword) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    let keywordIndex = 0;

    const plainText = text.toLowerCase();
    const key = keyword.toLowerCase();

    for (let char of plainText) {
        if (alphabet.includes(char)) {
            const textCharIndex = alphabet.indexOf(char);
            const keyCharIndex = alphabet.indexOf(key[keywordIndex % key.length]);
            const encodedIndex = (textCharIndex + keyCharIndex) % 26;
            result += alphabet[encodedIndex];
            keywordIndex++;
        } else {
            result += char;
        }
    }
    return result;
}

function vigenereDecode(text, keyword) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    let keywordIndex = 0;

    cipherText = text.toLowerCase();
    keyword = keyword.toLowerCase();

    for (let char of cipherText) {
        if (alphabet.includes(char)) {
            const textCharIndex = alphabet.indexOf(char);
            const keyCharIndex = alphabet.indexOf(keyword[keywordIndex % keyword.length]);
            const decodedIndex = (textCharIndex - keyCharIndex + 26) % 26;
            result += alphabet[decodedIndex];
            keywordIndex++;
        } else {
            result += char;
        }
    }
    return result;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { vigenereEncode, vigenereDecode };
}