import React from 'react';
import {Button} from "./Button";
import './WelcomeSection.css';
import './Button.css';
import {HashLink as Link} from 'react-router-hash-link';

function WelcomeSection(){
    return(
        <div className='Page-section'>
            <h1>Wydawnictwo PWSZ w Elblągu</h1>
            <p>Publikacje, biuletyny, czasopisma</p>
            <div className='Buttons'>
                <Link to='#CardsSection'>
                    <button className='btn btn--primary btn--large'>Zobacz co oferujemy</button>
                </Link>
                <Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large' to='books'>Przejdź do sklepu</Button>
            </div>
        </div>

    )
}

export default WelcomeSection;
