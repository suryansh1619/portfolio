import React, { useContext } from 'react'
import Project from './Project'
import './projects.css';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Projects() {
    const {darktheme}=useContext(ThemeContext);
    return (
    <section 
        className="project section" 
        id='portfolio'
        style={{
            backgroundColor:darktheme ? 'var(--title-color)':'var(--container-color)',
            color:darktheme ? 'var(--container-color)':'var(--title-color)'
        }}>
        <h2 
            className="section-title"
            style={{
                color:darktheme ? 'var(--container-color)':'var(--title-color)'
            }}><span>P</span>rojects</h2>
        <h4 
            className="section-subtitle"
            style={{
                color:darktheme ? 'var(--container-color)':'var(--title-color)'
            }}>Most recent</h4>
        <Project/>
    </section>
    )
}
