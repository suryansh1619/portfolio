import React from 'react'
import Work1 from '../assets/work1.jpg';
import Work2 from '../assets/work2.jpg';
import Work3 from '../assets/work3.jpg';
import Work4 from '../assets/work4.jpg';
import Work5 from '../assets/work5.jpg';
import ProjectItem from './ProjectItem';

export default function Project(props) {
    const {projectsProject,projectsProjectItems}=props;
    return (
        <div>
            <div className="project-container container grid">
                {projectsProject.map((project,index)=>{
                    return <ProjectItem 
                                project={project} 
                                key={index}/>
                })}
            </div>
        </div>
    )
}
