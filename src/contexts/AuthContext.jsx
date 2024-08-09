import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null });
    const baseURL =process.env.REACT_APP_BACKEND_PORT || '';
    
    const checkAuth = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${baseURL}/api/user/check/auth`, { 
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true 
            });
            setAuth({ isAuthenticated: true, user: response.data.user });
        } catch (error) {
            console.error("Authentication check failed:", error);
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

