import React, {useState} from "react";
import {TextField, Button} from "@material-ui/core";
import {useHistory, Redirect} from "react-router-dom";
import api from '../../../../api';
import '../../account/AccountForms/AddForms.css';

export default function AddBulletin() {
    const [title, setTitle] = useState('');
    const [image_path, setImagePath] = useState('');
    const [pdf_path, setPdfPath] = useState('');

    let history = useHistory();

    if (!localStorage.getItem('token')) {
        return <Redirect to={'/login'}/>
    }

    const handlePDF = (e) => {
        let pdf = e.target.files[0];
        setPdfPath(pdf);
    }

    const handleIMG = (e) => {
        let img = e.target.files[0];
        setImagePath(img);
    }
    const submitData = e => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('title', title);
        fData.append('image', image_path);
        fData.append('pdf', pdf_path);

        api.addBulletin(fData)
            .then(res => {
                console.log('response', res);
            }).catch(e => {
            console.error('fail', e);
        });
        history.goBack();
    }

    return (
        <div className='content'>
            <div className='title'>
                <h2>Dodaj biuletyn</h2>
            </div>
            <div className='addForm'>
                <form className='root' noValidate autoComplete="off" onSubmit={submitData}>
                    <TextField required id="standard-required"
                               label="Tytuł"
                               value={title}
                               fullWidth
                               onChange={e => setTitle(e.target.value)}/>
                    <input
                        name='image'
                        id="image"
                        className='input'
                        onChange={handleIMG}
                        type="file"
                        hidden
                    />
                    <label htmlFor="image">
                        <Button variant="contained" color="primary" component="span">
                            Dodaj zdjęcie
                        </Button>
                        <p>{image_path.name}</p>
                    </label>

                    <input
                        name='pdf'
                        id="pdf"
                        className='input'
                        onChange={handlePDF}
                        type="file"
                        hidden
                    />
                    <label htmlFor="pdf">
                        <Button variant="contained" color="primary" component="span">
                            Dodaj pliki
                        </Button>
                        <p>{pdf_path.name}</p>
                    </label>
                    <Button variant="contained" onClick={submitData}>
                        Dodaj
                    </Button>
                </form>
            </div>
        </div>

    )

}
