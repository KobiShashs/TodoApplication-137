/* eslint-disable no-unreachable */
import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TaskModel, Color } from "../../../Models/TaskModel";
import store from "../../../Redux/store";
import { tasksDownloadedAction } from "../../../Redux/TasksAppState";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { getTasks } from "../../../WebApi/TasksApi";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import FlipCard from "../../SharedArea/FlipCard/FlipCard";
import "./TodoList.css";

function TodoList(): JSX.Element {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState<TaskModel[]>(store.getState().taskReducer.tasks);


    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authState.user.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    },[])

    // Side effects goes here
    useEffect(() => {
        if (tasks?.length === 0) {
            getTasks()
                .then((res) => {
                    // Updating Component State
                    setTasks(res.data);
                    // Updating global state
                    store.dispatch(tasksDownloadedAction(res.data));
                    // notify.success(SccMsg.GOT_TASKS);
                })
                .catch((err) => { /*notify.error(err);*/ });
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
