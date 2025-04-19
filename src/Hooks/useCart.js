import React, { useCallback, useState } from 'react';
import authApiClient from '../services/auth-api-client';

const useCart = () => {
    const [authToken]= useState(() => JSON.parse(localStorage.getItem("authTokens")).access)
    const [cart, setCart]= useState(null)
    const [cartID, setCartID]= useState(() => localStorage.getItem("cartID"))
    const [loading, setLoading]= useState(false)
    // Create Cart 
    const createOrGetCart = useCallback(
        async() => {
            setLoading(true)
            try {
                const response = await authApiClient.post("/carts/")
                if(!cartID) {
                    localStorage.setItem("cartID", response.data.id) 
                    setCartID(response.data.id)
                }
                setCart(response.data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
           
        }, [authToken, cartID]
    )

    // Add items to the cart
    const AddCartItem = useCallback(async(product_id, quantity) => {
        setLoading(true)
        if(!cartID) await createOrGetCart();
        try {
            const response = await authApiClient.post(`/carts/${cartID}/items/`, {
                product_id, 
                quantity
            })
          
            return response.data
        } catch (error) {
            console.log("Error Adding items", error);
        } finally {
            setLoading(false)
        }
        
    }, [cartID, createOrGetCart])


    // Update item quantity

    const updateCartItemQuantity= useCallback(async(itemId, quantity) => {
        setLoading(true)
        try {
            await authApiClient.patch(`/carts/${cartID}/items/${itemId}`, {quantity,})
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }, [cartID])

    return {
        cart, 
        createOrGetCart,
        AddCartItem,
        updateCartItemQuantity,
        loading,
    }
};

export default useCart;