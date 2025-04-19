import React, { Suspense, useEffect } from 'react';
import useCartContext from '../Hooks/useCartContext';
import CartItemList from '../components/Cart/CartItemList';

const Carts = () => {

    const {cart, loading, createOrGetCart, updateCartItemQuantity}= useCartContext()

    useEffect(() => {
        createOrGetCart()
    }, [createOrGetCart])

    const handleUpdateQuantity= async(itemId, newQuantity) => {
        try {
            await updateCartItemQuantity(itemId, newQuantity)
        } catch (error) {
            console.log(error);
        }

    }
    if (loading) return <p>Loading . . .</p>
    if (!cart) {
        return <p>No cart found.</p>
    }

    return (
        <div className='flex justify-between'>
           <div>
            {/* <Suspense fallback={<p>Loading. . . . . . .</p>}> */}
                <CartItemList 
                    items={cart.items} 
                    handleUpdateQuantity={handleUpdateQuantity} 
                />
            {/* </Suspense> */}
           </div>
           <div>
            <h1 className='text-lg font-bold'>Cart Summery</h1>

           </div>
            
        </div>
    );
};

export default Carts;