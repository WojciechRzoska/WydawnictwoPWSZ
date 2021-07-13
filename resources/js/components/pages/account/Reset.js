import React, {useState} from "react";
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import api from "../../../api";
import Alert from "@material-ui/lab/Alert";
import './Login.css';

function Reset(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');


    const ResetSubmit = e =>{
        e.preventDefault();
        const fData = new FormData();
        fData.append('token',token);
        fData.append('email',email);
        fData.append('password', password);
        fData.append('password_confirmation',passwordConfirm);

        api.resetPassword(fData)
            .then(res => {
                setMessage(res.data.message);
                document.getElementById('resetForm').reset();
            })
            .catch(e => {
                setMessage(e.response.data.message);
            })


    }

    const InfoMessage = () =>{
        if(message){
            return(
                <Alert severity="error">{message}</Alert>
            )
        }
    }

    return(
            <div className='container'>
                <div className='item'>
                    <Grid align='center'>
                        <Paper elevation={10} className='sizeReset'>
                            <h2>Resetuj hasło</h2>
                            <form onSubmit={ResetSubmit} id='resetForm'>
                                {InfoMessage()}
                                <TextField label='Kod'
                                           name='Kod'
                                           onChange={e => setToken(e.target.value)}
                                           fullWidth
                                           required/>

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
                                <TextField label='Potwierdź hasło'
                                           name='passwordConfirm'
                                           type='password'
                                           onChange={e => setPasswordConfirm(e.target.value)}
                                           fullWidth
                                           required/>


                                <div className='navigate'>
                                    <Button type='submit' color='primary' variant="contained" className='btn'
                                            fullWidth>Zmień hasło</Button>
                                </div>
                            </form>
                        </Paper>
                    </Grid>
                </div>
            </div>
    )
}
export default Reset;
