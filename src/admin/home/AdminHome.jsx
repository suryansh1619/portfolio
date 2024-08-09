import React,{useContext, useState,useEffect,useReducer} from 'react'
import useInput from '../../hooks/useInput'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import useInputObject from '../../hooks/useInputObject';
import './adminHome.css'
import axios from 'axios';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/DataContext';
import { Navigate } from 'react-router-dom';
export default function AdminHome() {
    const {state}=useContext(DataContext);
    const homeData=state.homeData[0];
    const homeSocial=state.homeSocial;
    const [firstName, setFirstName] = useInput(homeData.firstName);
    const [lastName, setLastName] = useInput(homeData.lastName);
    const [description, setDescription] = useInput(homeData.description);
    const [buttonText, setButtonText] = useInput(homeData.buttonText);
    const [social,setSocial]=useInputObject(homeSocial);
    const [editIndex, setEditIndex] = useState(null);
    const {darktheme}=useContext(ThemeContext);
    const {auth}=useContext(AuthContext);
    const baseURL =process.env.REACT_APP_BACKEND_PORT || '';
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 576);
        };
        window.addEventListener('resize', handleResize);
    }, []);
    const onSubmitHomeData=async(e)=>{
        e.preventDefault();
        const values={
            firstName,
            lastName,
            description,
            buttonText,
            _id: homeData._id
        }
        try{
            const token = localStorage.getItem('token');
            const response=await axios.post(`${baseURL}/api/portfolio/homedata`,
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            console.log("data saved")
        }
        catch(err){
            console.log(err);
        }
    }
    const onSubmitHomeSocial=async(e)=>{
        e.preventDefault();
        if(editIndex===null) return ;
        const values=social[editIndex];
        try{
            const token = localStorage.getItem('token');
            const response=await axios.post(`${baseURL}/api/portfolio/homesocial`,
                values,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            )
            console.log("data saved")
            setEditIndex(null)
        }
        catch(err){
            console.log(err);
        }
    }
    const toggleEditMode = (index) => {
        if(editIndex!==null) return;
        setEditIndex(editIndex === index ? null : index);
    };
    return (
        auth.isAuthenticated ? 
            <section 
                className='section admin-home'
                style={{backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)'}}>
                <div className='container admin-home-container'>
                    <Paper 
                        style={{ margin: '1rem 0', padding: '.5rem 1rem',
                            backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)',
                            boxShadow: darktheme ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.5)'
                        }}>
                        <h2 
                            style={{color:darktheme ? 'var(--container-color)':'var(--title-color)'}}
                            className='admin-home-title'><span>H</span>ome</h2>
                        <form onSubmit={onSubmitHomeData}>
                            <div style={{ padding: '.5rem 1rem'}}>
                                <TextField
                                size={isMobile ? "small": ''} 
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                value={firstName} 
                                onChange={setFirstName}
                                variant="outlined"
                                margin='normal'
                                label='First Name'
                                fullWidth
                                />
                                <TextField
                                size={isMobile ? "small": ''}
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}                            
                                value={lastName} 
                                onChange={setLastName}
                                variant="outlined"
                                margin='normal'
                                label='Last Name'
                                fullWidth
                                />
                                <TextField
                                size={isMobile ? "small": ''}
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                value={description} 
                                onChange={setDescription}
                                variant="outlined"
                                margin='normal'
                                label='Description'
                                fullWidth
                                />
                                <TextField
                                size={isMobile ? "small": ''}
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                value={buttonText} 
                                onChange={setButtonText}
                                variant="outlined"
                                margin='normal'
                                label='Button Text'
                                fullWidth
                                />
                                <button 
                                style={
                                    {   
                                        color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                        backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)',
                                        marginTop:"1rem"
                                    }}
                                type="submit" className='admin-home-save-btn button button--flex'>Save</button>
                            </div>
                        </form>
                        <hr />
                        <form onSubmit={onSubmitHomeSocial}>
                            <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                                {social.map((social,index)=>{
                                    return(
                                        <div key={index} className={`admin-home-social-list grid`}>
                                            <TextField
                                            size={isMobile ? "small": ''}
                                            InputProps={{ 
                                                    readOnly: editIndex !== index,
                                                    style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',
                                                }}}
                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                            value={social.name} 
                                            onChange={setSocial(index,'name')}
                                            variant="outlined"
                                            margin='normal'
                                            label={social.name}
                                            fullWidth
                                            />
                                            <TextField
                                            size={isMobile ? "small": ''}
                                            InputProps={{ 
                                                readOnly: editIndex !== index,
                                                style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',
                                            }}}
                                            InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                            value={social.link} 
                                            onChange={setSocial(index,'link')}
                                            variant="outlined"
                                            margin='normal'
                                            label={`${social.name} link`}
                                            fullWidth
                                            />
                                            <div className="admin-home-single-item">
                                                {editIndex!==index ? <button 
                                                    type="button"
                                                    style={
                                                        {   
                                                            color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                            backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                        }}
                                                    className="admin-home-social-edit-btn button button--flex" 
                                                    onClick={() => toggleEditMode(index)}>Edit</button> :
                                                    <button 
                                                    type="button"
                                                    style={
                                                        {   
                                                            color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                                            backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                                        }}
                                                    className="admin-home-social-edit-btn button button--flex" 
                                                    onClick={onSubmitHomeSocial}
                                                    >Done</button>}
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
