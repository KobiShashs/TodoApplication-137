import { useNavigate, useParams } from "react-router-dom";
import "./EditTodo.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Task } from "../../../Models/Task";
import { getTask, updateTask } from "../../../Services/TasksApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import { useEffect, useState } from "react";
import store from "../../../Redux/store";
import { taskUpdatedAction } from "../../../Redux/TasksAppState";
function EditTodo(): JSX.Element {

    const [task, setTask] = useState<Task>(new Task());

    const navigate = useNavigate();
    const params = useParams();
    console.log(params, typeof (params));
    const id = +(params.id || '');
    console.log(id, typeof (id));



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

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<Task>({ mode: "all", resolver: yupResolver(schema) });


    const sendToRemote = async (task: Task) => {

        await updateTask(id, task)
            .then(res => {
                notify.success(SccMsg.UPDATED_TASK);
                store.dispatch(taskUpdatedAction(res.data));
                navigate('/tasks');

            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log(err.message);
            });
    }


    useEffect(() => {

        setTask(store.getState().taskReducer.tasks.filter(task => task.id===id)[0]);
       
            // getTask(id)
            //     .then(res => {
            //         setTask(res.data);
            //         notify.success(SccMsg.GOT_SINGLE_TASK);
            //     })
            //     .catch(err => notify.error(err));
     
    }, []);


    return (
        <div className="EditTodo">
            <h2>Update existing Task</h2>
            <form onSubmit={handleSubmit(sendToRemote)}>
                {/* <input disabled={true} type="id" defaultValue={id}{...register("id")} name="id" placeholder="id" />
                <br /> */}
                <input type="text" defaultValue={task.title} {...register("title")} name="title" placeholder="title" />
                <br />
                <span>{errors.title?.message}</span>
                <br />
                <input type="text" defaultValue={task.description} {...register("description")} name="description" placeholder="description" />
                <br />
                <span>{errors.description?.message}</span>
                <br />
                <input type="text" defaultValue={task.group} {...register("group")} name="group" placeholder="group" />
                <br />
                <span>{errors.group?.message}</span>
                <br />
                <input type="datetime-local" defaultValue={task.when?.toString()} {...register("when")} name="when" placeholder="when" />
                <br />
                <span>{errors.when?.message}</span>
                <br />
                <button className="button-app" >Yalla</button>
            </form>
        </div>
    );
}

export default EditTodo;
