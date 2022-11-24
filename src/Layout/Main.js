import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Pages/Shared/Nav/Nav'
import Footer from '../Pages/Shared/Footer/Footer'

const Main = () => {
    return (
        <section>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </section>
    );
};

export default Main;