const axios = window.axios;

const BASE_API_URL = 'http://127.0.0.1:8000/api'

export default{
    //book api
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

    //bulletin api
    getAllBulletins: () =>
        axios.get(`${BASE_API_URL}/bulletin`),
    addBulletin: (Bulletin) =>
        axios.post(`${BASE_API_URL}/bulletin`, Bulletin),
    getOneBulletin: (id) =>
        axios.get(`${BASE_API_URL}/bulletin/${id}`),
    updateBulletin: (id,Bulletin) =>
        axios.post(`${BASE_API_URL}/bulletin/${id}?_method=PUT`, Bulletin),
    deleteBulletin: (id) =>
        axios.delete(`${BASE_API_URL}/bulletin/${id}`),
    searchBulletin: (key) =>
        axios.get(`${BASE_API_URL}/bulletin/search/${key}`),
}
