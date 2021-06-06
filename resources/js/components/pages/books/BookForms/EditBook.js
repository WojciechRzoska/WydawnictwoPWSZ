import React, {useEffect, useState} from 'react';
import {Button, TextField, Input} from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import api from "../../../../api";

function EditBook(props) {
    const[object,setObject] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image_path, setImagePath] = useState('');
    const [pages, setPages] = useState('');
    const [pdf_path, setPdfPath] = useState('');
    const [year, setYear] = useState('');
    const [ISBN, setISBN] = useState('');
    const [publisher, setPublisher] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        async function fetchMyApi() {
            let result = await api.getOneBook(props.match.params.id);
            result = await result.data;
            setObject(result);
            setTitle(result.title);
            setDescription(result.description);
            setImagePath(result.image_path);
            setPages(result.pages);
            setPdfPath(result.pdf_path);
            setYear(result.year);
            setISBN(result.ISBN);
            setPublisher(result.publisher);
            setPrice(result.price);
        }
        fetchMyApi()
    },[])


    const editData = e =>{

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

        api.updateBook(object.id,fData)
            .then(res => {
                console.log('response', res);
            }).catch(e=>{
            console.error('fail',e);
        });
        console.warn(title, description, image_path, pages, pdf_path, year, ISBN, publisher, price);
    }
    return(
        <form>
            <TextField  id="standard-required"
                       label="Tytuł"
                       value={title}
                       onChange={e => setTitle(e.target.value)} />

            <TextField
                       id="standard-required"
                       label="Opis"
                       value={description}
                       onChange={e => setDescription(e.target.value)}
            />


            <TextField
                       id="standard-required"
                       label="Liczba stron"
                       value={pages}
                       onChange={e => setPages(e.target.value)}
            />

            <TextField
                       id="standard-required"
                       label="plik pdf"
                       value={pdf_path}
                       onChange={e => setPdfPath(e.target.value)}
            />
            <TextField
                       id="standard-required"
                       label="Rok"
                       value={year}
                       onChange={e => setYear(e.target.value)}
            />

            <TextField
                       id="standard-required"
                       label="ISBN"
                       value={ISBN}
                       onChange={e => setISBN(e.target.value)}
            />

            <TextField
                       id="standard-required"
                       label="wydawca"
                       value={publisher}
                       onChange={e => setPublisher(e.target.value)}
            />

            <TextField
                       id="standard-required"
                       label="Cena"
                       value={price}
                       onChange={e => setPrice(e.target.value)}
            />
            <input type='file' onChange={e => setImagePath(e.target.files[0])}/>
            <img src={`/${object.image_path}`}/>
            <Button variant="contained"  onClick={editData} >

            </Button>
            </form>

    );
};

export default withRouter(EditBook);
