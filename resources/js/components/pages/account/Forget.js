import React, {useState} from "react";
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import {Link} from "react-router-dom";
import './Login.css';
import api from "../../../api";


function Forget() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [submit, setSubmit] = useState(false);

    const ForgetSubmit = e => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('email', email);
        setSubmit(true);
        api.forgetPassword(fData)
            .then(res => {
                setMessage(res.data.message);
                document.getElementById('forgetForm').reset();
                setSeverity('success');

            })
            .catch(e => {
                setMessage(e.response.data.message);
                setSeverity('error');
                setSubmit(false);
            });
        setTimeout(() => setSubmit(false), 2500);

    }

    const InfoMessage = () => {
        if (message) {
            if (severity === 'error') {
                return <Alert severity={'error'}>{message}</Alert>

            }
            if (severity === 'success') {
                return <Alert severity={'success'}>{message}</Alert>
            }
        }
    }

    return (
        <div className='container'>
            <div className='item'>
                <Grid align='center'>
                    <Paper elevation={10} className='sizeForget'>
                        <h2>Przypomnij hasło</h2>
                        <form onSubmit={ForgetSubmit} id='forgetForm'>
                            {InfoMessage()}
                            <TextField label='Email'
                                       name='email'
                                       onChange={e => setEmail(e.target.value)}
                                       fullWidth
                                       required/>
                            <div className='navigateForget'>
                                <Link to='/login' className='login'>Powrót do logowania</Link>
                                <Button type='submit' color='primary' disabled={submit} variant="contained"
                                        className='btn'
                                        fullWidth>Odzyskaj hasło</Button>
                            </div>
                        </form>
                    </Paper>
                </Grid>
            </div>
        </div>
    );
}

export default Forget;
