import "./Logo.css";
import logo from '../../../Assets/Images/todo.png';
function Logo(): JSX.Element {
    return (
        <div className="Logo">
            <img src={logo} alt=""/>
        </div>
    );
}

export default Logo;
