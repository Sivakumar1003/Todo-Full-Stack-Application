import axios from "axios";

const apiUrl = import.meta.env.VITE_TODO_API;

export function getAllUsers() {
    return axios.get(`${apiUrl}/users/AllUsers`)
        .then(res => res["data"])
        .catch(err => err);
}