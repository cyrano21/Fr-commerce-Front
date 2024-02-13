import axios from 'axios'

// Créez une instance d'Axios avec des configurations par défaut
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BACKEND_URL, // ou votre URL de base de l'API
  headers: {
    'Content-Type': 'application/json',
  },
})

// Ajoutez un intercepteur de requête pour inclure le token dans les headers de chaque requête
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers['auth-token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
