import axios from "axios";


const instance = axios.create({
    baseURL: 'https://todo-list-backend-4kat.onrender.com/',
    headers: {
        common: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`
        }
    }
})

export default instance