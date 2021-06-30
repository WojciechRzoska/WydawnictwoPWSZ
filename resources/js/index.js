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

function Index() {
    return (
        <>
            <Router>
                <ScrollToTop/>
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/books' exact component={Books}/>
                    <Route path='/edit/:id' component={EditBook}/>
                    <Route path='/info/:id' component={BookInfo}/>
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
