import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './index.css';
import Home from './components/pages/Home';

function Index() {
    return (
        <>
            <Router>
                <Navbar/>
                <Switch>
                    <Route path='/' exact component={Home} />
                </Switch>
            </Router>

        </>

    );
}

export default Index;

// DOM element
if (document.getElementById('landingPage')) {
    ReactDOM.render(<Index />, document.getElementById('landingPage'));
}
