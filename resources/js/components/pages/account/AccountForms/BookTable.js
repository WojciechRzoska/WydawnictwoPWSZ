import React, {useEffect, useState} from "react";
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, Grid} from "@material-ui/core";
import {Link, Redirect} from 'react-router-dom';
import api from "../../../../api";
import './Panels.css';

function BookTable() {
    const [books, setBooks] = useState([]);

    if (!localStorage.getItem('token')) {
        return <Redirect to={'/login'}/>
    }

    useEffect(() => {
        getData();
    }, [])

    function getData() {
        api.getAllItems().then(res => {
            const result = res.data;
            setBooks(result.data);
        });
    }

    async function deleteOperation(id) {
        await api.deleteBook(id);
        getData();

    }


    const render = () => {
        if (books !== undefined) {
            return books.map((row, i) => (
                <TableRow key={i}>
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.pages}</TableCell>
                    <TableCell align="right">{row.year}</TableCell>
                    <TableCell align="right">{row.ISBN}</TableCell>
                    <TableCell align="right">{row.publisher}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">
                        <a className='pdf' href={`/${row.pdf_path}`}>[PDF]</a>
                    </TableCell>
                    <TableCell align="right"><img src={row.image_path}/></TableCell>
                    <TableCell align="right">
                        <Button component={Link}
                                className='editButton'
                                to={`edit-book/${row.id}`}
                                variant='contained'
                                color='primary'>
                            Edytuj
                        </Button>
                        <Button variant='contained' color='secondary'
                                onClick={() => deleteOperation(row.id)}>Usuń</Button>
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
                            to='/bulletin-panel'
                            variant='contained'
                            color='primary'>
                        Biuletyny
                    </Button>
                </div>
                <div className='menuButton'>
                    <Button component={Link}
                            to='/magazine-panel'
                            variant='contained'
                            color='primary'>
                        Magazyny
                    </Button>
                </div>
            </div>
            <div className='options'>
                <Button component={Link}
                        className='addButton'
                        to='/add-book'
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
                            <TableCell align="right">Opis</TableCell>
                            <TableCell align="right">Liczba stron</TableCell>
                            <TableCell align="right">Rok wydania</TableCell>
                            <TableCell align="right">ISBN</TableCell>
                            <TableCell align="right">Autor</TableCell>
                            <TableCell align="right">Cena</TableCell>
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

export default BookTable;
