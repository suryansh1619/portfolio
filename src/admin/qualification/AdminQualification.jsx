import React,{useContext, useState,useEffect} from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import useInputObject from '../../hooks/useInputObject';
import useInput from '../../hooks/useInput';
import './adminQualification.css'
import { Button } from '@mui/material';
import axios from 'axios';
import { ThemeContext } from '../../contexts/ThemeContext';
export default function AdminQualification(props) {
    const {qualificationEducation,qualificationExperience}=props;
    const [education,setEducation]=useInputObject(qualificationEducation);
    const [experience,setExperience]=useInputObject(qualificationExperience);
    const [editIndexEducation, setEditIndexEducation] = useState(null);
    const [editIndexExperience, setEditIndexExperience] = useState(null);
    const {darktheme}=useContext(ThemeContext)
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
    const [newExperience,setNewExperience,resetNewExperience]=useInput('');
    const [newExperienceSub,setNewExperienceSub,resetNewExperienceSub]=useInput('');
    const [newExperienceCalender,setNewExperienceCalender,resetNewExperienceCalender]=useInput('');

    const onSubmitNewEducation=async(e)=>{
        e.preventDefault();
        if (!newEducation || !newEducationSub || !newEducationCalender) return;
        const values={
            title:newEducation,
            subtitle:newEducationSub,
            calender:newEducationCalender
        }
        try{
            const response=await axios.post(`${baseURL}/api/portfolio/qualification/education/add`,{
                ...values
            })
            console.log("New Skill Added")
            resetAddedEducation();
        }
        catch(err){
            console.log(err);
        }
    }

    const onSubmitNewExperience=async(e)=>{
        e.preventDefault();
        if (!newExperience || !newExperienceSub || !newExperienceCalender) return;
        const values={
            title:newExperience,
            subtitle:newExperienceSub,
            calender:newExperienceCalender
        }
        try{
            const response=await axios.post(`${baseURL}/api/portfolio/qualification/experience/add`,{
                ...values
            })
            console.log("New Skill Added")
            resetAddedExperience();
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
            const response=await axios.post(`${baseURL}/api/portfolio/qualification/education`,{
                ...values
            })
            console.log("data saved")
            setEditIndexEducation(null)
        }
        catch(err){
            console.log(err);
        }
    }

    const onSubmitExperience=async(e)=>{
        e.preventDefault();
        if(editIndexExperience===null) return ;
        const values=experience[editIndexExperience];
        try{
            const response=await axios.post(`${baseURL}/api/portfolio/qualification/experience`,{
                ...values
            })
            console.log("data saved")
            setEditIndexExperience(null)
        }
        catch(err){
            console.log(err);
        }
    }
    const onSubmitDeleteEducation=async(id)=>{
        try{
            const response=await axios.delete(`${baseURL}/api/portfolio/qualification/education/${id}`)
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
    const onSubmitDeleteExperience=async(id)=>{
        try{
            const response=await axios.delete(`${baseURL}/api/portfolio/qualification/experience/${id}`)
            console.log("Experience Deleted")
        }
        catch(err){
            console.log(err);
        }
    }
    const resetAddedExperience = () => {
        resetNewExperience();
        resetNewExperienceSub();
        resetNewExperienceCalender();
    };
    const toggleEditModeEducation = (index) => {
        if(editIndexEducation!==null || editIndexExperience!==null) return;
        setEditIndexEducation(editIndexEducation === index ? null : index);
    };
    const toggleEditModeExperience = (index) => {
        if(editIndexExperience!==null || editIndexEducation!==null) return;
        setEditIndexExperience(editIndexExperience === index ? null : index);
    };
    return (
        <section className='section admin-qualification'
        style={{backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)'}}>
            <div className='container admin-qualification-container'>
                <Paper style={{ margin: '1rem 0', padding: '.5rem 1rem',
                        backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)',
                        boxShadow: darktheme ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.5)'
                    }}>
                    <form onSubmit={onSubmitNewEducation}>
                        <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
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
                    <hr />
                    <form onSubmit={onSubmitNewExperience}>
                        <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                            <div className='admin-qualification-new grid'>
                                <TextField
                                size={isMobile ? "small": ''} 
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                value={newExperience} 
                                onChange={setNewExperience}
                                variant="outlined"
                                margin='normal'
                                label="Title"
                                fullWidth
                                />
                                <TextField
                                size={isMobile ? "small": ''} 
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                value={newExperienceSub} 
                                onChange={setNewExperienceSub}
                                variant="outlined"
                                margin='normal'
                                label="Sub Title"
                                fullWidth
                                />
                                <TextField
                                size={isMobile ? "small": ''} 
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                value={newExperienceCalender} 
                                onChange={setNewExperienceCalender}
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
                                        onClick={resetAddedExperience}>Reset</button>
                                    </div>
                            </div>
                        </div>
                    </form>
                    <hr />
                    <form onSubmit={e => {
                        e.preventDefault()
                    }}>
                        <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                            {experience.map((experience,index)=>{
                                return (
                                    <div key={index} className='admin-qualification-list grid'>
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        InputProps={{ 
                                            readOnly: editIndexExperience !== index,
                                            style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                        value={experience.title} 
                                        onChange={setExperience(index,'title')}
                                        variant="outlined"
                                        margin='normal'
                                        label="Title"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        InputProps={{ 
                                            readOnly: editIndexExperience !== index,
                                            style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                        value={experience.subtitle} 
                                        onChange={setExperience(index,'subtitle')}
                                        variant="outlined"
                                        margin='normal'
                                        label="SubTitle"
                                        fullWidth
                                        />
                                        <TextField
                                        size={isMobile ? "small": ''} 
                                        InputProps={{ 
                                            readOnly: editIndexExperience !== index,
                                            style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                        value={experience.calender} 
                                        onChange={setExperience(index,'calender')}
                                        variant="outlined"
                                        margin='normal'
                                        label="Calender"
                                        fullWidth
                                        />
                                        <div className='admin-qualification-single-item'>
                                            {editIndexExperience!==index ? <button 
                                                style={
                                                    {   
                                                        color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                        backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                    }}
                                                className="admin-qualification-edit-btn button button--flex" 
                                                onClick={() => toggleEditModeExperience(index)}>Edit</button> :
                                                <button 
                                                style={
                                                    {   
                                                        color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                        backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                    }}
                                                className="admin-qualification-edit-btn button button--flex" 
                                                onClick={onSubmitExperience}
                                                >Done</button>}
                                            <button 
                                            style={
                                                {   
                                                    color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                    backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                }}
                                                className="admin-qualification-delete-btn button button--flex" 
                                                onClick={()=>onSubmitDeleteExperience(experience._id)}
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
    )
}
