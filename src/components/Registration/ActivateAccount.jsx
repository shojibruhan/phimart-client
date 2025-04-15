import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import SuccessAlert from '../SuccessAlert';
import ErroAlert from '../ErrorAlert';
import apiClient from '../../services/api-client';

const ActivateAccount = () => {
    const [message, setMessage]= useState("")
    const [error, setError]= useState("")
    
    const {uid, token}= useParams()
    const navigate= useNavigate()

    useEffect(() => {
        apiClient.post('/auth/users/activation/', {uid, token})
        .then(response => {
            setMessage("Account Activate Successfully")
            setTimeout(() => navigate("/login"), 3000)
            console.log(response.data);

        })
        .catch(error => {
            setError("Something Went Wrong. Please check your activation link.")
            console.log(error);
        })
    }, [])

    return (
        <div className='bg-base-200 flex items-center justify-center min-h-screen'>
            <div className='card bg-base-100 shadow-xl p-6'>
                <h2 className='text-2xl font-bold'>Account Activation</h2>
                {message && <SuccessAlert success={message} />}
                {error && <ErroAlert error={error} />}

            </div>
        </div>
    );
};

export default ActivateAccount;