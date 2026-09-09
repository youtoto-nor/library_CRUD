import api from '../../api/axios';

export const getBooks = (page = 0, size = 20, keyword = '') => {
    return api.get('/api/books', {
        params: {
            page,
            size,
            keyword
        }
    });
};

export const getBook = (id) => {
    return api.get(`/api/books/${id}`);
};

export const createBook = (book) => {
    return api.post('/api/books', book);
};

export const updateBook = (id, book) => {
    return api.put(`/api/books/${id}`, book);
};

export const deleteBook = (id) => {
    return api.delete(`/api/books/${id}`);
};