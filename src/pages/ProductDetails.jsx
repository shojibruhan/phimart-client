import React, { Suspense, useEffect, useState } from 'react';
import ProductImageGallery from '../components/ProductDetails.jsx/ProductImageGallery';
import AddtoCartButton from '../components/ProductDetails.jsx/AddtoCartButton';
import { Link, useParams } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import apiClient from '../services/api-client';
import ReviewSection from '../components/Reviews/ReviewSection';
import ReviewForm from '../components/Reviews/ReviewForm';

const ProductDetails = () => {
    const [product, setProduct]= useState(null)
    const [isLoading, setLoding]= useState(false)
    const {productID}= useParams()
    
    useEffect(() => {
        setLoding(true)
        apiClient.get(`/products/${productID}`)
        .then(res => {
            console.log(res.data);
            setProduct(res.data)
            setLoding(false)
        })
    }, [productID])

    if(isLoading) return <div className='loading loading-spinner loading-md mx-96 my-80 items-center'></div>
    if(!product) return <div>No Product fount</div>
    return (
        
        <div className='px-4 py-8 mx-auto w-3/4'>
            <div className='mb-6'>
                <Link
                    to="/shop"
                    className='flex items-center text-sm text-base-content/70 hover:text-base-content transition-colors'
                >
                    <FaArrowLeft className='mr-2 h-4 w-4'/> Back To Products
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12'>
                <Suspense 
                    fallback={
                        <div className='bg-base-300 aspect-square rounded-lg animate-pulse'></div>
                    }>
                    <ProductImageGallery 
                        images={product.images} 
                        ProductName={product.name} 
                    />
                </Suspense>

                <div className='flex flex-col'>
                    <div className='mb-4'>
                        <div className='badge badge-outline mb-2'>
                            Category {product.category}
                        </div>
                        <h1 className='text-3xl font-bold tracking-tight'>{product.name}</h1>
                    </div>

                    <div className='mt-2 mb-6'>
                        <div className='flex items-basline gap-2'>
                            <span className='text-3xl font-bold'>${product.price}</span>
                            <span className='text-sm text-base-content/70'>(${product.price_with_tax} incl. tax)</span>
                        </div>
                    </div>

                    <div className='prose prose-sm mb-6'>
                        <p>{product.description}</p>
                    </div>

                    <div className='mb-6'>
                        <div className='flex items-center'>
                            <div className='mr-2 text-sm font-medium'>
                                Availability:
                            </div>
                            {product.stock > 0 ? (
                                <div className='badge badge-outline bg-success/10 text-success border-success/20'>
                                    In stock ({product.stock} available)
                                </div>
                            ) : (
                                <div className='badge badge-outline bg-error/10 text-error border-error/20'>
                                    Out of Stock
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='mt-auto'>
                        <AddtoCartButton product={product}/>
                    </div>


                </div>
                {/* <div className='mt-auto'>
                    <AddtoCartButton product={product}/>
                </div> */}
             </div>
             <div>
                <ReviewSection />
                {/* <ReviewForm /> */}
             </div>
        </div>
    );
};

export default ProductDetails;