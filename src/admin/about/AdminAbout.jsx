import React,{useContext} from 'react'
import useInput from '../../hooks/useInput'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './adminAbout.css'
import { ThemeContext } from '../../contexts/ThemeContext';
export default function AboutAdmin(props) {
    const {about,aboutInfo}=props;
    const [description, setDescription] = useInput(about.description);
    const [buttonText, setButtonText] = useInput(about.buttonText);
    const [title1, setTitle1] = useInput(aboutInfo.title1);
    const [subtitle1, setSubtitle1] = useInput(aboutInfo.subtitle1);
    const [title2, setTitle2] = useInput(aboutInfo.title2); 
    const [subtitle2, setSubtitle2] = useInput(aboutInfo.subtitle2);
    const {darktheme}=useContext(ThemeContext);
    const baseURL =process.env.REACT_APP_BACKEND_PORT || '';
    const onSubmitAbout=async(e)=>{
        e.preventDefault();
        const values={
            description,
            buttonText,
            _id: about._id
        }
        try{
            const response=await axios.post(`${baseURL}/api/portfolio/about`,{
                ...values,
                _id:about._id
            })
            if(response.data.success){
                console.log("data saved")
            }
        }
        catch(err){
            console.log(err);
        }
    }
    const onSubmitAboutInfo=async(e)=>{
        e.preventDefault();
        const values={
            title1,
            subtitle1,
            title2,
            subtitle2,
            _id: about._id
        }
        try{
            const response=await axios.post(`${baseURL}/api/portfolio/aboutinfo`,{
                ...values,
                _id:aboutInfo._id
            })
            if(response.data.success){
                console.log("data saved")
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <section className='section admin-about'
        style={{backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)'}}>
            <div className='container admin-about-container'>
                <Paper style={{ margin: '1rem 0', padding: '.5rem 1rem',
                        backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)',
                        boxShadow: darktheme ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.5)'
                    }}>
                    <form onSubmit={onSubmitAbout}>
                        <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                            <TextField
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
                            type="submit" className='button button--flex'>Save</button>
                        </div>
                    </form>
                    <hr/>
                    <form onSubmit={onSubmitAboutInfo}>
                        <div style={{ margin: '1rem 0', padding: '.5rem 1rem' }}>
                            <div className='admin-about-list grid'>
                                <TextField
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                value={title1} 
                                onChange={setTitle1}
                                variant="outlined"
                                margin='normal'
                                label="Title 1"
                                fullWidth
                                />
                                <TextField
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                value={subtitle1} 
                                onChange={setSubtitle1}
                                variant="outlined"
                                margin='normal'
                                label="SubTitle 1"
                                fullWidth
                                />
                                <TextField
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                value={title2} 
                                onChange={setTitle2}
                                variant="outlined"
                                margin='normal'
                                label="Title 2"
                                fullWidth
                                />
                                <TextField
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}}
                                value={subtitle2} 
                                onChange={setSubtitle2}
                                variant="outlined"
                                margin='normal'
                                label="SubTitle 2"
                                fullWidth
                                />
                            </div>
                            <button 
                            style={
                                {   
                                    color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                    backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)',
                                    marginTop:"1rem"
                                }}
                            type="submit" className='button button--flex'>Save</button>
                        </div>
                    </form>
                </Paper>
            </div>
        </section>
    )
}
