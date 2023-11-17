import { createBrowserRouter } from "react-router-dom";
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
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Home/>
            },
            {
                path: '/settings',
                element: <Home/>
            },
            {
                path: '/cart',
                element: <Home/>
            },
            {
                path: '/details/*',
                element: <Home/>
            },
            {
                path: '/products/*',
                element: <Home/>
            },
            {
                path: '/categories/*',
                element: <Home/>
            },
            {
                path: '/help/*',
                element: <Home/>
            },
            {
                path: '/contact/*',
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