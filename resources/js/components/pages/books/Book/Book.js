import React, {useState} from 'react';
import './Book.css';
import {Link} from "react-router-dom";
// import { Link,} from '@material-ui/core';
import BookInfo from './BookInfo';



function Book(props) {

    const image = `/${props.data.image_path}`;



    return(
        <div className='Box'>
            <Link
               to={`/book-info/${props.data.id}`}
            >
            <div className='Box-img'>
                <img className='image' src={image} alt={props.data.title}/>
                </div>
            <div className='Details'>
                <div className='Title'>
                    {props.data.title}
                </div>
            </div>
            </Link>

        </div>

    );
}

export default Book;
