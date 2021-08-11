import React, {useEffect, useState} from "react";
import TextData from '../../footerPages/footerPages.json';
import {TextField, NativeSelect, Button, TableCell, Typography} from "@material-ui/core";
import './AddForms.css';
import api from "../../../../api";
import {Link, Redirect} from 'react-router-dom';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import * as InlineEditor from '@ckeditor/ckeditor5-build-classic';


function PageEdit() {
    const [index, setIndex] = useState(Object.keys(TextData)[0]);
    const [text, setText] = useState(TextData[`${index}`]["text"]);
    const [title, setTitle] = useState(TextData[`${index}`]["title"]);
    const [newIndex, setNewIndex] = useState(Object.keys(TextData)[0]);

    const [errorTitle, setErrorTitle] = useState('');
    const [errorText, setErrorText] = useState('');

    if (!localStorage.getItem('token')) {
        return <Redirect to={'/login'}/>
    }


    useEffect(() => {

        if (index != newIndex) {
            const anotherText = TextData[`${newIndex}`]["text"];
            const anotherTitle = TextData[`${newIndex}`]["title"];
            setText(anotherText);
            setTitle(anotherTitle);
            setIndex(newIndex);
        }

    },)

    const handleOptions = () => {
        return Object.keys(TextData).map((page, i) => (
            <option value={page} key={i}>{TextData[page]["title"]}</option>
        ))
    }
    const handleChange = (e) => {
        setNewIndex(e.target.value);
    }

    const handleEditor = (e, editor) => {
        let data = editor.getData();
        setText(data);
    }
    const editData = e => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('id', index);
        fData.append('title', title);
        fData.append('text', text);


        api.editText(fData)
            .then(res => {
                console.log('response', res);
                setTimeout(() => window.location.reload(), 1000);
            }).catch(e => {
            console.error('fail', e.response.data.errors);
            setErrorTitle(e.response.data.errors.title);
            setErrorText(e.response.data.errors.text);
        });


    }

    const deleteOperation = e => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('id', index);

        api.deleteText(fData)
            .then(res => {
                console.log('response', res);
                setTimeout(() => window.location.reload(), 1000);
            }).catch(e => {
            console.error('fail', e);
        });


    }
    const handleDeleteButton = () => {
        const arrayKeys = Object.keys(TextData).map(data => data).length;
        if (arrayKeys === 1) {
            return <Button variant='contained' disabled color='secondary'
                           onClick={deleteOperation}>Usuń</Button>
        } else {
            return <Button variant='contained'  color='secondary'
                           onClick={deleteOperation}>Usuń</Button>
        }
    }

return (
    <div className='contentPageEdit'>
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
                    Czasopisma naukowe
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
        <div className='form'>
            <form className='inputs'>
                <NativeSelect
                    defaultValue={Object.keys(TextData)[0]}
                    onChange={handleChange}
                    fullWidth
                >
                    {handleOptions()}
                </NativeSelect>
                <TextField multiline
                           fullWidth
                           label="Tytuł"
                           value={title}
                           onChange={e => setTitle(e.target.value)}/>
                <Typography className='formError' color='error'>{errorTitle}</Typography>

                <CKEditor editor={InlineEditor} data={text} onChange={handleEditor}/>
                <Typography className='formError' color='error'>{errorText}</Typography>
                <Button variant="contained" onClick={editData}>
                    Edytuj
                </Button>
                {handleDeleteButton()}
            </form>

        </div>
    </div>
)

}

export default PageEdit;
