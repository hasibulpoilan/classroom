import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'

import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Signin from './pages/Signup';
import { store } from './redux/store';
import All_Student from './pages/All_Student';
import All_tacher from './pages/All_tacher';
import CreateClass from './pages/CreateClass';
import See_otherStudent from './pages/See_otherStudent';
import Principle_allocate_time from './pages/Principle_allocate_time';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[{
      path: "/",
      element: <Home/>
    },
    

    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <Signin/>
    },
  {
    path:'/all-student',
    element:<All_Student/>
  }
  ,
  {
    path:'/all-teacher',
    element:<All_tacher/>
  },
  {
    path:'/assign-class',
    element:<CreateClass/>
  },
  {
    path:'/see-otherStudent',
    element:<See_otherStudent/>

  },
  {
    path:'/show-Principle-allocateTime',
    element:<Principle_allocate_time/>

  },
  {
    path:'/*',
    element:<ErrorPage/>

  }
  
   ]
   
  },
  {
    path:'*',
    element:<ErrorPage/>

  }
   
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
 
    <ToastContainer />

    <RouterProvider router={router} />
</Provider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
