import React, {useContext, useState,useEffect} from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import useInputObject from '../../hooks/useInputObject';
import './adminProject.css'
import useToggle from '../../hooks/usetoggle';
import useInput from '../../hooks/useInput';
import axios from 'axios';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
export default function AdminProjects(props) {
    const {projectsProject}=props;
    const [projects,setProjects,resetProjects]=useInputObject(projectsProject);
    const {darktheme}=useContext(ThemeContext);
    const {auth}=useContext(AuthContext)

    const [newProject,setNewProject,resetNewProject]=useInput('');
    const [newProjectImgurl,setNewProjectImgurl,resetNewProjectImgurl]=useInput('');
    const [newProjectLink,setNewProjectLink,resetNewProjectLink]=useInput('');
    const [newProjectCategory,setNewProjectCategory,resetNewProjectCategory]=useInput('');
    const [newProjectTitle1,setNewProjectTitle1,resetNewProjectTitle1]=useInput('');
    const [newProjectDescription1,setNewProjectDescription1,resetNewProjectDescription1]=useInput('');
    const [newProjectTitle2,setNewProjectTitle2,resetNewProjectTitle2]=useInput('');
    const [newProjectDescription2,setNewProjectDescription2,resetNewProjectDescription2]=useInput('');
    const [newProjectTitle3,setNewProjectTitle3,resetNewProjectTitle3]=useInput('');
    const [newProjectDescription3,setNewProjectDescription3,resetNewProjectDescription3]=useInput('');
    const [newProjectTitle4,setNewProjectTitle4,resetNewProjectTitle4]=useInput('');
    const [newProjectDescription4,setNewProjectDescription4,resetNewProjectDescription4]=useInput('');
    const [isHovering, toggleHover] = useState(null);
    const [isHoveringEdit, toggleHoverEdit] = useToggle(false);
    const baseURL =process.env.REACT_APP_BACKEND_PORT || '';
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
    const [isMobile370, setIsMobile370] = useState(window.innerWidth <= 576);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 576);
        };
        window.addEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile370(window.innerWidth <= 370);
        };
        window.addEventListener('resize', handleResize);
    }, []);
    const changeHover=(index)=>{
        toggleHover(index);
    }
    const onSubmitProject=async(index)=>{
        const values=projects[index];
        try{
            const response=await axios.post(`${baseURL}/api/portfolio/projects`,
                values,
                {withCredentials: true}
            )
            console.log("data saved");
            toggleHover(null)
        }
        catch(err){
            console.log(err);
        }
    }

    const onSubmitNewProject=async(e)=>{
        e.preventDefault();
        if(!newProject || !newProjectImgurl || !newProjectCategory || !newProjectLink
            || !newProjectTitle1 || !newProjectDescription1 || !newProjectTitle2 ||
            !newProjectDescription2 || !newProjectTitle3 || !newProjectDescription3 ||
            !newProjectTitle4 || !newProjectDescription4) return;
        const values={
            title:newProject,
            Imgurl:newProjectImgurl,
            link:newProjectLink,
            category:newProjectCategory,
            title1:newProjectTitle1,
            description1:newProjectDescription1,
            title2:newProjectTitle2,
            description2:newProjectDescription2,
            title3:newProjectTitle3,
            description3:newProjectDescription3,
            title4:newProjectTitle4,
            description4:newProjectDescription4
        }
        try{
            const response=await axios.post(`${baseURL}/api/portfolio/projects/add`,
                values,
                {withCredentials: true}
            )
            console.log("New Project Added")
            resetNewProjects();
            toggleHoverEdit();
        }
        catch(err){
            console.log(err);
        }
    }
    const onSubmitDeleteProject=async(id)=>{
        try{
            const response=await axios.delete(`${baseURL}/api/portfolio/projects/${id}`,
                {withCredentials: true}
            )
            console.log("Project Deleted")
            toggleHover(null)
        }
        catch(err){
            console.log(err);
        }
    }
    const resetNewProjects=()=>{
        resetNewProject();
        resetNewProjectImgurl();
        resetNewProjectLink();
        resetNewProjectCategory();
        resetNewProjectTitle1();
        resetNewProjectDescription1();
        resetNewProjectTitle2();
        resetNewProjectDescription2();
        resetNewProjectTitle3();
        resetNewProjectDescription3();
        resetNewProjectTitle4();
        resetNewProjectDescription4();
    }
    return (
        auth.isAuthenticated ?
            <section className='section admin-project'
            style={{backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)'}}>
                <div className='container admin-project-container'>
                    <div style={{ margin: '1rem 0', padding: '.5rem 1rem',
                            backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)',
                            boxShadow: darktheme ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.5)'
                        }}
                        className='admin-project-card'>
                        <button style={
                            {   
                                color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                            }}
                            className='button button--flex .admin-project-add-new-btn' onClick={toggleHoverEdit}>
                            Add New Project
                        </button>
                        {isHoveringEdit &&
                        <form onSubmit={onSubmitNewProject}>
                            <div className='admin-project-new-main'
                            style={{
                                backgroundColor: darktheme ? 'rgba(255,255,255,0.6)' :"rgba(0,0,0,0.6)"
                            }}>
                                <div
                                    style={{
                                        margin: '1rem 0', padding: '.5rem 1rem',
                                        border: darktheme ?  "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.2)",
                                        backgroundColor: !darktheme ? 'rgba(255,255,255,0.6)' :"rgba(0,0,0,0.6)"
                                    }}
                                        className='admin-project-new-modal'>
                                            <i className='uil uil-times-circle admin-project-new-close' onClick={toggleHoverEdit}></i>
                                    <TextField
                                    size={isMobile ? "small": ''} 
                                    style={{width:isMobile370 ? "200px" : ''}}
                                    InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                    value={newProjectImgurl} 
                                    onChange={setNewProjectImgurl}
                                    variant="outlined"
                                    margin='normal'
                                    label="Image URL"
                                    />
                                    <TextField
                                    size={isMobile ? "small": ''} 
                                    style={{width:isMobile370 ? "200px" : ''}}
                                    InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                    value={newProjectLink} 
                                    onChange={setNewProjectLink}
                                    variant="outlined"
                                    margin='normal'
                                    label="Project Link"
                                    fullWidth
                                    />
                                    <div className='admin-project-new grid'>
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProject} 
                                        onChange={setNewProject}
                                        variant="outlined"
                                        margin='normal'
                                        label="Name"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectCategory} 
                                        onChange={setNewProjectCategory}
                                        variant="outlined"
                                        margin='normal'
                                        label="Category"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectTitle1} 
                                        onChange={setNewProjectTitle1}
                                        variant="outlined"
                                        margin='normal'
                                        label="Title 1"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectDescription1} 
                                        onChange={setNewProjectDescription1}
                                        variant="outlined"
                                        margin='normal'
                                        label="Description 1"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectTitle2} 
                                        onChange={setNewProjectTitle2}
                                        variant="outlined"
                                        margin='normal'
                                        label="Title 2"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectDescription2} 
                                        onChange={setNewProjectDescription2}
                                        variant="outlined"
                                        margin='normal'
                                        label="Description 2"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectTitle3} 
                                        onChange={setNewProjectTitle3}
                                        variant="outlined"
                                        margin='normal'
                                        label="Title 3"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectDescription3} 
                                        onChange={setNewProjectDescription3}
                                        variant="outlined"
                                        margin='normal'
                                        label="Description 3"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectTitle4} 
                                        onChange={setNewProjectTitle4}
                                        variant="outlined"
                                        margin='normal'
                                        label="Title 4"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectDescription4} 
                                        onChange={setNewProjectDescription4}
                                        variant="outlined"
                                        margin='normal'
                                        label="Description 4"
                                        fullWidth
                                        />
                                        <button 
                                            style={
                                                {   
                                                    color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                    backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                }}
                                            className="admin-project-add-btn button button--flex" 
                                            variant="outlined"
                                            onClick={onSubmitNewProject}
                                            type='submit'>Add</button>
                                        <button 
                                        style={
                                            {   
                                                color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                            }}
                                            className="admin-project-reset-btn button button--flex" 
                                            variant="outlined"
                                            onClick={resetNewProjects}>Reset</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        }
                        <div 
                            className='admin-project-list-modal grid'>
                            {projects.map((project,index)=>{
                                return(
                                    <div className='admin-project-list-item-modal'
                                    key={project._id}
                                        style={{ margin: '1rem 0', padding: '.5rem 1rem',
                                            backgroundColor: darktheme ? 'rgba(255,255,255,0.1)' :"rgba(0,0,0,0.1)",
                                            color:darktheme ? 'var(--container-color)':'var(--title-color)'
                                        }}
                                        onClick={()=>changeHover(index)}>
                                            <img src={project.imgUrl} alt="" className="project-img" />
                                            <div className='admin-project-list-item-hover-modal'>
                                            </div>
                                            <h1 className="admin-project-tmp-title">{project.title}</h1>
                                            <div>
                                                <h3 className='admin-project-title'
                                                style={{
                                                    color:darktheme ? 'var(--container-color)':'var(--title-color)'
                                                }}
                                                >{project.title}</h3>
                                            </div>
                                            {isHovering===index &&
                                                <form onSubmit={e => {
                                                    e.preventDefault();
                                                }}>
                                                    <div
                                                        className='admin-project-new-main'
                                                        style={{
                                                            backgroundColor: darktheme ? 'rgba(255,255,255,0.6)' :"rgba(0,0,0,0.6)"
                                                        }}>
                                                        <div  style={{
                                                            margin: '1rem 0', padding: '.5rem 1rem',
                                                            border: darktheme ?  "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.2)",
                                                            backgroundColor: !darktheme ? 'rgba(255,255,255)' :"rgba(0,0,0,.8)"
                                                        }}
                                                                    className='admin-project-new-modal'>
                                                            <TextField
                                                            size={isMobile ? "small": ''} 
                                                            style={{width:isMobile370 ? "200px" : ''}}
                                                            InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                                            value={project.imgUrl} 
                                                            onChange={setProjects(index,'imgUrl')}
                                                            variant="outlined"
                                                            margin='normal'
                                                            label="Image URL"
                                                            fullWidth
                                                            />
                                                            <TextField
                                                            size={isMobile ? "small": ''} 
                                                            style={{width:isMobile370 ? "200px" : ''}}
                                                            InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                            value={project.link} 
                                                            onChange={setProjects(index,'link')}
                                                            variant="outlined"
                                                            margin='normal'
                                                            label="Project Link"
                                                            fullWidth
                                                            />
                                                            <div key={index} className='admin-project-list grid'>
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.title} 
                                                                onChange={setProjects(index,'title')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Name"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.category} 
                                                                onChange={setProjects(index,'category')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Category"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.title1} 
                                                                onChange={setProjects(index,'title1')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Title 1"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.description1} 
                                                                onChange={setProjects(index,'description1')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Description 1"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.title2} 
                                                                onChange={setProjects(index,'title2')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Title 2"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.description2} 
                                                                onChange={setProjects(index,'description2')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Description 2"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.title3} 
                                                                onChange={setProjects(index,'title3')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Title 3"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.description3} 
                                                                onChange={setProjects(index,'description3')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Description 3"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.title4} 
                                                                onChange={setProjects(index,'title4')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Title 4"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.description4} 
                                                                onChange={setProjects(index,'description4')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Description 4"
                                                                fullWidth
                                                                />
                                                                <button 
                                                                    style={
                                                                        {   
                                                                            color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                                            backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                                        }}
                                                                    className="admin-project-edit-btn button button--flex" 
                                                                    variant="outlined"
                                                                    onClick={()=>onSubmitProject(index)}
                                                                    >Done</button>
                                                                <button 
                                                                style={
                                                                    {   
                                                                        color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                                        backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                                    }}
                                                                    className="admin-project-delete-btn button button--flex" 
                                                                    variant="outlined"
                                                                    onClick={()=>onSubmitDeleteProject(project._id)}
                                                                    >Delete</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>    
                                            }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        : 
        <Navigate to="/admin/login"/>
    )
}
