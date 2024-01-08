import { NavLink } from "react-router-dom";

export const Pagination = ({ entriesPerPage, totalEntries, paginate }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
    //   <nav style={{backgroundColor:'none',backgroundImage:'none'}}>
       <ul className="pagination justify-content-center">
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <NavLink style={{backgroundColor:'white'}} onClick={() => paginate(number)} to='/home' className='page-link'>
                {number}
              </NavLink>
            </li>
          ))}
        </ul>
    //   </nav>
    );
  };
  