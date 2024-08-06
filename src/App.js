import './App.css';
import Home from './home/Home';
import AboutInfo from './AboutInfo';
import Projects from './project/Projects';
import Header from './header/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import AdminLogin from './admin/login/AdminLogin';
import { AuthProvider} from './contexts/AuthContext';

function App() {
  const [isLoading, setLoading] = useToggle(true);
  const [data, setData] = useState({});
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');


  const saveData = (data) => {
    setData(data);
  };

  const baseURL = process.env.REACT_APP_BACKEND_PORT;

  const getData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/portfolio/data`);
      setLoading(false);
      saveData(response.data);
      console.log("data saved");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        {isLoading ? <Loader /> :
          <>
            {!isAdminRoute && <Header />}
            {isAdminRoute && location.pathname !== "/admin/login" && <AdminHeader />}

            <Theme themes={data.theme} />
            <Routes>
              <Route path="/" element={<Home homeData={data.homeData[0]} homeSocial={data.homeSocial} />} />
              <Route path="/about" element={<AboutInfo
                about={data.about[0]}
                aboutInfo={data.aboutInfo[0]}
                skills={data.skills}
                qualificationEducation={data.qualificationEducation}
                qualificationExperience={data.qualificationExperience}
                footers={data.footer}
              />} />
              <Route path="/projects" element={<Projects projectsProject={data.projectsProject} />} />
              <Route path='/admin/login' element={<AdminLogin />} />
              <Route path='/admin/home' element={<AdminHome
                homeData={data.homeData[0]}
                homeSocial={data.homeSocial}
              />} />
              <Route path='/admin/about' element={<AdminAbout
                about={data.about[0]}
                aboutInfo={data.aboutInfo[0]}
              />}  />
              <Route path='/admin/skills' element={<AdminSkill
                skills={data.skills}
              />}  />
              <Route path='/admin/qualification' element={<AdminQualification
                qualificationEducation={data.qualificationEducation}
                qualificationExperience={data.qualificationExperience}
              />}  />
              <Route path='/admin/projects' element={<AdminProjects
                projectsProject={data.projectsProject}
              />}  />
              <Route path='/admin/footer' element={<AdminFooter
                footer={data.footer}
              />} />
              <Route path='/admin/theme' element={<AdminTheme
                theme={data.theme}
              />}  />
              <Route path="*" element={<h1>Error Not Found</h1>} />
            </Routes>
          </>
        }
      </ThemeProvider>
    </AuthProvider>  
  );
}

export default App;
