import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Firsatlar from "../pages/firsatlar";
import Login from "../pages/login";
import {Layout, AuthLayout, ProfileLayout, ChatLayout} from "../layout/web";
import Signup from "../pages/signup/signup";
import AddProduct from "../pages/addProduct";
import Favorites from "../pages/favorites";
import PrivateRoute from "./privateRoute";
import Detail from "../pages/detailProduct";
import FilterByCategory from "../pages/filterByCategory";
import FilterByBrand from "../pages/FilterByBrand";
import Hesabim from "../pages/profile/hesabim";
import Guvenlik from "../pages/profile/guvenlik";
import BildirimTercihlerim from "../pages/profile/bildirimTercihlerim";
import AdresDuzenle from "../pages/profile/adresDuzenle";
import ChatBox from "../pages/chat";
import TumKiralamalar from "../pages/profile/tumKiralamalar";
import TumYorumlar from "../pages/profile/tumYorumlar";
import SendBox from "../pages/chat/sendBox";
import ChatInfo from "../pages/chat/chat-info";

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
                path: '/brands',
                element: <FilterByBrand/>,
                children:[
                    {
                        index:true,
                        element:<FilterByBrand/>
                    },
                    {
                        path:"/brands/:id" , element:<FilterByBrand/>
                    },
                    {
                        path:"/brands/:name" , element:<FilterByBrand/>
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
                path: '/profile',
                element: <PrivateRoute><ProfileLayout/></PrivateRoute>,
                children:[
                    {
                        index:true,
                        element:<PrivateRoute><Hesabim/></PrivateRoute>
                    },
                    {
                        path:"/profile/hesabim" , element:<PrivateRoute><Hesabim/></PrivateRoute>
                    },
                    {
                        path:"/profile/bildirim-tercihlerim" , element:<PrivateRoute><BildirimTercihlerim/></PrivateRoute>
                    },
                    {
                        path:"/profile/guvenlik" , element:<PrivateRoute><Guvenlik/></PrivateRoute>
                    },
                    {
                        path:"/profile/adres-duzenle" , element:<PrivateRoute><AdresDuzenle/></PrivateRoute>
                    },
                    {
                        path:"/profile/tum-kiralamalar" , element:<PrivateRoute><TumKiralamalar/></PrivateRoute>
                    },
                    {
                        path:"/profile/tum-yorumlarim" , element:<PrivateRoute><TumYorumlar/></PrivateRoute>
                    }
                ]
            },
            {
                path:'/chat',
                element: <PrivateRoute><ChatLayout/></PrivateRoute>,
                children:[
                    {
                        index:true,
                        element:<PrivateRoute><ChatInfo/></PrivateRoute>
                    },
                    {
                        path:"/chat/:uid" , element:<PrivateRoute><ChatBox/></PrivateRoute>
                    }
                    
                ]

            }
           
        ]
    }
])



export default routes