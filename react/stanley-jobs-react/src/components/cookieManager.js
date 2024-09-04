function getCookie(c) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === c) {
            return cookieValue;
        }
    }
    return null;
}

export default getCookie;