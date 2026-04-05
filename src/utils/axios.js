// We use Axios to make requests (GET, POST, PUT, DELETE) to your backend.
//This files sets the base URL and will automatically include or attach the token with each request that is been made using axiosInstance(if the token is already stored inside the localstorage)
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  // Remove withCredentials since you're not using cookies now
});

//Add token to every request if available

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;