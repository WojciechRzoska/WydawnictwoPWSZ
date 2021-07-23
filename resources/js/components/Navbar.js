import React, {useState, useEffect} from 'react';
import {NavLink, Redirect, useHistory} from 'react-router-dom';
import './Navbar.css';
import Logo from '../../images/WhiteLogo.png';



function Navbar() {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    let history = useHistory();


    const closeMobileMenu = () => setClick(false);

    const logout = () => {
        history.push('/');
        localStorage.clear();
        history.go(0)
    }



    let Login = () => {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('role') === 'admin') {
                return (
                    <>
                        <li className='Nav-item'>
                            <NavLink to='/admin-panel' onClick={closeMobileMenu} className='Nav-links'>Admin</NavLink>
                        </li>
                        <li className='Nav-item'>
                            <NavLink to='/book-panel' onClick={closeMobileMenu} className='Nav-links'>Panel</NavLink>
                        </li>
                        <li className='Nav-item'>
                            <NavLink to='/#' onClick={logout} className='Nav-links'>Wyloguj</NavLink>
                        </li>
                    </>
                )
            } else {
                return (
                    <>
                        <li className='Nav-item'>
                            <NavLink to='/book-panel' onClick={closeMobileMenu} className='Nav-links'>Panel</NavLink>
                        </li>
                        <li className='Nav-item'>
                            <NavLink to='/#' onClick={logout} className='Nav-links'>Wyloguj</NavLink>
                        </li>
                    </>
                )
            }

        } else {
            return (
                <li className='Nav-item'>
                    <NavLink to='/login' className='Nav-links' onClick={closeMobileMenu}>Zaloguj</NavLink>
                </li>
            )
        }

    }

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
                                     to='/magazines'
                                     className='Nav-links'
                                     onClick={closeMobileMenu}>
                                Czasopisma naukowe
                            </NavLink>
                        </li>
                        {Login()}

                    </ul>


                </div>
            </nav>
        </>
    )
}

export default Navbar;

