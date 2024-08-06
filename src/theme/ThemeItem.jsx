import React from 'react'


export default function ThemeItem(props) {
    const {color}=props;
    const {changeTheme}=props;
    return (
        <div className='single-theme'>
            <div className="theme-item" style={{backgroundColor:color}} 
            onClick={()=>changeTheme(color)}></div>
        </div>
    )
}
