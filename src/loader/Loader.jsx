import React, { useContext } from 'react'
import './loader.css'
import { ThemeContext } from '../contexts/ThemeContext'

export default function Loader() {
    const {darktheme}=useContext(ThemeContext);
    return (
        <div 
            className='loader'
            style={{
                backgroundColor:darktheme ?'var(--container-color)':'var(--title-color)'
            }}>
            <div className='loader-content'>
                <h1 className='s1'>S</h1>
                <h1 className='s2'>S</h1>
            </div>
        </div>
    )
}
