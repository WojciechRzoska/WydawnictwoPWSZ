import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button } from "./Button";
import './Navbar.css';
import Logo from '../../images/WhiteLogo.png';
import api from "../api";
import { Link } from '@material-ui/core';



function Navbar(props) {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    let history = useHistory();


    const closeMobileMenu = () => setClick(false);

    const logout = () =>{
        history.push('/');
        localStorage.clear();
        props.settingUser(null);
        history.go(0)
    }

    const Login = () =>{
        if(localStorage.getItem('token')){
            return(
            <li className='Nav-item'>
            <Link component="button" onClick={logout} className='Nav-links'>Wyloguj</Link>
            </li>)



        }else {
            return (
                <li className='Nav-item'>
                <NavLink to='/login' className='Nav-links'>Zaloguj</NavLink>
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
                                    Czasopisma
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

