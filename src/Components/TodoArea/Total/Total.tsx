import { useEffect, useState } from "react";
import notify from "../../../Services/Notifications";
import { countTasks } from "../../../Services/TasksApi";
import "./Total.css";

function Total(): JSX.Element {

    const [count,setCount] = useState<number>(0);

    useEffect(() => {
        countTasks()
        .then(res=>setCount(res.data))
        .catch(err=>notify.error(err));

    },[]);
    return (
        <div className="Total">
			<div className={count>0?'circle':'empty'}>{count}</div>
        </div>
    );
}

export default Total;
