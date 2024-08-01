import React, { useContext } from 'react'
import './skills.css'
import { ThemeContext } from '../contexts/ThemeContext'

export default function Skills(props) {
    const {skills}=props;
    const {darktheme}=useContext(ThemeContext);
    return (
        <section 
            className="skills section"
            style={{backgroundColor:darktheme ? 'var(--title-color)':'var(--container-color)'}}>
            <h2 
                className="section-title"
                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}><span>S</span>kills</h2>
            <h4 
                className="section-subtitle"
                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>My Technical level</h4>
            <div className="skills-container container">
                <div 
                className="skills-content"
                style={{
                    border: darktheme ?  "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.2)",
                    backgroundColor: darktheme ? 'rgba(255,255,255,0.05)' :"rgba(0,0,0,0.05)"
                }}>
                <div className="skills-box">
                    <div className="skills-group">  
                        {skills.map((skill,index)=>{
                            return(
                                <div key={index} className="skills-data">
                                    <i 
                                        className="bx bx-badge-check"
                                        style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}></i>
                                    <div>
                                        <h3 
                                            className="skills-name"
                                            style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{skill.title}</h3>
                                        <span 
                                            className="skills-level"
                                            style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{skill.level}</span>
                                    </div>
                                </div>)})}
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}
