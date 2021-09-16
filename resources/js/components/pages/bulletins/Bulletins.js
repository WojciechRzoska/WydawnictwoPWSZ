import React, {useState, useEffect} from "react";
import api from '../../../api';
import {Grid, Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import Bulletin from "./Bulletin/Bulletin";
import Footer from "../../Footer";
import Pagination from "../../Pagination";


function Bulletins() {
    const [bulletins, setBulletins] = useState([]);
    const [searchData, setSearchData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [bulletinsPerPage, setBulletinsPerPage] = useState (6);


    useEffect(() => {
        const getData = async () => {
            const res = await api.getAllBulletins();
            setBulletins(res.data.data);
        }
        getData();
    }, []);

    const indexOfLastBook = currentPage * bulletinsPerPage;
    const indexOfFirstBook = indexOfLastBook - bulletinsPerPage;
    const currentBooks = bulletins.slice(indexOfFirstBook, indexOfLastBook);
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    async function search(key) {
        let result = await api.searchBulletin(key);
        result = await result.data
        setSearchData(result);

    }

    const renderBulletins = () => {
        if (!bulletins) {
            return (
                <p>Ładowanie...</p>
            )
        }
        if (bulletins.length === 0) {
            return (
                <p>Brak biuletynów</p>
            )
        }
        let reverseBulletin = currentBooks.map(item => item).reverse();
        if (searchData) {
            let data = searchData;
            if (data.length === 0) {
                return (
                    <p> Nie znaleziono takiego biuletynu </p>
                )
            } else {
                let reverseData = data.map(item => item).reverse();
                return reverseData.map((bulletin) => (
                    <Grid item key={bulletin.id} xs={12} sm={6} md={4} lg={3}>
                        <Bulletin data={bulletin}/>
                    </Grid>
                ))
            }
        }
        return reverseBulletin.map((bulletin) => (
            <Grid item key={bulletin.id} xs={12} sm={6} md={4} lg={3}>
                <Bulletin data={bulletin}/>
            </Grid>
        ))
    }


    return (
        <>
            <div className='Container'>
                <h1>Biuletyny PWSZ</h1>
                <div className='itemsHeader'>
                    <div className='searchHeader'>
                <TextField fullWidth placeholder='Szukaj biuletynu' onChange={(e) => search(e.target.value)}/>
                    </div>
                </div>
                <Grid container justify='center'>
                    {renderBulletins()}
                </Grid>

            </div>
            <div className='paginationBar'>
                <Pagination booksPerPage={bulletinsPerPage} totalBooks={bulletins.length} paginate={paginate}/>
            </div>
            <Footer/>
        </>
    )
}

export default Bulletins;
