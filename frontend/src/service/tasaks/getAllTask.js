import axios from 'axios';

const apiUrl = import.meta.env.VITE_TODO_API;

export function getAllTaskByID (id) {
    return axios.get(`${apiUrl}/tasks/AllTasks/${id}`)
    .then(res => res["data"])
    .catch(error => error);
}
