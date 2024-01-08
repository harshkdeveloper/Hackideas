import React,{useEffect, useState} from 'react'

import { findUserByUsername } from '../../config/firebaseQueries'
import {useNavigate} from 'react-router-dom'
// import '../App.css'
import './login.css'
const Login = ({ setIsLoggedIn }) => {
  const navigate=useNavigate()
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    
  },[navigate])
const handleLogin = async (e) => {
  e.preventDefault();

  const user = await findUserByUsername(employeeId);

  if (user) {
    if (user.employeeId === employeeId) {
      localStorage.setItem('employeeId', employeeId);
      setIsLoggedIn(true);
      // navigate('/')
      // Perform login actions, e.g., setting user context or redirecting
    } 
  } else {
    setError("User not found");
  }
};
  return (
   <>
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh",backgroundColor: '#4158D0',
backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)'
 }}>
          <div className="container-fluid">
            <form className="mx-auto" onSubmit={handleLogin}>
                <h4 className="text-center">Login</h4>
                <div className="mb-3 mt-5">
                  <label for="exampleInputEmail1" className="form-label">Employee Id</label>
                  <input type="text"value={employeeId} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"onChange={(e)=>setEmployeeId(e.target.value)}/>
                </div>
            
              
                <button type="submit" className="btn btn-primary mt-5">Login</button>
                {error && <p>{error}</p>}
              </form>
        </div>
        
</div>

</>
  )
}

export default Login