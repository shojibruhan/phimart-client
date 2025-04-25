import React, { useCallback, useEffect, useState } from 'react';
import authApiClient from '../services/auth-api-client';

const useCart = () => {
    const [authToken]= useState(() => JSON.parse(localStorage.getItem("authTokens"))?.access)
   
    const [cart, setCart]= useState(null)
    const [cartId, setcartId]= useState(() => localStorage.getItem("cartId"))
    const [loading, setLoading]= useState(false)
    // Create Cart 
    const createOrGetCart = useCallback(async() => {
            setLoading(true)
            // console.log("create Cart ", authToken);
            try {
                console.log(authToken);
                const response = await authApiClient.post("/carts/")
                if(!cartId) {
                    localStorage.setItem("cartId", response.data.id) 
                    setcartId(response.data.id)
                    // console.log("!cartId" ,response.data.id);
                }
                setCart(response.data)
                // console.log("setCart: ", response.data);
            } catch (error) {
                console.log("createOrGetCart error: " ,error);
            } finally {
                setLoading(false)
            }
           
        }, [authToken, cartId]
    )

    // Add items to the cart
    const AddCartItem = useCallback(async(product_id, quantity) => {
        setLoading(true)
        if(!cartId) await createOrGetCart();
        try {
            const response = await authApiClient.post(`/carts/${cartId}/items/`, {
                product_id, 
                quantity
            })
          
            return response.data
        } catch (error) {
            console.log("Error Adding items", error);
        } finally {
            setLoading(false)
        }
        
    }, [cartId, createOrGetCart])


    // Update item quantity

    const updateCartItemQuantity= useCallback(async(itemId, quantity) => {
        
        try {
            await authApiClient.patch(`/carts/${cartId}/items/${itemId}/`, {quantity,})
            
        } catch (error) {
            console.log(error);
        } 
    }, [cartId])

    // Delete cart item
    // const deleteCartItem= useCallback(async(itemId) => {
    // // const deleteCartItem= useCallback(async(itemId) => {
    //     try {
    //         await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })

    const deleteCartItem= useCallback(async(itemId) => {
        try {
            await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`)
        } catch (error) {
            console.log(error);
        }
    }, [cartId])    

    useEffect(()=> {
        const initializeCart= async() => {
            setLoading(true)
            await createOrGetCart()
            setLoading(false)
        }
        initializeCart()
    }, [createOrGetCart])

    return {
        cart,
        cartId, 
        createOrGetCart,
        AddCartItem,
        updateCartItemQuantity,
        deleteCartItem,
        loading,
    }
};

export default useCart;