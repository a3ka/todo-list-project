import { AxiosError } from "axios"
import { Dispatch } from "react"
import { authAPI } from "../api/todolists-api"
import { setIsLoggedInAC } from "../features/Login/auth-reducer"
import { handleServerNetworkError } from "../utils/error-utils"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export type AppStateType = typeof initialState

export const appReducer = (state: AppStateType = initialState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

type ActionsType = any

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

export const setAppErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

export const setIsInitializedAC = (value: boolean) => {
    return {
        type: 'APP/SET-INITIALIZED',
        value
    } as const
}

// @ts-ignore
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsInitializedAC(true))
                dispatch(setIsLoggedInAC(true));
            } else {
                dispatch(setAppErrorAC(res.data.messages[0]))
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(err.message, dispatch)
        })
}


export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

export type AppActionsType = SetAppStatusActionType | SetAppErrorActionType | SetIsInitializedActionType