import React, {useEffect, useState} from 'react';
import './Book.css';
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";



function Book(props) {
    const image = `/${props.data.image_path}`;




    return(
        <div className='cardData'>
            <div className='cardImage'>
                <Link
                       to={`/book-info/${props.data.id}`}
                    >
                    <div className='item-img'>
                        <img className='imag' src={image} alt={props.data.title}/>
                        </div>
                    </Link>
            </div>
        </div>

    );
}

export default Book;
