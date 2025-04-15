import React from 'react';
import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import About from '../pages/about';
import Product from '../pages/Product';
import MainLayout from '../layouts/MainLayout';
import Shop from '../pages/Shop';
import Login from '../pages/LogIn';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import ActivateAccount from '../components/Registration/ActivateAccount';

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
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='activate/:uid/:token' element={<ActivateAccount />} />
                {/* <Route path='activate' element={<ActivateAccount />} /> */}
                <Route 
                    path='dashboard'
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                } 
                />

            </Route>
            
        </Routes>
    );
};

export default AppRoutes;