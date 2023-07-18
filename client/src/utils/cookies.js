function setCookie(name, value, options = {}) {
    if (options.expires instanceof Date)
        options.expires = options.expires.toUTCString();

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function eraseCookie(name) {
    document.cookie = name+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
}

export {eraseCookie, getCookie, setCookie}