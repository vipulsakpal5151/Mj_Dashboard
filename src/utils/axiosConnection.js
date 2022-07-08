import axios from "axios"

const axiosConnection = () => { 
    const instance = axios.create({
        baseURL: "http://localhost:8000/auth/",
        headers: {
            "Content-type": "application/json"
        }
    })
    return { instance }
}

export default axiosConnection