import { useNavigate, useParams } from "react-router-dom";
import store from "../../../Redux/store";
import { taskDeletedAction } from "../../../Redux/TasksAppState";
import notify, { SccMsg } from "../../../Services/Notifications";
import { deleteTask } from "../../../Services/TasksApi";
import "./DeleteTodo.css";

function DeleteTodo(): JSX.Element {

    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || '');


    const yes = () => {
        deleteTask(id)
            .then(any => {
                notify.success(SccMsg.DELETED_TASK);
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
                <span><button onClick={yes}>Yes</button><button onClick={no}>No</button></span>
            </div>
        </div>
    );
}

export default DeleteTodo;
