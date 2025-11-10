import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/Error";

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
    element: <ErrorPage/>,
  },
]);

export default router;
