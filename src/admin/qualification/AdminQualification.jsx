import React,{useContext, useState,useEffect} from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import useInputObject from '../../hooks/useInputObject';
import useInput from '../../hooks/useInput';
import './adminQualification.css'
import axios from 'axios';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import { Navigate } from 'react-router-dom';
export default function AdminQualification(props) {
    const {state}=useContext(DataContext);
    const {qualificationEducation,qualificationAchievement}=state;
    const [education,setEducation]=useInputObject(qualificationEducation);
    const [achievement,setAchievement]=useInputObject(qualificationAchievement);
    const [editIndexEducation, setEditIndexEducation] = useState(null);
    const [editIndexAchievement, setEditIndexAchievement] = useState(null);
    const {darktheme}=useContext(ThemeContext)
    const {auth}=useContext(AuthContext)
    const baseURL =process.env.REACT_APP_BACKEND_PORT || '';
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 576);
        };
        window.addEventListener('resize', handleResize);
    }, []);

    const [newEducation,setNewEducation,resetNewEducation]=useInput('');
    const [newEducationSub,setNewEducationSub,resetNewEducationSub]=useInput('');
    const [newEducationCalender,setNewEducationCalender,resetNewEducationCalender]=useInput('');
    const [newAchievement,setNewAchievement,resetNewAchievement]=useInput('');
    const [newAchievementSub,setNewAchievementSub,resetNewAchievementSub]=useInput('');
    const [newAchievementCalender,setNewAchievementCalender,resetNewAchievementCalender]=useInput('');

    const onSubmitNewEducation=async(e)=>{
        e.preventDefault();
        if (!newEducation || !newEducationSub || !newEducationCalender) return;
        const values={
            title:newEducation,
            subtitle:newEducationSub,
            calender:newEducationCalender
        }
        try{
            const token = localStorage.getItem('token');
            const response=await axios.post(`${baseURL}/api/portfolio/qualification/education/add`,
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            console.log("New Skill Added")
            resetAddedEducation();
        }
        catch(err){
            console.log(err);
        }
    }

    const onSubmitNewAchievements=async(e)=>{
        e.preventDefault();
        if (!newAchievement || !newAchievementSub || !newAchievementCalender) return;
        const values={
            title:newAchievement,
            subtitle:newAchievementSub,
            calender:newAchievementCalender
        }
        try{
            const token = localStorage.getItem('token');
            const response=await axios.post(`${baseURL}/api/portfolio/qualification/achievement/add`,
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            console.log("New Skill Added")
            resetAddedAchievements();
        }
        catch(err){
            console.log(err);
        }
    }

    const onSubmitEducation=async(e)=>{
        e.preventDefault();
        if(editIndexEducation===null) return ;
        const values=education[editIndexEducation];

        try{
            const token = localStorage.getItem('token');
            const response=await axios.post(`${baseURL}/api/portfolio/qualification/education`,
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            console.log("data saved")
            setEditIndexEducation(null)
        }
        catch(err){
            console.log(err);
        }
    }

    const onSubmitAchievement=async(e)=>{
        e.preventDefault();
        if(editIndexAchievement===null) return ;
        const values=achievement[editIndexAchievement];
        try{
            const token = localStorage.getItem('token');
            const response=await axios.post(`${baseURL}/api/portfolio/qualification/achievement`,
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            console.log("data saved")
            setEditIndexAchievement(null)
        }
        catch(err){
            console.log(err);
        }
    }
    const onSubmitDeleteEducation=async(id)=>{
        try{
            const token = localStorage.getItem('token');
            const response=await axios.delete(`${baseURL}/api/portfolio/qualification/education/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            console.log("Education Deleted")
        }
        catch(err){
            console.log(err);
        }
    }
    const resetAddedEducation = () => {
        resetNewEducation();
        resetNewEducationSub();
        resetNewEducationCalender();
    };
    const onSubmitDeleteAchievement=async(id)=>{
        try{
            const token = localStorage.getItem('token');
            const response=await axios.delete(`${baseURL}/api/portfolio/qualification/achievement/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            console.log("Achievements Deleted")
        }
        catch(err){
            console.log(err);
        }
    }
    const resetAddedAchievements = () => {
        resetNewAchievement();
        resetNewAchievementSub();
        resetNewAchievementCalender();
    };
    const toggleEditModeEducation = (index) => {
        if(editIndexEducation!==null || editIndexAchievement!==null) return;
        setEditIndexEducation(editIndexEducation === index ? null : index);
    };
    const toggleEditModeAchievement = (index) => {
        if(editIndexAchievement!==null || editIndexEducation!==null) return;
        setEditIndexAchievement(editIndexAchievement === index ? null : index);
    };
    return (
        auth.isAuthenticated ? 
            <section className='section admin-qualification'
            style={{backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)'}}>
                <div className='container admin-qualification-container'>
                    <Paper style={{ margin: '1rem 0', padding: '.5rem 1rem',
                            backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)',
                            boxShadow: darktheme ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.5)'
                        }}>
                            <h2
                        className='admin-qualification-title'
                            style={{color:darktheme ? 'var(--container-color)':'var(--title-color)'}}>
                            <span>E</span>ducation
                        </h2>
                        <form onSubmit={onSubmitNewEducation}>
                            <div style={{padding: '.5rem 1rem' }}>
                                <div className='admin-qualification-new grid'>
                                    <TextField
                                    size={isMobile ? "small": ''} 
                                    InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                    InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                    value={newEducation} 
                                    onChange={setNewEducation}
                                    variant="outlined"
                                    margin='normal'
                                    label="Title"
                                    fullWidth
                                    />
                                    <TextField
                                    size={isMobile ? "small": ''} 
                                    InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                    InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                    value={newEducationSub} 
                                    onChange={setNewEducationSub}
                                    variant="outlined"
                                    margin='normal'
                                    label="Sub Title"
                                    fullWidth
                                    />
                                    <TextField
                                    size={isMobile ? "small": ''} 
                                    InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                    InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                    value={newEducationCalender} 
                                    onChange={setNewEducationCalender}
                                    variant="outlined"
                                    margin='normal'
                                    label="Calender"
                                    fullWidth
                                    />
                                    <div className='admin-qualification-single-item'>
                                        <button 
                                        style={
                                            {   
                                                color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                            }}
                                            className="admin-qualification-add-btn button button--flex" 
                                            type='submit'>Add</button>
                                        <button 
                                        style={
                                            {   
                                                color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                            }}
                                            className="admin-qualification-reset-btn button button--flex" 
                                            onClick={resetAddedEducation}>Reset</button>
                                        </div>
                                </div>
                            </div>
                        </form>
                        <hr />
                        <form onSubmit={e => {
                            e.preventDefault()
                        }}>
                            <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                                {education.map((education,index)=>{
                                    return (
                                        <div key={index} className='admin-qualification-list grid'>
                                            <TextField
                                            size={isMobile ? "small": ''} 
                                            InputProps={{ 
                                                readOnly: editIndexEducation !== index,
                                                style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                            value={education.title} 
                                            onChange={setEducation(index,'title')}
                                            variant="outlined"
                                            margin='normal'
                                            label="Title"
                                            fullWidth
                                            />
                                            <TextField
                                            size={isMobile ? "small": ''} 
                                            InputProps={{ 
                                                readOnly: editIndexEducation !== index,
                                                style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                            value={education.subtitle} 
                                            onChange={setEducation(index,'subtitle')}
                                            variant="outlined"
                                            margin='normal'
                                            label="SubTitle"
                                            fullWidth
                                            />
                                            <TextField
                                            size={isMobile ? "small": ''} 
                                            InputProps={{ 
                                                readOnly: editIndexEducation !== index,
                                                style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                            value={education.calender} 
                                            onChange={setEducation(index,'calender')}
                                            variant="outlined"
                                            margin='normal'
                                            label="Calender"
                                            fullWidth
                                            />
                                            <div className='admin-qualification-single-item'>
                                                {editIndexEducation!==index ? <button 
                                                    style={
                                                        {   
                                                            color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                            backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                        }}
                                                    className="admin-qualification-edit-btn button button--flex" 
                                                    onClick={() => toggleEditModeEducation(index)}>Edit</button> :
                                                    <button 
                                                    style={
                                                        {   
                                                            color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                            backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                        }}
                                                    className="admin-qualification-edit-btn button button--flex" 
                                                    onClick={onSubmitEducation}
                                                    >Done</button>}
                                                <button 
                                                    style={
                                                        {   
                                                            color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                            backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                        }}
                                                    className="admin-qualification-delete-btn button button--flex" 
                                                    onClick={()=>onSubmitDeleteEducation(education._id)}
                                                    >Delete</button>
                                                </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </form>

                        <h2
                            className='admin-qualification-title'
                            style={{color:darktheme ? 'var(--container-color)':'var(--title-color)'}}>
                            <span>A</span>chievements
                        </h2>
                        <form onSubmit={onSubmitNewAchievements}>
                            <div style={{padding: '.5rem 1rem' }}>
                                <div className='admin-qualification-new grid'>
                                    <TextField
                                    size={isMobile ? "small": ''} 
                                    InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                    value={newAchievement} 
                                    onChange={setNewAchievement}
                                    variant="outlined"
                                    margin='normal'
                                    label="Title"
                                    fullWidth
                                    />
                                    <TextField
                                    size={isMobile ? "small": ''} 
                                    InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                    value={newAchievementSub} 
                                    onChange={setNewAchievementSub}
                                    variant="outlined"
                                    margin='normal'
                                    label="Sub Title"
                                    fullWidth
                                    />
                                    <TextField
                                    size={isMobile ? "small": ''} 
                                    InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                    value={newAchievementCalender} 
                                    onChange={setNewAchievementCalender}
                                    variant="outlined"
                                    margin='normal'
                                    label="Calender"
                                    fullWidth
                                    />
                                    <div className='admin-qualification-single-item'>
                                        <button 
                                            style={
                                                {   
                                                    color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                    backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                }}
                                            className="admin-qualification-add-btn button button--flex" 
                                            type='submit'>Add</button>
                                        <button 
                                        style={
                                            {   
                                                color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                            }}
                                            className="admin-qualification-reset-btn button button--flex" 
                                            onClick={resetAddedAchievements}>Reset</button>
                                        </div>
                                </div>
                            </div>
                        </form>
                        <hr />
                        <form onSubmit={e => {
                            e.preventDefault()
                        }}>
                            <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                                {achievement.map((achievement,index)=>{
                                    return (
                                        <div key={index} className='admin-qualification-list grid'>
                                            <TextField
                                            size={isMobile ? "small": ''} 
                                            InputProps={{ 
                                                readOnly: editIndexAchievement !== index,
                                                style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                            value={achievement.title} 
                                            onChange={setAchievement(index,'title')}
                                            variant="outlined"
                                            margin='normal'
                                            label="Title"
                                            fullWidth
                                            />
                                            <TextField
                                            size={isMobile ? "small": ''} 
                                            InputProps={{ 
                                                readOnly: editIndexAchievement!== index,
                                                style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                            value={achievement.subtitle} 
                                            onChange={setAchievement(index,'subtitle')}
                                            variant="outlined"
                                            margin='normal'
                                            label="SubTitle"
                                            fullWidth
                                            />
                                            <TextField
                                            size={isMobile ? "small": ''} 
                                            InputProps={{ 
                                                readOnly: editIndexAchievement !== index,
                                                style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                            value={achievement.calender} 
                                            onChange={setAchievement(index,'calender')}
                                            variant="outlined"
                                            margin='normal'
                                            label="Calender"
                                            fullWidth
                                            />
                                            <div className='admin-qualification-single-item'>
                                                {editIndexAchievement!==index ? <button 
                                                    style={
                                                        {   
                                                            color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                            backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                        }}
                                                    className="admin-qualification-edit-btn button button--flex" 
                                                    onClick={() => toggleEditModeAchievement(index)}>Edit</button> :
                                                    <button 
                                                    style={
                                                        {   
                                                            color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                            backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                        }}
                                                    className="admin-qualification-edit-btn button button--flex" 
                                                    onClick={onSubmitAchievement}
                                                    >Done</button>}
                                                <button 
                                                style={
                                                    {   
                                                        color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                        backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                    }}
                                                    className="admin-qualification-delete-btn button button--flex" 
                                                    onClick={()=>onSubmitDeleteAchievement(achievement._id)}
                                                    >Delete</button>
                                                </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </form>
                    </Paper>
                </div>
            </section>
        : 
        <Navigate to="/admin/login"/>
    )
}
