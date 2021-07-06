import React, {useState, useEffect} from "react";
import api from '../../../api';
import {Grid, Button, TextField} from "@material-ui/core";
import Magazine from "./Magazine/Magazine";
import {Link} from 'react-router-dom';
import Footer from "../../Footer";
import './Magazines.css';
import Book from "../books/Book/Book";
import AddBook from "../books/BookForms/AddBook";

function Magazines(){
    const [magazines, setMagazines] = useState(null);

    useEffect(() => {
        getData();
    },[]);

    async function getData(){
        api.getAllMagazines().then(res => {
            const result =  res.data
            setMagazines(result.data);
        });
    }

    const renderMagazines = () => {
        if(!magazines){
            return(
                <p>Ładowanie...</p>
            )
        }
        if(magazines.length === 0){
            return(
                <p>Brak czasopism</p>
            )
        }

        return magazines.reverse().map((magazine) => (
            <Grid item key={magazine.id} xs={12} sm={6} md={4} lg={3}>
                <Magazine data={magazine}/>
            </Grid>
        ))
    }

    return(
        <>
            <div className='Container'>


                <Grid container justify="center" >
                    {renderMagazines()}
                </Grid>
            </div>
            <Footer/>
        </>
    )
}

export default Magazines;
