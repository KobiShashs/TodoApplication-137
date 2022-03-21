import "./TodoItem.css";
import { Task } from '../../Models/Task';
import ILTime from "../ILTime/ILTime";
interface TodoItemProps {
    task: Task;
}
function TodoItem(props: TodoItemProps): JSX.Element {


    return (
        <div className="TodoItem">
            <div>
                <p>Id: {props.task.id}</p>
                <p>Title: {props.task.title}</p> 
                <p>Desc: {props.task.description?.substring(0,15)} </p>
                <p>Group: {props.task.group} </p>
                <ILTime date={props.task.when  || new Date()}/>
            </div>
            <div>
                <img src="https://picsum.photos/150" alt="" />
            </div>
        </div>
    );
}

export default TodoItem;
