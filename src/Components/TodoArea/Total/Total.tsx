import { useEffect, useState } from "react";
import store from "../../../Redux/store";
import notify from "../../../Services/Notifications";
import { countTasks } from "../../../Services/TasksApi";
import Circle from "../../SharedArea/Circle/Circle";
import "./Total.css";

function Total(): JSX.Element {

    const [count, setCount] = useState<number>(store.getState().taskReducer.tasks.length);

    useEffect(() => {
        if (count === 0) {
            countTasks()
                .then(res => setCount(res.data))
                .catch(err => notify.error(err));
        }


    }, [count]);//WOW!

    useEffect(() => {
        return store.subscribe(() => {
            setCount(store.getState().taskReducer.tasks.length); // Will let us notify
        });

    }
        , [])


    return (
        <div className="Total">
            <Circle val={count} />
        </div>
    );
}

export default Total;
