import React, {
    useState,
    createContext,
} from 'react';
import {eraseCookie, getCookie, setCookie} from "../../utils/cookies.js";

export const loginContext = createContext(null);

const LoginContextProvider = ({children}) => {
    const BACKEND_LINK = import.meta.env.VITE_BACKEND_LINK

    const [isLogged, setIsLogged] = useState(getCookie("Authorization")?.length>0);

    const login = async (username, password) => {
        try {
            const response = await fetch(`${BACKEND_LINK}/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username,
                    password,
                }),
            }).catch(e=>console.log(e))
            if (!response?.ok) {
                return {
                    status: response.status,
                    data: await response.json(),
                };
            }

            const {token} = await response.json();
            setCookie("Authorization", `${token}`)

            setIsLogged(true);

            return null
        } catch (e) {
            console.error(e);
        }
    }
    const logout = async () => {
        eraseCookie("Authorization");
        setIsLogged(false);
    }
    const register = async (username, email, password) => {
        try {
            const response = await fetch(`${BACKEND_LINK}/register`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            }).catch(e=>console.log(e))
            if (!response?.ok) {
                return {
                    status: response.status,
                    data: await response.json(),
                }
            }

            const {token} = await response.json();
            setCookie("Authorization", `Bearer ${token}`)

            setIsLogged(true);

            return null
        } catch (e) {
            console.error(e);
        }
    }
    const getMyData = async () => {
        return await fetch(`${BACKEND_LINK}/myData`, {headers: {Authorization: getCookie("Authorization")}})
    }

    return (
        <loginContext.Provider value={{isLogged, login, logout, register, getMyData}}>
            {children}
        </loginContext.Provider>
    );
};

export default LoginContextProvider;