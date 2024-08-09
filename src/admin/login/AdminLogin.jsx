import React, { useContext,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext'
import TextField from '@mui/material/TextField';
import { Paper } from '@mui/material';
import './adminLogin.css'
import useInput from '../../hooks/useInput';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';


export default function AdminLogin() {
    const {darktheme}=useContext(ThemeContext)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
    const [email, setEmail] = useInput("");
    const [password, setPassword] = useInput("");
    const navigate=useNavigate();
    const { checkAuth } = useContext(AuthContext)
    const baseURL =process.env.REACT_APP_BACKEND_PORT || '';
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 576);
        };
        window.addEventListener('resize', handleResize);
    }, []);
    axios.defaults.withCredentials=true;
    const onSubmitForm=async(e)=>{
        e.preventDefault();
        const values={
            email,
            password
        }
        try{
            const response=await axios.post(`${baseURL}/api/user/login`,
                values,
                {withCredentials: true}
            )
            const { token } = response.data;
            localStorage.setItem('token', token);
            await checkAuth();
            console.log("data fetched")
            navigate('/admin/home'); 
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div 
            className='section admin-login'
            style={{backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)'}}>
            <div className="admin-login-container">
                <Paper
                    elevation={3} 
                    style={{ margin: '1rem 0', padding: '2rem',
                            backgroundColor:!darktheme ? 'var(--container-color)':'var(--title-color)',
                            boxShadow: darktheme ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 2px 8px rgba(0, 0, 0, 0.5)'
                        }}>
                    <form onSubmit={onSubmitForm}>
                        <div className='admin-login-form'>
                            <div 
                                className='admin-login-lock-icon'
                                style={{   
                                    color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                }}>
                                <i className='uil uil-lock'/>
                            </div>
                            <h1 
                                style={{   
                                    color:!darktheme ? 'var(--title-color)':'var(--container-color)',
                                    margin:"1rem"
                                }}>
                                Sign In
                            </h1>
                            <TextField
                                size={isMobile ? "small": ''}
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                value={email} 
                                onChange={setEmail}
                                variant="outlined"
                                margin='normal'
                                label="Email"
                                autoComplete='Email'
                                required
                                autoFocus
                                fullWidth
                                />
                            <TextField
                                size={isMobile ? "small": ''}
                                InputProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)',}}}
                                InputLabelProps={{ style:{color:!darktheme ? 'var(--title-color)':'var(--container-color)'}}} 
                                value={password} 
                                onChange={setPassword}
                                variant="outlined"
                                margin='normal'
                                label="Password"
                                type='password'
                                required
                                fullWidth
                                />
                            <button 
                                type='submit'
                                style={{   
                                    color:darktheme ? 'var(--title-color)':'var(--container-color)',
                                    backgroundColor:!darktheme ? 'var(--title-color)':'var(--container-color)',
                                }}
                                className='admin-login-btn button button--flex'>
                                SIGN IN
                            </button>
                            <h3
                                className='forgot-password-text'
                                style={{ 
                                    color:!darktheme ? 'var(--title-color)':'var(--container-color)'
                                }}>Forgot Password ?</h3>
                        </div>
                    </form>
                </Paper>
            </div>
        </div>
    )
}
