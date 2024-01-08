import logo from './logo.svg';

import Login from './components/Login/Login';
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import { useEffect,useState } from 'react';
import AddChallenges from './components/Challenges/AddChallenges';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const employeeId = localStorage.getItem('employeeId');
      setIsLoggedIn(!!employeeId);
    };

    checkLoginStatus();


    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

 

  return (
    <BrowserRouter>
 
   <Routes>
   <Route 
          path="/" 
          element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/home" />}
        />
        <Route 
          path="/home" 
          element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
        />
         <Route 
          path="/add" 
          element={isLoggedIn ? <AddChallenges setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
         
        />
   </Routes>
  </BrowserRouter>
  );
}

export default App;
