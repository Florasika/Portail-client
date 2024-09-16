import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:1520/api/',
    timeout: 10000,
});

// Ajouter le token aux en-têtes des requêtes sauf pour les endpoints d'authentification
axiosInstance.interceptors.request.use(
    config => {
        // Vérifiez si l'URL contient 'auth' pour ne pas ajouter le token
        if (!config.url.includes('auth')) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

// Gestion des réponses et rafraîchissement des tokens
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('http://localhost:1520/api/auth/refresh-token', { refreshToken });

                const { token, refreshToken: newRefreshToken } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('refreshToken', newRefreshToken);

                // Mettre à jour le header d'authentification
                axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;

                // Réessayer la requête initiale
                return axiosInstance(originalRequest);
            } catch (err) {
                // Rediriger vers la page de connexion en cas d'échec du rafraîchissement
                window.location.href = '/';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
