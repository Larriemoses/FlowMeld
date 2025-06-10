// frontend/src/utils/axiosConfig.ts
import axios from 'axios';

// Set the base URL for all requests made by this axios instance
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

// Tell Axios to send cookies with cross-origin requests
axios.defaults.withCredentials = true;

// These are the default names Django expects for the CSRF cookie and header
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Remove the interceptor and getCookie function from here
// axios.interceptors.request.use(...)  <--- REMOVE THIS BLOCK
// function getCookie(...)              <--- REMOVE THIS FUNCTION

console.log("Axios global config loaded.");