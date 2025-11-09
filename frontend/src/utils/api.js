import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    signup: (data) => api.post('/auth/signup', data),
    login: (data) => api.post('/auth/login', data),
};

export const todoAPI = {
    getTodos: () => api.get('/todos'),
    createTodo: (data) => api.post('/todos', data),
    updateTodo: (id, data) => api.put(`/todos/${id}`, data),
    deleteTodo: (id) => api.delete(`/todos/${id}`),
};

export default api;
