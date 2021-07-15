import React, {useEffect, useState} from 'react';
import {withRouter, useHistory, Redirect} from 'react-router-dom';
import {Button, TextField} from "@material-ui/core";
import api from '../../../../api';
import './EditBulletin.css';

function EditBulletin(props) {
    const [object, setObject] = useState([]);

    const [title, setTitle] = useState('');
    const [image_path, setImagePath] = useState('');
    const [pdf_path, setPdfPath] = useState('');
    const [edit_image, setEditImage] = useState('');

    let history = useHistory();

    if (!localStorage.getItem('token')) {
        return <Redirect to={'/login'}/>
    }

    useEffect(() => {
        async function fetchMyApi() {
            let result = await api.getOneBulletin(props.match.params.id);
            result = await result.data;
            setObject(result);
            setTitle(result.title);
            setImagePath(result.image_path);
            setPdfPath(result.pdf_path);
        }

        fetchMyApi()
    }, [])

    const handlePDF = (e) => {
        let pdf = e.target.files[0];
        setPdfPath(pdf);
    }

    const handleIMG = (e) => {
        let img = e.target.files[0];
        setEditImage(img);
    }

    const editData = e => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('title', title);
        fData.append('image', edit_image);
        fData.append('pdf', pdf_path);

        api.updateBulletin(object.id, fData)
            .then(res => {
                console.log('response', res);
            }).catch(e => {
            console.error('fail', e);
        });
        history.goBack();

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
                    <input name='image' id='image' type='file' hidden onChange={handleIMG}/>
                    <label htmlFor="image">
                        <Button variant="contained" color="primary" component="span">
                            Dodaj zdjęcie
                        </Button>
                    </label>
                    <input name='pdf' id='pdf' type='file' hidden onChange={handlePDF}/>
                    <label htmlFor="pdf">
                        <Button variant="contained" color="primary" component="span">
                            Dodaj plik
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

export default withRouter(EditBulletin);
