import React from 'react';
import './Magazine.css';
import {Link} from "react-router-dom";

function Magazine(props){

    const image = `/${props.data.image_path}`;

    return(
        <div className='Box'>
            <Link
                to={`/magazine-info/${props.data.id}`}
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

export default Magazine;
