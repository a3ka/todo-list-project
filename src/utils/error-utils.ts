// import { setAppErrorAC,
//     // SetAppErrorActionType,
//     setAppStatusAC,
//     // SetAppStatusActionType
// } from '../app/app-reducer';
// import { Dispatch } from 'redux';
// import { ResponseType } from '../api/todolists-api';
//
// // generic function
// export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: any) => {
//     if (data.messages.length) {
//         dispatch(setAppErrorAC(data.messages[0]))
//     } else {
//         dispatch(setAppErrorAC('Some error occurred'))
//     }
//     dispatch(setAppStatusAC('failed'))
// }
//
// export const handleServerNetworkError = (error: {message: string}, dispatch: any) => {
//     dispatch(setAppErrorAC(error.message))
//     dispatch(setAppStatusAC('failed'))
// }
//
// // type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>



import {
    AppActionsType, setAppErrorAC,
    // SetAppErrorActionType,
    setAppStatusAC,
    // SetAppStatusActionType
} from '../app/app-reducer';
import { Dispatch } from 'redux';
import { ResponseType } from '../api/todolists-api';

// generic function
// export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
//     if (data.messages.length) {
//         dispatch(setAppErrorAC(data.messages[0]))
//     } else {
//         dispatch(setAppErrorAC('Some error occurred'))
//     }
//     dispatch(setAppStatusAC('failed'))
// }

export const handleServerNetworkError = (errorMessage: string, dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppErrorAC(errorMessage))
    dispatch(setAppStatusAC('failed'))
}

// type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>