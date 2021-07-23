import React from 'react';
import './Bulletin.css';
import {Link} from 'react-router-dom';

function Bulletin(props){
    const image = `/${props.data.image_path}`;

    return(
    <div className='bulletinData'>
        <div className='cardImage'>
            <Link
                to={`/bulletin-info/${props.data.id}`}
            >
                <div className='item-img'>
                    <img className='imag' src={image} alt={props.data.title}/>
                </div>
                <div className='bulletinBody'>
                    <div className='Title'>
                        {props.data.title}
                    </div>
                </div>
            </Link>
        </div>
    </div>
    );
}
export default Bulletin;
