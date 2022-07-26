// import Cookies from 'universal-cookie'
import Cookies from 'js-cookie'
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
    // const cookies = new Cookies();
    // return cookies.set(cookieKey, data)
    const data1 = Cookies.set(cookieKey, data) 
    console.log('set cookies function====', data1)
    return data
}

const getCookies = (cookieKey) => {
    // const cookies = new Cookies();
    // return cookies.get(cookieKey)
    let getCookies = Cookies.get(cookieKey)
    try {
        getCookies = JSON.parse(getCookies)
    } catch(e) {
    }
    return getCookies
}

const removeCookies = (cookieKey) => {
    // const cookies = new Cookies();
    // cookies.remove(cookieKey);
    Cookies.remove(cookieKey)
}

export default {
    titleCase,
    getCookies,
    removeCookies,
    setCookies
}