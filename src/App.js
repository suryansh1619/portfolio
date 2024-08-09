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
import { useContext, useEffect, useState } from 'react';
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
import { DataProvider } from './contexts/DataContext';

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
        <DataProvider>
          {isLoading ? <Loader /> :
            <>
              {!isAdminRoute && <Header />}
              {isAdminRoute && location.pathname !== "/admin/login" && <AdminHeader />}

              <Theme/>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<AboutInfo/>} />
                <Route path="/projects" element={<Projects />} />
                <Route path='/admin/login' element={<AdminLogin />} />
                <Route path='/admin/home' element={<AdminHome/>} />
                <Route path='/admin/about' element={<AdminAbout/>}  />
                <Route path='/admin/skills' element={<AdminSkill/>}  />
                <Route path='/admin/qualification' element={<AdminQualification/>}  />
                <Route path='/admin/projects' element={<AdminProjects/>}  />
                <Route path='/admin/footer' element={<AdminFooter/>} />
                <Route path='/admin/theme' element={<AdminTheme/>}  />
                <Route path="*" element={<h1>Error Not Found</h1>} />
              </Routes>
            </>
          }
        </DataProvider>
      </ThemeProvider>
    </AuthProvider>  
  );
}

export default App;
