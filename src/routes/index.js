import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Firsatlar from "../pages/firsatlar";
import Login from "../pages/login";
import Layout from "../layout/web";
import Spin from "../pages/spin";
import Signup from "../pages/signup/signup";


const routes = createBrowserRouter([
    {
        path: '/',
        element:<Layout/>,
        children:[
            {
                index:true,
                element: <Home/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
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
                path: '/details',
                element: <Home/>,
                children:[
                    {
                        index:true,
                        element:<Home/>
                    },
                    {
                        path:"/details/:id" , element:<Home/>
                    }
                ]
            },
            {
                path: '/products',
                element: <Home/>,
                children:[
                    {
                        index:true,
                        element:<Home/>
                    },
                    {
                        path:"/products/:id" , element:<Home/>
                    },
                    {
                        path:"/products/:name" , element:<Home/>
                    }
                ]
            },
            {
                path: '/categories',
                element: <Home/>,
                children:[
                    {
                        index:true,
                        element:<Home/>
                    },
                    {
                        path:"/categories/:id" , element:<Home/>
                    },
                    {
                        path:"/categories/:name" , element:<Home/>
                    }
                ]
                
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