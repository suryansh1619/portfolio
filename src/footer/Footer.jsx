import React, { useContext } from 'react'
import './footer.css';
import { ThemeContext } from '../contexts/ThemeContext';
import {DataContext} from '../contexts/DataContext'

export default function Footer() {
    const {state}=useContext(DataContext);
    const footers=state.footer
    const {darktheme}=useContext(ThemeContext);
    return (
        <footer 
            className='footer'
            style={{backgroundColor: darktheme ?  "var(--title-color)" : "var(--container-color)",
                borderTop: darktheme ?  "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.2)"
            }}>
            <div className="footer-container container">
                <h1 className="footer-title">Suryansh</h1>
                <div className="footer-social grid">
                {footers.map((footer,index)=>{
                    return(
                        <a 
                            key={footer._id}
                            href={footer.link}
                            className='footer-social-icon' 
                            style={{backgroundColor: !darktheme ?  "var(--title-color)" : "var(--container-color)",
                                color: darktheme ?  "var(--title-color)" : "var(--container-color)"}}
                            target="_blank"
                            rel="noopener noreferrer">
                            <i className={`bx bxl-${footer.name}`}></i>
                        </a>
                    )
                })}
                </div>
                <span className="footer-copy">&#169; Copyright. All rights reserved</span>
            </div>
        </footer>
    )
}
