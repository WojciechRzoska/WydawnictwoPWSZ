import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "./Button";
import './Navbar.css';
import Logo from '../../images/WhiteLogo.png';



function Navbar() {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    useEffect(() => {
        showButton();
    }, []);


    window.addEventListener('resize', showButton);

        return (
            <>
                <nav className='Navbar'>
                    <div className='Navbar-container'>

                        <NavLink to='/' className='Navbar-Logo'>
                            <img src={Logo} alt='logo'/>
                        </NavLink>
                        <div className='Menu-icon' onClick={handleClick}>
                            <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                        </div>
                        <ul className={click ? 'Nav-menu active' : 'Nav-menu'}>
                            <li className='Nav-item'>
                                <NavLink exact activeClassName='Active-link'
                                         to='/books'
                                         className='Nav-links'
                                         onClick={closeMobileMenu}>
                                    Sklep
                                </NavLink>
                            </li>
                            <li className='Nav-item'>
                                <NavLink exact activeClassName='Active-link'
                                         to='/bulletins'
                                         className='Nav-links'
                                         onClick={closeMobileMenu}>
                                    Biuletyny
                                </NavLink>
                            </li>
                            <li className='Nav-item'>
                                <NavLink exact activeClassName='Active-link'
                                         to='/'
                                         className='Nav-links'
                                         onClick={closeMobileMenu}>
                                    Czasopisma
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    exact activeClassName='Active-link'
                                    to='/sign-up'
                                    className='Nav-links-mobile'
                                    onClick={closeMobileMenu}>
                                    Sign Up
                                </NavLink>
                            </li>
                        </ul>
                        {button && <Button buttonStyle={'btn--outline'}>Zaloguj</Button>}
                    </div>
                </nav>
            </>
        )
}

export default Navbar;

