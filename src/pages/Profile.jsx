import React, { useEffect, useState } from 'react';
import ProfileForm from '../components/Profile/ProfileForm';
import { useForm } from 'react-hook-form';
import ProfileButton from '../components/Profile/ProfileButton';
import PasswordChangeForm from '../components/Profile/PasswordChangeForm';
import useAuthContext from '../Hooks/useAuthContext';
import ErroAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';

const Profile = () => {
    const [isEditing, setEditing]= useState(false)
    const {user, updateUserProfile, changePassword, errorMsg}= useAuthContext()
    const [successMsg, setSuccessMsg]= useState("")
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors, isSubmitting}
    }= useForm()

    useEffect(()=> {
        Object.keys(user).forEach((key) =>setValue(key, user[key]))
    }, [user, setValue])

    const onSubmit= async(data) => {
        console.log(data);
        try {
            // update Profile
            const profilePayLoad= {
                first_name: data.first_name,
                last_name: data.last_name,
                phone_number: data.phone_number,
                address: data.address,
            }
            const response= await updateUserProfile(profilePayLoad)
            console.log(response);
            
                
            // Change password
            if (data.current_password && data.new_password) {
                await changePassword({
                    current_password:data.current_password,
                    new_password: data.new_password
                })
            }

            if (response.success){ 
                setSuccessMsg(response.message)
            }
            
        } catch (error) {
            console.log(error);
            alert("Wrong Password")
        }
    }

    return (
        <div className='card bg-base-200 w-full max-w-2xl mx-auto shadow-xl'>
            <div className="card-body">
                {errorMsg && (
                    <ErroAlert error={errorMsg} />
                )}
                {successMsg && (
                    <SuccessAlert success={successMsg} />
                )}
                <h2 className="card-title text-2xl mb-4">Profile Information</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <ProfileForm  
                        register={register}
                        errors={errors}
                        isEditing={isEditing}
                    />
                    <PasswordChangeForm register={register} errors={errors} watch={watch} isEditing={isEditing} />
                    <ProfileButton isEditing={isEditing} setEditing={setEditing} isSubmitting={isSubmitting}/>
                </form>
            </div>
        </div>
    );
};

export default Profile;