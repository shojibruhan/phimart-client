import axios from 'axios';

const authApiClient= axios.create(
    {
        baseURL: "https://phimart-git-main-shojib-hossain-ruhans-projects.vercel.app/api/v1"
        
    }
)
export default authApiClient;

authApiClient.interceptors.request.use(
    (config) => {
        const token= localStorage.getItem("authTokens")
        if (token) {
            config.headers.Authorization= `JWT ${JSON.perse(token).asscess}`
        }
        return config
    }, 
    (error) => Promise.reject(error)
)