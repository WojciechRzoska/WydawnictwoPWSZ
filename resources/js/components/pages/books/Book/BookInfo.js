import React, {useState, useEffect} from "react";
import api from "../../../../api";
import { withRouter } from 'react-router-dom';
import {Grid, Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import  './BookInfo.css';
import Footer from "../../../Footer";


function BookInfo(props){
    const[object,setObject] = useState([]);



    useEffect(() => {
        async function fetchMyApi() {
            let result = await api.getOneBook(props.match.params.id);
            result = await result.data;
            setObject(result);

        }
        fetchMyApi()
    },[])
    return(
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
                            Opis: <a href={`/${object.pdf_path}`} > spis treści [PDF]</a>
                        </p>
                    </div>
                        <div className='prize'>
                            <p>Cena: {object.price} zł</p>
                            <div className='button'>
                            <Button variant="contained"  className='buy' >
                                Kup
                            </Button>
                            </div>
                        </div>
                    </div>

                </Grid>
            </Grid>

        </div>
            <Footer/>
        </>
    );
}


export default withRouter(BookInfo);
