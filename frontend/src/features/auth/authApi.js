import api from '../../api/axios';

export const signup = (user) => {
    return api.post('/api/auth/signup', user);
};

export const login = (user) => {
    return api.post('/api/auth/login', user);
};

export const getMe = () => {
    return api.get('/api/auth/me');
};