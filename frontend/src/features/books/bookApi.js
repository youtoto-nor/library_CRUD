import api from '../../api/axios';

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
    return api.get(`/books/${id}`);
};

export const createBook = (book) => {
    return api.post('/books', book);
};

export const updateBook = (id, book) => {
    return api.put(`/books/${id}`, book);
};

export const deleteBook = (id) => {
    return api.delete(`/books/${id}`);
};