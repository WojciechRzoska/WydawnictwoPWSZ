import React from "react";
import textData from './footerPages.json';
import './FooterPages.css';
import Footer from "../../Footer";

function PrivacyPolicy() {

    return (
        <>
            <div className='Container'>
                <h1>{textData["0"].title}</h1>
                <div className='text' dangerouslySetInnerHTML={{__html: textData["0"].text}}></div>
            </div>
            <Footer/>
        </>
    )
}


export default PrivacyPolicy;
