import axios from "axios";

const apiUrl = import.meta.env.VITE_TODO_API;

export function addTask (userId, tasks) {
    return axios.post(`${apiUrl}/tasks/AddTask`, {userId, tasks})
    .then(response => response["data"]["tasks"])
    .catch(error => error);
}