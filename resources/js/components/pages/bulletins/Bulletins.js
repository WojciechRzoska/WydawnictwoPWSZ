import React, { useState, useEffect } from "react";
import api from '../../../api';
import { Grid, Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import Bulletin from "./Bulletin/Bulletin";
import Footer from "../../Footer";
import AddBulletin from "./BulletinForms/AddBulletin";


function Bulletins(){
    const [bulletins, setBulletins] = useState(null);
    const [searchData, setSearchData] =useState(bulletins);

    useEffect(()=> {
        getData();
    }, []);

    async function deleteOperation(id){
        let result = await api.deleteBulletin(id);
        result=await result.data
        console.warn(result);
        getData(); //?
    }
    async function getData(){
        api.getAllBulletins().then(res => {
            const result = res.data;
            setBulletins(result.data)

        });
    }

    async function search(key){
        let result = await api.searchBulletin(key);
        result = await result.data
        setSearchData(result);

    }
    const renderBulletins = () => {
        if(!bulletins){
            return(
                <p>Ładowanie...</p>
            )
        }
        if(bulletins.length === 0){
            return(
                <p>Brak biuletynów</p>
            )
        }
        let reverseBulletin = bulletins.map(item=>item).reverse();
        if(searchData){
            let data = searchData;
            if(data.length === 0){
                return(
                    <p> Nie znaleziono takiego biuletynu </p>
                )
            }else {
                let reverseData = data.map(item=>item).reverse();
                return reverseData.map((bulletin) => (
                    <Grid item key={bulletin.id} xs={12} sm={6} md={4} lg={3}>
                        <Link to={`/edit-bulletin/${bulletin.id}`}>Edit</Link>
                        <Button variant='contained' onClick={() => deleteOperation(bulletin.id)}>Usuń</Button>
                        <Bulletin data={bulletin}/>
                    </Grid>
                ))
            }
        }
        return reverseBulletin.map((bulletin) =>  (
            <Grid item key={bulletin.id} xs={12} sm={6} md={4} lg={3}>
                <Link to={`/edit-bulletin/${bulletin.id}`}>Edit</Link>
                <Button variant='contained' onClick={() => deleteOperation(bulletin.id)}>Usuń</Button>
                <Bulletin data={bulletin}/>
            </Grid>
        ))
    }


    return(
        <>
            <div className='Container'>
                <AddBulletin/>
                <TextField placeholder='Szukaj biuletynu' onChange={(e) =>search(e.target.value)}/>
                <Grid container justify='center'>
                    {renderBulletins()}
                </Grid>
            </div>
            <Footer/>
        </>
    )
}

export default Bulletins;
