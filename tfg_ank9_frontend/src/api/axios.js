import axios from 'axios';

//axios es una libreria para que hace el fetch de toda la vida
const api = axios.create({
    baseURL: 'http://localhost:8000/api'
});

// Para que refresque el token
api.interceptors.response.use(
    (response) => response, // Si la respuesta es ok, no hacemos nada
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 y no hemos reintentado ya...
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                
                // Pedimos un nuevo token al endpoint de Symfony
                const res = await axios.post('http://localhost:8000/api/token/refresh', {
                    refresh_token: refreshToken
                });

                if (res.status === 200) {
                    const newToken = res.data.token;
                    sessionStorage.setItem('token', newToken);
                    
                    // Actualizamos el token en la petición original y la reintentamos
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Si el refresh token también caducó, al login de cabeza
                sessionStorage.clear();
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;