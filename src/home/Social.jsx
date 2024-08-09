import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import { DataContext } from '../contexts/DataContext'
export default function Social() {
    const {state}=useContext(DataContext)
    const homeSocial =state.homeSocial
    const {darktheme}=useContext(ThemeContext);
    return (
        <div className='home-social'>
            {homeSocial.map((social)=>{
                return(
                    <a 
                        key={social._id}
                        href={social.link}     
                        className='home-social-icon' 
                        style={{
                            color: darktheme ? "var(--container-color)" : "var(--title-color)",
                            backgroundColor:darktheme ? "var(--title-color)": "var(--container-color)"
                        }}
                        target="_blank"
                        rel="noreferrer">
                        <i className={`uil uil-${social.name}`}></i>
                    </a>
                )
            })}
        </div>
    )
}
