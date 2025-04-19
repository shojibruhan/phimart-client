import React, { useState } from 'react';
import { FaCheck, FaShoppingCart } from 'react-icons/fa';
import { FiMinus, FiPlus } from 'react-icons/fi';
import useCartContext from '../../Hooks/useCartContext';

const AddtoCartButton = ({product}) => {
    const [quantity, setQuantity]= useState(1)
    const [isAdding, setIsAdding]= useState(false)
    const [isAdded, setIsAdded]= useState(false)
    const {AddCartItem}= useCartContext()
    const increaseQuantity= () => {
        if(quantity < product.stock) {
            setQuantity(quantity + 1)
        }
    }
    const decreaseQuantity= () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const addToCard = async() => {
        setIsAdding(true)
        try {
            await AddCartItem(product.id, quantity)
            setIsAdding(false)
            setIsAdded(true)
        } catch (error) {
            console.log(error);
            setIsAdding(false)
        }
        // setIsAdding(true)
        // // setIsAdded(false)
        // setTimeout(() => {
        //     setIsAdding(false)
        //     setIsAdded(true)
        //     setTimeout(() => {
        //         setIsAdded(false)
        //     }, 2000);

        // }, 1000)

    }
    return (
        <div className='space-y-4'>
            <div className='join'>
                <button 
                    onClick={decreaseQuantity}
                    disabled={quantity<2}
                    className='btn btn-outline join-item'>
                    <FiMinus className='h-4 w-4'/>
                </button>
                <input 
                    type="number" 
                    className="input input-bordered join-item w-16 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" 
                    min={1}
                    max={product.stock} 
                    value={quantity}
                />
                <button 
                    onClick={increaseQuantity}
                    disabled= {quantity >= product.stock} 
                    className='btn btn-outline join-item'
                >
                    <FiPlus className='h-4 w-4'/>
                </button>
            </div>
            <button 
                className='btn btn-primary w-full'
                onClick={addToCard} 
                disabled={isAdding || isAdded || product.stock === 0}>
                {isAdding ? (
                    <span className='flex items-center'>
                        <span className='loading loading-spinner loading-sm mt-2'>Adding</span>
                    </span>
                ) : isAdded ? (
                    <span className='flex items-center'><FaCheck className='mr-2 h-4 w-4'/>Added your Cart</span>
                ) : (
                    <span className='flex items-center'><FaShoppingCart className='mr-2 h-4 w-4'/>Add to Cart</span>
                )}
            </button>
        </div>
    );
};

export default AddtoCartButton;