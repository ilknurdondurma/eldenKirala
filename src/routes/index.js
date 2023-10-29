import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/login";


const routes = createBrowserRouter([
    {
        path: '/',
        children:[
            {
                index:true,
                element: <App/>
            },

            {
                path: '/home',
                element: <Home/>
              }
        ]
    }
])



export default routes