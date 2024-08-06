import React, { useContext } from 'react'
import './qualification.css'
import useToggle from '../hooks/usetoggle';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Qualification(props) {
    const {qualificationEducation,qualificationExperience}=props;
    const {darktheme}=useContext(ThemeContext)
    const[toggle,showMenu]=useToggle(true);
    return (
        <section 
            className="qualification section"
            style={{backgroundColor:darktheme ? 'var(--title-color)':'var(--container-color)'}}>
            <h2 
                className="section-title"
                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}><span>Q</span>ualification</h2>
            <h4 
                className="section-subtitle"
                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>My personal journey</h4>
            <div className="qualification-container container">
                <div className="qualification-tabs">
                    <div className={toggle ? "qualification-button qualification-active button--flex" : "qualification-button button--flex"}
                    onClick={showMenu}
                    style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}
                    >
                        <i className="uil uil-graduation-cap
                        qualification-icon"></i> 
                        Education
                    </div>
                    <div className={!toggle ? "qualification-button qualification-active button--flex" : "qualification-button button--flex"}
                    onClick={showMenu}
                    style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>
                        <i className="uil uil-briefcase-alt qualification-icon"></i>
                        Experience 
                    </div>
                </div>
                <div className="qualification-sections">
                    <div className={toggle ? "qualification-content qualification-content-active": "qualification-content "}>
                        {qualificationEducation.map((education,index)=>{
                            if(index%2===0){
                                return(
                                    <div key={education._id} className="qualification-data">
                                        <div>
                                            <h3 
                                                className="qualification-title"
                                                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{education.title}</h3>
                                            <h4     
                                                className="qualification-subtitle"
                                                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{education.subtitle}</h4>
                                            <div 
                                                className="qualification-calender"
                                                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>
                                                <i className="uil uil-calendar-alt"></i> {education.calender}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="qualification-rounder"></span>
                                            <span className="qualification-line"></span>
                                        </div>
                                    </div>
                                )
                            }
                            else{
                                return(
                                    <div key={education._id} className="qualification-data">
                                        <div></div>
                                        <div>
                                            <span className="qualification-rounder"></span>
                                            <span className="qualification-line"></span>
                                        </div>
                                        <div>
                                            <h3 
                                                className="qualification-title"
                                                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{education.title}</h3>
                                            <h4 
                                                className="qualification-subtitle"
                                                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{education.subtitle}</h4>
                                            <div 
                                                className="qualification-calender"
                                                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>
                                                <i className="uil uil-calendar-alt">{education.calender}</i> 
                                            </div>
                                        </div>
                                    </div>
                                )
                            }                        
                        })}
                    </div>
                    <div className={!toggle ? "qualification-content qualification-content-active": "qualification-content "}>
                    {qualificationExperience.map((experience,index)=>{
                            if(index%2!==0){
                                return(
                                    <div key={experience._id} className="qualification-data">
                                        <div>
                                            <h3 
                                                className="qualification-title"
                                                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{experience.title}</h3>
                                            <h4     
                                                className="qualification-subtitle"
                                                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{experience.subtitle}</h4>
                                            <div 
                                                className="qualification-calender"
                                                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>
                                                <i className="uil uil-calendar-alt"></i> {experience.calender}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="qualification-rounder"></span>
                                            <span className="qualification-line"></span>
                                        </div>
                                    </div>
                                )
                            }
                            else{
                                return(
                                    <div key={experience._id} className="qualification-data">
                                        <div></div>
                                        <div>
                                            <span className="qualification-rounder"></span>
                                            <span className="qualification-line"></span>
                                        </div>
                                        <div>
                                            <h3 
                                                className="qualification-title"
                                                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{experience.title}</h3>
                                            <h4 
                                                className="qualification-subtitle"
                                                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>{experience.subtitle}</h4>
                                            <div 
                                                className="qualification-calender"
                                                style={{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}>
                                                <i className="uil uil-calendar-alt">{experience.calender}</i> 
                                            </div>
                                        </div>
                                    </div>
                                )
                            }                        
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
