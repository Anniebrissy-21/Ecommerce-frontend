import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Use Vite's import.meta.env instead of process.env
// export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"
export const BASE_URL = "https://shopitapp2.onrender.com"
// export const BASE_URL = "http://127.0.0.1:8000"

const api = axios.create({
    baseURL: BASE_URL
})

// Add debug logging in development
if (import.meta.env.DEV) {
    console.log('API Base URL:', BASE_URL);
    console.log('Environment Mode:', import.meta.env.MODE);
    console.log('Is Development:', import.meta.env.DEV);
}

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access")
        if (token) {
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now() / 1000
            if (expiry_date > current_time) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api