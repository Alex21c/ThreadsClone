import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './Redux/store';
import { Provider } from 'react-redux';
import './index.css';
import LoginPage from './Pages/LoginPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './Components/NotFound/NotFound';
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/>,
    errorElement: <NotFound/>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>  
    <RouterProvider router={router}/>
  </Provider>
);

