import { createBrowserRouter } from "react-router";
import Root from "../pages/Root/Root";
import { Component } from "react";
import Home from "../pages/Home/Home";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Root></Root>,
            children: [
                {
                    index: true,
                    element :<Home></Home>
                },
                {
                    path: "/auth",
                    element: <h2>AUth</h2>,
                }, {
                    path: "/news",
                    element: <h2>News</h2>
                },
                {
                    path: "/*",
                    element: <h2>Error</h2>
                }
            ]
        }

    ]
);
export default router;

