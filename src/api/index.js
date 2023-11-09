import axios from "axios";

const API=axios.create({baseURL:'https://localhost:7278/api/v2'})

export const getAllProducts = () => API.get(`/products`)
export const getProduct = (id) => API.get(`/products/${id}`)
export const addProduct = (product) => API.post(`/products/add/`,product)
export const updateProduct = (product) => API.put(`/products/`,product)
export const deleteProduct = (id) => API.delete(`/products/${id}`)

export const getProductsByCategories = (categoryName) => API.get(`/products/category/${categoryName}`)
export const getCategories = () => API.get(`Category/get-categories`)

