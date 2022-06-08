import {Dispatch} from 'react';
import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {AppRootStateType} from './store';


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type setTodoActionType = ReturnType<typeof setTodolistAC>

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | setTodoActionType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }

        case "SET-TODOS": {
            return action.todos.map((item) => {
                return {...item, filter: "all" as FilterValuesType}
            })
        }

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const setTodolistAC = (todos: TodolistType[]) => {
    return {
        type: 'SET-TODOS', todos
    } as const
}

// @ts-ignore
export const fetchTodosTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistAC(res.data))
        })
}

// @ts-ignore
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState()
    const allAppTodolists = state.todolists
    const changedTodolist = allAppTodolists.find((t:TodolistType) => {
        return t.id === todolistId
    })

   
    todolistsAPI.updateTodolist(todolistId, title)
        .then(()=>{
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}


export const removeTodolistTC = (todolistId: string) => {
    // @ts-ignore
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(() => {
                dispatch(removeTodolistAC(todolistId))

            })
    }
}

export const addTodolistTC = (title: string) => {

    // @ts-ignore
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(title))
            })
    }
}
