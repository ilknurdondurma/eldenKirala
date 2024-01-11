import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Firsatlar from "../pages/firsatlar";
import Login from "../pages/login";
import {Layout, AuthLayout} from "../layout/web";
import Spin from "../pages/spin";
import Signup from "../pages/signup/signup";
import Profile from "../pages/profile";
import AddProduct from "../pages/addProduct";
import Favorites from "../pages/favorites";
import PrivateRoute from "./privateRoute";
import Detail from "../pages/detailProduct";
import FilterByCategory from "../pages/filterByCategory";

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
                path: '/product',
                element: <Detail/>,
                children:[
                    {
                        index:true,
                        element:<Detail/>
                    },
                    {
                        path:"/product/:id" , element:<Detail/>
                    },
                    {
                        path:"/product/:name" , element:<Detail/>
                    }
                ]
            },
            {
                path: '/categories',
                element: <FilterByCategory/>,
                children:[
                    {
                        index:true,
                        element:<FilterByCategory/>
                    },
                    {
                        path:"/categories/:id" , element:<FilterByCategory/>
                    },
                    {
                        path:"/categories/:name" , element:<FilterByCategory/>
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
    },
    {
        path: "/",
        element: <AuthLayout/>,
        children: [
            {
                path: '/post',
                element: <PrivateRoute><AddProduct/></PrivateRoute>
            },
            {
                path: '/favorites',
                element: <PrivateRoute><Favorites/></PrivateRoute>
            },
            
            {
                path: '/settings',
                element: <Home/>
            },
            {
                path: '/profile',
                element: <Profile/>
            },
           
        ]
    }
])



export default routes