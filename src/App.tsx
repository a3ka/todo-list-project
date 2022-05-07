import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC,} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    function removeTask(taskId: string, todolistId: string) {
        dispatch(removeTaskAC(taskId, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    function changeFilter(todolistId: string, filter: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }

    function ChangeTodolistTitle(todolistId: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(todolistId, newTitle))
    }

    function removeTodolist(todolistId: string) {
        dispatch(removeTodolistAC(todolistId))
    }

    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
    }

    const todolistComponents = todolists.map(tl => {

        let tasksForTodolist = tasks[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
        }

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: "20px"}}>
                    <Todolist
                        key={tl.id}
                        todolist={tl}
                    />
                </Paper>
            </Grid>
        )
    })


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        todolist={tl}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
