import React,{useContext} from 'react'
import './home.css'
import Social from './Social'
import Data from './Data'
import { ThemeContext } from '../contexts/ThemeContext'
export default function Home(props) {
    const {homeData,homeSocial}=props;
    const { darktheme } = useContext(ThemeContext);
    return (
        <section className='home section' id="home"
        style={{backgroundColor:darktheme ? 'var(--title-color)':'var(--container-color)'}}>
            <div className="home-container container grid">
                <div className="home-content grid">
                    <Social homeSocial={homeSocial}/>
                    <div className='home-img'></div>
                    <Data homeData={homeData}/>
                </div>
            </div>
        </section>
    )
}
