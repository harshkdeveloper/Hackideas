import React from 'react'
import './sidenav.css'
import { NavLink ,useLocation} from 'react-router-dom'
const Sidenavbar = ({ loginvalue, sortCriteria, setSortCriteria }) => {
  const location = useLocation();
  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };
  console.log(sortCriteria,'sortt')
  return (
    <div className="border-right" style={{width: "250px", height: "100vh",backgroundColor: '#4158D0',
    backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',fontSize:'1.15rem'}}>
   
    <div className="list-group list-group-flush">
        <NavLink to='/' className="list-group-item list-group-item-action"style={{color:'white'}}>CHALLENGES</NavLink>
        <NavLink to="/add" className="list-group-item list-group-item-action "style={{color:'white'}}>ADD CHALLENGES</NavLink>
        {location.pathname === '/home' &&
        <div className="list-group-item"style={{backgroundColor: '#4158D0',
        backgroundImage: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',color:'white'}} >
        <h5>Sorting</h5>
        <div>
          <input
            type="radio"
            id="sortUpvotes"
            name="sortCriteria"
            value="upvotes"
            checked={sortCriteria === 'upvotes'}
            onChange={handleSortChange}
          />
          <label htmlFor="sortUpvotes">Upvotes</label>
        </div>
        <div>
          <input
            type="radio"
            id="sortDate"
            name="sortCriteria"
            value="creationDate"
            checked={sortCriteria === 'creationDate'}
            onChange={handleSortChange}
          />
          <label htmlFor="sortDate">Creation Date</label>
        </div>
        </div>}
        {/* Add other navigation links here */}
    </div>
</div>
  )
}

export default Sidenavbar