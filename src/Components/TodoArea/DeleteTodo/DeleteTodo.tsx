import { useNavigate, useParams } from "react-router-dom";
import store from "../../../Redux/store";
import { taskDeletedAction } from "../../../Redux/TasksAppState";
import notify, { SccMsg } from "../../../Services/Notifications";
import { deleteTask } from "../../../WebApi/TasksApi";
import "./DeleteTodo.css";

function DeleteTodo(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || '');


    const yes = () => {
        deleteTask(id)
            .then(any => {
                notify.success(SccMsg.DELETED_TASK);
                // Updating global state
                store.dispatch(taskDeletedAction(id));
                navigate('/tasks');
            })
            .catch(err => notify.error(err));
    }

    const no = () => {
        navigate('/tasks');
    }

    return (
        <div className="DeleteTodo">
            <div className="box">
                <h2>Delete Task</h2>
                <p>Are you sure you want to delete task id={id}?</p>
                <div className="one-line">
                    <button className="button-app-danger" onClick={yes}>Yes</button>
                    <button className="button-app-default" onClick={no}>No</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteTodo;
