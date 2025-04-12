import React from 'react';

import HeroCarousel from '../components/Carousel/HeroCarousel';
import Features from '../components/Features';
import Products from '../components/Products/Products';
import Discountsection from '../components/Discount/Discountsection';
import Category from '../components/Categories/Category';

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