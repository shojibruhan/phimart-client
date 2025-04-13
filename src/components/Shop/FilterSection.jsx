import React from 'react';

const FilterSection = ({
    priceRange, 
    handlePriceChange,
    categories,
    selectedCategory,
    handleCategoryChange,
    searchQuery,
    handleSearchQuery,
    sortOrder,
    handleSortOrder,
    
    
    
}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {/* Price Range */}
            <div className='bg-white rounded-lg shadow p-4'>
                <label className="block text-gray-700 text-sm font-medium mb-2">Price Range</label>
                {/* Min Range  */}
                <div className='flex items-center space-x-4'>
                    <input 
                        type="number"
                        min='0' 
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(event)=> handlePriceChange(0, event.target.value)}
                        className='border w-20 p-2 rounded-md' />
                    <input 
                        type="range"
                        min='0' 
                        max='1000'
                        step='10'
                        value={priceRange[0]}
                        onChange={(event)=> handlePriceChange(0, event.target.value)}
                        className='w-full' />
                </div>
                {/* Max Range  */}
                <div className='flex items-center space-x-4'>
                    <input 
                        type="number"
                        min= {priceRange[0]}
                        max= '1000'
                        value={priceRange[1]}
                        onChange={(event)=> handlePriceChange(1, event.target.value)}
                        className='border w-20 p-2 rounded-md' />
                    <input 
                        type="range"
                        min= {priceRange[0]}
                        max= '1000'
                        step='10'
                        value={priceRange[1]}
                        onChange={(event)=> handlePriceChange(1, event.target.value)}
                        className='w-full' />
                </div>
                
                
                <div className='flex justify-between text-sm text-gray-600 mt-2'>
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]} </span>
                </div>
            </div>
            {/* Category Range  */}
            <div className='bg-white rounded-lg shadow p-4'>
                <label className="block text-gray-700 text-sm font-medium mb-2">Category</label>
                <select  
                    value={selectedCategory}
                    onChange={(event) => handleCategoryChange(event.target.value)}
                    className='w-full p-2 border rounded-md'>
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}> 
                            {category.name} 
                        </option>
                    ))}
                    
                </select>
            </div>
            {/* Search  */}
            <div className='bg-white rounded-lg shadow p-4'>
                <label className="block text-gray-700 text-sm font-medium mb-2">Search</label>
                <input 
                    value={searchQuery}
                    onChange={(event)=> handleSearchQuery(event.target.value)}
                    type="text" 
                    placeholder='Search Books . . .' 
                    className='w-full p-2 border rounded-md'
                    />
            </div>
            {/* Sortion  */}
            <div className='bg-white rounded-lg shadow p-4'>
                <label className="block text-gray-700 text-sm font-medium mb-2">Sort By Price</label>
                <select
                    value={sortOrder} 
                    onChange={(event) => handleSortOrder(event.target.value)}
                    className='w-full p-2 border rounded-md'>
                    <option value="">Default</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                </select>
            </div>
        </div>
    );
};

export default FilterSection;