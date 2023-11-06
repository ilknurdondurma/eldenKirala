import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";


const routes = createBrowserRouter([
    {
        path: '/',
        children:[
            {
                index:true,
                element: <App/>
            },

            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/giris-yap',
                element: <Home/>
            },
            {
                path: '/uye-ol',
                element: <Home/>
            },
            {
                path: '/ayarlar',
                element: <Home/>
            },
            {
                path: '/sepet',
                element: <Home/>
            },
            {
                path: '/detay',
                element: <Home/>
            },
            {
                path: '/urun',
                element: <Home/>
            },
            {
                path: '/kategoriler',
                element: <Home/>
            },
            {
                path: '/yardim',
                element: <Home/>
            },
            {
                path: '/iletisim',
                element: <Home/>
            },
            {
                path: '',
                element: <Home/>
            },
        ]
    }
])



export default routes