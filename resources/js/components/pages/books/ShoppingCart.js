import React, {useEffect, useState} from "react";
import {TableContainer, TableHead, TableRow, TableBody, Table, TableCell, TextField, Button} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import './ShoppingCart.css';
import {Redirect} from 'react-router-dom';
import api from "../../../api";

function ShoppingCart() {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cart, setCart] = useState(cartFromLocalStorage);
    const [description, setDescription] = useState([]);
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');

    const removeFromCart = (deleteItem) => {
        cart.splice(deleteItem, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.reload();
    }

    useEffect(() => {
        descriptionHandle()
        totalPrice()
    }, [cart])
    const submitData = e => {
        e.preventDefault();
        const fData = new FormData();
        fData.append('description', description.join());
        fData.append('email', email);
        fData.append('amount', amount);



        api.registerToken(fData)
            .then(res=>{
                console.log('response', res)
                window.location.replace(`https://sandbox.przelewy24.pl/trnRequest/${res.data.data.token}`);
            }).catch(e =>{
                console.error('error',e)
        })
    }

    const directHandle = () =>{
       return <Redirect push to="wp.pl" />
    }
    const totalPrice = () => {
        const reduce = cart.reduce((sum, {price}) => sum + price, 0);

        return setAmount(reduce * 100);
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
    const descriptionHandle = () =>{
        const newArray = cart.map(book => (book.title));
        setDescription([...description, newArray]);

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

                    {/*<form className='root' noValidate autoComplete="off"   action="https://sklep.przelewy24.pl/zakup.php?">*/}
                    {/*    <TextField  id="standard-required"*/}
                    {/*                name="z24_id_sprzedawcy"*/}
                    {/*                value="151177" fullWidth hidden*/}

                    {/*    />*/}
                    {/*    <TextField  id="standard-required"*/}
                    {/*                name="z24_crc"*/}
                    {/*                value="2c6da7466f6140f9" fullWidth hidden*/}

                    {/*    />*/}
                    {/*    <TextField  id="standard-required"*/}
                    {/*                name="z24_kwota"*/}
                    {/*                value={totalPrice()*100} fullWidth hidden*/}

                    {/*    />*/}
                    {/*    <TextField  id="standard-required"*/}
                    {/*                name="z24_nazwa"*/}
                    {/*                value='abc' fullWidth hidden*/}

                    {/*    />*/}

                    {/*    <TextField  id="standard-required"*/}
                    {/*                name="p24_merchant_id"*/}
                    {/*                value="151177" fullWidth hidden*/}
                    {/*    />*/}
                    {/*    <TextField  id="standard-required"*/}
                    {/*                name="p24_pos_id"*/}
                    {/*                value="151177" fullWidth hidden*/}
                    {/*    />*/}
                    {/*    <TextField  id="standard-required"*/}
                    {/*                name="p24_sign"*/}
                    {/*                value="151177|e6658e54a233ab60" fullWidth*/}
                    {/*    />*/}


                    {/*    <p>suma {totalPrice()} zł</p>*/}

                    {/*</form>*/}

                    {/*<form action="https://sandbox.przelewy24.pl/api/v1/transaction/register" method="post" className="form">*/}
                    {/*    <input type="text" name="merchantId" value="151177"/>*/}
                    {/*    <input type="text" name="posId" value="151177"/>*/}
                    {/*    <input type="text" name="sessionId" value="e70b9fd5-c8e5-4f83-ac59-d6189233afc0"/>*/}
                    {/*    <input type="text" name="amount" value="2000"/>*/}
                    {/*    <input type="text" name="currency" value="PLN"/>*/}
                    {/*    <input type="text" name="country" value="pl"/>*/}
                    {/*    <input type="text" name="description" value="TYTUŁ"/>*/}
                    {/*    <input type="text" name="email" value="fxjechanka@wp.pl"/>*/}

                    {/*    <input type="text" name="urlReturn" value="http://myhost.pl/skrypt_ok.php"/>*/}

                    {/*    <input type="hidden" name="sign" value="631799fd6c5f231f4ed5db43946155a57a454088c4602f133cb1b9bac33d1b273629fd468a9dd30ed10edd4535781c9f"/>*/}
                    {/*    <input name="submit_send" value="wyślij" type="submit"/>*/}
                    {/*</form>*/}
                    <form className='root' noValidate autoComplete="off" onSubmit={submitData}>
                        <TextField required id="standard-required"
                                   label="Email"
                                   value={email}
                                   fullWidth
                                   onChange={e => setEmail(e.target.value)}/>
                        <Button variant="contained" onClick={submitData}>
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

