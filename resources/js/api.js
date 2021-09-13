const axios = window.axios;


const API_URL = process.env.MIX_API_URL


export default{
    //book api
    getAllItems: () =>
        axios.get(`/api/book`),
    addBook: (Book) =>
        axios.post(`/api/book`, Book),
    getOneBook: (id) =>
        axios.get(`/api/book/${id}`),
    updateBook: (id,Book) =>
        axios.post(`/api/book/${id}?_method=PUT`, Book),
    deleteBook: (id) =>
        axios.delete(`/api/book/${id}`),
    searchBook:(key) =>
        axios.get(`https://wydacwnictwotest.herokuapp.com/api/book/search/${key}`),

    //bulletin api
    getAllBulletins: () =>
        axios.get(`/api/bulletin`),
    addBulletin: (Bulletin) =>
        axios.post(`/api/bulletin`, Bulletin),
    getOneBulletin: (id) =>
        axios.get(`/api/bulletin/${id}`),
    updateBulletin: (id,Bulletin) =>
        axios.post(`/api/bulletin/${id}?_method=PUT`, Bulletin),
    deleteBulletin: (id) =>
        axios.delete(`/api/bulletin/${id}`),
    searchBulletin: (key) =>
        axios.get(`/api/bulletin/search/${key}`),

    //magazine api
    getAllMagazines: () =>
        axios.get(`/api/magazine`),
    addMagazine: (Magazine) =>
        axios.post(`/api/magazine`, Magazine),
    getOneMagazine: (id) =>
        axios.get(`/api/magazine/${id}`),
    updateMagazine: (id, Magazine) =>
        axios.post(`/api/magazine/${id}?_method=PUT`, Magazine),
    deleteMagazine: (id) =>
        axios.delete(`/api/magazine/${id}`),
    searchMagazine: (key) =>
        axios.get(`/api/magazine/search/${key}`),
    getAllMagazinesWithFiles: () =>
        axios.get(`/api/magazines`),

    //magazine files api
    deleteMagazineFile: (id) =>
        axios.delete(`/api/magazine-files/${id}`),


    //account api
    login:(Account) =>
        axios.post(`/api/login`, Account),
    getDataUser:() =>
        axios.get(`/api/user`),
    forgetPassword:(Email) =>
        axios.post(`/api/forgetpassword`, Email),
    resetPassword:(Data) =>
        axios.post(`/api/resetpassword`, Data),
    getUsers:() =>
        axios.get(`/api/handle-user`),
    getOneUser:(id) =>
        axios.get(`/api/handle-user/${id}`),
    updateUser:(id, User) =>
        axios.post(`/api/handle-user/${id}? method=PUT`, User),
    deleteUser:(id) =>
        axios.delete(`/api/handle-user/${id}`),
    addUser:(User) =>
        axios.post(`/api/handle-user`,User),

    //page edit api
    editText:(Text) =>
        axios.post(`/api/edit-text`,Text),
    deleteText:(id) =>
        axios.post(`/api/delete-text`, id),
    addText:(Text) =>
        axios.post(`/api/add-text`, Text),

    //przelewy24
    registerToken:(Data) =>
        axios.post(`/api/registerToken`, Data),
    test:()=>
        axios.get(`/api/paymentVerify`),

}
