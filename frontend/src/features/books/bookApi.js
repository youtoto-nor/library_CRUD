import axios from 'axios';

const API_URL = 'http://localhost:8080/books';

export const getBooks = (page = 0, size = 20, keyword = '') => {
    return axios.get(API_URL, {
        params: {
            page,
            size,
            keyword
        }
    });
};

export const getBook = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createBook = (book) => {
    return axios.post(API_URL, book);
};

export const updateBook = (id, book) => {
    return axios.put(`${API_URL}/${id}`, book);
};

export const deleteBook = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};