import React, { useState } from 'react'
import toast from 'react-hot-toast';
import {BiSolidHide,BiShow} from 'react-icons/bi'
import {Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux"
import {login} from "../../services/operations/authApi"
const Loginform = () => {
    const [formdata,setformdata]=useState({
        email:"",password:""
    })
    const navigate=useNavigate();
    const dispatch = useDispatch()
    const [showpassword,setshowpassword]=useState(false);
    function changeHandler(event){
      setformdata((prev)=>(
        {
            ...prev,
            [event.target.name]: event.target.value
        }
      ) )
    }
    const { email, password } = formdata
    function submitHandler(event){
      event.preventDefault();
      dispatch(login(email, password, navigate))
    }
   console.log(formdata);
  return (
    <div>
    
     <form  className='login-main' onSubmit={submitHandler} >
        <label  className='label'>
            <p className='email-id'>Email Id <sup className='star'>*</sup></p>
            <input required
            className='email-input'
            type="email" 
            name='email'
            placeholder='Enter the gmail'
            value={formdata.email}
            onChange={changeHandler}
            />
        </label>
        <label  className='label relative' >
            <p className='email-id' >Password <sup  className='star'>*</sup></p>
            <input required
             className='email-input'
            type={showpassword? ("text") : ("password")} 
            name='password'
            placeholder='Enter the Password'
            value={formdata.password}
            onChange={changeHandler}
            />
            <span  className=" absolute right-14 top-[38px] cursor-pointer"
            onClick={()=>
                setshowpassword((prev)=>!prev)
            }>  {
                showpassword? (<BiShow fontSize={24} fill='#AFB2BF'></BiShow>) :(<BiSolidHide  fontSize={24} fill='#AFB2BF'></BiSolidHide>)
            }
            </span>
            <Link  to="/forgot-password">
                <p className=' forget text-xs mt-1 text-blue-100  ml-auto'>Forget password</p>
            </Link>
        </label>
        <button className='signup'> Sign In</button>
     </form>
    </div>
  )
}

export default Loginform
