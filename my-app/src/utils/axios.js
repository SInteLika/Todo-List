import axios from "axios";


const instance = axios.create({
    baseURL: 'http://localhost:4443/',
    headers: {
        common: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
    }
})

export default instance