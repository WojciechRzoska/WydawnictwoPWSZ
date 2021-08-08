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
                    <p>Wydawnictwo Państwowej Wyższej Szkoły Zawodowowej w Elblągu</p>
                    <div className='Footer-info-data'>
                        <div className='Info-data-row'>
                            <i className="fa fa-home"/>
                            ul. Wojska Polskiego 1, 82-300 Elbląg,
                        </div>
                        <div className='Info-data-row'>
                            <i className="fa fa-phone"/>
                            +48 55 629 05 55
                        </div>
                        <div className='Info-data-row'>
                            <i className="fa fa-envelope"/>
                            <a href="mailto:j.kuna@pwsz.elblag.pl">pwsz@pwsz.elblag.pl</a>
                        </div>
                    </div>
                </div>
                <div className='Footer-heading'>
                    <h2>Informacje</h2>
                    <Link to='/regulamin'>Regulamin</Link>
                    <Link to='/polityka-prywatności'>Polityka prywatności</Link>
                    <div className='Social'>
                        <h2>Media społecznościowe</h2>
                        <div className='Socials-icons'>
                            <a
                                className='Social-icon-link'
                                href='https://www.facebook.com/pwszelblag'
                                target='_blank'
                                aria-label='Facebook'
                            >
                                <i className='fab fa-facebook-f'/>
                            </a>
                            <a
                                className='Social-icon-link'
                                href='https://www.instagram.com/pwsz.elblag/'
                                target='_blank'
                                aria-label='Instagram'
                            >
                                <i className='fab fa-instagram'/>
                            </a>
                            <a
                                className='Social-icon-link'
                                href='https://www.youtube.com/user/pwszelblag'
                                target='_blank'
                                aria-label='Youtube'
                            >
                                <i className='fab fa-youtube'/>
                            </a>
                            <a
                                className='Social-icon-link twitter'
                                href='https://twitter.com/pwszelblag'
                                target='_blank'
                                aria-label='Twitter'
                            >
                                <i className='fab fa-twitter'/>
                            </a>
                            <a
                                className='Social-icon-link snapchat'
                                href='https://story.snapchat.com/@pwszelblag'
                                target='_blank'
                                aria-label='Snapchat'
                            >
                                <i className='fab fa-snapchat'/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Footer;
