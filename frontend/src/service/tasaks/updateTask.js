import axios from "axios";

const apiUrl = import.meta.env.VITE_TODO_API;

export function updateTask (id, newTasks) {
    return axios.post(`${apiUrl}/tasks/UpdateTask`, {id, tasks: newTasks})
    .then(response => response["data"]["tasks"])
    .catch(error => error);
}