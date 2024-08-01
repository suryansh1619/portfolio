import React,{useContext, useState} from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import useInputObject from '../../hooks/useInputObject';
import './adminFooter.css'
import useInput from '../../hooks/useInput';
import { Button } from '@mui/material';
import axios from 'axios';
import { ThemeContext } from '../../contexts/ThemeContext';
export default function AdminFooter(props) {
    const {footer}=props;
    const [footers,setFooters]=useInputObject(footer);
    const [editIndex, setEditIndex] = useState(null);
    const [newFooter,setNewFooter,resetNewFooter]=useInput('');
    const [newFooterLink,setNewFooterLink,resetNewFooterLink]=useInput('');
    const {darktheme}=useContext(ThemeContext)
    const baseURL =process.env.REACT_APP_BACKEND_PORT || '';

    const onSubmitNewFooter=async(e)=>{
        e.preventDefault();
        if(!newFooter || !newFooterLink) return;

        const values={
            name:newFooter,
            link:newFooterLink
        }
        try{
            const response=await axios.post(`${baseURL}/api/portfolio/footers/add`,{
                ...values
            })
            console.log("New Footer added")
            resetNewFooters();
        }
        catch(err){
            console.log(err);
        }
    }
    const onSubmitDeleteFooter=async(id)=>{
        try{
            const response=await axios.delete(`${baseURL}/api/portfolio/footers/${id}`)
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
            const response=await axios.post(`${baseURL}/api/portfolio/footers`,{
                ...values
            })
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
        <section className='section admin-footer'
        style={{backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)'}}>
            <div className='container admin-footer-container'>
                <Paper style={{ margin: '1rem 0', padding: '.5rem 1rem',
                        backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)',
                        boxShadow: darktheme ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.5)'
                    }}>
                    <form onSubmit={onSubmitNewFooter}>
                        <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                            <div className='admin-footer-new grid'>
                                <TextField
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                value={newFooter} 
                                onChange={setNewFooter}
                                variant="outlined"
                                margin='normal'
                                label="Name"
                                fullWidth
                                />
                                <TextField
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                value={newFooterLink} 
                                onChange={setNewFooterLink}
                                variant="outlined"
                                margin='normal'
                                label="Link"
                                fullWidth
                                />
                                <button 
                                style={
                                    {   
                                        color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                        backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                    }}
                                    className="admin-footer-add-btn button button--flex" 
                                    variant="outlined"
                                    type='submit'>Add</button>
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
                    </form>
                    <hr />
                    <form onSubmit={e => {
                        e.preventDefault();
                    }}>
                        <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                            {footers.map((footer,index)=>{
                                return(
                                    <div key={index} className='admin-footer-list grid'>
                                        <TextField
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
                                        <TextField
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
                                )
                            })}
                        </div>
                    </form>
                </Paper>
            </div>
        </section>
    )
}
