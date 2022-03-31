/* eslint-disable no-unreachable */
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Task, Color } from "../../../Models/Task";
import store from "../../../Redux/store";
import { tasksDownloadedAction } from "../../../Redux/TasksAppState";
import notify, { SccMsg } from "../../../Services/Notifications";
import { getTasks } from "../../../Services/TasksApi";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import FlipCard from "../../SharedArea/FlipCard/FlipCard";
import "./TodoList.css";

function TodoList(): JSX.Element {

    const [tasks, setTasks] = useState<Task[]>(store.getState().taskReducer.tasks);


    // Side effects goes here
    useEffect(() => {
        if (tasks?.length === 0) {
            getTasks()
                .then((res) => {
                    //Update Component State
                    setTasks(res.data);
                    //Update Application State
                    store.dispatch(tasksDownloadedAction(res.data));
                    notify.success(SccMsg.GOT_TASKS);
                })
                .catch((err) => { notify.error(err); });
        }
    }, []);

    return (
        <div className="TodoList">
            <h1>List of Tasks</h1>
            <CustomLink to="/tasks/add"> <FaPlusCircle size={42} /></CustomLink>

            {(tasks?.length > 0)
                ?

                <div className="container">
                    {/* {tasks.map(task => <TodoItem key={task.id} task={task} />)} */}
                    {tasks.map(task => <FlipCard key={task.id} task={task} />)}
                </div>

                :

                <EmptyView msg='No Tasks for you!' />
            }


        </div>
    );




}

export default TodoList;
