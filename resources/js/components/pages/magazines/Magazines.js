import React, {useState, useEffect} from "react";
import api from '../../../api';
import {Grid, Button, TextField} from "@material-ui/core";
import Magazine from "./Magazine/Magazine";
import {Link} from 'react-router-dom';
import Footer from "../../Footer";
import './Magazines.css';
import Pagination from "../../Pagination";


function Magazines() {
    const [magazines, setMagazines] = useState([]);
    const [searchData, setSearchData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [magazinesPerPage, setMagazinesPerPage] = useState (6);

    useEffect(() => {
        const getData = async () => {
            const res = await api.getAllMagazines();
            setMagazines(res.data.data);
        }
        getData();
    }, []);

    const indexOfLastBook = currentPage * magazinesPerPage;
    const indexOfFirstBook = indexOfLastBook - magazinesPerPage;
    const currentBooks = magazines.slice(indexOfFirstBook, indexOfLastBook);
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    async function search(key) {
        let result = await api.searchMagazine(key);
        result = await result.data
        setSearchData(result);
    }

    const renderMagazines = () => {
        if (!magazines) {
            return (
                <p>Ładowanie...</p>
            )
        }
        if (magazines.length === 0) {
            return (
                <p>Brak czasopism</p>
            )
        }
        let reverseMagazine = currentBooks.map(item => item).reverse();
        if (searchData) {
            let data = searchData
            if (data.length === 0) {
                return <p> Nie znaleziono takiego czasopisma</p>
            } else {
                let reverseData = data.map(item => item).reverse();
                return reverseData.map((magazine) => (
                    <Grid item key={magazine.id} xs={12} sm={6} md={4} lg={3}>
                        <Magazine data={magazine}/>
                    </Grid>
                ))

            }
        }
        return reverseMagazine.map((magazine) => (
            <Grid item key={magazine.id} xs={12} sm={6} md={4} lg={3}>
                <Magazine data={magazine}/>
            </Grid>
        ))
    }

    return (
        <>
            <div className='Container'>
                <h1>Rozprawy Naukowe i Zawodowe PWSZ w Elblągu</h1>
                <div className='itemsHeader'>
                    <div className='searchHeader'>
                    <TextField fullWidth placeholder='Szukaj czasopism' onChange={(e) => search(e.target.value)}/>
                    </div>
                </div>
                <Grid container justify="center">
                    {renderMagazines()}
                </Grid>

            </div>
            <div className='paginationBar'>
                <Pagination booksPerPage={magazinesPerPage} totalBooks={magazines.length} paginate={paginate}/>
            </div>
            <Footer/>
        </>
    )
}

export default Magazines;
