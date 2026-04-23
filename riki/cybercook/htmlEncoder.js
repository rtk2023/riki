// HTML entity encoding/decoding

function encodeHTML(text) {
    const htmlMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
    };
    return text.replace(/[&<>"'\/]/g, char => htmlMap[char]);
}

function decodeHTML(html) {
    const htmlMap = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&#x2F;': '/'
    };
    let result = html;
    for (let entity in htmlMap) {
        result = result.replace(new RegExp(entity, 'g'), htmlMap[entity]);
    }
    return result;
}

// Alternative decode using textarea
function decodeHTMLBuiltin(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { encodeHTML, decodeHTML, decodeHTMLBuiltin };
}
