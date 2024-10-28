import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import CompanyList from './CompanyList';
import JoblyApi from './api';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Navbar from './Navbar';
import { jwtDecode } from 'jwt-decode';
function App() {
 
  const [companies, setCompanies] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (info) => {
    await JoblyApi.login(info);
    setToken(JoblyApi.token);
    localStorage.setItem("token", JoblyApi.token);
    
  }
  const logout = () => {
    JoblyApi.logout();
    setToken(JoblyApi.token);
    localStorage.setItem("token", JoblyApi.token)
    console.log("Logged out sucessfully", token);
  }
  const signup = async (info) => {
    await JoblyApi.signup(info)
    setToken(JoblyApi.token);
    localStorage.setItem("token", token);
    console.log("Sign up sucessfully", token);
  }
  useEffect(() => {
    const fetchComps = async () => {
      try {
        const comps = await JoblyApi.getCompanies()
        setCompanies(comps);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
     }
     fetchComps();

     const fetchJobs = async () => {
      try {
        const jbs = await JoblyApi.getJobs()
        setJobs(jbs);
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
     }
     fetchJobs();
  }, []);
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          setCurrentUser(jwtDecode(token).username);
        }
        
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserName();
  }, [token])
  //console.log(jwtDecode(token), token);
  if (loading) return <h1>Loading</h1>
  //console.log(jobs)
  return (
    <>
      <Router>
      <Navbar logout={logout} token={token} currentUser={currentUser}/>
        <Routes>
        <Route path='/' element={<h1>home</h1>}></Route>
          <Route path='/companies' element={<CompanyList companies={companies}/>}></Route>
          <Route path='/companies/:handle' element={<CompanyDetail/>}></Route>
          <Route path='/login' element={<LoginForm login={login}/>}></Route>
          <Route path='/signup' element={<SignUpForm signup={signup}/>}></Route>
          <Route path='/profile'></Route>
          <Route path='/jobs' element={<JobList jobs={jobs}/>}></Route>
          <Route path='*' element={<h1>404 Not Found</h1>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
