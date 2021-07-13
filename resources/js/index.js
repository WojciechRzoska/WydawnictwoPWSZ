import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
import Home from './components/pages/Home';
import Books from "./components/pages/books/Books";
import EditBook from "./components/pages/books/BookForms/EditBook";
import BookInfo from './components/pages/books/Book/BookInfo';
import ScrollToTop from "./ScrollToTop";
import Bulletins from './components/pages/bulletins/Bulletins';
import EditBulletin from "./components/pages/bulletins/BulletinForms/EditBulletin";
import BulletinInfo from './components/pages/bulletins/Bulletin/BulletinInfo';
import Magazines from "./components/pages/magazines/Magazines";
import MagazineInfo from "./components/pages/magazines/Magazine/MagazineInfo";
import EditMagazine from "./components/pages/magazines/MagazineForms/EditMagazine";
import Login from "./components/pages/account/Login";
import Panel from "./components/pages/account/Panel";
import Header from "./Header";


const axios = window.axios;
axios.defaults.headers.common['Authorization']='Bearer '+localStorage.getItem('token')

function Index(){

        return (
            <Header/>
        );

}

export default Index;

// DOM element
if (document.getElementById('Index')) {
    ReactDOM.render(<Index />, document.getElementById('Index'));
}
