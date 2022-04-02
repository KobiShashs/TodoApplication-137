import { SyntheticEvent, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TaskModel } from "../../../Models/TaskModel";
import ILDate from "../ILDate/ILDate";
import ILTime from "../ILTime/ILTime";
import "./FlipCard.css";

interface FlipCardProps {
    task: TaskModel;
}
function FlipCard(props: FlipCardProps): JSX.Element {

    const [id,setId] = useState<number>(props.task.id || 0)


    const updateTask = (id:number)=>{
        window.alert('going to update '+id);
    }

    const deleteTask = (id:number)=>{
        window.alert('going to delete '+id);
    }

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
                        {/* <button onClick={()=>deleteTask(props.task.id || 0)}><FaTrash size={42} /> </button> */}
                        {/* <button onClick={()=>updateTask(props.task.id || 0)}><FaEdit size={42} /></button> */}
                        <Link to={`/tasks/edit/${props.task.id}`}><FaEdit size={42} /></Link>
                        <Link to={`/tasks/delete/${props.task.id}`}><FaTrash size={42} /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FlipCard;
