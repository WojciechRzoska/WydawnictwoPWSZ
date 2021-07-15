import React, {useEffect, useState, useCallback} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./ScrollToTop";
import Home from "./components/pages/Home";
import Books from "./components/pages/books/Books";
import EditBook from "./components/pages/books/BookForms/EditBook";
import BookInfo from "./components/pages/books/Book/BookInfo";
import Bulletins from "./components/pages/bulletins/Bulletins";
import EditBulletin from "./components/pages/bulletins/BulletinForms/EditBulletin";
import BulletinInfo from "./components/pages/bulletins/Bulletin/BulletinInfo";
import Magazines from "./components/pages/magazines/Magazines";
import MagazineInfo from "./components/pages/magazines/Magazine/MagazineInfo";
import EditMagazine from "./components/pages/magazines/MagazineForms/EditMagazine";
import Login from "./components/pages/account/Login";
import AdminPanel from "./components/pages/account/AdminPanel";
import Forget from "./components/pages/account/Forget";
import Reset from "./components/pages/account/Reset";
import AddUser from "./components/pages/account/AccountForms/AddUser";
import MagazineTable from "./components/pages/account/AccountForms/MagazineTable";
import AddMagazine from "./components/pages/magazines/MagazineForms/AddMagazine";
import BulletinTable from "./components/pages/account/AccountForms/BulletinTable";
import AddBulletin from "./components/pages/bulletins/BulletinForms/AddBulletin";
import BookTable from "./components/pages/account/AccountForms/BookTable";
import AddBook from "./components/pages/books/BookForms/AddBook";
import api from "./api";





function Header(){
    const [user, setUser] = useState('');

    useEffect(()=> {
            async function getUser() {
                api.getDataUser()
                    .then((res) => {
                        settingUser(res.data)
                    })
                    .catch(e => {
                        console.error('fail', e);
                    });
            }
            getUser()
        },[])

    const settingUser = (user) =>{
        setUser(user);
    }

    return(
        <>
            <Router>
                <Navbar user={user} settingUser={settingUser}/>
                <ScrollToTop/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/books' exact component={Books}/>
                    <Route path='/edit-book/:id' component={EditBook}/>
                    <Route path='/book-info/:id' component={BookInfo}/>
                    <Route path='/bulletins' exact component={Bulletins}/>
                    <Route path='/edit-bulletin/:id' component={EditBulletin}/>
                    <Route path='/bulletin-info/:id' component={BulletinInfo}/>
                    <Route path='/magazines' exact component={Magazines}/>
                    <Route path='/magazine-info/:id' component={MagazineInfo}/>
                    <Route path='/edit-magazine/:id' component={EditMagazine}/>
                    <Route path='/login' exact component={()=> <Login user={user} settingUser={settingUser}/>}/>
                    <Route path='/admin-panel' exact component={()=> <AdminPanel user={user} />}/>
                    <Route path='/forget' exact component={Forget}/>
                    <Route path='/reset/:id' exact component={Reset}/>
                    <Route path='/add-user' exact component={AddUser}/>
                    <Route path='/magazine-panel' exact component={MagazineTable}/>
                    <Route path='/add-magazine' exact component={AddMagazine}/>
                    <Route path='/add-bulletin' exact component={AddBulletin}/>
                    <Route path='/bulletin-panel' exact component={BulletinTable}/>
                    <Route path='/book-panel' exact component={BookTable}/>
                    <Route path='/add-book' exact component={AddBook}/>


                </Switch>

            </Router>

        </>
    )
}

export default Header;
