import React, { useEffect } from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';
import {AppRootStateType, useAppSelector} from './store';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType, initializeAppTC} from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import { Login } from '../features/Login/Login';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { logoutTC } from '../features/Login/auth-reducer';



function App() {
    // const status = useSelector<AppRootStateType, AppStateType>(status => status.app.status)
    // with useAppSelector we can replace useSelector<an typisation>
    const {status, isInitialized} = useAppSelector(state => state.app)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    // const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    
    const logoutOnClickHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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
                    {isLoggedIn && <Button onClick={logoutOnClickHandler} color="inherit">Log out</Button>}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="404" element={<h1 style={{display: 'flex', justifyContent:'center'}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={'404'}/>}/>
                </Routes>
            </Container>

            <ErrorSnackbar/>
        </div>
    )
}

export default App





