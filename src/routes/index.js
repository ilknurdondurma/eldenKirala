import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Firsatlar from "../pages/firsatlar";
import Login from "../pages/login";


const routes = createBrowserRouter([
    {
        path: '/',
        children:[
            {
                index:true,
                element: <Home/>
            },

            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/giris-yap',
                element: <Login/>
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
                path: '/detay/*',
                element: <Home/>
            },
            {
                path: '/products/*',
                element: <Home/>
            },
            {
                path: '/kategoriler',
                element: <Home/>
            },
            {
                path: '/yardim/*',
                element: <Home/>
            },
            {
                path: '/iletisim/*',
                element: <Home/>
            },
            {
                path: '/firsatlar',
                element: <Firsatlar/>
            },
        ]
    }
])



export default routes