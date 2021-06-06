const axios = window.axios;

const BASE_API_URL = 'http://127.0.0.1:8000/api'

export default{
    getAllItems: () =>
        axios.get(`${BASE_API_URL}/book`),
    addBook: (Book) =>
        axios.post(`${BASE_API_URL}/book`, Book),
    getOneBook: (id) =>
        axios.get(`${BASE_API_URL}/book/${id}`),
    updateBook: (id,Book) =>
        axios.post(`${BASE_API_URL}/book/${id}?_method=PUT`, Book),
    deleteBook: (id) =>
        axios.delete(`${BASE_API_URL}/book/${id}`),
    searchBook:(key) =>
        axios.get(`${BASE_API_URL}/book/search/${key}`),
}
