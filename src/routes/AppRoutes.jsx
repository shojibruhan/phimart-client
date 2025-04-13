import React from 'react';
import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import About from '../pages/about';
import Product from '../pages/Product';
import MainLayout from '../layouts/MainLayout';
import Shop from '../pages/Shop';

const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route index element={<Home />}></Route>
            <Route path='about' element={<About />} /> */}
            <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='products' element={<Product />} />
                <Route path='about' element={<About />} />
                <Route path='shop' element={<Shop />} />

            </Route>
            
        </Routes>
    );
};

export default AppRoutes;