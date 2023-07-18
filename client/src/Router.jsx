import {createBrowserRouter, Navigate, Outlet, RouterProvider, useNavigate,} from "react-router-dom";
import {Layout as ANTD_Layout} from "antd";

import Header from "./components/Header/Header.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Register from "./components/Forms/Register.jsx";
import {useContext, useEffect} from "react";
import {loginContext} from "./Contexts/loginContext/LoginContextProvider.jsx";
import Error from "./components/Error/Error.jsx";
import Login from "./components/Forms/Login.jsx";
import {getCookie} from "./utils/cookies.js";

function Layout() {
    return <ANTD_Layout>
        <Header />
        <ANTD_Layout.Content
            style={{
                width: "100vw",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Outlet />
        </ANTD_Layout.Content>
    </ANTD_Layout>
}

const Router = () => {
    const {isLogged, getMyData} = useContext(loginContext);

    const profileLoader = async () => {
        if(!isLogged) {
            throw new Response("Unauthorized", { status: 401, statusText: "Unauthorized" });
        }
        const data = await getMyData();
        if(!data.ok){
            throw {code:  data.status, message: data.statusText}
        }
        return data;
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Navigate to={isLogged?'/profile':'/login'} />,
                },
                {
                    path: "register",
                    element: <Register />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "profile",
                    element: <Profile />,
                    errorElement: <Error />,
                    loader: profileLoader,
                },
            ],
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default Router;