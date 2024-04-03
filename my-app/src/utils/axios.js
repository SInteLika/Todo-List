import axios from "axios";


const instance = axios.create({
    baseURL: 'http://147.45.147.124:4444/',
    headers: {
        common: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
    }
})

export default instance