import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import Auth from "../pages/Auth/Auth";
import PrivateRoute from "../provider/PrivateRoute";
import ErrorPage from "../pages/Error/Error";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgetPassword/ForgetPassword";
import Arts from "../pages/Arts/Arts";
import AddArt from "../pages/AddArt/AddArt";
import ModelDetails from "../pages/ModelDetails/ModelDetails";
import MyModels from "../pages/MyModels/MyModels";
import Myfavorites from "../pages/Myfavorites/Myfavorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch('https://artify-six-nu.vercel.app/Artify')
      },
      {
        path: "/explore",
        element: <Arts></Arts>,
        loader: () => fetch('https://artify-six-nu.vercel.app/Artify')
      },
      {
        path: "/add",
        element:(<PrivateRoute>
          <AddArt></AddArt>
        </PrivateRoute>) ,
      },
      {
        path: "/ModelDetails/:id",
        element: (<PrivateRoute>
          <ModelDetails>
          </ModelDetails>
        </PrivateRoute>),
        loader: ({ params }) => fetch(`https://artify-six-nu.vercel.app/Artify/${params.id}`)
      }, {
        path: "/MyModels",
        element: (<PrivateRoute>
          <MyModels>
          </MyModels>
        </PrivateRoute>),
        loader: ({ params }) => fetch(`https://artify-six-nu.vercel.app/Artify/${params.id}`)
      },
      {
        path: "/fav",
        element: (<PrivateRoute>
          <Myfavorites>
          </Myfavorites>
        </PrivateRoute>),
        loader: ({ params }) => fetch(`https://artify-six-nu.vercel.app/Artify/${params.id}`)
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
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
