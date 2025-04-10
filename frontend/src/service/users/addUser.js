import axios from "axios";

const apiUrl = import.meta.env.VITE_TODO_API;

export function addUser ({name, email, password}) {
    return axios.post(`${apiUrl}/users/Signup`, {name, email, password})
    .then(response => response["data"])
    .catch(error => error);
}