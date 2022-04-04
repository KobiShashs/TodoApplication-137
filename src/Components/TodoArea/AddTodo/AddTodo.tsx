import "./AddTodo.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TaskModel } from "../../../Models/TaskModel";
import { addTask } from "../../../WebApi/TasksApi";
import { Notyf } from "notyf";
import notyf from "notyf/notyf";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notifications";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/store";
import { taskAddedAction } from "../../../Redux/TasksAppState";
import { useEffect } from "react";
function AddTodo(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authState.user.token) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    },[])

    const schema = yup.object().shape({
        title:
            yup.string()
                .required("Title is required"),
        description:
            yup.string()
                .required("Description is required"),
        group:
            yup.string()
                .required("Group is required"),
        when:
            yup.date()
                .default(new Date())
                .typeError("You must specify task date")
                .required("When is required")
                .nullable().default(() => new Date()),

    });


    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<TaskModel>({ mode: "all", resolver: yupResolver(schema) });

    const sendToRemote = async (task: TaskModel) => {

        await addTask(task)
            .then(res => {
                notify.success(SccMsg.ADDED_TASK);
                // Updating global state
                store.dispatch(taskAddedAction(res.data));
                navigate('/tasks');

            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log(err.message);
            });
    }
    return (
        <div className="AddTodo">
            <h2>Add new Task</h2>
            <form onSubmit={handleSubmit(sendToRemote)}>
                <label htmlFor="title">title</label>
                <input type="text" {...register("title")} name="title" placeholder="title" />
                <br />
                <span>{errors.title?.message}</span>
                <br />
                <label htmlFor="description">description</label>
                <input type="text" {...register("description")} name="description" placeholder="description" />
                <br />
                <span>{errors.description?.message}</span>
                <br />
                <label htmlFor="group">group</label>
                <input type="text" {...register("group")} name="group" placeholder="group" />
                <br />
                <span>{errors.group?.message}</span>
                <br />
                <label htmlFor="when">when</label>
                <input type="datetime-local" step="any" {...register("when")} name="when" placeholder="when" />
                <br />
                <span>{errors.when?.message}</span>
                <br />
                <button className="button-app" disabled={!isValid}>Create Task</button>
            </form>
        </div>
    );
}

export default AddTodo;
