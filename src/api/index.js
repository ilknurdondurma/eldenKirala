import axios from "axios";

const API=axios.create({baseURL:'http://localhost:5058/api/v2'})


const storedUser = JSON.parse(localStorage.getItem('user'));
const token = storedUser ? storedUser.token : null;


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
//product
export const getAllProducts = () => API.get(`/Product/get-all`)
export const getProductsByCategoryId = (id) => API.get(`/Product/get-category/${id}`)
export const getProductsById = (id) => API.get(`/Product/get/${id}`)
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
