import React, { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';
import { useParams } from 'react-router';
import authApiClient from '../../services/auth-api-client';
import ReviewList from './ReviewList';
import apiClient from '../../services/api-client';
import useAuthContext from '../../Hooks/useAuthContext';

const ReviewSection = () => {
    const {productID}= useParams()
    const [userCanReview, setUserCanReview]= useState(false)
    const [reviews, setReviews]= useState([])
    const [isLoading, setLoading]= useState(false)
    const [editReview, setEditReview]= useState({ratings: 0, comment: ""})
    const [editingReviewId, setEditingReviewId ]= useState(null)
    const {user}= useAuthContext()

    const onSubmit= async(data) => {
        setLoading(true)
        try {
            await authApiClient.post(`/products/${productID}/reviews/`, data)
            fetchReviews()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const checkUserPermission= async() => {
        try {
            const res= await authApiClient(`/orders/has-ordered/${productID}/`)
            setUserCanReview(res.data.hasOrdered)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchReviews= async() => {
        try {
            const res= await apiClient.get(`/products/${productID}/reviews/`)
            setReviews(res.data)
        } catch (error) {
            console.log("review fetching error: ", error);
        }
    }


    const handleUpdateReview= async(reviewId)=>{
        try {
            await authApiClient.put(`/products/${productID}/reviews/${reviewId}/`, editReview)
            setEditingReviewId(null)
            fetchReviews()
        } catch (error) {
            
            console.log(error);
        }   

    }

    const handleDeleteReview= async(reviewId) => {
        try {
            await authApiClient.delete(`/products/${productID}/reviews/${reviewId}/`)
            fetchReviews()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        checkUserPermission()
        fetchReviews()
    }, [])
    return (
        <div className='space-y-8 mt-10 mx-auto px-4 max-w-5xl'>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold'>Customer Review</h2>
                <div className='badge badge-lg'>{reviews.length} {reviews.length <= 1 ? "Review" : "Reviews"}</div>
            </div>
           {userCanReview && (
            <div className='card bg-base-100 shadow-lg border border-base-200 rounded-lg overflow-hidden'>
                <div className='card-body'>
                    <h3 className='card-title text-lg'>Write a Review</h3>
                    <ReviewForm onSubmit={onSubmit}/>
                </div>
            </div>
           )}

           <div className=' divider'></div>

           
           {isLoading ? (
            <div className='flex justify-center py-8'>
                <span className=' loading loading-spinner loading-lg text-primary'></span>
            </div>
           ) : reviews.length === 0 ? (
            <div className='text-center py-8'>
                <div className="text-5xl mb-4">📝</div>
                <h3 className='text-xl font-semibold mb-2'>No Reviews Yet</h3>
            <p className='text-base-content/70'>Be the first to review this product!</p>
           </div>
           ) : (
            <ReviewList 
                reviews={reviews}
                user={user} 
                editReview={editReview}
                setEditReview= {setEditReview}
                editingReviewId={editingReviewId}
                setEditingReviewId= {setEditingReviewId}
                handleUpdateReview= {handleUpdateReview}
                handleDeleteReview={handleDeleteReview}
            />
           )}
           
        </div>
    );
};

export default ReviewSection;