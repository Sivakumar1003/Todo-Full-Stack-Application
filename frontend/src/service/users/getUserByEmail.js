import axios from 'axios';

const apiUrl = import.meta.env.VITE_TODO_API;

export function getUserByEmail(email) {
    return axios.get(`${apiUrl}/users/Login/${email}`)
        .then(res => res["data"])
        .catch(err => err["response"]["data"]);
}