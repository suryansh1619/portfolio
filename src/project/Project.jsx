import React from 'react'
import ProjectItem from './ProjectItem';

export default function Project(props) {
    const {projectsProject}=props;
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
