import './App.css'
import Home from './home/Home';
import AboutInfo from './AboutInfo';
import Projects from './project/Projects';
import Header from './header/Header'
import { Route, Routes, useLocation } from 'react-router-dom'
import Theme from './theme/Theme';
import { ThemeProvider } from './contexts/ThemeContext';
import useToggle from './hooks/usetoggle';
import Loader from './loader/Loader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminHome from './admin/home/AdminHome';
import AdminAbout from './admin/about/AdminAbout';
import AdminHeader from './admin/header/AdminHeader';
import AdminProjects from './admin/project/AdminProjects';
import AdminSkill from './admin/skill/AdminSkill';
import AdminQualification from './admin/qualification/AdminQualification';
import AdminFooter from './admin/footer/AdminFooter';
import AdminTheme from './admin/theme/AdminTheme';
import Setting from './setting/Setting';
function App() {
  const [isLoading, setLoading] = useToggle(true);
  const [data, setData] = useState({});
  const [color, setColor] = useState(null)

  const saveData = (data) => {
    setData(data);
  }
  const baseURL = 'https://portfolio-np44.onrender.com';
  const getData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/portfolio/data`)
      setLoading(false);
      saveData(response.data)
      console.log("data saved");
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData()
  }, []);
  const loaction = useLocation();
  const isAdminRoute = loaction.pathname.startsWith('/admin');
  useEffect(() => {
    if (data.theme && Array.isArray(data.theme)) {
      const selectedTheme = data.theme.find(theme => theme.selected);
      if (selectedTheme) {
        setColor(selectedTheme.color);
      }
    }
  }, [data.theme]);
  useEffect(() => {
    document.documentElement.style.setProperty('--first-color', color);
  }, [color]);
  return (
    <div>
      <ThemeProvider>
        {isLoading ? <Loader /> :
          <>
            {!isAdminRoute && <Header />}
            {isAdminRoute && <AdminHeader />}
            <Routes>
              <Route
                path="/"
                element={<Home
                  homeData={data.homeData[0]}
                  homeSocial={data.homeSocial} />} />
              <Route
                path="/about"
                element={<AboutInfo
                  about={data.about[0]}
                  aboutInfo={data.aboutInfo[0]}
                  skills={data.skills}
                  qualificationEducation={data.qualificationEducation}
                  qualificationExperience={data.qualificationExperience}
                  footers={data.footer} />} />
              <Route
                path="/projects"
                element={<Projects
                  projectsProject={data.projectsProject} />} />
              <Route
                path="/setting"
                element={<Setting
                  themes={data.theme}
                  color={color}
                  setColor={setColor} />} />
              <Route
                path='/admin/home'
                element={<AdminHome
                  homeData={data.homeData[0]}
                  homeSocial={data.homeSocial} />} />
              <Route
                path='/admin/about'
                element={<AdminAbout
                  about={data.about[0]}
                  aboutInfo={data.aboutInfo[0]} />} />
              <Route
                path='/admin/skills'
                element={<AdminSkill
                  skills={data.skills} />} />
              <Route
                path='/admin/qualification'
                element={<AdminQualification
                  qualificationEducation={data.qualificationEducation}
                  qualificationExperience={data.qualificationExperience} />} />
              <Route
                path='/admin/projects'
                element={<AdminProjects
                  projectsProject={data.projectsProject} />} />
              <Route
                path='/admin/footer'
                element={<AdminFooter
                  footer={data.footer} />} />
              <Route
                path='/admin/theme'
                element={<AdminTheme
                  theme={data.theme} />} />
              <Route
                path="*"
                element={<h1>Error Not Found</h1>} />
            </Routes>
          </>
        }
      </ThemeProvider>
    </div>
  );
}

export default App;