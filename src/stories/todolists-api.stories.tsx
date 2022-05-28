import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {v1} from 'uuid'
import {TodolistAPI} from '../api/todolist-api'

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '30613f1b-f95a-419e-8398-7317c81ab28a'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistAPI.getTodolist().then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        TodolistAPI.createTodolist("SOLANA")
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'e381db67-8071-4f51-a740-4ba56bbc5e9b';
        TodolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '705810c2-5f67-438d-ace0-0a243bf278e6'
        TodolistAPI.updateTodolistTitle(todolistId, 'ANGULAR')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


