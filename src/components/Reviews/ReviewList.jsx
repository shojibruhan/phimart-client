import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewList = ({
        reviews, 
        user, 
        editReview, 
        setEditReview, 
        editingReviewId, 
        setEditingReviewId, 
        handleUpdateReview,
        handleDeleteReview,
    }) => {
    return reviews.map(review => ( 
        <ReviewCard 
            key={review.id} 
            review={review}
            user={user} 
            editReview={editReview}
            setEditReview= {setEditReview}
            isEditing= {editingReviewId === review.id}
            onEditClick= {() => {
                setEditingReviewId(review.id)
                setEditReview({
                    ratings: review.ratings,
                    comment: review.comment,
                })
            }}
            onCancelEditing= {() => setEditingReviewId(null)}
            onSaveEdit= {handleUpdateReview}
            onDeleteClick= {()=> handleDeleteReview(review.id)}
        />  
    ))
        
            
                
          
            
};

export default ReviewList;
