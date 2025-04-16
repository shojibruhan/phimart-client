import React, { useState } from 'react';
import ProfileForm from '../components/Profile/ProfileForm';
import { useForm } from 'react-hook-form';
import ProfileButton from '../components/Profile/ProfileButton';
import PasswordChangeForm from '../components/Profile/PasswordChangeForm';

const Profile = () => {
    const [isEditing, setEditing]= useState(false)
    const {
        register,
        watch,
        formState: {errors}
    }= useForm()
    return (
        <div className='card bg-base-200 w-full max-w-2xl mx-auto shadow-xl'>
            <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Profile Information</h2>

                <form action="">
                    <ProfileForm  
                        register={register}
                        errors={errors}
                        isEditing={isEditing}
                    />
                    <PasswordChangeForm register={register} errors={errors} watch={watch} isEditing={isEditing} />
                    <ProfileButton isEditing={isEditing} setEditing={setEditing} />
                </form>
            </div>
        </div>
    );
};

export default Profile;