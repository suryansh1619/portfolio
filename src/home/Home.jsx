import React,{useContext} from 'react'
import './home.css'
import Social from './Social'
import Data from './Data'
import { ThemeContext } from '../contexts/ThemeContext'
import suryanshImage from '../assets/suryansh.jpg';
export default function Home(props) {
    const { darktheme } = useContext(ThemeContext);
    return (
        <section className='home section' id="home"
        style={{backgroundColor:darktheme ? 'var(--title-color)':'var(--container-color)'}}>
            <div className="home-container container grid">
                <div className="home-content grid">
                    <Social/>
                    <img src={suryanshImage} className='home-img'/>
                    <Data/>
                </div>
            </div>
        </section>
    )
}
