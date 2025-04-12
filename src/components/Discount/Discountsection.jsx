import React from 'react';
import bgBannerimg from '../../assets/images/bg-banner-image.jpg'
import bookimage from '../../assets/images/bundlebooks.png'
import DiscountTimer from './DiscountTimer';
const Discountsection = () => {
    
    return (
        <section 
        style={{backgroundImage:`url(${bgBannerimg})` }}
        className='w-full h-[500px] bg-cover bg-center flex  justify-center items-center bg-no-repeat'>
            
            <div className='container w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-8'>

                {/* Left Content  */}
                <div className='w-1/2 flex justify-center'>
                    <img className='max-w-full md:h-[350px] drop-shadow-2xl' src={bookimage} alt="" />
                </div>

                {/* Right Content  */}
                <div className='w-1/2 text-center md:text-left'>
                    <h1 className='text-3xl md:text-5xl font-bold text-gray-900'> 30% Discount on All Item! Hurry UP!!! </h1>
                    
                    {/* Timer  */}
                    <DiscountTimer />
                    <button className='btn btn-secondary px-6 py-3 rounded-full shadow-md mb-5'>Shop Collection</button>
                </div> 
            </div>
        </section>
    );
};


export default Discountsection;