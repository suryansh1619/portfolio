import React, { useContext, useState,useEffect } from 'react'
import "./header.css";
import useToggle from '../hooks/usetoggle'
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { DataContext } from '../contexts/DataContext';
export default function Header() {
    window.addEventListener("scroll",function(){
        const header=document.querySelector(".header");
        if(this.scrollY>=80) header.classList.add('scroll-header');
        else if(header.classList.length>0) header.classList.remove('scroll-header');
    })
    const {state}=useContext(DataContext)
    const name=state.homeData[0].firstName;
    const[toggle,showMenu]=useToggle(false);
    const location=useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
    }, []);
    const {darktheme}=useContext(ThemeContext);
    return (
        <header className='header'
        style={{backgroundColor: darktheme ?  "var(--title-color)" : "var(--container-color)"
        }}>
            <nav 
                className='nav container'
                >
                <Link to='/' 
                className='nav-logo'>{name}</Link>
                <div 
                    className={toggle?'nav-menu show-menu':'nav-menu'}
                    style={{backgroundColor: isMobile ? (darktheme ?'var(--title-color)' : 'var(--container-color)')
                        : (darktheme ? 'var(--title-color)' : 'var(--container-color)'),
                    }}>
                    <ul className='nav-list grid'>
                        <li className='nav-item'>
                            <Link 
                                to='/' 
                                className={`${location.pathname==='/' ? 'active-link' : ''} nav-link`}
                                style={{
                                    color: darktheme ? "var(--container-color)" : "var(--title-color)"
                                }}>
                                <i className='uil uil-estate nav-icon'></i>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link 
                                to='/about' 
                                className={`${location.pathname==='/about' ? 'active-link' : ''} nav-link`}
                                style={{
                                    color: darktheme ? "var(--container-color)" : "var(--title-color)"
                                }}>
                                <i className='uil uil-user nav-icon'></i>
                                About
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link 
                                to='/projects' 
                                className={`${location.pathname==='/projects' ? 'active-link' : ''} nav-link`}
                                style={{
                                    color: darktheme ? "var(--container-color)" : "var(--title-color)"
                                }}>
                                <i className='uil uil-scenery nav-icon'></i>
                                Projects
                            </Link>
                        </li>
                    </ul>
                    <i 
                        className='uil uil-times nav-close' 
                        onClick={showMenu}
                        style={{
                            color: darktheme ? "var(--container-color)" : "var(--title-color)"
                        }}></i>
                </div>
                <div className='nav-toggle' onClick={showMenu}>
                <i className='uil uil-apps '></i>
                </div>
            </nav>
        </header>
    )
}
