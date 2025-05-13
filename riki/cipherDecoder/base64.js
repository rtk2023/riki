function encodeBase64(text) {
    return btoa(unescape(encodeURIComponent(text)));
}

function decodeBase64(base64String) {
    try {
        return decodeURIComponent(escape(atob(base64String)));
    } catch (e) {
        console.error("Invalid Base64:", e);
        return null;
    }
}

