import React from 'react';
import StarRating from './StarRating';

const EditReviewForm = ({
        editReview, 
        setEditReview, 
        onCancelEditing,
        onSave,
    }) => {
    return (
        <div className='bg-base-200 rounded-lg space-y-4 mt-4 p-4'>
            <div>
            <label className="block label-text font-medium mb-1">Rating</label>
                <StarRating 
                    ratings={editReview.ratings} 
                    onChange={(value)=> {setEditReview({...editReview, ratings: value})}}
                />
            </div>
            <div>
                <label className="block label-text font-medium mb-1">Comment</label>
                <textarea 
                    value={editReview.comment} 
                    className="textarea textarea-bordered w-full min-h-[100px]" 
                    onChange={(event)=> {setEditReview({...editReview, comment:event.target.value})}} 
                />
            </div>
            <div className='flex gap-2'>
                <button onClick={onSave} className='btn btn-sm btn-success'>Save Changes</button>
                <button onClick={onCancelEditing} className='btn btn-sm btn-ghost'>Cancel</button>
            </div>
        </div>
    );
};

export default EditReviewForm;