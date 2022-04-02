import axios from "axios";
import { TaskModel } from "../Models/TaskModel";
import globals from "./Globals";

export async function getTasks() {
    return await axios.get<TaskModel[]>(globals.urls.tasks);
};

export async function getTask(id:number) {
    return await axios.get<TaskModel>(globals.urls.tasks+id);
};

export async function countTasks() {
    return await axios.get<number>(globals.urls.tasks+'count');
};

export async function addTask(task:TaskModel) {
    return await axios.post<TaskModel>(globals.urls.tasks,task);
};

export async function deleteTask(id:number) {
    return await axios.delete<any>(globals.urls.tasks+id);
};

export async function updateTask(id:number,task:TaskModel) {
    return await axios.put<any>(globals.urls.tasks+id,task);
};