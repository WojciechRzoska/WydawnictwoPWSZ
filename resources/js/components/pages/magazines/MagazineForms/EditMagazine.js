import React, {useEffect, useState} from "react";
import {withRouter, Redirect, useHistory} from 'react-router-dom';
import {Button, TextField, Typography} from "@material-ui/core";
import api from '../../../../api';
import './EditMagazine.css';

function EditMagazine(props) {
    const [item, setItem] = useState([]);

    const [title, setTitle] = useState('');
    const [ISSN, setISSN] = useState('');
    const [release, setRelease] = useState('');
    const [image_path, setImagePath] = useState('');
    const [edit_image, setEditImage] = useState('');
    const [edit_pdf, setEditPDF] = useState('');

    const [errorTitle, setErrorTitle] = useState('');
    const [errorISSN, setErrorISSN] = useState('');
    const [errorRelease, setErrorRelease] = useState('');

    let history = useHistory();

    if (!localStorage.getItem('token')) {
        return <Redirect to={'/login'}/>
    }

    useEffect(() => {
        async function fetchMyApi() {
            let result = await api.getOneMagazine(props.match.params.id);
            result = await result.data;
            setItem(result);
            setTitle(result.title);
            setISSN(result.ISSN);
            setRelease(result.release);
            setImagePath(result.image_path);

        }

        fetchMyApi()
    }, [])

    const handlePDF = (e) => {
        let pdfs = e.target.files;
        setEditPDF(pdfs);
    }

    const handleIMG = (e) => {
        let img = e.target.files[0];
        setEditImage(img);
    }

    async function deleteOperation(id) {
        await api.deleteMagazineFile(id);
        window.location.reload();
    }

    const editData = e => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('title', title);
        fData.append('ISSN', ISSN);
        fData.append('release', release);
        fData.append('image', edit_image);
        for (let i = 0; i < edit_pdf.length; i++) {
            fData.append(`pdfs[${i}]`, edit_pdf[i])
        }

        api.updateMagazine(item.id, fData)
            .then(res => {
                console.log('response', res);
                history.goBack();
            }).catch(e => {
            console.error('fail', e.response.data.errors);
            setErrorTitle(e.response.data.errors.title);
            setErrorISSN(e.response.data.errors.ISSN);
            setErrorRelease(e.response.data.errors.release);
        });


    }

    function files() {
        if (item.magazine_files !== undefined) {
            return item.magazine_files.map((file, i) => (
                <p className='pdf' key={i}>{file.pdf_path}
                    <Button variant='contained' onClick={() => deleteOperation(file.id)}>Usuń</Button>
                </p>


            ));
        }
    }

    return (
        <div className='content'>
            <div className='form'>
                <form className='root'>
                    <TextField id="standard-required"
                               label="Tytuł"
                               value={title}
                               fullWidth
                               multiline
                               onChange={e => setTitle(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorTitle}</Typography>
                    <TextField id="standard-required"
                               label="ISSN"
                               value={ISSN}
                               fullWidth
                               multiline
                               onChange={e => setISSN(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorISSN}</Typography>
                    <TextField id="standard-required"
                               label="Data wydania"
                               value={release}
                               fullWidth
                               multiline
                               onChange={e => setRelease(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorRelease}</Typography>
                    {files()}
                    <input name='image' id='image' type='file' hidden onChange={handleIMG}/>
                    <label htmlFor="image">
                        <Button variant="contained" color="primary" component="span">
                            Dodaj zdjęcie
                        </Button>
                    </label>
                    <input name='pdf' id='pdf' type='file' hidden multiple onChange={handlePDF}/>
                    <label htmlFor="pdf">
                        <Button variant="contained" color="primary" component="span">
                            Dodaj pliki
                        </Button>
                    </label>
                    <Button variant="contained" onClick={editData}>
                        Edytuj
                    </Button>
                </form>
                <img id='cover' src={`/${image_path}`}/>
            </div>
        </div>
    )
}

export default withRouter(EditMagazine);
