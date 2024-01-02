import axios from "axios";

const API=axios.create({baseURL:'http://localhost:5058/api/v2'})

const token = JSON.parse(localStorage.getItem('user')).token;
console.log(token)


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
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    clearUserSession();
  }, 0.5 * 60 * 60 * 1000); // 12 saat
});

function clearUserSession() {
  localStorage.removeItem("user");
}

//user
export const login = (formdata) => API.post('/User/login', formdata)
export const signUp = (user) => API.post('/User/sign-up', user)
//product
export const getAllProducts = () => API.get(`/Product/get-all`)
export const getProductsByCategoryId = (id) => API.get(`/Product/get/${id}`)
export const addProduct = (product) => API.post(`/Product/add/`,product, {headers: {'Content-Type':'multipart/form-data'}})
export const updateProduct = (product) => API.put(`/Product/`,product)
export const deleteProduct = (id) => API.delete(`/Product/${id}`)
export const getProductsBySearch = (categoryName) => API.get(`/Product/category/${categoryName}`)
//category
export const getCategories = () => API.get(`/Category/get-categories`)
//brand
export const getAllBrand=()=>API.get(`/Brand/get-all`)
export const getBrandByCategory=(categoryId)=>API.get(`/Brand/get/${categoryId}`)




/*


const sendAudioToAPI = (audioBlob) => {
        const API_ENDPOINT = ${process.env.REACT_APP_API_URL}/asr
        const formData = new FormData();
        formData.append("audio", audioBlob, 'recorded.wav');
        formData.append('token',localStorage.getItem('_token'))
        setLoading(true)
        console.log(audioBlob)
        axios.post(API_ENDPOINT, formData)
            .then(data => {
                console.log("API cevabı:", data);
                if (data?.message !== "Internal Server Error") {
                    console.log(data.message)
                    setText((texts) => [...texts, data.data.message]);
                    setVoice((voice) => [...voice, data.data.filename])
                }
                setLoading(false)
            })
            .catch(error => {
                console.error("API hatası:", error);
                setLoading(false)
            });

    };

*/ 