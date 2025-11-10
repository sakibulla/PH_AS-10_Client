import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";

import Auth from "../pages/Auth/Auth";

import ErrorPage from "../pages/Error/Error";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgetPassword/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },


      {
        path: "/auth",
        element: <Auth></Auth>,
        children: [
          {
            path: "/auth/login",
            element: <Login></Login>,
          },
          {
            path: "/auth/Register",
            element: <Register></Register>,
          },
            { path: "forgot-password", element: <ForgotPassword /> }
        ]
        
      },
      
      {
        path: "auth",
        element: <h2>Auth</h2>,
      },
      {
        path: "news",
        element: <h2>News</h2>,
      },
      
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
