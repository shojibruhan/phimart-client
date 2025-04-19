import React, { useState } from 'react';
import {Swiper, SwiperSlide } from 'swiper/react';
import defaultImage from '../../assets/defaultproductimage.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Thumbs } from 'swiper/modules';

const ProductImageGallery = ({images, ProductName}) => {
    const [thumbsSwiper]= useState(null)
    const displayImages= images.length > 0 ? images : [{image: defaultImage}]
    return (
        <div className='rounded-lg border overflow-hidden'>
             <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                }}
                className='product-main-slider'
                >
                {displayImages.map((imageobj, index) => (
                    <SwiperSlide key={index}>
                        <div className='aspect-square bg-base-100'>
                            <img 
                                src={imageobj.image} 
                                alt={ProductName} 
                                className='h-full w-full object-contain'
                            />
                        </div>
                    </SwiperSlide>
                ))}
                
                
            </Swiper>
        </div>
    );
};

export default ProductImageGallery;