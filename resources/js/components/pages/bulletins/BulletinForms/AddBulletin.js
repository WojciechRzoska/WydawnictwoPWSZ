import React, { useState } from "react";
import {Fade, Backdrop, TextField, Button, Modal} from "@material-ui/core";
import api from '../../../../api';
import useStyles from './stylesAdd';

export default function AddBulletin(){
    const [title, setTitle] = useState('');
    const [image_path, setImagePath] = useState('');
    const [pdf_path, setPdfPath] = useState('');
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePDF = (e) => {
        let pdf = e.target.files[0];
        setPdfPath(pdf);
    }

    const submitData = e => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('title',title);
        fData.append('image',image_path);
        fData.append('pdf',pdf_path);

        api.addBulletin(fData)
            .then(res => {
                console.log('response', res);
            }).catch(e=>{
                console.error('fail', e);
        });
        window.location.reload();
    }

    return(
        <div>
            <button type='button' onClick={handleOpen}>
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
                        <h2>Dodaj biuletyn</h2>
                        <form className={classes.root} noValidate autoComplete="off" onSubmit={submitData}>
                            <TextField required id="standard-required"
                                       label="Tytuł"
                                       value={title}
                                       onChange={e => setTitle(e.target.value)} />
                            <input
                                name = 'image'
                                id = "image"
                                className={classes.input}
                                onChange={(e) => setImagePath(e.target.files[0])}
                                type="file"
                                hidden
                            />
                            <label htmlFor="image">
                                <Button variant="contained" color="primary" component="span">
                                    Dodaj zdjęcie
                                </Button>
                            </label>

                            <input
                                name = 'pdf'
                                id = "pdf"
                                className={classes.input}
                                onChange={handlePDF}
                                type="file"
                                hidden
                            />
                            <label htmlFor="pdf">
                                <Button variant="contained" color="primary" component="span">
                                    Dodaj plik
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
    )
}
