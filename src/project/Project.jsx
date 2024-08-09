import React, { useContext } from 'react'
import ProjectItem from './ProjectItem';
import { DataContext } from '../contexts/DataContext';

export default function Project() {
    const {state}=useContext(DataContext);
    const {projectsProject}=state;
    return (
        <div>
            <div className="project-container container grid">
                {projectsProject.map((project)=>{
                    return <ProjectItem 
                                project={project} 
                                key={project._id}/>
                })}
            </div>
        </div>
    )
}
