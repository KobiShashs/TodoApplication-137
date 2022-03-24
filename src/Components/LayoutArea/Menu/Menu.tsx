import { Link } from "react-router-dom";
import CustomLink from "../../SharedArea/CustomLink/CustomLink";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            {/* <a href="/home">Home</a>
            <a href="/tasks">Tasks</a>
            <a href="/about">About</a>
            <a href="/credits">Credits</a> */}
            {/* <Link to="home">Home</Link>
            <Link to="tasks">Tasks</Link>
            <Link to="about">About</Link>
            <Link to="credits">Credits</Link> */}

            <CustomLink to="home">Home</CustomLink>
            <CustomLink to="tasks">Tasks</CustomLink>
            <CustomLink to="about">About</CustomLink>
            <CustomLink to="credits">Credits</CustomLink>
        </div> 
    );
}

export default Menu;
