import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router';

const PaymentSuccess = () => {
    return (
        <div className='flex gap-2'>
            Payment complete successfully return to  <Link to="/dashboard" className='underline text-blue-500'> Dashboard</Link>
        </div>
    );
};

export default PaymentSuccess;