import React,{useContext, useState} from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import useInputObject from '../../hooks/useInputObject';
import './adminTheme.css'
import useInput from '../../hooks/useInput';
import { Button } from '@mui/material';
import axios from 'axios';
import { ThemeContext } from '../../contexts/ThemeContext';
export default function AdminTheme(props) {
    const {theme}=props;
    const [themes,setThemes,resetThemes]=useInputObject(theme);
    const [editIndex, setEditIndex] = useState(null);
    const [newTheme,setNewTheme,resetNewTheme]=useInput('');
    const [newThemeColor,setNewThemeColor,resetNewThemeColor]=useInput('');
    const {darktheme}=useContext(ThemeContext);
    const baseURL =process.env.REACT_APP_BACKEND_PORT || '';

    const onSubmitNewTheme=async(e)=>{
        e.preventDefault();
        if(!newTheme || !newThemeColor) return;

        const values={
            name:newTheme,
            color:newThemeColor
        }
        try{
            const response=await axios.post(`${baseURL}/api/portfolio/themes/add`,{
                ...values
            })
            console.log("New Theme added")
            resetNewThemes();
        }
        catch(err){
            console.log(err);
        }
    }
    const onSubmitDeleteTheme=async(id)=>{
        try{
            const response=await axios.delete(`${baseURL}/api/portfolio/themes/${id}`)
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
            const response=await axios.post(`${baseURL}/api/portfolio/themes`,{
                ...values
            })
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
        <section className='section admin-theme'
        style={{backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)'}}>
            <div className='container admin-theme-container'>
                <Paper  style={{ margin: '1rem 0', padding: '.5rem 1rem',
                        backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)',
                        boxShadow: darktheme ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.5)'
                    }}>
                    <form onSubmit={onSubmitNewTheme}>
                        <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                            <div className='admin-theme-new grid'>
                                <TextField
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                value={newTheme} 
                                onChange={setNewTheme}
                                variant="outlined"
                                margin='normal'
                                label="Name"
                                fullWidth
                                />
                                <TextField
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                value={newThemeColor} 
                                onChange={setNewThemeColor}
                                variant="outlined"
                                margin='normal'
                                label="Color"
                                fullWidth
                                />
                                <button 
                                style={
                                    {   
                                        color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                        backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                    }}
                                    className="admin-theme-add-btn button button--flex" 
                                    variant="outlined"
                                    type='submit'>Add</button>
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
                    </form>
                    <hr />
                    <form onSubmit={e => {
                        e.preventDefault();
                    }}>
                        <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                            {themes.map((theme,index)=>{
                                return(
                                    <div key={index} className='admin-theme-list grid'>
                                        <TextField
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
                                        <TextField
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
                                )
                            })}
                        </div>
                    </form>
                </Paper>
            </div>
        </section>
    )
}
