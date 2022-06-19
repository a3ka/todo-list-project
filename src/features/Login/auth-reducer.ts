import { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import { authAPI, LoginParamsType } from '../../api/todolists-api'
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer'
import { handleServerNetworkError } from '../../utils/error-utils'

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

enum ResultCode {
    success = 0,
    error,
    captcha = 10
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('loading'))
            } else {
                dispatch(setAppErrorAC(res.data.messages[0]))
            }
        })
        .catch((err: AxiosError) => {
            // @ts-ignore
            handleServerNetworkError(err.message, dispatch)
        })
    // .catch((err: AxiosError) => {
    //     dispatch(setAppErrorAC(err.message))
    // })
    // .finally(() => {
    //     dispatch(setAppStatusAC('idle'))
    // })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                // handleServerAppError(res.data, dispatch)
                dispatch(setAppErrorAC(res.data.messages[0]))
            }
        })
        .catch((error) => {
            // @ts-ignore
            handleServerNetworkError(error, dispatch)
        })
}




// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType

