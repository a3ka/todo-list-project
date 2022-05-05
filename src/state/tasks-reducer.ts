import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTasksAtcionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolisdId: string
}
export type AddTasksAtcionType = {
    type: 'ADD-TASK'
    todolisdId: string
    title:string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todolisdId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
    todolisdId: string
}

type ActionsType = RemoveTasksAtcionType | AddTasksAtcionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolisdId]: state[action.todolisdId]
                    .filter(task => task.id !== action.taskId)
            }

        case 'ADD-TASK':
            return {
                ...state,
                [action.todolisdId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolisdId]]
            }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolisdId]: state[action.todolisdId].map(task => task.id === action.id ? {...task, isDone: action.isDone}: task)
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolisdId]: state[action.todolisdId].map(task => task.id === action.id ? {...task, title: action.title}: task)
            }

        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]:[]
            }

        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolisdId: string): RemoveTasksAtcionType => {
    return { type: 'REMOVE-TASK', taskId, todolisdId}
}
export const addTaskAC = (title: string, todolisdId: string): AddTasksAtcionType => {
    return { type: 'ADD-TASK', title, todolisdId}
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolisdId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', id, isDone, todolisdId}
}

export const changeTaskTitleAC = (id: string, title: string, todolisdId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', id, title, todolisdId}
}