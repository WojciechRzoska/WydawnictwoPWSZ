import React, {useEffect, useState} from "react";
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, Grid} from "@material-ui/core";
import {Link, Redirect} from 'react-router-dom';
import api from "../../../../api";
import './Panels.css';

function BulletinTable() {
    const [bulletin, setBulletin] = useState([]);

    if (!localStorage.getItem('token')) {
        return <Redirect to={'/login'}/>
    }

    useEffect(() => {
        getData();

    }, [])

    function getData() {
        api.getAllBulletins().then(res => {
            const result = res.data;
            setBulletin(result.data);
        });
    }

    async function deleteOperation(id) {
        await api.deleteBulletin(id);
        getData();

    }

    const render = () => {
        if (bulletin !== undefined) {
            return bulletin.map((row, i) => (

                <TableRow key={i}>
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">
                        <a className='pdf' key={i} href={`/${row.pdf_path}`}>[PDF]</a>
                     </TableCell>
                    <TableCell align="right"><img src={row.image_path}/> </TableCell>

                    <TableCell align="right" className='action'>


                        <Button component={Link}
                                className='editButton'
                                to={`edit-bulletin/${row.id}`}
                                variant='contained'
                                color='primary'>
                            Edytuj
                        </Button>


                        <Button variant='contained' color='secondary' onClick={() => deleteOperation(row.id)}>Usuń</Button>


                    </TableCell>
                </TableRow>


            ));
        }
    }

    return (
        <div className='container'>
            <div className='menu'>
                <div className='menuButton'>
            <Button component={Link}
                    to='/book-panel'
                    variant='contained'
                    color='primary'>
                Książki
            </Button>
                </div>
                <div className='menuButton'>
            <Button component={Link}
                    to='/magazine-panel'
                    variant='contained'
                    color='primary'>
                Czasopisma naukowe
            </Button>
                </div>
            </div>
            <div className='options'>
                <Button component={Link}
                        className='addButton'
                        to='/add-bulletin'
                        variant='contained'>
                    Dodaj
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table className='tab' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Tytuł</TableCell>
                            <TableCell align="right">Plik</TableCell>
                            <TableCell align="right">Zdjęcie</TableCell>
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

export default BulletinTable;
