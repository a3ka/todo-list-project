import React from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Menu } from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import {AppRootStateType, useAppSelector } from './store';
import { useSelector } from 'react-redux';
import { AppStateType } from './app-reducer';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';


function App() {

    // const status = useSelector<AppRootStateType, AppStateType>(status => status.app.status)
    // with useAppSelector we can replace useSelector<an typisation>
    const status = useAppSelector(status => status.app.status)

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
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <TodolistsList/>
            </Container>

            <ErrorSnackbar/>
        </div>
    )
}

export default App





