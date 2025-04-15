import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuthContext from '../Hooks/useAuthContext';
import ErroAlert from '../components/ErrorAlert';
import SuccessAlert from '../components/SuccessAlert';

const Register = () => {
    const {registerUser, errorMsg}= useAuthContext()
    const [successMsg, setSuccessMsg]= useState("")
    const [isloading, setloading]= useState(false)
    const navigate= useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    }= useForm()
    

    const onSubmit=  async(data) => {
        setloading(true)
        delete data.confirmPassword    
        try {
            const response = await registerUser(data)
            if (response.success) {
                setSuccessMsg(response.message)
                setTimeout(() => navigate("/login"), 3000)
            
        }
        } catch (error) {
            console.log("Registration Error", error);

        } finally {
            setloading(false)
        }
    }

    return (
        <div className='bg-base-200 min-h-screen flex items-center justify-center px-4 py-12'>
            <div className='card bg-base-100 shadow-xl w-full max-w-md'>
                <div className='card-body'>
                    {errorMsg && (<ErroAlert error={errorMsg}/>)}
                    {successMsg && (<SuccessAlert success={successMsg}/>)}
                    <h2 className='card-title text-2xl font-bold'>Sign Up</h2>
                    <p className='text-base-content/70'>
                        Create an account to get started
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-4 mt-4">
                        {/*  */}
                        <div className='form-control'>
                            <label className='label' htmlFor="first_name">
                                <span className='label-text'>First Name</span>
                            </label>
                            <input 
                                id="first_name" 
                                type="text" 
                                placeholder='Bruce'
                                className="input input-bordered w-full" 
                            {...register("first_name", {required: "First Name Required"})}
                            />
                            {errors.first_name && (
                                <span className="label-text-alt text-error">
                                    {errors.first_name.message}
                                </span>
                            )}
                        </div>
                        
                        <div className='form-control'>
                            <label className='label' htmlFor="last_name">
                                <span className='label-text'>Last Name</span>
                            </label>
                            <input 
                                id="last_name" 
                                type="text"
                                placeholder='Wayne' 
                                className="input input-bordered w-full" 
                                {...register("last_name", {required: "Last Name Required"})}
                            />
                            {errors.last_name && (
                                <span className="label-text-alt text-error">
                                    {errors.last_name.message}
                                </span>
                            )}
                        </div>
                        <div className='form-control'>
                            <label className='label' htmlFor="email">
                                <span className='label-text'>Email</span>
                            </label>
                            <input 
                                id="email" 
                                type="email"
                                placeholder='name@example.com' 
                                className="input input-bordered w-full" 
                                {...register("email", {required: "Email Required"})}
                            />
                            {errors.email && (
                                <span className="label-text-alt text-error">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <div className='form-control'>
                            <label className='label' htmlFor="address">
                                <span className='label-text'>Address</span>
                            </label>
                            <input 
                                id="address" 
                                type="text"
                                placeholder='Dhaka, Bangladesh' 
                                className="input input-bordered w-full" 
                                {...register("address")}
                            />
                        </div>
                        <div className='form-control'>
                            <label className='label' htmlFor="phone_number">
                                <span className='label-text'>Phone Number</span>
                            </label>
                            <input 
                                id="phone_number" 
                                type="text"
                                placeholder='012345678' 
                                className="input input-bordered w-full" 
                                {...register("phone_number ")}
                            />
                        </div>
                        <div className='form-control'>
                            <label className='label' htmlFor="password">
                                <span className='label-text'>Password</span>
                            </label>
                            <input 
                                id="password" 
                                type="password"
                                placeholder='**********' 
                                className="input input-bordered w-full"
                                {...register("password", {required: "Password is Required", minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                }})} 
                            />
                            {errors.password && (
                                <span className="label-text-alt text-error">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>
                        <div className='form-control'>
                            <label className='label' htmlFor="confirmPassword">
                                <span className='label-text'>Confirm Password</span>
                            </label>
                            <input 
                                id="confirmPassword" 
                                type="password"
                                placeholder='**********' 
                                className="input input-bordered w-full" 
                                {...register("confirmPassword", {
                                    required: "Confirm Password is Required",
                                    validate: (value) => 
                                        value === watch("password") || "password do not match"
                                    
                                })} 
                            />
                            {errors.confirmPassword && (
                                <span className="label-text-alt text-error">
                                    {errors.confirmPassword.message}
                                </span>
                            )}
                        </div>

                        
                        {/* <button type='submit' className='btn btn-primary w-full'>Sign In</button> */}


                        <button type="submit" className="btn btn-primary w-full" disabled={isloading}>
                            {isloading ? <div>
                                <span className="loading loading-ball loading-md"></span>
                                <span className="loading loading-ball loading-md"></span>
                                <span className="loading loading-ball loading-md"></span>
                            </div> : "Sign in"}
                        </button>

                    </form>
                    <div className='text-center mt-4'>
                        <p className='text-base-content/70'>
                            Already have an account?{" "}
                            <Link to='/login' className='link link-primary'>Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;