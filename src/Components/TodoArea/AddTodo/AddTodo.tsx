import "./AddTodo.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Task } from "../../../Models/Task";
import { addTask } from "../../../Services/TasksApi";
import { Notyf } from "notyf";
import notyf from "notyf/notyf";
import notify, { SccMsg } from "../../../Services/Notifications";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/store";
import { taskAddedAction } from "../../../Redux/TasksAppState";
function AddTodo(): JSX.Element {

    const navigate = useNavigate();

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


    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<Task>({ mode: "all", resolver: yupResolver(schema) });

    const sendToRemote = async (task: Task) => {

        await addTask(task)
            .then(res => {
                notify.success(SccMsg.ADDED_TASK);
                //Updtaing global state.
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
                <input type="text" {...register("title")} name="title" placeholder="title" />
                <br />
                <span>{errors.title?.message}</span>
                <br />
                <input type="text" {...register("description")} name="description" placeholder="description" />
                <br />
                <span>{errors.description?.message}</span>
                <br />
                <input type="text" {...register("group")} name="group" placeholder="group" />
                <br />
                <span>{errors.group?.message}</span>
                <br />
                <input type="datetime-local" {...register("when")} name="when" placeholder="when" />
                <br />
                <span>{errors.when?.message}</span>
                <br />
                <button className="button-app" >Yalla</button>
            </form>
        </div>
    );
}

export default AddTodo;
