import React, {useState} from 'react';
import api from "../../../../api";
import {TextField, Select, MenuItem, Button, Typography} from "@material-ui/core";
import {Redirect, useHistory} from "react-router-dom";
import '../AccountForms/AddForms.css';

function AddUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');

    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorRole, setErrorRole] = useState('');

    let history = useHistory();

    if (localStorage.getItem('role') !== 'admin') {
        return <Redirect to={'/login'}/>
    }

    const submitData = e => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('name', name);
        fData.append('email', email);
        fData.append('password', password);
        fData.append('password_confirmation', confirmPassword);
        fData.append('role', role);

        api.addUser(fData)
            .then(res => {
                console.log('res', res);
                history.goBack();
            }).catch(e => {
            console.error('fail', e.response.data.errors);
            setErrorName(e.response.data.errors.name);
            setErrorEmail(e.response.data.errors.email);
            setErrorPassword(e.response.data.errors.password);
            setErrorRole(e.response.data.errors.role);
        })

    }
    return (
        <div className='content'>
            <div className='title'>
                <h2>Dodaj użytkownika</h2>
            </div>
            <div className='addForm'>
                <form className='root'>
                    <TextField id="standard-required"
                               label="Nazwa"
                               value={name}
                               fullWidth
                               onChange={e => setName(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorName}</Typography>
                    <TextField id="standard-required"
                               label="Email"
                               value={email}
                               fullWidth
                               onChange={e => setEmail(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorEmail}</Typography>
                    <TextField id="standard-required"
                               label="Hasło"
                               value={password}
                               fullWidth
                               onChange={e => setPassword(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorPassword}</Typography>
                    <TextField id="standard-required"
                               label="Powtórz hasło"
                               value={confirmPassword}
                               fullWidth
                               onChange={e => setConfirmPassword(e.target.value)}/>
                    <Select
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        displayEmpty
                        fullWidth
                        className='select'

                    >
                        <MenuItem value="">
                            <em>Rola</em>
                        </MenuItem>
                        <MenuItem value={'user'}>Użytkownik</MenuItem>
                        <MenuItem value={'admin'}>Admin</MenuItem>
                    </Select>
                    <Typography className='formError' color='error'>{errorRole}</Typography>
                    <div className='submitButton'>
                        <Button variant="contained" onClick={submitData}>
                            Dodaj
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser;
