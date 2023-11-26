import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import routes from './routes'
import {BrowserRouter, RouterProvider,Routes ,Route,Router} from "react-router-dom";
import Home from './pages/home';
import Navbar from './components/navbar';
import { Footer } from './components/footer';
import Spin from './pages/spin/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <RouterProvider router={routes}></RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
