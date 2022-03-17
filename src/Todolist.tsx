import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    // const onAllClickHandler=()=>{
    //     props.changeFilter('all')
    // }
    //
    // const onActiveClickHandler=()=>{
    //     props.changeFilter('active')
    // }

    const changeFilterHandler = (FilterValues: FilterValuesType) => {
        props.changeFilter(FilterValues)
    }

    const onClickHandler = (tID: string) => {
        props.removeTask(tID)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <Button name={'+'} callBack={() => addTask()}/>
            {/*<button onClick={addTask}>+</button>*/}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    // const onClickHandler=()=>{
                    //     props.removeTask(t.id)
                    // }

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => onClickHandler(t.id)}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <Button name={'All'} callBack={() => changeFilterHandler('all')}/>
            <button onClick={() => changeFilterHandler('active')}>Active</button>
            <button onClick={() => changeFilterHandler('completed')}>Completed</button>

            {/*<button onClick={ onAllClickHandler }>All</button>*/}
            {/*<button onClick={ onActiveClickHandler }>Active</button>*/}
            {/*<button onClick={ onCompletedClickHandler }>Completed</button>*/}

            {/*<button onClick={ ()=>{props.changeFilter('completed')} }>Completed</button>*/}
        </div>
    </div>
}
