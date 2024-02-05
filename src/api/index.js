import axios from "axios";

const API=axios.create({baseURL:'http://localhost:5058/api/v2'})


const storedUser = JSON.parse(localStorage.getItem('user'));
const token = storedUser ? storedUser.user.token : null;


API.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
    
  }
);
// document.addEventListener("DOMContentLoaded", function () {
  
//   setTimeout(function () {
//     clearUserSession();
//   }, 12 * 60 * 60 * 1000); // 12 saat
// });

// function clearUserSession() {
//   setUser(false)
// }

//user
export const login = (formdata) => API.post('/User/login', formdata)
export const signUp = (user) => API.post('/User/sign-up', user)
export const UpdateUser = (id,user) => API.put(`/User/update/${id}`, user)

//product
export const getAllProducts = (userId) => API.get(`/Product/get-all/${userId}`)
export const getProductsByCategoryId = (id) => API.get(`/Product/get-category/${id}`)
export const getProductsByBrandId = (id) => API.get(`/Product/get-brand/${id}`)
export const getProductsById = (productId,userId) => API.get(`/Product/get/${productId}/${userId}`)
export const addProduct = (product) => API.post(`/Product/add/`,product, {headers: {'Content-Type':'multipart/form-data'}})
export const updateProduct = (product) => API.put(`/Product/`,product)
export const deleteProduct = (id) => API.delete(`/Product/${id}`)
export const getProductsBySearch = (categoryName) => API.get(`/Product/category/${categoryName}`)
//category
export const getCategories = () => API.get(`/Category/get-categories`)
//brand
export const getAllBrand=()=>API.get(`/Brand/get-all`)
export const getBrandByCategory=(categoryId)=>API.get(`/Brand/get/${categoryId}`)
//comment
export const getCommentById=(productId)=>API.get(`/Comment/get/${productId}`)
//favorites
export const getFavoritesByUserId = (userId) => API.get(`/Product/get-favori/${userId}`)
export const addFavorite=(product)=>API.post('/Favorite/add',product)
export const deleteFavorite = (id) => API.delete(`/Favorite/delete/${id}`)
//rental
export const getRentalsByUserId = (userId) => API.get(`/Rental/get-by-user-id/${userId}`)
export const getRentalsByProductId = (prodId) => API.get(`/Rental/get-by-product-id/${prodId}`)
export const addRental=(rental)=>API.post('/Rental/add',rental)



