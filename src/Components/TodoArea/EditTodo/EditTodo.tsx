import { useNavigate, useParams } from "react-router-dom";
import "./EditTodo.css";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TaskModel } from "../../../Models/TaskModel";
import { updateTask } from "../../../Services/TasksApi";
import notify, { SccMsg } from "../../../Services/Notifications";
import { useEffect, useState } from "react";
import store from "../../../Redux/store";
import { taskUpdatedAction } from "../../../Redux/TasksAppState";
function EditTodo(): JSX.Element {



    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || '');

    const [task, setTask] = useState<TaskModel>(store.getState().taskReducer.tasks.filter(task => task.id === id)[0]);

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

    // let defaultValuesObj = { id: 0, title: "", description: "", group: "", when: new Date() };
    let defaultValuesObj = { ...task };

    const { register, handleSubmit, control, formState: { errors, isDirty, isValid } }
        = useForm<TaskModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: yupResolver(schema) });

    const { dirtyFields } = useFormState({
        control
    });

    const sendToRemote = async (task: TaskModel) => {

        await updateTask(id, task)
            .then(res => {
                notify.success(SccMsg.UPDATED_TASK);
                // Updating global state
                store.dispatch(taskUpdatedAction(res.data));
                // defaultValuesObj.title = task.title || '';
                // defaultValuesObj.description = task.description || '';
                // defaultValuesObj.group = task.group || '';
                // defaultValuesObj.title = task.title || '';
                // defaultValuesObj.when = task.when || new Date();
                navigate('/tasks');

            })
            .catch(err => {
                notify.error(err);
                console.log(err);
                console.log(err.message);
            });
    }


    // useEffect(() => {

    //     setTask(store.getState().taskReducer.tasks.filter(task => task.id === id)[0]);

    //     // getTask(id)
    //     //     .then(res => {
    //     //         setTask(res.data);
    //     //         notify.success(SccMsg.GOT_SINGLE_TASK);
    //     //     })
    //     //     .catch(err => notify.error(err));

    // }, [id]);// Wow

    const onSubmit = (data: TaskModel) => {
        console.log(data);
    }


    return (
        <div className="EditTodo">
            <h2>Update existing Task</h2>
            {/* <form onSubmit={handleSubmit(sendToRemote)}> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="id">id</label>
                <br/>
                <input
                    type="number"
                    {...register("id")}
                    disabled={true}
                    name="id"
                    placeholder="id" />
                <br />
                <label htmlFor="title">title</label>
                <br/>
                <input
                    type="text"
                    {...register("title")}
                    // onChange={(e) => {console.log(e.target.value); }}
                    name="title"
                    placeholder="title" />
                <br />
                <span>{errors.title?.message}</span>
                <br />
                <label htmlFor="description">description</label>
                <br/>
                <input
                    type="text"
                    {...register("description")}
                    name="description"
                    placeholder="description" />

                
                <br />
                <span>{errors.description?.message}</span>
                <br />
                <label htmlFor="group">group</label>
                <br />
                <input
                    type="text"
                    {...register("group")}
                    name="group"
                    placeholder="group" />

              
                <br />
                <span>{errors.group?.message}</span>
                
                <br />
                <label htmlFor="when">when</label>
                <br />
                <input
                    type="datetime-local"
                    step="any"
                    {...register("when")}
                    name="when"
                    placeholder="when" />

                <br />
                <span>{errors.when?.message}</span>
                <br />
                <button disabled={!isDirty} className="button-app" >Yalla</button>
            </form>
        </div>
    );
}

export default EditTodo;
