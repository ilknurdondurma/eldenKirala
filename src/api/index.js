import axios from "axios";

const API=axios.create({baseURL:'https://dummyjson.com'})

export const getProducts = () => API.get(`/products`)
export const getProductsByCategories = (categoryName) => API.get(`/products/category/${categoryName}`)
export const getProduct = (id) => API.get(`/products/${id}`)
export const searchProducts = (name) => API.get(`/products/search?q=${name}`)
export const addProduct = (product) => API.post(`/products/add/`,product)
export const updateProduct = (product) => API.put(`/products/`,product)
export const deleteProduct = (id) => API.delete(`/products/${id}`)

export const getCategories = () => API.get(`products/categories`)

