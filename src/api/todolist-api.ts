import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '30613f1b-f95a-419e-8398-7317c81ab28a'
    }
})

export const TodolistAPI = {

    getTodolist() {
        return instance.get<Array<TodoType>>('todo-lists')
    },

    createTodolist(title: string) {
        // return instance.post<CreateTodoType>('todo-lists', {title})
        return instance.post<BaseResponseType<{ item: TodoType }>>('todo-lists', {title})
    },

    deleteTodolist(todolistId: string) {
        // return instance.delete<DeleteAndUpdateTodoType>(`todo-lists/${todolistId}`)
        return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
    },

    updateTodolistTitle(todolistId: string, title: string) {
        // return instance.put<DeleteAndUpdateTodoType>(`todo-lists/${todolistId}`, {title})
        return instance.put<BaseResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

// TYPES

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type BaseResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

// type CreateTodoType = {
//     data: { item: TodoType }
//     resultCode: number
//     messages: string[]
//     fieldsErrors: string[]
// }
//
// type DeleteAndUpdateTodoType = {
//     data: { }
//     resultCode: number
//     messages: string[]
//     fieldsErrors: string[]
// }