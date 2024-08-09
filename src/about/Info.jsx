import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import {DataContext} from '../contexts/DataContext'
export default function Info() {
    const {state}=useContext(DataContext)
    const aboutInfo=state.aboutInfo[0];
    const {darktheme}=useContext(ThemeContext);
    return (
        <div className="about-info grid">
            <div 
                className="about-box"
                style={{
                    border: darktheme ?  "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.2)",
                    backgroundColor: darktheme ? 'rgba(255,255,255,0.05)' :"rgba(0,0,0,0.05)"
                }}>
                <i 
                    className='bx bx-award about-icon'
                    style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}></i>
                <h3 
                    className="about-title"
                    style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{aboutInfo.title1}</h3>
                <span 
                    className="about-subtitle"
                    style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{aboutInfo.subtitle1}</span>
            </div>
            <div 
                className="about-box"
                style={{
                    border: darktheme ?  "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.2)",
                    backgroundColor: darktheme ? 'rgba(255,255,255,0.05)' :"rgba(0,0,0,0.05)"
                }}>
                <i 
                    className='bx bx-briefcase about-icon'
                    style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}></i>
                <h3 
                    className="about-title"
                    style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{aboutInfo.title2}</h3>
                <span 
                    className="about-subtitle"
                    style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{aboutInfo.subtitle2}</span>
            </div>
        </div>
    )
}
