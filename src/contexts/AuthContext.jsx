import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
    const baseURL =process.env.REACT_APP_BACKEND_PORT || '';
    const checkAuth = async () => {
        try {
            console.log(auth);
            const response = await axios.get(`${baseURL}/api/user/check/auth`, { withCredentials: true });
            console.log(auth,auth);
            setAuth({ isAuthenticated: true, user: response.data.user });
        } catch (error) {
            setAuth({ isAuthenticated: false, user: null });
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

