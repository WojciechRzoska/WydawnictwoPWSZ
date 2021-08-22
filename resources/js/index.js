import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Header from "./Header";


const axios = window.axios;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

function Index() {

    return (
        <Header/>
    );

}

export default Index;

// DOM element
if (document.getElementById('Index')) {
    ReactDOM.render(<Index/>, document.getElementById('Index'));
}
