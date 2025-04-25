/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from "react"
import apiClient from "../services/api-client";
const useAuth = () => {
    const [user, setUser]= useState(null);
    const [errorMsg, setErrorMsg]= useState("")

    const getToken =() => {
        const token= localStorage.getItem('authTokens')

        return token ? JSON.parse(token) : null
    }

    const [authTokens, setAuthTokens]= useState(getToken())

    useEffect(()=> {
        if(authTokens) fetchUserProfile()
    }, [authTokens])


    const handleAPIError= (error, defaultMessage) => {
        if (error.response && error.response.data){
            const errorMessage= Object.values(error.response.data)
            .flat()
            .join("\n")
            setErrorMsg(errorMessage)
            console.log(errorMessage);
            return {success: false, message: errorMessage}
        }
        setErrorMsg(defaultMessage)
        return {success: false, message: defaultMessage}
    }

    // Fetch User
    const fetchUserProfile= async() => {
        try {
            const response = await apiClient.get("/auth/users/me/", {
                headers: {Authorization: `JWT ${authTokens?.access}`}
            })
            setUser(response.data);
        } catch (error) {
            console.log("Error Fetching User", error);
        }
    }

    // log in user
    const loginUser= async (userData) => {
        setErrorMsg("")
        try {
            const response= await apiClient.post("/auth/jwt/create/", userData)
            setAuthTokens(response.data)
            localStorage.setItem("authTokens", JSON.stringify(response.data))

            // After login fetch user
            await fetchUserProfile();
            return {success: true}
            
        } catch (error) {
            setErrorMsg(error.response.data?.detail);
            return {success: true}

        }
    }

    // Register user

    const registerUser= async (userData) => {
        setErrorMsg("")

        try {
            await apiClient.post("/auth/users/", userData)
            return {success: true, message: "Registration Complete Successfully. Redirecting...."}
        } catch (error) {
            return handleAPIError(error, "Registration Failed. Try again letter" )
        }
    }

    // Update User Profile
    const updateUserProfile= async(userData) => {
        setErrorMsg("")
        try {
            await apiClient.put("/auth/users/me/", userData, {
                headers: {Authorization: `JWT ${authTokens?.access}`
        }})
        return {success: true, message: "Update User Profile Successfully."}

        } catch (error) {
            return handleAPIError(error)
            
        }
    }

    // Change Password
    const changePassword= async(userData) =>{
        setErrorMsg("")
        try {
            await apiClient.post("/auth/users/set_password/", userData, {
                headers: {Authorization: `JWT ${authTokens?.access}`
        }})
        
        } catch (error) {
            return handleAPIError(error)
        }
    }
    
        

    // Logout User
    const logoutUser= () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        localStorage.removeItem("cartId")
    }

    return {
        user, 
        loginUser, 
        errorMsg, 
        registerUser, 
        updateUserProfile,
        changePassword, 
        logoutUser
    }
};

export default useAuth;