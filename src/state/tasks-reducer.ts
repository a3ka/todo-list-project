import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, setTodoActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from 'react';
import { setAppStatusAC } from './app-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}


type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodoActionType
    | SetTasksActionType

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            let newTask = action.task

            // const stateCopy = {...state}
            //
            // const tasks = stateCopy[newTask.todoListId];
            // const newTasks = [newTask, ...tasks];
            // stateCopy[newTask.todoListId] = newTasks;
            // return stateCopy;

            return {...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }

        case 'SET-TODOS': {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }

        case 'SET-TASKS': {
            // const stateCopy = {...state}
            // stateCopy[action.todolistId] = action.tasks
            // return stateCopy
            return {...state, [action.todolistId]: action.tasks}
        }


        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {
    // @ts-ignore
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) => {
    // @ts-ignore
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC('succeeded'))

            })
    }
}

export const addTaskTC = (title: string, todolistId: string) => {

    // @ts-ignore
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                const newTask = res.data.data.item
                dispatch(addTaskAC(newTask))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

// @ts-ignore
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    const allAppTasks = state.tasks
    const tusksForCurrentTodo = allAppTasks[todolistId]
    const changedTask = tusksForCurrentTodo.find((t:TaskType) => {
        return t.id === taskId
    })
    const model: UpdateTaskModelType = {
        title: changedTask.title,
        description: changedTask.description,
        status,
        priority: changedTask.priority,
        startDate: changedTask.startDate,
        deadline: changedTask.deadline,

    }

    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTask(todolistId, taskId, model)
        .then(()=>{
            dispatch(changeTaskStatusAC(taskId, status, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

// @ts-ignore
export const changeTaskTitleTC = (taskId: string, todolistId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    const allAppTasks = state.tasks
    const tusksForCurrentTodo = allAppTasks[todolistId]
    const changedTask = tusksForCurrentTodo.find((t:TaskType) => {
        return t.id === taskId
    })

    const model: UpdateTaskModelType = {
        title,
        description: changedTask.description,
        status: changedTask.status,
        priority: changedTask.priority,
        startDate: changedTask.startDate,
        deadline: changedTask.deadline,

    }

    todolistsAPI.updateTask(todolistId, taskId, model)
        .then(()=>{
            dispatch(changeTaskTitleAC(taskId, title, todolistId))
        })
}