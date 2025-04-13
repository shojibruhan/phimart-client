import React, {useState } from 'react';
import ProductItem from '../Products/ProductItem';
import ProductList from './ProductList';
import Pagination from './Pagination';
import useFetchProduct from '../../Hooks/usefetchProduct';
import FilterSection from './FilterSection';
import useFetchCategories from '../../Hooks/usefetchCategories';

const ShopPage = () => {
    const [currentlPage, setcurrentlPage]= useState(1)
    const [priceRange, setPriceRange]= useState([0, 1000])
    const [selectedCategory, setSelectedCategory]= useState("")
    const [searchQuery, setSearchQuery]= useState("")
    const [sortOrder, setSortOrder]= useState("")
    const {products, isLoading, totalPages}= useFetchProduct(
        currentlPage, 
        priceRange, 
        selectedCategory,
        searchQuery,
        sortOrder
    )
    const categories= useFetchCategories ()

    const handlePriceChange = (index, value) => {
        setPriceRange((prev) => {
            const newRange= [...prev]
            newRange[index]= value
            return newRange

        })
        setcurrentlPage(1)
    };


{ /* 
    useEffect(()=> {
        fetchProduct()
    }, [currentlPage])


    const fetchProduct= () => {
        setLoading(true)
        apiClient
        .get(`/products/?page=${currentlPage}`)
        .then(res => {
            setProducts(res.data.results)
            setTotalPage(Math.ceil(res.data.count / res.data.results.length))
        })
        .finally(() => setLoading(false))
    }
    const fetchProduct = async() => {
        setLoading(true)
        try {
            const response= await apiClient.get(`/products/?page=${currentlPage}`)
            const data= await response.data

            setProducts(data.results)
            setTotalPage(Math.ceil(data.count /data.results.length))
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false)
        }
    }
*/}
    return (
        <div className='max-w-7xl mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-8'>Shop Our Product</h1>
            <FilterSection 
                priceRange={priceRange} 
                handlePriceChange={handlePriceChange}
                categories= {categories}
                selectedCategory={selectedCategory}
                handleCategoryChange= {setSelectedCategory}
                searchQuery= {searchQuery}
                handleSearchQuery={setSearchQuery} 
                sortOrder={sortOrder}
                handleSortOrder= {setSortOrder}
            />
            <ProductList products={products} isLoading={isLoading} /> 
            <Pagination totalPages={totalPages}
            currentlPage={currentlPage} handlePageChange={setcurrentlPage} />
        </div>
        
    );
};

export default ShopPage;