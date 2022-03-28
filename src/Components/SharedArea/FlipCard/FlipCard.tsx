import { FaEdit, FaTrash } from "react-icons/fa";
import { Task } from "../../../Models/Task";
import ILDate from "../ILDate/ILDate";
import ILTime from "../ILTime/ILTime";
import "./FlipCard.css";
interface FlipCardProps {
    task: Task;
}
function FlipCard(props: FlipCardProps): JSX.Element {
    return (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src="https://picsum.photos/300" alt="Avatar"/>
                </div>
                <div className="flip-card-back">
                    <h1>{props.task.title}</h1>
                    <p>{props.task.description}</p>
                    <p>{props.task.group}</p>
                    <p><ILDate date={props.task.when || new Date()} /> <ILTime date={props.task.when || new Date()} /></p>
                    <div className="buttons">
                        <FaTrash size={42} />
                        <FaEdit size={42} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlipCard;
