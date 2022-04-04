import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import store from "../../../Redux/store";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>(store.getState().authState.user);

    useEffect(() => {

        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState?.user || new UserModel());
        });

        return unsubscribe;
    }, []);
    return (
        <div className="AuthMenu">
            {user?.token ?
                <>
                    <span>{user?.email}</span>
                    &nbsp;
                    <Link to='/logout'>Logout</Link>
                </>
                :
                <>
                    <span>👋hello guest👋</span>
                    &nbsp;
                    <Link to='/register'>Register</Link>
                    &nbsp;
                    <Link to='/login'>Login</Link>
                </>
            }
        </div>
    );
}

export default AuthMenu;
