import React, {useState} from "react";
import {TextField, Button, Typography} from "@material-ui/core";
import {useHistory, Redirect} from "react-router-dom";
import api from '../../../../api';
import '../../account/AccountForms/AddForms.css';

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
    const [quantity, setQuantity] = useState('');

    const [errorTitle, setErrorTitle] = useState('');
    const [errorPages, setErrorPages] = useState('');
    const [errorISBN, setErrorISBN] = useState('');
    const [errorYear, setErrorYear] = useState('');
    const [errorPublisher, setErrorPublisher] = useState('');
    const [errorPrice, setErrorPrice] = useState('');
    const [errorQuantity, setErrorQuantity] = useState('');
    const [errorImage, setErrorImage] = useState('');
    const [errorPdf, setErrorPdf] = useState('');

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
        fData.append('description', description);
        fData.append('image', image_path);
        fData.append('pages', pages);
        fData.append('pdf', pdf_path);
        fData.append('year', year);
        fData.append('ISBN', ISBN);
        fData.append('publisher', publisher);
        fData.append('price', price);
        fData.append('quantity', quantity);


        api.addBook(fData)
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
            setErrorImage(e.response.data.errors.image);
            setErrorPdf(e.response.data.errors.pdf);
        });

    }

    return (
        <div className='content'>
            <div className='title'>
                <h2>Dodaj książkę</h2>
            </div>

            <div className='addForm'>

                <form className='root' noValidate autoComplete="off" onSubmit={submitData}>
                    <TextField required id="standard-required"
                               label="Tytuł"
                               value={title}
                               fullWidth
                               onChange={e => setTitle(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorTitle}</Typography>
                    <TextField required id="standard-required"
                               label="Opis"
                               multiline
                               rowsMax={4}
                               value={description}
                               fullWidth
                               onChange={e => setDescription(e.target.value)}/>
                    <TextField required id="standard-required"
                               label="Liczba Stron"
                               value={pages}
                               fullWidth
                               onChange={e => setPages(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorPages}</Typography>
                    <TextField required id="standard-required"
                               label="Rok"
                               value={year}
                               fullWidth
                               onChange={e => setYear(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorYear}</Typography>
                    <TextField required id="standard-required"
                               label="ISBN"
                               value={ISBN}
                               fullWidth
                               onChange={e => setISBN(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorISBN}</Typography>
                    <TextField required id="standard-required"
                               label="Autor"
                               value={publisher}
                               fullWidth
                               onChange={e => setPublisher(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorPublisher}</Typography>
                    <TextField required id="standard-required"
                               label="Cena"
                               value={price}
                               fullWidth
                               onChange={e => setPrice(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorPrice}</Typography>
                    <TextField required id="standard-required"
                               label="Ilość dostępnych egzemplarzy"
                               value={quantity}
                               fullWidth
                               onChange={e => setQuantity(e.target.value)}/>
                    <Typography className='formError' color='error'>{errorQuantity}</Typography>
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
                        <Typography className='formError' color='error'>{errorImage}</Typography>
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
                            Dodaj plik
                        </Button>
                        <p>{pdf_path.name}</p>
                        <Typography className='formError' color='error'>{errorPdf}</Typography>
                    </label>


                    <Button variant="contained" onClick={submitData}>
                        Dodaj
                    </Button>
                </form>
            </div>
        </div>

    )

}
