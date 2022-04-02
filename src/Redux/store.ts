import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthAppState";
import { tasksReducer } from "./TasksAppState";


//Multiple Reducers
const reducers = combineReducers({taskReducer: tasksReducer,authState: authReducer});
const store = createStore(reducers)


export default store;