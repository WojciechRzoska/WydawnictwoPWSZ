import React, {useEffect, useState} from "react";
import api from "../../../api";
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, Grid} from "@material-ui/core";
import {Link, Redirect} from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel() {
    const [users, setUsers] = useState([]);

    if (localStorage.getItem('role') !== 'admin') {
        return <Redirect to={'/login'}/>
    }

    useEffect(() => {
        getData();
    }, [])

    function getData() {
        api.getUsers().then(res => {
            const result = res.data;
            setUsers(result.data);
        });
    }

    async function deleteOperation(id) {
        await api.deleteUser(id);
        getData();

    }


    const render = () => {
        if (users !== undefined) {
            return users.map((row) => (
                <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.role}</TableCell>
                    <TableCell align="right">
                        <Button variant='contained' onClick={() => deleteOperation(row.id)}>Usuń</Button>
                    </TableCell>
                </TableRow>
            ));
        }
    }

    return (
        <div className='container'>
            <div className='options'>
                <Button component={Link}
                        className='addButton'
                        to='/add-user'
                        variant='contained'>
                    Dodaj
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table className='tab' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Nazwa</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Rola</TableCell>
                            <TableCell align="right">Akcja</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {render()}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AdminPanel;
