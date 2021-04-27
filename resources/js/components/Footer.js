import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import Logo from '../../images/WhiteLogo.png';

function Footer() {
    return(
        <div className='Footer-container'>
            <div className='Footer'>
                <div className='Footer-heading'>
                    <img src={Logo} alt='logo' className='Logo'/>
                    <p>Państwowa Wyższa Szkoła Zawodowa w Elblągu</p>
                    <div className='Footer-info-data'>
                        <div className='Info-data-row'>
                            <i className="fa fa-home"/>
                            ul. Wojska Polskiego 1, 82-300 Elbląg
                        </div>
                        <div className='Info-data-row'>
                            <i className="fa fa-phone"/>
                            +48 55 629 05 05
                        </div>
                        <div className='Info-data-row'>
                            <i className="fa fa-fax"/>
                            +48 55 629 05 10
                        </div>
                        <div className='Info-data-row'>
                            <i className="fa fa-envelope"/>
                            <a href="mailto:pwsz@pwsz.elblag.pl">pwsz@pwsz.elblag.pl</a>
                        </div>
                        <div className='Info-data-row'>
                            <a href="https://pwsz.elblag.pl/kontakt.html">więcej informacji</a>
                        </div>
                    </div>
                </div>
                <div className='Footer-heading'>
                    <h2>Na skróty</h2>
                    <Link to='/sign-up'>link1</Link>
                    <Link to='/'>link2</Link>
                    <Link to='/'>link3</Link>
                    <Link to='/'>link4</Link>
                    <Link to='/'>link5</Link>
                    <div className='Social'>
                        <h2>Media społecznościowe</h2>
                        <div className='Socials-icons'>
                            <Link
                                class='Social-icon-link'
                                to='/'
                                target='_blank'
                                aria-label='Facebook'
                            >
                                <i className='fab fa-facebook-f'/>
                            </Link>
                            <Link
                                class='Social-icon-link'
                                to='/'
                                target='_blank'
                                aria-label='Instagram'
                            >
                                <i className='fab fa-instagram'/>
                            </Link>
                            <Link
                                class='Social-icon-link'
                                to='/'
                                target='_blank'
                                aria-label='Youtube'
                            >
                                <i className='fab fa-youtube'/>
                            </Link>
                            <Link
                                class='Social-icon-link twitter'
                                to='/'
                                target='_blank'
                                aria-label='Twitter'
                            >
                                <i className='fab fa-twitter'/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Footer;
