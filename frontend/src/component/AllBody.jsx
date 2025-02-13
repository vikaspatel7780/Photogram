import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import UploadPhoto from './UploadPhoto';
import ChangePassword from './ChangePassword';
import Register from './Register';
import AllHome from './AllHome'; 
import MyProfile from './MyProfile'
import GetProfile from './GetProfile';
const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <AllHome />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "upload",
                    element: <UploadPhoto />
                },
                {
                    path: "changePassword",
                    element: <ChangePassword />
                }
                ,{
                    path: "profile/:username",
                    element: <MyProfile/>
                }
                ,{
                    path: "otherProfile/:username",
                    element: <GetProfile/>
                }
                ,{
                    path: ""
                }
            ]
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/register",
            element: <Register />
        }
    ]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
};

export default Body;
