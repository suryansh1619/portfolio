import React,{useContext} from 'react'
import { ThemeContext } from '../contexts/ThemeContext';
import './setting.css'
import Theme from '../theme/Theme';
export default function Setting(props) {
    const {themes}=props;
    const { darktheme } = useContext(ThemeContext);
    const {color,setColor}=props;
    return (
        <section className='setting section' id="setting"
        style={{backgroundColor:darktheme ? 'var(--title-color)':'var(--container-color)'}}>
            <div className="setting-container container grid">
                <Theme color={color} setColor={setColor} themes={themes}/>
                <h3 
                    className="edit-title"
                    style={{
                        color: darktheme ? "var(--container-color)" : "var(--title-color)"
                    }}
                    >Edit Portfolio</h3>
                <button className='edit button button--flex'
                        style={{ backgroundColor: !darktheme ? "var(--title-color)" : "var(--container-color)",
                                color: !darktheme ? "var(--container-color)" : "var(--title-color)" }}>
                        Edit
                </button>
            </div>
        </section>
    )
}
