import React from 'react';

const Pagination = ({totalPages, currentlPage, handlePageChange}) => {
    return (
        <div className='flex justify-center'>
            
            {Array.from({length:totalPages}, (_, i) => (
                <button 
                onClick={() => handlePageChange(i+1)}
                className={`px-3 py-1 mx-1 rounded my-8 ${currentlPage === i+1 ? 'bg-secondary text-white' : 'bg-gray-200'}`} 
                key={i}>
                    {i+1}
                </button>
            ))}
            
            
        </div>
    );
};

export default Pagination;
