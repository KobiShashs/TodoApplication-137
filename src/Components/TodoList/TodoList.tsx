/* eslint-disable no-unreachable */
import axios from "axios";
import { useEffect, useState } from "react";
import { Task } from "../../Models/Task";
import notify, { SccMsg } from "../../Services/Notifications";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

function TodoList(): JSX.Element {

    const [tasks, setTasks] = useState<Task[]>([]);

    const getTasksApi = async () => {
        return await axios.get<Task[]>('https://raw.githubusercontent.com/KobiShashs/TODO-JSON/main/tasks');
    };



    // Side effects goes here
    useEffect(() => {
        getTasksApi()
            .then((res) => {
                console.log(res.data);
                setTasks(res.data)
                notify.success(SccMsg.GOT_TASKS);
            })
            .catch((err) => { notify.error(err); });
    }, []);

    return (
        <div className="TodoList">
            <h1>List of Tasks</h1>


            {/* <ul>
                {tasks.map(task=><li key={task.id}>{task.title},{task.description}</li>)}
            </ul> */}

            <div className="container">
                {tasks.map(task => <TodoItem key={task.id} task={task} />)}
            </div>

        </div>
    );




}

export default TodoList;
