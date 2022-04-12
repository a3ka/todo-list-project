import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditTableSpan} from "./components/EditTableSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/Delete';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    updateTask: (tId: string, Id: string, title: string) => void
    updateTodolistTitle: (tId: string, title: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)
    //
    // const addTask = () => {
    //     let newTitle = title.trim();
    //     if (newTitle !== "") {
    //         props.addTask(newTitle, props.id);
    //         setTitle("");
    //     } else {
    //         setError("Title is required");
    //     }
    // }
    //
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }

    const updateTaskHandler = (title: string, tId: string) => {
        props.updateTask(tId, props.id, title)
    }

    const updateTodolistHandler = (title: string, tId: string) => {
        props.updateTodolistTitle(title, tId)
    }

    return <div>
        <h3>
            <EditTableSpan oldTitle={props.title} callBack={(title: string) => updateTodolistHandler(props.id, title)}/>
            {/*{props.title}*/}
            <IconButton onClick={removeTodolist}><DeleteForeverIcon/></IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           className={error ? "error" : ""}*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*    {error && <div className="error-message">{error}</div>}*/}
        {/*</div>*/}
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
                        <EditTableSpan oldTitle={t.title}
                                       callBack={(title: string) => updateTaskHandler(title, props.id)}/>
                        <IconButton size={'small'} onClick={onClickHandler}>
                            <DeleteIcon fontSize={'small'}/>
                        </IconButton>

                    </li>
                })
            }
        </ul>
        <div>
            <ButtonGroup
                size={'small'}
                variant={'contained'}
                disableElevation>
                <Button
                    style={{maxWidth: '60px', maxHeight: '40px', minWidth: '60px', minHeight: '40px'}}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button

                    color={props.filter === 'active' ? 'secondary' : 'primary'}

                    className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button

                    color={props.filter === 'completed' ? 'secondary' : 'primary'}

                    className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}


