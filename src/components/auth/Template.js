import React from 'react'
// import Frame from "../assets/frame.png"
import Loginform from './Loginform'
import Signupform from './Signupform'
import {FcGoogle} from "react-icons/fc" 
const Template = ({title,desc1,desc2,formtype,image,setisLoggedIn}) => {
  const mainTemplateSubClass = formtype === 'login' ? 'main-template-1' : 'main-template-2';
  const mainTemplate = formtype === 'login' ? 'main-template' : 'main-template-signup';
  const titles = formtype === 'login' ? 'title' : 'title-signup';
  return (
    
    <div className={mainTemplate}>
   <div className={mainTemplateSubClass}>
    <h1 className={titles}>{title}</h1>
    
    
      {
        formtype==="login"? (<Loginform setisLoggedIn={setisLoggedIn}></Loginform>): (<Signupform setisLoggedIn={setisLoggedIn}></Signupform>)
      }  
      <div className='lines '>
      <div className='hr1'></div>
        <p className='or'>OR</p>
      <div className='hr1'></div>
      
      </div>
      
      <button className='google-continue'>
      <FcGoogle></FcGoogle>
      Sign Up with Google</button>
    </div>
    <div className='image1' >
    
  
   <video 
            muted
            loop
            autoPlay
            

          >
            <source src={image} type="video/mp4" />
          </video>
   {/* <video   src={image} alt="earth" width={412} height={490} loading='lazy' /> */}
  
 
    </div>

      
    </div>
  )
}

export default Template
