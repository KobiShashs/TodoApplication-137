import Logo from "../Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
			<Logo/>
            <h1>Todo App</h1>
            <p>18:02:00</p>
        </div>
    );
}

export default Header;
