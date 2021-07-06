import React, {useState, useEffect} from "react";
import api from "../../../../api";
import {withRouter} from 'react-router-dom';
import {Grid, Button} from '@material-ui/core';
import './MagazineInfo.css';
import Footer from "../../../Footer";

function MagazineInfo(props){
    const [item, setItem] = useState([]);


    useEffect(() => {
        async function fetchMyApi() {
            let result = await api.getOneMagazine(props.match.params.id);
            result = await result.data
            setItem(result);

        }
        fetchMyApi()
    },[])


    function a(){
        if(item.magazine_files !== undefined) {
            return item.magazine_files.map((file,i) => (
              <a className='pdf' key={i} href={`/${file.pdf_path}`}>[pdf{i+1}]</a>
            ));

        }
    }



    return(
        <>
            <div className='container'>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <div className='Info-img'>
                            <img className='img' src={`/${item.image_path}`}/>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} container>
                        <div className='infoblock'>
                            <h4>{item.title}</h4>
                            <div className='Info'>
                                <p className='ISSN'>
                                    ISSN: <span> {item.ISSN}</span>
                                </p>
                                <p className='release'>
                                    Data wydania: <span> {item.release}</span>

                                </p>
                                <p>
                                    {a()}

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

export default withRouter(MagazineInfo);
