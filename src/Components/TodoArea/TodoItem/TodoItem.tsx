import { FaEdit, FaTrash } from "react-icons/fa";
import { TaskModel } from "../../../Models/TaskModel";
import ILDate from "../../SharedArea/ILDate/ILDate";
import ILTime from "../../SharedArea/ILTime/ILTime";
import "./TodoItem.css";
interface TodoItemProps {
    task: TaskModel;
}
function TodoItem(props: TodoItemProps): JSX.Element {


    return (
        <div className="TodoItem">
            <div>
                <p>Id: {props.task.id}</p>
                <p>Title: {props.task.title}</p> 
                <p>Desc: {props.task.description?.substring(0,15)} </p>
                <p>Group: {props.task.group} </p>
                <ILDate date={props.task.when  || new Date()}/>
                <ILTime date={props.task.when  || new Date()}/>
            </div>
            <div>
                <img src="https://picsum.photos/150" alt="" />
            </div>
            <div className="buttons">
                <FaTrash size={42}/>
                <FaEdit size={42}/>
            </div>
        </div>
    );
}

export default TodoItem;
