import React, {useState, useEffect} from "react";
import api from '../../../api';
import Grid from '@material-ui/core/Grid';
import {Button, TextField} from '@material-ui/core';
import Book from './Book/Book';
import {Link} from 'react-router-dom';
import Footer from "../../Footer";
import './Books.css';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Books() {
    const [books, setBooks] = useState(null);
    const [searchData, setSearchData] = useState(books);
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cart, setCart] = useState(cartFromLocalStorage);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getData();
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

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

    async function getData() {
        api.getAllItems().then(res => {
            const result = res.data;
            setBooks(result.data);
        });
    }

    const quantity = (quantity, data) => {
        if (quantity === 0) {
            return <Button disabled size='large' onClick={() => addToCart(data)}> <i
                className="fas fa-cart-plus fa-2x"/></Button>
        } else {
            return <Button size='large' onClick={() => addToCart(data)}> <i
                className="fas fa-cart-plus fa-2x"/></Button>
        }
    }
    const renderBooks = () => {
        if (!books) {
            return (
                <p>Ładowanie...</p>
            )
        }
        if (books.length === 0) {
            return (
                <p>Brak książek</p>
            )
        }
        let reverseBook = books.map(item => item).reverse();
        if (searchData) {
            // let data = searchData;

            if (searchData.length === 0) {
                return (
                    <p> Nie znaleziono takiej książki </p>
                )
            } else {
                let reverseData = searchData.map(item => item).reverse();
                return reverseData.map((book) => (
                    <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>

                        <Book data={book}/>

                    </Grid>
                ))
            }
        }

        return reverseBook.map((book) => (
            <Grid item key={book.id} xs={7} sm={6} md={4} lg={3}>
                <div className='gridItem'>
                    <Book data={book}/>
                    <div className='cardBody'>
                        <div className='quantity'>
                            <h6>dostępnych sztuk {book.quantity} </h6>
                        </div>
                        <div className='cardBodyBottom'>
                            <div className='price'>
                                <p><span>Cena: {book.price} zł</span></p>
                            </div>
                            <div className='buyButton'>
                                {quantity(book.quantity, book)}
                            </div>
                        </div>

                    </div>
                </div>
            </Grid>
        ))
    }

    async function search(key) {
        let result = await api.searchBook(key);
        result = await result.data;
        setSearchData(result);
    }

    return (
        <>
            <div className='Container'>
                <h1>Nasze publikacje</h1>
                <div className='booksHeader'>
                    <div className='search'>
                        <TextField placeholder='Szukaj produktu'
                                   onChange={(e) => search(e.target.value)}
                                   fullWidth
                        />
                    </div>

                    <div className='cart'>
                        <div className='cartItem'>
                            <Button component={Link}
                                    to='/koszyk'
                            >
                                <i className="fas fa-shopping-cart fa-2x"></i>({cart.length})
                            </Button>
                        </div>
                    </div>
                </div>


                <div className='conent'>
                    <Grid container justify="center">
                        {renderBooks()}
                    </Grid>
                    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Dodano produkt do koszyka!
                        </Alert>
                    </Snackbar>
                </div>
            </div>
            <Footer/>
        </>


    )
}

export default Books;
