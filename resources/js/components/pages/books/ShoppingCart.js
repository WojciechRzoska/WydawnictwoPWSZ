import React, {useEffect, useState} from "react";
import {TableContainer, TableHead, TableRow, TableBody, Table, TableCell, TextField, Button} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import './ShoppingCart.css';


function ShoppingCart() {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cart, setCart] = useState(cartFromLocalStorage);

    console.log(cart)
    const removeFromCart = (deleteItem) => {
        cart.splice(deleteItem, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    }

    const totalPrice = () => {
        return cart.reduce((sum, {price}) => sum + price, 0);
    }
    const renderCart = () => {
        if (cart.length === 0) {
            return <p>Koszyk jest pusty</p>
        } else {
            return cart.map((book, i) => (
                <TableRow key={i}>
                    <TableCell component="th" scope="row">
                        <img src={book.image_path}/>
                    </TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell align='right'>{book.price} zł</TableCell>
                    <TableCell align='right'>
                        <button onClick={() => removeFromCart(i)}>usuń</button>
                    </TableCell>
                </TableRow>
            ))
        }
    }
    return (
        <>
            <div className='container'>
                <TableContainer className={'data'}>
                    <Table className='tab' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Produkt</TableCell>
                                <TableCell></TableCell>
                                <TableCell align='right'>Cena</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderCart()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className='cartInfo'>
                <div className='sendForm'>
                    <form className='root' noValidate autoComplete="off">
                        <TextField required id="standard-required"
                                   label="Imie i nazwisko"
                                   fullWidth
                        />
                        <TextField required id="standard-required"
                                   label="email"
                                   fullWidth
                        />
                        <TextField required id="standard-required"
                                   label='miasto'
                                   fullWidth
                        />
                        <TextField required id="standard-required"
                                   label="ulica"
                                   fullWidth
                        />
                        <TextField required id="standard-required"
                                   label="numer domu"
                                   fullWidth
                        />
                        <TextField required id="standard-required"
                                   label="numer lokalu"
                                   fullWidth
                        />
                        <p>Czy jesteś studedntem?
                        <Checkbox

                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                        />
                        </p>
                        <p>suma {totalPrice()} zł</p>
                        <Button variant="contained">
                            Przejdź do płatności
                        </Button>
                    </form>
                </div>
                </div>

            </div>
        </>
    )
}

export default ShoppingCart;

