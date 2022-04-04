import { TaskModel } from "../Models/TaskModel";

// Step 1 - Create AppState and manage the collection once and in a centralize place
export class TasksAppState {
    public tasks: TaskModel[] = [];

    
}

// Step 2 - Define all possible action for your application state
export enum TasksActionType {
    TasksDownloaded = "TasksDownloaded",
    TaskAdded = "TaskAdded",
    TaskUpdated = "TaskUpdated",
    TaskDeleted = "TaskDeleted",
    TasksClear = "TasksClear"
}


// Step 3 - Define Action Interface to describe actionAction & payload if needed
export interface TaskAction {
    type: TasksActionType;
    payload?: any;
}

// Step 4 - Export Action Creators functions that gets payload and return relevant Action
export function tasksDownloadedAction(tasks: TaskModel[]): TaskAction {
    return { type: TasksActionType.TasksDownloaded, payload: tasks };
}

export function taskAddedAction(task: TaskModel): TaskAction {
    return { type: TasksActionType.TaskAdded, payload: task };
}

export function taskUpdatedAction(task: TaskModel): TaskAction {
    return { type: TasksActionType.TaskUpdated, payload: task };
}

export function taskDeletedAction(id: number): TaskAction {
    return { type: TasksActionType.TaskDeleted, payload: id };
}

export function tasksClearAction(): TaskAction {
    return { type: TasksActionType.TasksClear, payload: {} };
}









// Step 5 - Reducer function perform the required action
export function tasksReducer(currentState: TasksAppState = new TasksAppState(), action: TaskAction): TasksAppState {
    const newState = { ...currentState } //Spread Operator
    switch (action.type) {
        case TasksActionType.TasksDownloaded:
            newState.tasks = action.payload;
            break;
        case TasksActionType.TaskAdded:
            newState.tasks.push(action.payload);
            break;
        case TasksActionType.TaskUpdated:
            const idx = newState.tasks.findIndex(task => task.id === action.payload.id);
            newState.tasks[idx] = action.payload;
            break;
        case TasksActionType.TaskDeleted:
            newState.tasks = newState.tasks.filter(c => c.id !== action.payload);
            break;
        case TasksActionType.TasksClear:
            newState.tasks = [];
            break;
    }
    return newState;

}
