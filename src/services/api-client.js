import axios from 'axios';

export default axios.create(
    {
        baseURL: "https://phimart-git-main-shojib-hossain-ruhans-projects.vercel.app/api/v1"
    }
)