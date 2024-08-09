import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { initialState,reducer } from '../reducer/Reducer';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const baseURL = process.env.REACT_APP_BACKEND_PORT;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/portfolio/data`);
                dispatch({ type: "SET_DATA", payload: response.data });
                console.log("Data saved");
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [baseURL]);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};
