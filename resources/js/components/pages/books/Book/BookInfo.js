import React, {useState, useEffect} from "react";
import api from "../../../../api";
import {withRouter} from 'react-router-dom';
import {Grid, Button} from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import './BookInfo.css';
import Footer from "../../../Footer";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function BookInfo(props) {
    const [object, setObject] = useState([]);
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cart, setCart] = useState(cartFromLocalStorage);
    const [open, setOpen] = useState(false);

    const addToCart = (book) => {
        setCart([...cart, book]);
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        async function fetchMyApi() {
            let result = await api.getOneBook(props.match.params.id);
            result = await result.data;
            setObject(result);

        }

        localStorage.setItem('cart', JSON.stringify(cart));
        fetchMyApi()
    }, [cart])


    const quantity = (quantity) => {
        if (quantity === 0) {
            return <Button disabled variant="contained" className='buy'>
                Kup
            </Button>
        } else {
            return <Button variant="contained" className='buy' onClick={() => addToCart(object)}>
                Kup
            </Button>
        }
    }

    return (
        <>
            <div className='container'>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <div className='Info-img'>
                            <img className='img' src={`/${object.image_path}`}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} container>
                        <div className='infoblock'>
                            <h4>{object.title}</h4>
                            <div className='Info'>
                                <p className='ISBN'>
                                    ISBN: <span> {object.ISBN}</span>
                                </p>
                                <p className='year'>
                                    Data wydania: <span> {object.year}</span>
                                </p>
                                <p className='pdf'>
                                    <span>Opis: {object.description}</span>
                                    <a href={`/${object.pdf_path}`}> spis treści [PDF]</a>
                                </p>
                            </div>
                            <div className='prize'>
                                <p>Cena: {object.price} zł</p>
                                <div className='button'>
                                    {quantity(object.quantity)}
                                </div>
                            </div>
                        </div>

                    </Grid>
                </Grid>
                <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Dodano produkt do koszyka!
                    </Alert>
                </Snackbar>
            </div>
            <Footer/>
        </>
    );
}


export default withRouter(BookInfo);
