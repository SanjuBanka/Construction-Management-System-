import axios from 'axios'

// Set VITE_API_BASE_URL in your .env (or your hosting platform's env vars)
// to point at your deployed backend, e.g. https://swpm-backend.up.railway.app/api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('swpm_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('swpm_token')
      localStorage.removeItem('swpm_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
