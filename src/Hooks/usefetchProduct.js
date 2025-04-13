import React, { useEffect, useState } from 'react';
import apiClient from '../services/api-client';



const useFetchProduct = (
        currentlPage,
        priceRange,
        selectedCategory,
        searchQuery,
        sortOrder
    ) => {
    const [products, setProducts]= useState([])
    const [isLoading, setLoading]= useState(false)
    const [totalPages, setTotalPage]= useState(0)
   
    useEffect(() => {
        const fetchProduct = async() => {
            setLoading(true)
            const url= `/products/?category_id=${selectedCategory}&price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&page=${currentlPage}&search=${searchQuery}&ordering=${sortOrder}`
            try {
                const response= await apiClient.get(url)
                const data= await response.data
    
                setProducts(data.results)
                setTotalPage(Math.ceil(data.count /data.results.length))
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false)
            }
        };
        fetchProduct()

    }, [currentlPage, priceRange, selectedCategory, searchQuery, sortOrder]);
    return {products, isLoading, totalPages}
};

export default useFetchProduct 