import React from 'react';
import {Button} from "./Button";
import './WelcomeSection.css';

function WelcomeSection(){
    return(
        <div className='Page-section'>
            <h1>Wydawnictwo PWSZ</h1>
            <p>Biuletyny ksiązki</p>
            <div className='Buttons'>
            <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>Zobacz co oferujemy</Button>

            <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>Przejdź do sklepu</Button>
            </div>
        </div>
    )
}

export default WelcomeSection;
