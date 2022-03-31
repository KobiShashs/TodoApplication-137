import { combineReducers, createStore } from "redux";
import { TasksAppState, tasksReducer } from "./TasksAppState";


//Multiple Reducers
const reducers = combineReducers({taskReducer: tasksReducer});
const store = createStore(reducers)


export default store;