import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {BiSolidHide,BiShow} from 'react-icons/bi'
import { useDispatch } from "react-redux"
import { useNavigate} from "react-router-dom";


import { sendOtp } from "../../services/operations/authApi"
import { setSignupData } from "../../slices/authSlice"

import { ACCOUNT_TYPE } from "../../utils/constansts"

const Signupform = ({setisLoggedIn}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const [formdata,setformdata]=useState({
        firstName:"",lastName:"",email:"",password:"",confirmPassword:""
    })
    const [showpassword,setshowpassword]=useState(false);
    const [showconfirmpassword,setshowconfirmpassword]=useState(false);
    // student or instructor
    const[accountType ,setaccountType]=useState("Student")

    function changeHandler(event){
        setformdata((prev)=>(
          {
              ...prev,
              [event.target.name]: event.target.value
          }
        ) )
      }
      
      function submitHandler(event){
  event.preventDefault();
  if(formdata.password!==formdata.confirmPassword){
    toast.error("Password do not match");
    return;
  }
  const signupData = {
    ...formdata,
    accountType,
  }
 
  dispatch(setSignupData(signupData))
  dispatch(sendOtp(formdata.email, navigate))
  console.log("sign up data",signupData)
  
   // Reset
   setformdata({
    firstName:"",lastName:"",email:"",password:"",confirmPassword:""
  })
  setaccountType("Student")

 
      }

     
  return (
    <div>
      {/* student instuctor tab */}
      <div className='student-instructor'>
        <button className={`${
  accountType === "Student"
    ? "bg-transparent-900-student"
    : "bg-transparent-non-student"
}`} onClick={()=>setaccountType("Student")}>Student</button>
        <button className={`${
  accountType === "Instructor"
    ? "bg-transparent-900-student"
    : "bg-transparent-non-student"
}`} onClick={()=>setaccountType("Instructor")}>Instructor</button>
      </div>
      {/* First and Last name */}
      <form className='logi-main'  onSubmit={submitHandler} >
      <div className='firs-last'>
      <label  className='label'>
            <p  className='email-id'>First Name <sup className='star'>*</sup></p>
            <input required
            className='email-input'
            type="text"
            name='firstName'
            placeholder='Enter the  first Name'
            value={formdata.firstName}
            onChange={changeHandler}
            />
        </label>
        <label className='label'>
            <p  className='email-id'>Last Name <sup className='star'>*</sup></p>
            <input required
            className='email-input'
            type="text" 
            name='lastName'
            placeholder='Enter the  last Name'
            value={formdata.lastName}
            onChange={changeHandler}
            />
        </label>
        </div>
        {/* email */}
        <div><label className='label' >
            <p className='email-id'>Email Address <sup className='star'>*</sup></p>
            <input required
            className='email-input'
            type="email" 
            name='email'
            placeholder='Enter the email address'
            value={formdata.email}
            onChange={changeHandler}
            />
        </label></div>

        {/* password */}
        <div className='first-last'>
        <label className='label  relative mt-3'>
            <p className='email-id'> Create Password <sup className='star'>*</sup></p>
            <input required
            className='email-input'
            type={showpassword? ("text") : ("password")} 
            name='password'
            placeholder='Enter the Password'
            value={formdata.password}
            onChange={changeHandler}
            />
            <span  className=" absolute right-6 top-[35px] cursor-pointer" onClick={()=>
                setshowpassword((prev)=>!prev)
            }>  {
                showpassword? (<BiShow fontSize={20} fill='#AFB2BF'></BiShow>) :(<BiSolidHide fontSize={20} fill='#AFB2BF'></BiSolidHide>)
            }
            </span>
           
        </label>    
        <label className='label  relative mt-3'>
            <p  className='email-id'> Confirm Password <sup className='star'>*</sup></p>
            <input required
            className='email-input'
            type={showconfirmpassword? ("text") : ("password")} 
            name='confirmPassword'
            placeholder=' confirm Password'
            value={formdata.confirmPassword}
            onChange={changeHandler}
            />
            <span  className="absolute right-6 bottom-1 " onClick={()=>
                setshowconfirmpassword((prev)=>!prev)
            }>  {
              showconfirmpassword? (<BiShow fontSize={20} fill='#AFB2BF'></BiShow>) :(<BiSolidHide fontSize={20} fill='#AFB2BF'></BiSolidHide>)
            }
            </span>
           
        </label>    
     </div>

     <div className='flex justify-center items-center mt-7'>
  <button className='signup'>Create account</button>
</div>

        
     </form>
    </div>
  )
}

export default Signupform
