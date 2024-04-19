import React from 'react'
// import signup from "../assets/signup.png"
import earth2 from "../assets/Images/earth2.mp4"
import Template from '../components/auth/Template'
import "../styles/auth/signup.css"
const Signup = ({setisLoggedIn}) => {
  return (
    <div >
    <Template 
      title="Create New Account"
      
       image={earth2}
      formtype="signup"
      setisLoggedIn={setisLoggedIn}
      ></Template>
      
    </div>
  )
}

export default Signup
