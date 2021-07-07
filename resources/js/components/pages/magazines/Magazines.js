import React, {useState, useEffect} from "react";
import api from '../../../api';
import {Grid, Button, TextField} from "@material-ui/core";
import Magazine from "./Magazine/Magazine";
import {Link} from 'react-router-dom';
import Footer from "../../Footer";
import './Magazines.css';

import AddMagazine from "./MagazineForms/AddMagazine";

function Magazines(){
    const [magazines, setMagazines] = useState(null);
    const [searchData, setSearchData] =useState(magazines);

    useEffect(() => {
        getData();
    },[]);

    async function getData(){
        api.getAllMagazines().then(res => {
            const result =  res.data
            setMagazines(result.data);
        });

    }
    async function deleteOperation(id){
        await api.deleteMagazine(id);
        getData();
    }
    async function search(key){
        let result = await api.searchMagazine(key);
        result = await result.data
        setSearchData(result);
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
        let reverseMagazine = magazines.map(item=>item).reverse();
        if(searchData){
            let data = searchData
            if(data.length === 0){
                return <p> Nie znaleziono takiego czasopisma</p>
            }else {
                let reverseData = data.map(item=>item).reverse();
                return reverseData.map((magazine) => (
                    <Grid item key={magazine.id} xs={12} sm={6} md={4} lg={3}>
                        <Link to={`/edit-magazine/${magazine.id}`}>Edit</Link>
                        <Button variant='contained' onClick={() => deleteOperation(magazine.id)}>Usuń</Button>
                        <Magazine data={magazine}/>
                    </Grid>
                ))

            }
        }
        return reverseMagazine.map((magazine) => (
            <Grid item key={magazine.id} xs={12} sm={6} md={4} lg={3}>
                <Link to={`/edit-magazine/${magazine.id}`}>Edit</Link>
                <Button variant='contained' onClick={() => deleteOperation(magazine.id)}>Usuń</Button>
                <Magazine data={magazine}/>
            </Grid>
        ))
    }

    return(
        <>
            <div className='Container'>
            <AddMagazine/>
                <TextField placeholder='Szukaj czasopism' onChange={(e) =>search(e.target.value)}/>
                <Grid container justify="center">
                    {renderMagazines()}
                </Grid>
            </div>
            <Footer/>
        </>
    )
}

export default Magazines;
