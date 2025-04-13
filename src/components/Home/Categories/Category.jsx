import React, { useEffect, useState } from 'react';
import apiClient from '../../../services/api-client';
import CategoriItems from './CategoriItems';

const Category = () => {
    const [categories, setCategories]= useState([])
    const [isLoading, setLoading]= useState(false)

    useEffect(()=> {
        setLoading(true)
        apiClient
        .get('/categories/')
        .then(res => setCategories(res.data))
        .finally(()=> setLoading(false))
    }, [])
    return (
        <section className='px-4 py-12 max-w-7xl mx-auto'>
            {/* Category Heading  */}
            <div className='flex justify-between items-center px-4 py-8 mb-4'>
                <h2 className='text-3xl md:text-5xl font-bold'>Browse Products</h2>
                <a href="#" className='btn btn-secondary px-6 py-6 rounded-full text-sm' >View All</a>
            </div>
            {/* spiner */}

            {isLoading && (
                    <div className='flex justify-center py-10 items-center'>
                        <span className="loading loading-spinner loading-xl text-secondary"></span>
                    </div>  
                )}

            {/* Category Grid  */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {categories.map((category, index)=> (
                    <CategoriItems key={category.id} category={category} index={index} />
                ))}
            </div>
        </section>
    );
   
};

export default Category;