import React, { useState, useEffect  } from "react";
import api from '../../../api';
import Grid from '@material-ui/core/Grid';
import {Button, TextField} from '@material-ui/core';
import Book from './Book/Book';
import AddBook from "./BookForms/AddBook";
import { Link } from 'react-router-dom';
import EditBook from "./BookForms/EditBook";
import Footer from "../../Footer";
import './Books.css';

function Books() {
    const [books,setBooks] = useState(null);
    const [searchData, setSearchData] =useState(books);

    useEffect(()=> {
        getData();
    }, []);

    async function deleteOperation(id){
        let result = await api.deleteBook(id);
        result=await result.data
        console.warn(result);
        getData();
    }
    async function getData(){
        api.getAllItems().then(res => {
            const result = res.data;
            setBooks(result.data)
        });
    }
    const renderBooks = () => {
        if(!books){
            return(
                <p>Ładowanie...</p>
            )
        }
        if(books.length == 0){
            return(
                <p>Brak książek</p>
            )
        }
        if(searchData){
            let data = searchData;
            if(data.length === 0){
                return(
                    <p> Nie znaleziono takiej książki </p>
                )
            }else {
                return data.reverse().map((book) => (
                    <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                        <Link to={`/edit/${book.id}`}> edit</Link>
                        <Button variant="contained" onClick={() => deleteOperation(book.id)}>usuń</Button>
                        <Book data={book}/>
                    </Grid>
                ))
            }
        }

        return books.reverse().map((book) => (
            <Grid item key={book.id} xs={7} sm={6} md={4} lg={3}>
                <Link to={`/edit/${book.id}`} > edit</Link>
                <Button variant="contained" onClick={()=>deleteOperation(book.id)}>usuń</Button>
                <Book data={book} />
            </Grid>
        ))
    }
    async function search(key){
        let result = await api.searchBook(key);
        result = await result.data;
        setSearchData(result);
    }

    return(
        <>
        <div className='container'>
            <AddBook />
            <TextField placeholder='Szukaj produktu' onChange={(e) =>search(e.target.value)}/>
            <Grid container justify="center" >
                {renderBooks()}
            </Grid>
        </div>
            <Footer/>
        </>


    );
}

export default Books;
