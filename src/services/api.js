
import axios from "axios";

// creating an axios instance with base URL 
const axiosBaseURL = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080/api', // to connect backend server, this backend server URL should be used
});

// adding  a request interceptor to attach  JWT automatically to every request if available, while hitting protected routes from frontend
// Attach JWT from localStorage to every request
axiosBaseURL.interceptors.request.use((configurationRequestObj) => {
    const storedToken = localStorage.getItem("token"); // toekn is stored in local storage after login
    if (storedToken) {
        configurationRequestObj.headers.Authorization = `Bearer ${storedToken}`; // attaching token to the request headers
    }
    return configurationRequestObj; // must always return config, even if no token
},
    (error) => {
        return Promise.reject(error); // in case of error we handling it here properly
    });

export default axiosBaseURL;

// 📖 Flow of this code.
// You log in → backend gives you a JWT → you save it in localStorage.

// Every request goes through this interceptor.

// If a token exists, it’s automatically attached to the Authorization header.

// Backend sees the token, validates it, and responds.

// 👉 Now your frontend doesn’t need to worry about adding tokens manually — the interceptor does it for you.