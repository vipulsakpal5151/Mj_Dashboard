import axios from "axios"

const axiosConnection = () => { 
    const instance = axios.create({
        baseURL: "http://localhost:8000/auth/"
    })
    return { instance }
}

export default axiosConnection