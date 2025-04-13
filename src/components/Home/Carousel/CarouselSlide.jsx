import React from 'react';
import bgBannerimg from '../../../assets/images/bg-banner-image.jpg'
const CarouselSlide = ({title, subtitle, image}) => {
    
    return (
        <section 
        style={{backgroundImage:`url(${bgBannerimg})` }}
        className='w-full h-[600px] bg-cover bg-center flex  justify-center items-center px-4 md:px-8 bg-no-repeat'>
            <div 
                className='max-w-6xl w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8'
                
                >
            {/* Left Content  */}
            <div className='w-1/2 text-center md:text-left'>
                <h1 className='text-3xl md:text-5xl font-bold text-gray-900'> {title} </h1>
                <p className='text-gray-600 my-4'>{subtitle}</p>
                <button className='btn btn-secondary px-6 py-3 rounded-full shadow-md mb-5'>Shop Product</button>
            </div> 
            {/* Right Content  */}
            <div className='w-1/2 flex justify-center'>
                <img className='max-w-full md:h-[400px] drop-shadow-lg' src={image} alt="" />

            </div>
        </div>
        </section>
    );
};

export default CarouselSlide;