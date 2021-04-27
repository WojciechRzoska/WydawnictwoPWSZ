import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

                        <Link to='/' className='Navbar-Logo'>
                            <img src={Logo} alt='logo'/>
                        </Link>
                        <div className='Menu-icon' onClick={handleClick}>
                            <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                        </div>
                        <ul className={click ? 'Nav-menu active' : 'Nav-menu'}>
                            <li className='Nav-item'>
                                <Link to='/' className='Nav-links' onClick={closeMobileMenu}>
                                    Sklep
                                </Link>
                            </li>
                            <li className='Nav-item'>
                                <Link to='/' className='Nav-links' onClick={closeMobileMenu}>
                                    Biuletyny
                                </Link>
                            </li>
                            <li className='Nav-item'>
                                <Link to='/' className='Nav-links' onClick={closeMobileMenu}>
                                    Czasopisma
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/sign-up' className='Nav-links-mobile' onClick={closeMobileMenu}>
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                        {button && <Button buttonStyle={'btn--outline'}>Zaloguj</Button>}
                    </div>
                </nav>
            </>
        )
}

export default Navbar;

