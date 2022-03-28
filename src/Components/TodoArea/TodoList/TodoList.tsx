/* eslint-disable no-unreachable */
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import  {Task,Color}  from "../../../Models/Task";
import notify, { SccMsg } from "../../../Services/Notifications";
import { getTasks } from "../../../Services/TasksApi";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import FlipCard from "../../SharedArea/FlipCard/FlipCard";
import "./TodoList.css";

function TodoList(): JSX.Element {

    const [tasks, setTasks] = useState<Task[]>([]);


    // Side effects goes here
    useEffect(() => {
        getTasks()
            .then((res) => {
                console.log(res.data);
                setTasks(res.data);
                notify.success(SccMsg.GOT_TASKS);
            })
            .catch((err) => { notify.error(err); });
    },[]);

    return (
        <div className="TodoList">
            <h1>List of Tasks</h1>
           <CustomLink to="/tasks/add"> <FaPlusCircle size={42}/></CustomLink>


            <div className="container">
                {/* {tasks.map(task => <TodoItem key={task.id} task={task} />)} */}
                {tasks.map(task => <FlipCard key={task.id} task={task} />)}
            </div>

        </div>
    );




}

export default TodoList;
