import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import NavBar from './components/NavBar.jsx';
import UserList from './components/UserList.jsx';
import Application from './pages/Application.jsx';
import ManagerDashboard from './pages/ManagerDashboard.jsx'
import CandidateDashboard from './pages/CandidateDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {

  const [user, setUser] = useState({
    name:''
  });
  const [role, setRole] = useState('Candidate');
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    console.log('home page log', user);
  });

  return (
    <>
      <BrowserRouter>
        <NavBar userId={userId} userName={user.username} role={role}></NavBar>
        <Routes>
          <Route path="/" element={<Login setRole={setRole} setUser={setUser} setUserId={setUserId} userId={userId} user={user}/>}/>
          <Route path="/home" element={<Home userId={userId} role={role} user={user}/>}/>
          <Route path='/login' element={<Login setRole={setRole} setUser={setUser} setUserId={setUserId} userId={userId}/>}/>
          <Route path='/register' element={<Register setUser={setUser} user={user} setRole={setRole} setUserId={setUserId}/>}/>
          <Route path='/users' element={<UserList/>}/>
          <Route path='/application' element={<Application/>}/>
          <Route path='/manager' element={<ManagerDashboard managerId={2}/>}/>
          <Route path='/candidate' element={<CandidateDashboard candidateId={4}/>} />
          <Route path='/admin' element={<AdminDashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
