import React from 'react';
import Card from './Card';
import './CardsSection.css';
import Books from '../../images/BooksCard.jpg'
import Bulletin from '../../images/Bulletin.jpg';
import Magazines from '../../images/Magazines.jpg';

function CardsSection(){
    return(
        <div className='Cards-section' id='CardsSection'>
            <h1>Sprawdź co oferujemy!</h1>
            <div className='Cards-container'>
                <div className='Cards-wrapper' >
                    <ul className='Cards-items'>
                        <Card
                            src={Books}
                            text='Nasze publikacje'
                            path='/books'
                        />
                        <Card
                            src={Magazines}
                            text='Czasopisma naukowe Państwowej Wyższej Szkoły Zawodowej w Elblągu'
                            path='/bulletins'
                        />
                        <Card
                            src={Bulletin}
                            text='Biuletyny PWSZ'
                            path='/bulletins'
                        />
                    </ul>

                </div>
            </div>
        </div>
    );
}
export default CardsSection;
