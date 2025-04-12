import React from 'react';
import { FaAngleRight } from 'react-icons/fa';

const CategoriItems = ({index, category}) => {
    const gradients = [
        "from-pink-100 to-blue-100",
        "from-blue-100 to-purple-100",
        "from-purple-100 to-pink-100",
        "from-blue-100 to-pink-100",
    ]
    return (
        <div 
        className={`bg-gradient-to-br from-pink-100 to-blue-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer ${gradients[index % gradients.length]}`}
        >
            <div className='p-6 flex flex-col h-full'>
                <div className='flex justify-between items-start mb-4'>
                    <div className='bg-pink-500 text-white font-bold text-xl h-10 w-10 rounded-full flex items-center justify-center'>
                        {category.name.charAt(0)}
                    </div>
                    <span className='bg-white/70 px-2 py-1 rounded-full text-sm text-gray-600'>
                        {category.product_count}
                    </span>
                </div>
                <h3 className='text-xl font-bold mb-2'> {category.name} </h3>
                <p className='text-sm text-gray-600 flex grow mb-4'>
                    {category.description}
                </p>
                <button className='flex items-center text-pink-500 font-bold hover:text-pink-600 hover:italic transition-colors'>
                    Explore
                    <FaAngleRight />
                </button>
            </div>
        </div>
    );
};

export default CategoriItems;