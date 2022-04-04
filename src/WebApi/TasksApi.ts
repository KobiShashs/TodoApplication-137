import axios from "axios";
import { TaskModel } from "../Models/TaskModel";
import store from "../Redux/store";
import globals from "../Services/Globals";

export async function getTasks() {
    const options = {
        headers: { 'Authorization': store.getState().authState.user.token },
    };
    return await axios.get<TaskModel[]>(globals.urls.tasks, options);
};

export async function getTask(id: number) {
    const options = {
        headers: { 'Authorization': store.getState().authState.user.token },
    };
    return await axios.get<TaskModel>(globals.urls.tasks + id, options);
};

export async function countTasks() {
    const options = {
        headers: { 'Authorization': store.getState().authState.user.token },
    };
    return await axios.get<number>(globals.urls.tasks + 'count', options);
};

export async function addTask(task: TaskModel) {
    const options = {
        headers: { 'Authorization': store.getState().authState.user.token },
    };
    return await axios.post<TaskModel>(globals.urls.tasks, task, options);
};

export async function deleteTask(id: number) {
    const options = {
        headers: { 'Authorization': store.getState().authState.user.token },
    };
    return await axios.delete<any>(globals.urls.tasks + id,options);
};

export async function updateTask(id: number, task: TaskModel) {
    const options = {
        headers: { 'Authorization': store.getState().authState.user.token },
    };
    return await axios.put<any>(globals.urls.tasks + id, task,options);
};