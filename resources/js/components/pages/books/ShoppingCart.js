import React, {useEffect, useState} from "react";
import {TableContainer, TableHead, TableRow, TableBody, Table, TableCell, TextField, Button} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import './ShoppingCart.css';


function ShoppingCart() {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cart, setCart] = useState(cartFromLocalStorage);


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
                    <form className='root' noValidate autoComplete="off"   action="https://sklep.przelewy24.pl/zakup.php?">
                        {/*<TextField  id="standard-required"*/}
                        {/*            name="z24_id_sprzedawcy"*/}
                        {/*            value="151177" fullWidth*/}

                        {/*/>*/}
                        {/*<TextField  id="standard-required"*/}
                        {/*            name="z24_crc"*/}
                        {/*            value="2c6da7466f6140f9" fullWidth*/}

                        {/*/>*/}
                        {/*<TextField  id="standard-required"*/}
                        {/*            name="z24_kwota"*/}
                        {/*            value={totalPrice()*100} fullWidth*/}

                        {/*/>*/}
                        {/*<TextField  id="standard-required"*/}
                        {/*            name="z24_nazwa"*/}
                        {/*            value='abc' fullWidth*/}

                        {/*/>*/}

                        {/*<TextField  id="standard-required"*/}
                        {/*            name="p24_merchant_id"*/}
                        {/*            value="151177" fullWidth*/}
                        {/*/>*/}
                        {/*<TextField  id="standard-required"*/}
                        {/*            name="p24_pos_id"*/}
                        {/*            value="151177" fullWidth*/}
                        {/*/>*/}
                        {/*<TextField  id="standard-required"*/}
                        {/*            name="p24_sign"*/}
                        {/*            value="151177|e6658e54a233ab60" fullWidth*/}
                        {/*/>*/}


                        <p>suma {totalPrice()} zł</p>
                        <Button variant="contained" type="submit">
                            Przejdź do płatności
                        </Button>
                    </form>

                    <form action="https://sandbox.przelewy24.pl/trnDirect" method="post" className="form">
                        <input type="text" name="p24_session_id" value="abcdefghi"/>
                        <input type="text" name="p24_merchant_id" value="151177"/>
                        <input type="text" name="p24_pos_id" value="151177"/>
                        <input type="text" name="p24_amount" value="2000"/>
                        <input type="text" name="p24_currency" value="PLN"/>
                        <input type="text" name="p24_description" value="TYTUŁ"/>
                        <input type="text" name="p24_client" value="Jan Kowalski"/>
                        <input type="text" name="p24_address" value="ul. Polska 33/33"/>
                        <input type="text" name="p24_zip" value="66-777"/>
                        <input type="text" name="p24_city" value="Poznań"/>
                        <input type="text" name="p24_country" value="PL"/>
                        <input type="text" name="p24_email" value="email@host.pl"/>
                        <input type="text" name="p24_language" value="pl"/>
                        <input type="text" name="p24_url_return" value="http://myhost.pl/skrypt_ok.php"/>
                        <input type="text" name="p24_api_version" value="3.2"/>
                        <input type="hidden" name="p24_sign" value="582e86b99b28eec7cbe5a4b84c7fcd31"/>
                        <input name="submit_send" value="wyślij" type="submit"/>
                    </form>

                </div>
                </div>

            </div>
        </>
    )
}

export default ShoppingCart;

