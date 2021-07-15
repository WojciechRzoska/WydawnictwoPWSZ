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

    //magazine api
    getAllMagazines: () =>
        axios.get(`${BASE_API_URL}/magazine`),
    addMagazine: (Magazine) =>
        axios.post(`${BASE_API_URL}/magazine`, Magazine),
    getOneMagazine: (id) =>
        axios.get(`${BASE_API_URL}/magazine/${id}`),
    updateMagazine: (id, Magazine) =>
        axios.post(`${BASE_API_URL}/magazine/${id}?_method=PUT`, Magazine),
    deleteMagazine: (id) =>
        axios.delete(`${BASE_API_URL}/magazine/${id}`),
    searchMagazine: (key) =>
        axios.get(`${BASE_API_URL}/magazine/search/${key}`),
    getAllMagazinesWithFiles: () =>
        axios.get(`${BASE_API_URL}/magazines`),

    //magazine files api
    deleteMagazineFile: (id) =>
        axios.delete(`${BASE_API_URL}/magazine-files/${id}`),


    //account api
    login:(Account) =>
        axios.post(`${BASE_API_URL}/login`, Account),
    getDataUser:() =>
        axios.get(`${BASE_API_URL}/user`),
    forgetPassword:(Email) =>
        axios.post(`${BASE_API_URL}/forgetpassword`, Email),
    resetPassword:(Data) =>
        axios.post(`${BASE_API_URL}/resetpassword`, Data),
    getUsers:() =>
        axios.get(`${BASE_API_URL}/handle-user`),
    getOneUser:(id) =>
        axios.get(`${BASE_API_URL}/handle-user/${id}`),
    updateUser:(id, User) =>
        axios.post(`${BASE_API_URL}/handle-user/${id}? method=PUT`, User),
    deleteUser:(id) =>
        axios.delete(`${BASE_API_URL}/handle-user/${id}`),
    addUser:(User) =>
        axios.post(`${BASE_API_URL}/handle-user`,User),

}
