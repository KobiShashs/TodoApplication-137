import axios from "axios";
import { Task } from "../Models/Task";
import globals from "./Globals";

export async function getTasks() {
    return await axios.get<Task[]>(globals.urls.tasks);
};

export async function countTasks() {
    return await axios.get<number>(globals.urls.tasks+'count');
};

export async function addTask(task:Task) {
    return await axios.post<Task>(globals.urls.tasks,task);
};

export async function deleteTask(id:number) {
    return await axios.delete<any>(globals.urls.tasks+id);
};

export async function updateTask(id:number,task:Task) {
    return await axios.put<any>(globals.urls.tasks+id,task);
};