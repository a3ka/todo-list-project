import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, setTodoActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from 'react';


type TrackType = {
    id: number
    likesCount: number
}

export type actionType = ReturnType<typeof addTrackAC>



const state = [
    {id: 12, likesCount: 10},
    {id: 14, likesCount: 2},
    {id: 100, likesCount: 0}
]

export const reducer = (state: TrackType[], action: actionType) => {
    switch (action.type) {
        case 'TRACK-ADDED': {

            // return [...state, {id: action.trackId, likesCount: 0} ]
            return [...state, {id: action.trackId, likesCount: 0}]
        }

        default:
            return state;
    }
}


const addTrackAC = (trackId: number) => ({type: 'TRACK-ADDED', trackId})

const newState = reducer(state, addTrackAC(300))

console.log(newState[3].likesCount === 0)