import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "../styles/Spinner/Loader.css";
import "../styles/auth/ForgetPassword.css"
import { getPasswordResetToken } from "../services/operations/authApi"

function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [emailSent, setEmailSent] = useState(false)
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)
  
    const handleOnSubmit = (e) => {
      e.preventDefault()
      dispatch(getPasswordResetToken(email, setEmailSent))
    }
  
    return (
      <div id="resetPassword-container">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div id="resetPassword-content">
          <h1>{!emailSent ? 'Reset your password' : 'Check email'}</h1>
          <p>
            {!emailSent
              ? 'Have no fear. We will email you instructions to reset your password. If you dont have access to your email we can try account recovery'
              : `We have sent the reset email to ${email}`}
          </p>
          <form id="resetPassword-form" onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label>
                <p>
                  Email Address <sup>*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </label>
            )}
            <button type="submit">{!emailSent ? 'Submit' : 'Resend Email'}</button>
          </form>
          <div >
            <Link to="/login" id="resetPassword-navLink">
              <p>
                <BiArrowBack /> 
                
              </p>
              <span>Back To Login</span>
            </Link>
            
          </div>
        </div>
      )}
    </div>
    )
  }
  
  export default ForgotPassword