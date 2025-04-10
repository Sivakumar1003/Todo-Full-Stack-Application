import axios from "axios";

const apiUrl = import.meta.env.VITE_TODO_API;

export function deleteTask(id) {
    return axios.get(`${apiUrl}/tasks/DeleteTask/${id}`)
        .then(response => response["data"]["tasks"])
        .catch(error => error);
}