import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../Hooks/useAuthContext";
import ErroAlert from "../components/ErrorAlert";
import { useState } from "react";

const Login  = () => {
    // const {loginUser}= useAuthContext()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const {loginUser, errorMsg}= useAuthContext()
    const [isloading, setloading]= useState(false)
    const navigate= useNavigate()

    const onSubmit = async (data) => {
        setloading(true)
        try {
            const response= await loginUser(data);
            if(response.success) navigate("/dashboard");  
        } catch (error) {
            console.log("Log in Failed", error);
        } finally {
            setloading(false)
        }
    }
    return (
       <div className="bg-base-200 min-h-screen flex items-center justify-center px-4 py-12">
            <div className="bg-base-100 shadow-xl card w-full max-w-md">
                <div className="card-body">
                    {errorMsg && (<ErroAlert error={errorMsg}/>)}
                    <h2 className="card-title text-2xl font-bold">Sign In</h2>
                    <p className="text-base-content/70">
                        Enter your email and password to access your account</p>

                    <form 
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-4">
                        <div className="form-control">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                                type="email" 
                                placeholder="name@example.com" 
                                id="email" 
                                className={`input input-bordered w-full ${errors.email ? "input-error": ""}`}
                                {...register("email", {required: "Email is required"})}
                            />
                            {errors.email && (
                                <span className="label-text-alt text-error"> {errors.email.message} </span>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="********" 
                                id="password" 
                                className={`input input-bordered w-full ${errors.password ? "input-error": ""}`}
                                {...register("password", {required: "Password is required"})}
                            />
                            {errors.password && (
                                <span className="label-text-alt text-error"> {errors.password.message} </span>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={isloading}>
                            {isloading ? <div>
                                <span className="loading loading-ball loading-md"></span>
                                <span className="loading loading-ball loading-md"></span>
                                <span className="loading loading-ball loading-md"></span>
                            </div> : "Log in"}
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-base-content/70">
                            Dont't Have an account?{" "}
                            <Link 
                            to="/register"
                            className="link link-primary"
                            > Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
       </div>
    );
};

export default  Login;