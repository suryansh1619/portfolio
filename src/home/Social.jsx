import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export default function Social(props) {
    const {homeSocial}=props;
    const {darktheme}=useContext(ThemeContext);
    return (
        <div className='home-social'>
            {homeSocial.map((social)=>{
                return(
                    <a 
                        key={social.id}
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
