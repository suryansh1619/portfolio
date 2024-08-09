import React, { useContext,useState } from 'react'
import './skills.css'
import { ThemeContext } from '../contexts/ThemeContext'
import {DataContext} from '../contexts/DataContext'

export default function Skills() {
    const {state}=useContext(DataContext);
    const skills=state.skills;
    const {darktheme}=useContext(ThemeContext);
    const [hoveredId, setHoveredId] = useState(null);
    const handleMouseEnter = (id) => {
        setHoveredId(id);
    };
    const handleMouseLeave = () => {
        setHoveredId(null);
    };
    const textColor=darktheme ? 'var(--title-color)':'var(--container-color)'
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
                    <div className="skills-group grid">  
                        {skills.map((skill)=>{
                            return(
                                <div key={skill._id} className="skills-data"
                                    onMouseEnter={() => handleMouseEnter(skill._id)}
                                    onMouseLeave={handleMouseLeave}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <div>
                                        <h3
                                            className="skills-name"
                                            style={{color:hoveredId===skill._id ? textColor:''}}>{skill.title}</h3>
                                        <h5
                                            className="skills-level"
                                            style={{color:hoveredId===skill._id ? textColor:''}}>{skill.level}</h5>
                                    </div>
                                </div>)})}
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}
