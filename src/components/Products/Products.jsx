import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { Navigation } from 'swiper/modules';
import {Swiper, SwiperSlide } from 'swiper/react';
import apiClient from '../../services/api-client';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import ErrorAlert from './ErrorAlert';


const Products = () => {
    const [products, setProducts]= useState([])
    const [isLoading, setLoading]= useState(false)
    const [error, setError]= useState("")
    useEffect(() => {
        setLoading(true)
        apiClient
        .get("/products/")
        .then(res => setProducts(res.data.results))
        .catch(err => setError(err.message))
        .finally(()=> setLoading(false))
    }, []);
    return (
        <section className='bg-gray-50 py-8 mx-auto'>
            <div className='px-4 py-12 max-w-7xl mx-auto'>
                <div className='flex justify-between items-center px-4 py-8 mb-4'>
                    <h2 className='text-3xl md:text-5xl font-bold'>Trending Products</h2>
                    <a href="#" className='btn btn-secondary px-6 py-6 rounded-full text-sm' >View All</a>
                </div>

                {/* spiner */}

                {isLoading && (
                    <div className='flex justify-center py-10 items-center'>
                        <span className="loading loading-spinner loading-xl text-secondary"></span>
                    </div>  
                )}

                {/* Error Alert  */}
                {error && <ErrorAlert error={error}/>}

                {/* Product slider  */}
                {!isLoading && !error && products.length >0 &&
                (
                    <Swiper
                        modules= {[Navigation]}
                        spaceBetween= {10}
                        slidesPerView= {1}
                        navigation
                        breakpoints={{
                            640: {slidesPerView: 2},
                            1024: {slidesPerView: 3},
                        }}
                        className='mt-4 px-4 container'
                        >
                            {products.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <ProductItem key={product.id} product={product} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                )}
                {!isLoading && !error && products.length === 0 && (
                    <p className='text-center text-gray-500 mt-10'>No Product Available.</p>
                
                )}
            </div>
        </section>
    );
};

export default Products;