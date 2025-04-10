import axios from "axios";

const apiUrl = import.meta.env.VITE_TODO_API;

export function updateStatus(id) {
    return axios.get(`${apiUrl}/tasks/UpdateStatus/${id}`)
        .then(response => response["data"]["tasks"])
        .catch(error => error);
}