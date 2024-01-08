import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidenavbar from '../Navbar/Sidenavbar'
import ChallengeList from '../Challenges/ChallengeList'

const Home = ({setIsLoggedIn}) => {
  return (
    <>
    <Navbar loginvalue={setIsLoggedIn}/>

                    
                    {/* Rest of the page content */}
                    <ChallengeList setIsLoggedIn={setIsLoggedIn}/>
            
    {/* <div>Home</div>s */}
    </>
  )
}

export default Home