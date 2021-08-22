import React from 'react';
import { Link } from 'react-router-dom';


function Card(props){
    return(
        <>
            <li className='Card'>
                <Link className='Card-link' to={props.path}>
                    <figure className='Card-item'>
                        <img
                            src={props.src}
                            className='Card-img'
                            alt='Card Image'

                        />
                    </figure>
                    <div className='Card-info'>
                        <h5 className='Card-text'>{props.text}</h5>
                    </div>
                </Link>
            </li>
        </>
    )
}
export default Card;
