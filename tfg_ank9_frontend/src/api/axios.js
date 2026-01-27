import axios from 'axios';

//axios es una libreria para que hace el fetch de toda la vida
const api = axios.create({
    baseURL: 'http://localhost:8000/api', // La URL de Symfony
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;