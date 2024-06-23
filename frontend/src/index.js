import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './Redux/store';
import { Provider } from 'react-redux';
import './index.css';
import AuthPage from './Pages/Auth/AuthPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './Pages/NotFound/NotFound';
import Home from './Pages/Home/Home';
import './Assests/fontAwesomeProIcons/fontAwesomeIcons.css';
import Profile from './Pages/Profile/Profile';
import SpecificThreadPage from './Pages/Thread/SpecificThreadPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <NotFound/>
  },
  {
    path: "/profile",
    element: <Profile/>,
    errorElement: <NotFound/>
  },
  {
    path: "/auth/:req",
    element: <AuthPage/>,
    errorElement: <NotFound/>
  },
  {
    path: "/thread/:threadID",
    element: <SpecificThreadPage/>,
    errorElement: <NotFound/>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>  
    <RouterProvider router={router}/>
  </Provider>
);

