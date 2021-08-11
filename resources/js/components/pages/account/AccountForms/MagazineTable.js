import React, {useEffect, useState} from "react";
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, Grid} from "@material-ui/core";
import {Link, Redirect} from 'react-router-dom';
import api from "../../../../api";
import './Panels.css';

function MagazineTable() {
    const [magazine, setMagazine] = useState([]);

    if (!localStorage.getItem('token')) {
        return <Redirect to={'/login'}/>
    }

    useEffect(() => {
        getData();

    }, [])

    function getData() {
        api.getAllMagazinesWithFiles().then(res => {
            const result = res.data;
            setMagazine(result);
        });
    }

    async function deleteOperation(id) {
        await api.deleteMagazine(id);
        getData();

    }

    const render = () => {
        if (magazine !== undefined) {
            return magazine.map((row, i) => (

                <TableRow key={i}>
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.ISSN}</TableCell>
                    <TableCell align="right">{row.release}</TableCell>
                    <TableCell align="right"> {row.magazine_files.map((item, i) => (
                        <a className='pdf' key={i} href={`/${item.pdf_path}`}>[PDF{i + 1}]</a>
                    ))} </TableCell>
                    <TableCell align="right"><img src={row.image_path}/> </TableCell>

                    <TableCell align="right">
                        <Button component={Link}
                                className='editButton'
                                to={`edit-magazine/${row.id}`}
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
                            to='/Book-panel'
                            variant='contained'
                            color='primary'>
                        Książki
                    </Button>
                </div>
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
                            to='/dodawanie-informacji'
                            variant='contained'
                            color='primary'>
                        Strony w stopce
                    </Button>
                </div>
            </div>
            <div className='options'>
                <Button component={Link}
                        className='addButton'
                        to='/add-magazine'
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
                            <TableCell align="right">ISSN</TableCell>
                            <TableCell align="right">Data wydania</TableCell>
                            <TableCell align="right">Pliki</TableCell>
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

export default MagazineTable;
