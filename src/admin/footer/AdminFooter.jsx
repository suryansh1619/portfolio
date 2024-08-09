import React,{useContext, useState,useEffect} from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import useInputObject from '../../hooks/useInputObject';
import './adminFooter.css'
import useInput from '../../hooks/useInput';
import axios from 'axios';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import { Navigate } from 'react-router-dom';
export default function AdminFooter() {
    const {state}=useContext(DataContext);
    const {footer}=state;
    const [footers,setFooters]=useInputObject(footer);
    const [editIndex, setEditIndex] = useState(null);
    const [newFooter,setNewFooter,resetNewFooter]=useInput('');
    const [newFooterLink,setNewFooterLink,resetNewFooterLink]=useInput('');
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

    const onSubmitNewFooter=async(e)=>{
        e.preventDefault();
        if(!newFooter || !newFooterLink) return;

        const values={
            name:newFooter,
            link:newFooterLink
        }
        try{
            const token = localStorage.getItem('token');
            const response=await axios.post(`${baseURL}/api/portfolio/footers/add`,
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            console.log("New Footer added")
            resetNewFooters();
        }
        catch(err){
            console.log(err);
        }
    }
    const onSubmitDeleteFooter=async(id)=>{
        try{
            const token = localStorage.getItem('token');
            const response=await axios.delete(`${baseURL}/api/portfolio/footers/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            console.log("Footer Deleted");
        }
        catch(err){
            console.log(err);
        }
    }
    const onSubmitFooter=async(e)=>{
        e.preventDefault();
        if(editIndex===null) return;
        const values=footers[editIndex];
        try{
            const token = localStorage.getItem('token');
            const response=await axios.post(`${baseURL}/api/portfolio/footers`,
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
    const resetNewFooters = () => {
        resetNewFooter();
        resetNewFooterLink();
    };
    const toggleEditMode = (index) => {
        if(editIndex!==null) return;
        setEditIndex(editIndex === index ? null : index);
    };
    return (    
        auth.isAuthenticated ?
            <section className='section admin-footer'
            style={{backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)'}}>
                <div className='container admin-footer-container'>
                    <Paper style={{ margin: '1rem 0', padding: '.5rem 1rem',
                            backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)',
                            boxShadow: darktheme ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.5)'
                        }}>
                        <h2 
                            style={{color:darktheme ? 'var(--container-color)':'var(--title-color)'}}
                            className='admin-footer-title'><span>F</span>ooter</h2>
                        <form onSubmit={onSubmitNewFooter}>
                            <div style={{padding: '.5rem 1rem' }}>
                                <div className='admin-footer-new grid'>
                                    <div className='admin-footer-single-field'>
                                    <TextField
                                    size={isMobile ? "small": ''}
                                    InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                    InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                    value={newFooter} 
                                    onChange={setNewFooter}
                                    variant="outlined"
                                    margin='normal'
                                    label="Name"
                                    fullWidth
                                    />
                                    </div>
                                    <div className='admin-footer-single-field'>
                                    <TextField
                                    size={isMobile ? "small": ''}
                                    InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                    InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                    value={newFooterLink} 
                                    onChange={setNewFooterLink}
                                    variant="outlined"
                                    margin='normal'
                                    label="Link"
                                    fullWidth
                                    />
                                    </div>
                                    <div className="admin-footer-single-item">
                                        <button 
                                        style={
                                            {   
                                                color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                            }}
                                            className="admin-footer-add-btn button button--flex" 
                                            variant="outlined"
                                            type='submit'>Add</button>
                                    </div>
                                    <div className="admin-footer-single-item">
                                        <button 
                                        style={
                                            {   
                                                color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                            }}
                                            className="admin-footer-reset-btn button button--flex" 
                                            variant="outlined"
                                            onClick={resetNewFooters}>Reset</button>
                                        </div>
                                </div>
                            </div>
                        </form>
                        <hr />
                        <form onSubmit={e => {
                            e.preventDefault();
                        }}>
                            <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                                {footers.map((footer,index)=>{
                                    return(
                                        <div key={index} className='admin-footer-list grid'>
                                            <div className='admin-footer-single-field'>
                                            <TextField
                                            size={isMobile ? "small": ''}
                                            InputProps={{ 
                                                readOnly: editIndex !== index,
                                                style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                            value={footer.name} 
                                            onChange={setFooters(index,'name')}
                                            variant="outlined"
                                            margin='normal'
                                            label="Name"
                                            fullWidth
                                            />
                                            </div>
                                            <div className='admin-footer-single-field'>
                                            <TextField
                                            size={isMobile ? "small": ''}
                                            InputProps={{ 
                                                readOnly: editIndex !== index,
                                                style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                            value={footer.link} 
                                            onChange={setFooters(index,'link')}
                                            variant="outlined"
                                            margin='normal'
                                            label="Link"
                                            fullWidth
                                            />
                                            </div>
                                            <div className="admin-footer-single-item">
                                            {editIndex!==index ? <button 
                                            style={
                                                {   
                                                    color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                    backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                }}
                                                className="admin-footer-edit-btn button button--flex" 
                                                variant="outlined"
                                                onClick={() => toggleEditMode(index)}
                                                >Edit</button> :
                                                <button 
                                                style={
                                                    {   
                                                        color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                        backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                    }}
                                                className="admin-footer-edit-btn button button--flex" 
                                                variant="outlined"
                                                onClick={onSubmitFooter}
                                                >Done</button>}
                                            </div>
                                            <div className="admin-footer-single-item">
                                            <button 
                                            style={
                                                {   
                                                    color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                    backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                }}
                                                className="admin-footer-delete-btn button button--flex" 
                                                variant="outlined"
                                                onClick={()=>onSubmitDeleteFooter(footer._id)}
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
        :<Navigate to="/admin/login"/>
    )
}
