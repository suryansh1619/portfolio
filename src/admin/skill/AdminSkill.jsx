import React,{useContext, useState} from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import useInputObject from '../../hooks/useInputObject';
import './adminSkill.css'
import axios from 'axios';
import useInput from '../../hooks/useInput';
import { ThemeContext } from '../../contexts/ThemeContext';
export default function AdminSkill(props) {
    const {skills}=props;
    const [skill,setSkill,resetSkill]=useInputObject(skills);
    const [editIndex, setEditIndex] = useState(null);
    const [newSkill,setNewSkill,resetNewSkill]=useInput('');
    const [newSkillLevel,setNewSkillLevel,resetNewSkillLevel]=useInput('');
    const {darktheme}=useContext(ThemeContext)
    const baseURL =process.env.REACT_APP_BACKEND_PORT || '';
    const onSubmitSkill=async(e)=>{
        e.preventDefault();
        if(editIndex===null) return ;
        const values=skill[editIndex];
        try{
            const response=await axios.post(`${baseURL}/api/portfolio/skills`,{
                ...values
            })
            console.log("data saved")
            setEditIndex(null)
        }
        catch(err){
            console.log(err);
        }
    }

    const onSubmitNewSkill=async(e)=>{
        e.preventDefault();
        if (!newSkill || !newSkillLevel) return;
        const values={
            title:newSkill,
            level:newSkillLevel
        }
        try{
            const response=await axios.post(`${baseURL}/api/portfolio/skills/add`,{
                ...values
            })
            console.log("New Skill Added")
            resetNewSkills();
        }
        catch(err){
            console.log(err);
        }
    }
    const onSubmitDeleteSkill=async(id)=>{
        try{
            const response=await axios.delete(`${baseURL}/api/portfolio/skills/${id}`)
            console.log("Skill Deleted")
            const updatedSkills = skill.filter(s => s._id !== id);
            setSkill(updatedSkills);
        }
        catch(err){
            console.log(err);
        }
    }
    const resetNewSkills = () => {
        resetNewSkill();
        resetNewSkillLevel();
    };
    const toggleEditMode = (index) => {
        if(editIndex!==null) return;
        setEditIndex(editIndex === index ? null : index);
    };
    return (
        <section className='section admin-skill'
        style={{backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)'}}>
            <div className='container admin-skill-container'>
                <Paper style={{ margin: '1rem 0', padding: '.5rem 1rem',
                        backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)',
                        boxShadow: darktheme ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.5)'
                    }}>
                    <form onSubmit={onSubmitNewSkill}>
                        <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                            <div className='admin-skill-new grid'>
                                <TextField
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                value={newSkill} 
                                onChange={setNewSkill}
                                variant="outlined"
                                margin='normal'
                                label="Name"
                                fullWidth
                                />
                                <TextField
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                value={newSkillLevel} 
                                onChange={setNewSkillLevel}
                                variant="outlined"
                                margin='normal'
                                label="Level"
                                fullWidth
                                />
                                <button 
                                style={
                                    {   
                                        color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                        backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                    }}
                                    className="admin-skill-add-btn button button--flex" 
                                    variant="outlined"
                                    type='submit'>Add</button>
                                <button 
                                style={
                                    {   
                                        color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                        backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                    }}
                                    className="admin-skill-reset-btn button button--flex" 
                                    variant="outlined"
                                    onClick={resetNewSkills}>Reset</button>
                            </div>
                        </div>
                    </form>
                    <hr />
                    <form onSubmit={e => {
                        e.preventDefault();
                    }}>
                        <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                            {skill.map((skill,index)=>{
                                return(
                                    <div key={index} className='admin-skill-list grid'>
                                        <TextField
                                        InputProps={{ 
                                            readOnly: editIndex !== index,
                                            style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={skill.title} 
                                        onChange={setSkill(index,'title')}
                                        variant="outlined"
                                        margin='normal'
                                        label="Name"
                                        fullWidth
                                        />
                                        <TextField
                                        InputProps={{ 
                                            readOnly: editIndex !== index,
                                            style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                        InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                        value={skill.level} 
                                        onChange={setSkill(index,'level')}
                                        variant="outlined"
                                        margin='normal'
                                        label="Level"
                                        fullWidth
                                        />
                                        {editIndex!==index ? <button 
                                            type="button"
                                            style={
                                                {   
                                                    color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                    backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                }}
                                            className="admin-skill-edit-btn button button--flex" 
                                            onClick={() => toggleEditMode(index)}>Edit</button> :
                                            <button 
                                            type="button"
                                            style={
                                                {   
                                                    color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                    backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                }}
                                            className="admin-skill-edit-btn button button--flex" 
                                            onClick={onSubmitSkill}
                                            >Done</button>}
                                        <button 
                                            style={
                                            {   
                                                color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                            }}
                                            className="admin-skill-delete-btn button button--flex" 
                                            onClick={()=>onSubmitDeleteSkill(skill._id)}>Delete</button>
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
