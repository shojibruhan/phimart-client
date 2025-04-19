import React from 'react';
import useAuthContext from '../Hooks/useAuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user}= useAuthContext()
    if (user === null) return <span className="loading loading-bars loading-xl flex items-center mx-64 my-64"></span>
    // console.log("private route: ",user);
    return user ? children : <Navigate to="/login"></Navigate>
}

export default PrivateRoute;