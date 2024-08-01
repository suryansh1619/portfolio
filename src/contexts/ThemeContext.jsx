import React, { createContext } from 'react'
import useToggle from '../hooks/usetoggle';

export const ThemeContext= new createContext();
export function ThemeProvider(props) {
    const [darktheme,settheme]=useToggle(true);
    return (
        <ThemeContext.Provider value={{darktheme,changetheme:settheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}
