import React, { useEffect, useState,useContext } from 'react'
import ThemeItem from './ThemeItem'
import './theme.css' 
import useToggle from '../hooks/usetoggle';
import {FaCog} from 'react-icons/fa';
import {BsSun,BsMoon} from 'react-icons/bs';
import { ThemeContext } from '../contexts/ThemeContext';
import axios from 'axios';
export default function Theme(props) {
    const { darktheme, changetheme } = useContext(ThemeContext);
    const {themes}=props;
    const {color,setColor}=props;
    const baseURL =process.env.REACT_APP_BACKEND_PORT || '';
    const changeTheme=async(newcolor)=>{
        const newValues=themes.find(theme=>theme.color===newcolor);
        const oldValues=themes.find(theme=>theme.color===color);
        if(!newValues || !oldValues) return;
        newValues.selected=true;
        oldValues.selected=false;
        try{
            const newResponse=await axios.post(`${baseURL}/api/portfolio/themes`,{
                ...newValues
            })
            const oldResponse=await axios.post(`${baseURL}/api/portfolio/themes`,{
                ...oldValues
            })
            setColor(newcolor);
            console.log("data saved")
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <section className='theme section'>
            <div 
                className='theme-container container'
                style={{backgroundColor: darktheme ?  "var(--title-color)" : "var(--text-white)",}}>
                <h3 
                    className="style-switch-title"
                    style={{
                        color: darktheme ? "var(--container-color)" : "var(--title-color)"
                    }}
                    >Style</h3>
                <div className='style-switch-items'> 
                    {themes.map((theme,index) => {
                        return <ThemeItem key={index} color={theme.color} name={theme.name} changeTheme={changeTheme}/>
                    })}
                </div>
                <br/>
                <h3 
                    className="style-switch-title"
                    style={{
                        color: darktheme ? "var(--container-color)" : "var(--title-color)"
                    }}
                    >Change Theme</h3>
                <button className='button button--flex theme-toggler'
                        onClick={changetheme}
                        style={{ backgroundColor: !darktheme ? "var(--title-color)" : "var(--container-color)",
                                color: !darktheme ? "var(--container-color)" : "var(--title-color)" }}>
                        {darktheme ? <BsSun /> : <BsMoon />}
                </button>
            </div>
        </section>
    )
}
