import React, {useState} from "react";
import {Button, NativeSelect, TextField, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import * as InlineEditor from "@ckeditor/ckeditor5-build-classic";
import api from "../../../../api";
import TextData from "../../footerPages/footerPages.json";
import textData from "../../footerPages/footerPages.json";


function PageAdd() {
    const [text, setText] = useState('');
    const [title, setTitle] =useState('');

    const [errorTitle, setErrorTitle] = useState('');
    const [errorText, setErrorText] = useState('');

    const arrayKeys = Object.keys(TextData).map(data=>data).length;


    const handleEditor = (e, editor) =>{
        let data = editor.getData();
        setText(data);
    }

    const addData = e => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('title', title);
        fData.append('text', text);


        api.addText(fData)
            .then(res => {
                console.log('response', res);
                setTimeout(() => window.location.reload(), 1000);
            }).catch(e => {
            console.error('fail', e.response.data.errors);
            setErrorTitle(e.response.data.errors.title);
            setErrorText(e.response.data.errors.text);
        });

    }

    const handleList = () =>{

        if(arrayKeys === 0){
           return <p>Brak stron</p>
        }else{
            return Object.keys(textData).map((link, i) => (
                <li key={i}> {textData[link]["title"]}</li>

            ))
        }
    }

    const handleEditButton = () =>{
        if(arrayKeys === 0){
            return(
                <Button component={Link}
                        to='/edycja-informacji'
                        variant='contained'
                        disabled
                >
                    Lista i edycja stron
                </Button>
            )
        } else {
            return(
                <Button component={Link}
                        to='/edycja-informacji'
                        variant='contained'
                >
                    Lista i edycja stron
                </Button>
            )
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
            </div>
            {handleEditButton()}
            <div className='form'>
                <form className='inputs'>
                    <TextField multiline
                               fullWidth
                               label="Tytuł"
                               value={title}
                               onChange={e => setTitle(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorTitle}</Typography>
                    <CKEditor editor={InlineEditor} data={text} onChange={handleEditor}/>
                    <Typography className='formError' color='error'>{errorText}</Typography>
                    <Button variant="contained" onClick={addData}>
                        Dodaj
                    </Button>
                </form>

            </div>
            <div className='list'>
                <ul>{handleList()}</ul>
            </div>
        </div>
    )
}

export default PageAdd;
