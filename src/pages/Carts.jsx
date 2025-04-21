import React, { Suspense, useEffect, useState } from 'react';
import useCartContext from '../Hooks/useCartContext';
import CartItemList from '../components/Cart/CartItemList';
import CartSummery from '../components/Cart/CartSummery';

const Carts = () => {

    const {cart, loading, createOrGetCart, updateCartItemQuantity, deleteCartItem}= useCartContext()
    const [localCart, setLocalCart]= useState(cart)

    useEffect(() => {
        if(!cart && !loading) createOrGetCart()
    }, [createOrGetCart, cart, loading])

    useEffect(() => {
        setLocalCart(cart)
    }, [cart])

    const handleUpdateQuantity= async(itemId, newQuantity) => {
        const previousLocalCartCopy= localCart; // Store a copy of local cart
        
        setLocalCart((previousLocalCart) => {
            const updateItems= previousLocalCart.items.map((item) => 
                item.id === itemId 
            ? {
                ...item, 
                quantity: newQuantity, 
                total_price: item.product.price * newQuantity,
            } 
            : item
        )
            console.log(updateItems);
        return {
            ...previousLocalCart,
            items: updateItems, 
            total_price: updateItems.reduce(
                (sum, item)=> sum + item.total_price, 
                0
            )
                
                

        }
    })
        try {
            await updateCartItemQuantity(itemId, newQuantity)
        } catch (error) {
            console.log(error);
            setLocalCart(previousLocalCartCopy)
        }

    }






    // Remove a single item
   
    
    const handleRemoveItem= async(itemId) => {
        setLocalCart(previousLocalCart => {
            const updateItems= previousLocalCart.items.filter(item => item.id !==itemId)

            return {
                ...previousLocalCart, 
                items: updateItems,
                total_price: updateItems.reduce((sum, item) => sum + item.total_price, 0)
            }
        })

        try {
            await deleteCartItem(itemId)
        } catch (error) {
            console.log(error);
        }
    }

    if (loading) return <p>Loading . . .</p>
    if (!localCart) {
        return <p>No cart found.</p>
    }

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                    {/* <Suspense fallback={<p>Loading. . . . . . .</p>}> */}
                        <CartItemList 
                            items={localCart.items} 
                            handleUpdateQuantity={handleUpdateQuantity}
                            handleRemoveItem={handleRemoveItem} 
                        />
                    {/* </Suspense> */}
                </div>
                <div>
                    <CartSummery 
                        totalPrice={localCart.total_price}
                        itemCount={localCart.items.length}
                    />

                </div>
                    
            </div>
        </div>
    );
};

export default Carts;