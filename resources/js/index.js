import React from 'react';
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

function Index() {
    return (
        <>
            <Router>
                <ScrollToTop/>
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/books' exact component={Books}/>
                    <Route path='/edit-book/:id' component={EditBook}/>
                    <Route path='/book-info/:id' component={BookInfo}/>
                    <Route path='/bulletins' exact component={Bulletins}/>
                    <Route path='/edit-bulletin/:id' component={EditBulletin}/>
                    <Route path='/bulletin-info/:id' component={BulletinInfo}/>
                    <Route path='/magazines' exact component={Magazines}/>
                    <Route path='/magazine-info/:id' component={MagazineInfo}/>

                </Switch>

            </Router>

        </>

    );
}

export default Index;

// DOM element
if (document.getElementById('Index')) {
    ReactDOM.render(<Index />, document.getElementById('Index'));
}
