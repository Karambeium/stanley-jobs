import { useState, useEffect } from 'react'
import './App.css'
// import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import JobsList from './components/JobsList.jsx';
import Home from './pages/Home.jsx';
import NavBar from './components/NavBar.jsx';
import UserList from './components/UserList.jsx';

function App() {

  const [user, setUser] = useState({
    name:'Karam Jivani' // TODO : remove
  });
  const [role, setRole] = useState('admin'); // TODO : remove
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    console.log('home page log', user);
  });

  return (
    <>
      <BrowserRouter>
        <NavBar userId={userId} userName={user.name} role={role}></NavBar>
        <JobsList></JobsList>
        <Routes>
          <Route path="/" element={<Home userId={userId}/>}/>
          <Route path="/home" element={<Home  userId={userId}/>}/>
          <Route path='/login' element={<Login setRole={setRole} setUser={setUser} setUserId={setUserId} userId={userId}/>}/>
          <Route path='/register' element={<Register setUser={setUser} user={user} setRole={setRole} setUserId={setUserId}/>}/>
          <Route path='/users' element={<UserList/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
