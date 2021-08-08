import React, {useEffect, useState} from "react";
import TextData from '../../FooterPages/footerPages.json';
import {TextField, NativeSelect, Button} from "@material-ui/core";
import './AddForms.css';
import api from "../../../../api";
import {Link, Redirect} from 'react-router-dom';
import { CKEditor }from '@ckeditor/ckeditor5-react';
import * as InlineEditor from '@ckeditor/ckeditor5-build-classic';


function PageEdit() {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState(TextData[`${index}`]["text"]);
    const [title, setTitle] = useState(TextData[`${index}`]["title"]);
    const [newIndex, setNewIndex] =useState('');

    if (!localStorage.getItem('token')) {
        return <Redirect to={'/login'}/>
    }

    useEffect(() =>{
        if(index !=  newIndex){
            const anotherText = TextData[`${newIndex}`]["text"];
            const anotherTitle = TextData[`${newIndex}`]["title"];
            setText(anotherText);
            setTitle(anotherTitle);
            setIndex(newIndex);
        }
    })

    const handleChange = (e) => {
        setNewIndex(e.target.value);
    }

    const handleEditor = (e, editor) =>{
        let data = editor.getData();
        setText(data);
    }
    const editData = e => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('id',index);
        fData.append('title', title);
        fData.append('text', text);


        api.editText(fData)
            .then(res => {
                console.log('response', res);
            }).catch(e => {
            console.error('fail', e);
        });
        window.location.reload();

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
            </div>
            <div className='form'>
                <form className='inputs'>
                    <NativeSelect
                        defaultValue={0}
                        onChange={handleChange}
                        fullWidth
                    >
                        <option value={0}>Polityka prywatności</option>
                        <option value={1}>Regulamin</option>
                    </NativeSelect>
                    <TextField multiline
                               fullWidth
                               label="Tytuł"
                               value={title}
                               onChange={e => setTitle(e.target.value)}/>
                    {/*<TextField multiline*/}
                    {/*           fullWidth*/}
                    {/*           label="tekst"*/}
                    {/*           value={text}*/}
                    {/*           onChange={e => setText(e.target.value)}/>*/}
                    <CKEditor editor={InlineEditor} data={text} onChange={handleEditor}/>
                    <Button variant="contained" onClick={editData}  >
                        Edytuj
                    </Button>
                </form>

            </div>
        </div>
    )

}

export default PageEdit;
