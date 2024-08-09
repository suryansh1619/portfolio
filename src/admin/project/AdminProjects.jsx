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
import { DataContext } from '../../contexts/DataContext';
import { Navigate } from 'react-router-dom';
export default function AdminProjects() {
    const {state}=useContext(DataContext);
    const {projectsProject}=state;
    const [projects,setProjects]=useInputObject(projectsProject);
    const {darktheme}=useContext(ThemeContext);
    const {auth}=useContext(AuthContext)

    const [newProject,setNewProject,resetNewProject]=useInput('');
    const [newProjectImgurl,setNewProjectImgurl,resetNewProjectImgurl]=useInput('');
    const [newProjectLink,setNewProjectLink,resetNewProjectLink]=useInput('');
    const [newProjectCategory,setNewProjectCategory,resetNewProjectCategory]=useInput('');
    const [newProjectDescription,setNewProjectDescription,resetNewProjectDescription]=useInput('');
    const [newProjectSubtitle1,setNewProjectSubtitle1,resetNewProjectSubtitle1]=useInput('');
    const [newProjectSubtitle2,setNewProjectSubtitle2,resetNewProjectSubtitle2]=useInput('');
    const [newProjectSubtitle3,setNewProjectSubtitle3,resetNewProjectSubtitle3]=useInput('');
    const [newProjectSubtitle4,setNewProjectSubtitle4,resetNewProjectSubtitle4]=useInput('');
    const [newProjectSubtitle5,setNewProjectSubtitle5,resetNewProjectSubtitle5]=useInput('');
    const [newProjectSubtitle6,setNewProjectSubtitle6,resetNewProjectSubtitle6]=useInput('');
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
            const token = localStorage.getItem('token');
            const response=await axios.post(`${baseURL}/api/portfolio/projects`,
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
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
            || !newProjectSubtitle1 || !newProjectDescription || !newProjectSubtitle2 ||
            !newProjectSubtitle3 || !newProjectSubtitle4 || !newProjectSubtitle5 ||
            !newProjectSubtitle6
        ) return;
        const values={
            title:newProject,
            imgUrl:newProjectImgurl,
            link:newProjectLink,
            category:newProjectCategory,
            description:newProjectDescription,
            subtitle1:newProjectSubtitle1,
            subtitle2:newProjectSubtitle2,
            subtitle3:newProjectSubtitle3,
            subtitle4:newProjectSubtitle4,
            subtitle5:newProjectSubtitle5,
            subtitle6:newProjectSubtitle6,
        }
        console.log(values)
        try{
            const token = localStorage.getItem('token');
            const response=await axios.post(`${baseURL}/api/portfolio/projects/add`,
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
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
            const token = localStorage.getItem('token');
            const response=await axios.delete(`${baseURL}/api/portfolio/projects/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
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
        resetNewProjectDescription();
        resetNewProjectSubtitle1();
        resetNewProjectSubtitle2();
        resetNewProjectSubtitle3();
        resetNewProjectSubtitle4();
        resetNewProjectSubtitle5();
        resetNewProjectSubtitle6();
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
                        <h2 
                            style={{color:darktheme ? 'var(--container-color)':'var(--title-color)'}}
                            className='admin-head-project-title'><span>P</span>rojects</h2>
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
                                                            <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.description1} 
                                                                onChange={setProjects(index,'description')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Description "
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
                                                                onChange={setProjects(index,'subtitle1')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Subtitle 1"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.title2} 
                                                                onChange={setProjects(index,'subtitle2')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Subtitle 2"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.title3} 
                                                                onChange={setProjects(index,'subtitle3')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Subtitle 3"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.title4} 
                                                                onChange={setProjects(index,'subtitle4')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Subtitle 4"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.title4} 
                                                                onChange={setProjects(index,'subtitle4')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Subtitle 5"
                                                                fullWidth
                                                                />
                                                                <TextField
                                                                size={isMobile ? "small": ''} 
                                                                style={{width:isMobile370 ? "100px" : ''}}
                                                                InputProps={{ 
                                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                                                value={project.title4} 
                                                                onChange={setProjects(index,'subtitle4')}
                                                                variant="outlined"
                                                                margin='normal'
                                                                label="Subtitle 6"
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
                                    <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectDescription} 
                                        onChange={setNewProjectDescription}
                                        variant="outlined"
                                        margin='normal'
                                        label="Description 1"
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
                                        value={newProjectSubtitle1} 
                                        onChange={setNewProjectSubtitle1}
                                        variant="outlined"
                                        margin='normal'
                                        label="Subtitle 1"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectSubtitle2} 
                                        onChange={setNewProjectSubtitle2}
                                        variant="outlined"
                                        margin='normal'
                                        label="Subtitle 2"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectSubtitle3} 
                                        onChange={setNewProjectSubtitle3}
                                        variant="outlined"
                                        margin='normal'
                                        label="Subtitle 3"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectSubtitle4} 
                                        onChange={setNewProjectSubtitle4}
                                        variant="outlined"
                                        margin='normal'
                                        label="Subtitle 4"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectSubtitle5} 
                                        onChange={setNewProjectSubtitle5}
                                        variant="outlined"
                                        margin='normal'
                                        label="Subtitle 5"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        style={{width:isMobile370 ? "100px" : ''}}
                                        InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={newProjectSubtitle6} 
                                        onChange={setNewProjectSubtitle6}
                                        variant="outlined"
                                        margin='normal'
                                        label="Subtitle 6"
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
                    </div>
                </div>
            </section>
        : 
        <Navigate to="/admin/login"/>
    )
}
