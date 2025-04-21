import React, { useCallback, useEffect, useState } from 'react';
import authApiClient from '../services/auth-api-client';

const useCart = () => {
    const [authToken]= useState(() => JSON.parse(localStorage.getItem("authTokens"))?.access)
   
    const [cart, setCart]= useState(null)
    const [cartID, setCartID]= useState(() => localStorage.getItem("cartID"))
    const [loading, setLoading]= useState(false)
    // Create Cart 
    const createOrGetCart = useCallback(async() => {
            setLoading(true)
            // console.log("create Cart ", authToken);
            try {
                const response = await authApiClient.post("/carts/")
                if(!cartID) {
                    localStorage.setItem("cartID", response.data.id) 
                    setCartID(response.data.id)
                    // console.log("!cartID" ,response.data.id);
                }
                setCart(response.data)
                // console.log("setCart: ", response.data);
            } catch (error) {
                console.log("createOrGetCart error: " ,error);
            } finally {
                setLoading(false)
            }
           
        }, [cartID]
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
        
        try {
            await authApiClient.patch(`/carts/${cartID}/items/${itemId}/`, {quantity,})
            
        } catch (error) {
            console.log(error);
        } 
    }, [cartID])

    // Delete cart item
    // const deleteCartItem= useCallback(async(itemId) => {
    // // const deleteCartItem= useCallback(async(itemId) => {
    //     try {
    //         await authApiClient.delete(`/carts/${cartID}/items/${itemId}/`)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })

    const deleteCartItem= useCallback(async(itemId) => {
        try {
            await authApiClient.delete(`/carts/${cartID}/items/${itemId}/`)
        } catch (error) {
            console.log(error);
        }
    }, [cartID])    

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
        createOrGetCart,
        AddCartItem,
        updateCartItemQuantity,
        deleteCartItem,
        loading,
    }
};

export default useCart;