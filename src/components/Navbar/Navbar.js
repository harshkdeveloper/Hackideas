import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'
const Navbar = ({loginvalue}) => {
  console.log(loginvalue)
    const handleLogout = () => {
      //  if(loginvalue!==undefined){
        localStorage.removeItem('employeeId');
        
        loginvalue(false);
      //  }
    }
  return (
    <nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand" href="#"style={{color:'white',fontWeight:'500',background:'none'}}>Hack Ideas</NavLink>
    <NavLink className="navbar-brand d-flex"style={{color:'white',fontWeight:'500',background:'none'}}onClick={handleLogout}>Logout</NavLink>
  </div>
</nav>
  )
}

export default Navbar