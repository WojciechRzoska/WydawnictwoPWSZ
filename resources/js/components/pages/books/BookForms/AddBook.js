import React, { useState } from "react";
import {Fade, Backdrop, TextField, Button, Modal} from '@material-ui/core';
import api from '../../../../api';
import useStyles from './stylesAdd';


export default function AddBook() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image_path, setImagePath] = useState('');
    const [pages, setPages] = useState('');
    const [pdf_path, setPdfPath] = useState('');
    const [year, setYear] = useState('');
    const [ISBN, setISBN] = useState('');
    const [publisher, setPublisher] = useState('');
    const [price, setPrice] = useState('');

    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const submitData = e => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('title', title);
        fData.append('description', description);
        fData.append('image',image_path);
        fData.append('pages',pages);
        fData.append('pdf_path',pdf_path);
        fData.append('year',year);
        fData.append('ISBN',ISBN);
        fData.append('publisher',publisher);
        fData.append('price',price);

        api.addBook(fData)
            .then(res => {
                console.log('response', res);
            }).catch(e=>{
                console.error('fail',e);
        });
        window.location.reload();

    }


    return(
        <div>
            <button type="button" onClick={handleOpen}>
                Dodaj
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>

                        <div id="transition-modal-description" >
                            <h2 id="transition-modal-title" > Dodaj publikację </h2>
                            <form className={classes.root} noValidate autoComplete="off" onSubmit={submitData}>
                                <TextField required id="standard-required"
                                           label="Tytuł"
                                           value={title}
                                           onChange={e => setTitle(e.target.value)} />
                                <TextField required id="standard-required"
                                           label="Opis"
                                           multiline
                                           rowsMax={4}
                                           value={description}
                                           onChange={e => setDescription(e.target.value)} />

                                <TextField required id="standard-required"
                                           label="Liczba Stron"
                                           value={pages}
                                           onChange={e => setPages(e.target.value)} />
                                <TextField required id="standard-required"
                                           label="Contests"
                                           value={pdf_path}
                                           onChange={e => setPdfPath(e.target.value)} />
                                <TextField required id="standard-required"
                                           label="Rok"
                                           value={year}
                                           onChange={e => setYear(e.target.value)} />
                                <TextField required id="standard-required"
                                           label="ISBN"
                                           value={ISBN}
                                           onChange={e => setISBN(e.target.value)} />
                                <TextField required id="standard-required"
                                           label="Publisher"
                                           value={publisher}
                                           onChange={e => setPublisher(e.target.value)} />
                                <TextField required id="standard-required"
                                           label="Cena"
                                           value={price}
                                           onChange={e => setPrice(e.target.value)} />
                                <input
                                    accept="images/*"
                                    name = "image"
                                    id = "image"
                                    className={classes.input}
                                    onChange={(e) => setImagePath(e.target.files[0])}
                                    multiple
                                    type="file"
                                    hidden
                                />
                                <label htmlFor="image">
                                    <Button variant="contained" color="primary" component="span">
                                        Dodaj zdjęcie
                                    </Button>
                                </label>

                                <Button variant="contained"  onClick={submitData} >
                                    Dodaj
                                </Button>
                            </form>

                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

