import React from 'react';
import './Magazine.css';
import {Link} from "react-router-dom";

function Magazine(props){

    const image = `/${props.data.image_path}`;

    return(
        <div className='magazineData'>
            <div className='cardImage'>
                <Link
                    to={`/magazine-info/${props.data.id}`}
                >
                    <div className='item-img'>
                        <img className='imag' src={image} alt={props.data.title}/>
                    </div>
                    <div className='magazineBody'>
                        <div className='Title'>
                            {props.data.title}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Magazine;
