// Base64 encoding/decoding

function encodeBase64(text) {
    try {
        return btoa(unescape(encodeURIComponent(text)));
    } catch (error) {
        console.error("Failed to encode:", error);
        throw new Error("Base64 encoding failed: " + error.message);
    }
}

function decodeBase64(base64String) {
    try {
        return decodeURIComponent(escape(atob(base64String)));
    } catch (error) {
        console.error("Decode failed:", error);
        return null;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { encodeBase64, decodeBase64 };
}

