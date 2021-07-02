import React, {useState, useEffect} from "react";
import api from '../../../../api';
import { withRouter } from 'react-router-dom';
import {Grid, Button} from "@material-ui/core";
import Footer from "../../../Footer";
import './BulletinInfo.css';

function BulletinInfo(props){
    const[object, setObject] = useState([]);

    useEffect(() => {
        async function fetchMyApi() {
            let result = await api.getOneBulletin(props.match.params.id);
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
                        <div className='Infoblock'>
                            <h4>{object.title}</h4>
                            <div className='Info'>
                                <p className='pdf'>
                                    Opis:<a href={`/${object.pdf_path}`} >[PDF]</a>
                                </p>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Footer/>
        </>
    )
}
export default withRouter(BulletinInfo);
