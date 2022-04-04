import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/store";
import notify, { ErrMsg } from "../../../Services/Notifications";
import { countTasks } from "../../../WebApi/TasksApi";
import Circle from "../../SharedArea/Circle/Circle";
import "./Total.css";

function Total(): JSX.Element {

    const navigate = useNavigate();

    const [count, setCount] = useState<number>(store.getState().taskReducer.tasks.length);

    useEffect(() => {
        // If we don't have a user object - we are not logged in
        if (!store.getState().authState.user) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
        }
    },[])

    useEffect(() => {
        if (count === 0) {
            countTasks()
                .then(res => setCount(res.data))
                // .catch(err => /*notify.error(err)*/);
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
