import Cookies from 'universal-cookie'
// import util from './util'

const titleCase = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
}

const setCookies = (cookieKey, data) => {
    const cookies = new Cookies();
    return cookies.set(cookieKey, data)
}

const getCookies = (cookieKey) => {
    const cookies = new Cookies();
    return cookies.get(cookieKey)
}

const removeCookies = (cookieKey) => {
    const cookies = new Cookies();
    cookies.remove(cookieKey);
}

export default {
    titleCase,
    getCookies,
    removeCookies,
    setCookies
}