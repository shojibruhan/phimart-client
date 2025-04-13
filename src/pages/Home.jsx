import React from 'react';

import HeroCarousel from '../components/Home/Carousel/HeroCarousel';
import Features from '../components/Home/Features';
import Products from '../components/Products/Products';
import Discountsection from '../components/Home/Discount/Discountsection';
import Category from '../components/Home/Categories/Category';

const Home = () => {
    return (
        <div>
            <HeroCarousel />
            <Features />
            <Category />
            <Products />
            <Discountsection />
        </div>
    );
};

export default Home;