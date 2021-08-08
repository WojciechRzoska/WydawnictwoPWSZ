import React from "react";
import textData from './footerPages.json';
import './FooterPages.css';
import Footer from "../../Footer";

function Rules() {

    return (
        <>
            <div className='Container'>
                <h1>{textData["1"].title}</h1>
                <div className='text' dangerouslySetInnerHTML={{__html: textData["1"].text}}></div>
            </div>
            <Footer/>
        </>
    )
}


export default Rules;
