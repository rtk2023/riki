const morseMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
    'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--',
    '-': '-....-', "'": '.----.', '"': '.-..-.', '/': '-..-.',
    '(': '-.--.', ')': '-.--.-', '@': '.--.-.', ':': '---...'
};

const reverseMorseMap = {};
for (let key in morseMap) {
    reverseMorseMap[morseMap[key]] = key;
}

function encodeMorse(text) {
    try {
        return text.toUpperCase().split('').map(c => {
            if (c === ' ') return '';
            return morseMap[c] || '';
        }).join(' ').replace(/ {2,}/g, '   ');
    } catch (error) {
        console.error("Encode failed:", error);
        throw new Error("Morse encoding failed: " + error.message);
    }
}

function decodeMorse(morseCode) {
    try {
        return morseCode.trim().split('   ').map(
            word => word.split(' ').map(
                letter => reverseMorseMap[letter] || ''
            ).join('')
        ).join(' ');
    } catch (error) {
        console.error("Decode failed:", error);
        throw new Error("Morse decoding failed: " + error.message);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { encodeMorse, decodeMorse };
}

