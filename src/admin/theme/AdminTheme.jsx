import React,{useContext, useState,useEffect} from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import useInputObject from '../../hooks/useInputObject';
import './adminTheme.css'
import useInput from '../../hooks/useInput';
import axios from 'axios';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import {Navigate} from 'react-router-dom'
export default function AdminTheme() {
    const {state}=useContext(DataContext);
    const {theme}=state;
    const [themes,setThemes,resetThemes]=useInputObject(theme);
    const [editIndex, setEditIndex] = useState(null);
    const [newTheme,setNewTheme,resetNewTheme]=useInput('');
    const [newThemeColor,setNewThemeColor,resetNewThemeColor]=useInput('');
    const {darktheme}=useContext(ThemeContext);
    const {auth}=useContext(AuthContext)
    const baseURL =process.env.REACT_APP_BACKEND_PORT || '';
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 576);
        };
        window.addEventListener('resize', handleResize);
    }, []);
    const onSubmitNewTheme=async(e)=>{
        e.preventDefault();
        if(!newTheme || !newThemeColor) return;

        const values={
            name:newTheme,
            color:newThemeColor
        }
        try{
            const token = localStorage.getItem('token');
            const response=await axios.post(`${baseURL}/api/portfolio/themes/add`,
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            console.log("New Theme added")
            resetNewThemes();
        }
        catch(err){
            console.log(err);
        }
    }
    const onSubmitDeleteTheme=async(id)=>{
        try{
            const token = localStorage.getItem('token');
            const response=await axios.delete(`${baseURL}/api/portfolio/themes/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            console.log("Theme Deleted");
        }
        catch(err){
            console.log(err);
        }
    }
    const onSubmitTheme=async(e)=>{
        e.preventDefault();
        if(editIndex===null) return;
        const values=themes[editIndex];
        try{
            const token = localStorage.getItem('token');
            const response=await axios.post(`${baseURL}/api/portfolio/themes`,
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            console.log("data saved")
            setEditIndex(null);
        }
        catch(err){
            console.log(err);
        }
    }
    const resetNewThemes = () => {
        resetNewTheme();
        resetNewThemeColor();
    };
    const toggleEditMode = (index) => {
        setEditIndex(editIndex === index ? null : index);
    };
    return (
        auth.isAuthenticated  ? 
            <section className='section admin-theme'
            style={{backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)'}}>
                <div className='container admin-theme-container'>
                    <Paper  style={{ margin: '1rem 0', padding: '.5rem 1rem',
                            backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)',
                            boxShadow: darktheme ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.5)'
                        }}>
                            <h2 
                            style={{color:darktheme ? 'var(--container-color)':'var(--title-color)'}}
                            className='admin-theme-title'><span>T</span>heme</h2>
                        <form onSubmit={onSubmitNewTheme}>
                            <div style={{padding: '.5rem 1rem' }}>
                                <div className='admin-theme-new grid'>
                                <div className='admin-theme-single-field'>
                                    <TextField
                                    size={isMobile ? "small": ''}
                                    InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                    InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                    value={newTheme} 
                                    onChange={setNewTheme}
                                    variant="outlined"
                                    margin='normal'
                                    label="Name"
                                    fullWidth
                                    />
                                    </div>
                                    <div className='admin-theme-single-field'>
                                    <TextField
                                    size={isMobile ? "small": ''}
                                    InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                    InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                    value={newThemeColor} 
                                    onChange={setNewThemeColor}
                                    variant="outlined"
                                    margin='normal'
                                    label="Color"
                                    fullWidth
                                    />
                                    </div>
                                    <div className="admin-theme-single-item">
                                    <button 
                                    style={
                                        {   
                                            color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                            backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                        }}
                                        className="admin-theme-add-btn button button--flex" 
                                        variant="outlined"
                                        type='submit'>Add</button>
                                        </div>
                                        <div className="admin-theme-single-item">
                                    <button 
                                    style={
                                        {   
                                            color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                            backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                        }}
                                        className="admin-theme-reset-btn button button--flex" 
                                        variant="outlined"
                                        onClick={resetNewThemes}>Reset</button>
                                        </div>
                                </div>
                            </div>
                        </form>
                        <hr />
                        <form onSubmit={e => {
                            e.preventDefault();
                        }}>
                            <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                                {themes.map((theme,index)=>{
                                    return(
                                        <div key={index} className='admin-theme-list grid'>
                                            <div className='admin-theme-single-field'>
                                            <TextField
                                            size={isMobile ? "small": ''}
                                            InputProps={{ 
                                                readOnly: editIndex !== index,
                                                style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                            value={theme.name} 
                                            onChange={setThemes(index,'name')}
                                            variant="outlined"
                                            margin='normal'
                                            label="Name"
                                            fullWidth
                                            />
                                            </div>
                                            <div className='admin-theme-single-field'>
                                            <TextField
                                            size={isMobile ? "small": ''}
                                            InputProps={{ 
                                                readOnly: editIndex !== index,
                                                style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                            value={theme.color} 
                                            onChange={setThemes(index,'color')}
                                            variant="outlined"
                                            margin='normal'
                                            label="Color"
                                            fullWidth
                                            />
                                            </div>
                                            <div className="admin-theme-single-item">
                                            {editIndex!==index ? <button 
                                            style={
                                                {   
                                                    color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                    backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                }}
                                                className="admin-theme-edit-btn button button--flex" 
                                                variant="outlined"
                                                onClick={() => toggleEditMode(index)}
                                                >Edit</button> :
                                                <button 
                                                style={
                                                    {   
                                                        color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                        backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                    }}
                                                className="admin-theme-edit-btn button button--flex" 
                                                variant="outlined"
                                                onClick={onSubmitTheme}
                                                >Done</button>}
                                                </div>
                                                <div className="admin-theme-single-item">
                                            <button 
                                            style={
                                                {   
                                                    color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                    backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                }}
                                                className="admin-theme-delete-btn button button--flex" 
                                                variant="outlined"
                                                onClick={()=>onSubmitDeleteTheme(theme._id)}
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
        : <Navigate to="/admin/login"/>
    )
}
