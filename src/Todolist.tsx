import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store/store";
import {TodolistType} from "./App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export function Todolist(props: PropsType) {

    const {todolist} = props

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolist.id])

    let tasksForTodolist = [...tasks];

    if (todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }

    const dispatch = useDispatch()


    const addTask = (title: string) => {
        // props.addTask(title, props.todolistId)
        dispatch(addTaskAC(title, todolist.id))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolist.id))
    }

    const ChangeTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, newTitle))
    }


    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(todolist.id, "all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(todolist.id, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(todolist.id, "completed"))


    return <div>
        <h3 style={{textAlign: "center"}}>
            <EditableSpan value={todolist.title} onChange={ChangeTodolistTitle}/>
            <IconButton
                size={"small"}
                aria-label="delete">
                <Delete onClick={() => removeTodolist(todolist.id)}/>
            </IconButton>
        </h3>
        <div>
            <AddItemForm addItem={addTask}/>
        </div>
        <List>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, todolist.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked
                        dispatch(changeTaskStatusAC(t.id, newIsDone, todolist.id))
                    }
                    const changeTaskTitleHandler = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(t.id, newTitle, todolist.id))

                    }

                    return <ListItem
                        style={{padding: '0'}}
                        key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            color="primary"
                            inputProps={{'aria-label': 'secondary checkbox'}}
                            onChange={onChangeHandler}
                            checked={t.isDone}
                        />
                        <EditableSpan
                            value={t.title} onChange={changeTaskTitleHandler} />
                        <IconButton
                            size={"small"}
                            aria-label="delete">
                            <Delete onClick={onClickHandler}/>
                        </IconButton>
                    </ListItem>
                })
            }
        </List>
        <div>
            <Button
                size={"small"}
                variant={"contained"}
                color={todolist.filter === 'all' ? "secondary" : "primary"}
                disableElevation
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                size={"small"}
                variant={"contained"}
                color={todolist.filter === 'active' ? "secondary" : "primary"}
                disableElevation
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                size={"small"}
                variant={"contained"}
                disableElevation
                color={todolist.filter === 'completed' ? "secondary" : "primary"}
                onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
