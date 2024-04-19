import React from 'react'
import Template from '../components/auth/Template'
// import login from "../assets/login.png"
import "../styles/auth/auth.css"
import earth from "../assets/Images/earth.mp4"
const Login = ({setisLoggedIn}) => {
  return (
    <div className='template-main'>
      <Template 
      
      title="Login"
      desc1="Build skills for today,tomorrow,and beyond."
      
      image={earth}

      formtype="login"
      setisLoggedIn={setisLoggedIn}
      ></Template>
      </div>
    
  )
}

export default Login
