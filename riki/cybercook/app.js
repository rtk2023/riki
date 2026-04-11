// Main cipher app logic

// Get DOM elements
const cipherTypeElement = document.getElementById("cipherType");
const keyLabel = document.getElementById("keyLabel");
const keyInput = document.getElementById("key");
const inputTextarea = document.getElementById("inputText");
const encodeButton = document.getElementById("encodeButton");
const decodeButton = document.getElementById("decodeButton");
const resultElement = document.getElementById("result");
const copyButton = document.getElementById("copyButton");
const headerElement = document.getElementById("header");

// Cipher configs
const cipherConfig = {
    atbash: { name: "Atbash Cipher", requiresKey: false, supportsEncode: true, supportsDecode: true },
    caesar: { name: "Caesar Cipher", requiresKey: true, supportsEncode: true, supportsDecode: true },
    vigenere: { name: "Vigenère Cipher", requiresKey: true, supportsEncode: true, supportsDecode: true },
    base64: { name: "Base64", requiresKey: false, supportsEncode: true, supportsDecode: true },
    morse: { name: "Morse Code", requiresKey: false, supportsEncode: true, supportsDecode: true },
    html: { name: "HTML Encoder/Decoder", requiresKey: false, supportsEncode: true, supportsDecode: true }
};

// Update UI when cipher type changes
function updateCipherUI() {
    const selectedCipher = cipherTypeElement.value;
    const config = cipherConfig[selectedCipher];

    // Update the header
    headerElement.innerHTML = `<h1>${config.name}</h1>`;

    // Show/hide key input
    if (config.requiresKey) {
        keyLabel.style.display = "block";
        keyInput.style.display = "block";
    } else {
        keyLabel.style.display = "none";
        keyInput.style.display = "none";
    }

    // Update button visibility
    encodeButton.style.display = config.supportsEncode ? "block" : "none";
    decodeButton.style.display = config.supportsDecode ? "block" : "none";

    // Clear result
    resultElement.textContent = "";
    copyButton.style.display = "none";
}

// Main cipher processing function
function processCipher(operation) {
    const cipherType = cipherTypeElement.value;
    const inputText = inputTextarea.value;
    const key = keyInput.value;
    let output = "";

    try {
        switch (cipherType) {
            case "atbash":
                output = operation === "encode" 
                    ? atbashEncode(inputText) 
                    : atbashDecode(inputText);
                break;
            case "caesar":
                if (!key || isNaN(parseInt(key))) {
                    output = "Error: Please provide a valid shift value (numeric)";
                    break;
                }
                output = operation === "encode"
                    ? cipherEncode(inputText, parseInt(key))
                    : cipherDecode(inputText, parseInt(key));
                break;
            case "vigenere":
                if (!key) {
                    output = "Error: Please provide a keyword";
                    break;
                }
                output = operation === "encode"
                    ? vigenereEncode(inputText, key)
                    : vigenereDecode(inputText, key);
                break;
            case "base64":
                output = operation === "encode"
                    ? encodeBase64(inputText)
                    : decodeBase64(inputText);
                if (output === null) {
                    output = "Error: Invalid Base64 input";
                }
                break;
            case "morse":
                output = operation === "encode"
                    ? encodeMorse(inputText)
                    : decodeMorse(inputText);
                break;
            case "html":
                output = operation === "encode"
                    ? encodeHTML(inputText)
                    : decodeHTML(inputText);
                break;
            default:
                output = "Error: Invalid cipher type!";
        }

        // Show result
        resultElement.textContent = output;
        copyButton.style.display = "block";

    } catch (error) {
        console.error("Cipher error:", error);
        resultElement.textContent = `Error: ${error.message}`;
        copyButton.style.display = "none";
    }
}

// Copy to clipboard
function copyToClipboard() {
    const text = resultElement.textContent;
    if (!text) {
        alert("Nothing to copy!");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => {
            const originalText = copyButton.textContent;
            copyButton.textContent = "Copied!";
            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 2000);
        })
        .catch(err => {
            console.error("Copy failed:", err);
            alert("Failed to copy to clipboard!");
        });
}

// Set up event listeners
cipherTypeElement.addEventListener("change", updateCipherUI);
encodeButton.addEventListener("click", () => processCipher("encode"));
decodeButton.addEventListener("click", () => processCipher("decode"));
copyButton.addEventListener("click", copyToClipboard);

// Init UI
window.addEventListener("DOMContentLoaded", updateCipherUI);
