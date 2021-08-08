import React, {useEffect, useState} from 'react';
import {Button, TextField, Typography} from "@material-ui/core";
import {withRouter, Redirect, useHistory} from 'react-router-dom';
import './EditBook.css';
import api from "../../../../api";


function EditBook(props) {
    const [object, setObject] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image_path, setImagePath] = useState('');
    const [pages, setPages] = useState('');
    const [pdf_path, setPdfPath] = useState('');
    const [year, setYear] = useState('');
    const [ISBN, setISBN] = useState('');
    const [publisher, setPublisher] = useState('');
    const [price, setPrice] = useState('');
    const [edit_image, setEditImage] = useState('');
    const [quantity, setQuantity] = useState('');

    const [errorTitle, setErrorTitle] = useState('');
    const [errorPages, setErrorPages] = useState('');
    const [errorISBN, setErrorISBN] = useState('');
    const [errorYear, setErrorYear] = useState('');
    const [errorPublisher, setErrorPublisher] = useState('');
    const [errorPrice, setErrorPrice] = useState('');
    const [errorQuantity, setErrorQuantity] = useState('');


    let history = useHistory();

    if (!localStorage.getItem('token')) {
        return <Redirect to={'/login'}/>
    }

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
            setQuantity(result.quantity);
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
        fData.append('description', description);
        fData.append('image', edit_image);
        fData.append('pages', pages);
        fData.append('pdf', pdf_path);
        fData.append('year', year);
        fData.append('ISBN', ISBN);
        fData.append('publisher', publisher);
        fData.append('price', price);
        fData.append('quantity', quantity);


        api.updateBook(object.id, fData)
            .then(res => {
                console.log('response', res);
                history.goBack();
            }).catch(e => {
            console.error('fail', e.response.data.errors);
            setErrorTitle(e.response.data.errors.title);
            setErrorPages(e.response.data.errors.pages);
            setErrorYear(e.response.data.errors.year);
            setErrorISBN(e.response.data.errors.ISBN);
            setErrorPublisher(e.response.data.errors.publisher);
            setErrorPrice(e.response.data.errors.price);
            setErrorQuantity(e.response.data.errors.quantity);
        });

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
                    <TextField
                        id="standard-required"
                        label="Opis"
                        value={description}
                        fullWidth
                        multiline
                        onChange={e => setDescription(e.target.value)}
                    />


                    <TextField
                        id="standard-required"
                        label="Liczba stron"
                        value={pages}
                        fullWidth
                        onChange={e => setPages(e.target.value)}
                    />
                    <Typography className='formError' color='error'>{errorPages}</Typography>

                    <TextField
                        id="standard-required"
                        label="Rok"
                        value={year}
                        fullWidth
                        onChange={e => setYear(e.target.value)}
                    />
                    <Typography className='formError' color='error'>{errorYear}</Typography>
                    <TextField
                        id="standard-required"
                        label="ISBN"
                        value={ISBN}
                        fullWidth
                        onChange={e => setISBN(e.target.value)}
                    />
                    <Typography className='formError' color='error'>{errorISBN}</Typography>
                    <TextField
                        id="standard-required"
                        label="wydawca"
                        value={publisher}
                        fullWidth
                        multiline
                        onChange={e => setPublisher(e.target.value)}
                    />
                    <Typography className='formError' color='error'>{errorPublisher}</Typography>
                    <TextField
                        id="standard-required"
                        label="Cena"
                        value={price}
                        fullWidth
                        onChange={e => setPrice(e.target.value)}
                    />
                    <Typography className='formError' color='error'>{errorPrice}</Typography>
                    <TextField
                        id="standard-required"
                        label="Ilość dostępnych egzemplarzy"
                        value={quantity}
                        fullWidth
                        onChange={e => setQuantity(e.target.value)}
                    />
                    <Typography className='formError' color='error'>{errorQuantity}</Typography>

                    <input name='pdf' id='pdf' type='file' hidden onChange={handlePDF}/>
                    <label htmlFor="pdf">
                        <Button variant="contained" color="primary" component="span">
                            Dodaj plik
                        </Button>
                    </label>
                    <input name='image' id='image' type='file' hidden onChange={handleIMG}/>
                    <label htmlFor="image">
                        <Button variant="contained" color="primary" component="span">
                            Dodaj zdjęcie
                        </Button>
                    </label>

                    <Button variant="contained" onClick={editData}>
                        Edytuj
                    </Button>
                </form>
                <img id='cover' src={`/${image_path}`}/>
            </div>
        </div>

    );
};

export default withRouter(EditBook);
