import React from "react";
import textData from './footerPages.json';
import './FooterPages.css';
import Footer from "../../Footer";

function FooterPages(props) {
    return (
        <>
            <div className='Container'>
                <h1>{textData[props.location.state.id].title}</h1>
                <div className='text' dangerouslySetInnerHTML={{__html: textData[props.location.state.id].text}}></div>
            </div>
            <Footer/>
        </>
    )
}


export default FooterPages;
