import React, {useState} from "react";
import {TextField, Button, Grid, Paper} from "@material-ui/core";
import {Redirect, Link} from 'react-router-dom';
import './Login.css';
import api from '../../../api';
import Alert from "@material-ui/lab/Alert";

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const LoginSubmit = e => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('email', email);
        fData.append('password', password);

        api.login(fData)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('role', res.data.user.role)
                setLoggedIn(true);
                props.settingUser(res.data.user);
                document.getElementById('loginForm').reset();
            })
            .catch(e => {
                setMessage(e.response.data.message);
            });
    }


    const InfoMessage = () => {
        if (message) {
            return (
                <Alert severity="error">{message}</Alert>
            )
        }
    }

    if (loggedIn) {
        return <Redirect to={'/book-panel'}/>
    }

    if (localStorage.getItem('token')) {
        return <Redirect to={'/'}/>
    }
    return (
        <div className='container'>
            <div className='item'>
                <Grid align='center'>
                    <Paper elevation={10} className='sizeLogin'>
                        <h2>Zaloguj się</h2>
                        <form onSubmit={LoginSubmit} id='loginForm'>
                            {InfoMessage()}
                            <TextField label='Email'
                                       name='email'
                                       onChange={e => setEmail(e.target.value)}
                                       fullWidth
                                       required/>

                            <TextField label='Hasło'
                                       name='password'
                                       type='password'
                                       onChange={e => setPassword(e.target.value)}
                                       fullWidth
                                       required/>

                            <div className='navigate'>
                                <Link to='/forget' className='forget'>Zapomniałeś hasła?</Link>
                                <Button type='submit' color='primary' variant="contained" className='btn'
                                        fullWidth>Zaloguj</Button>
                            </div>
                        </form>
                    </Paper>
                </Grid>
            </div>
        </div>
    );

}


export default Login;
