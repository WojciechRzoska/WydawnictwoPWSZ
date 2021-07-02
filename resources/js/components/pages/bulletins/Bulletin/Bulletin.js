import React from 'react';
import './Bulletin.css';
import {Link} from 'react-router-dom';

function Bulletin(props){
    const image = `/${props.data.image_path}`;

    return(
      <div className='Box'>
          <Link to={`/bulletin-info/${props.data.id}`}>
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
export default Bulletin;
