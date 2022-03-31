import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import About from "../../PagesArea/About/About";
import Credits from "../../PagesArea/Credits/Credits";
import Home from "../../PagesArea/Home/Home";
import AddTodo from "../../TodoArea/AddTodo/AddTodo";
import DeleteTodo from "../../TodoArea/DeleteTodo/DeleteTodo";
import EditTodo from "../../TodoArea/EditTodo/EditTodo";
import TodoList from "../../TodoArea/TodoList/TodoList";
import Page404 from "../Page404/Page404";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route index element={<Home/>}/>
                <Route path='/tasks' element={<TodoList/>}/>
                <Route path='/tasks/add' element={<AddTodo/>}/>
                <Route path='/tasks/edit/:id' element={<EditTodo/>}/>
                <Route path='/tasks/delete/:id' element={<DeleteTodo/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/credits' element={<Credits/>}/>
                <Route path='*' element={<Page404/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
