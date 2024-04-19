// Import the required modules
const express = require("express");
const router = express.Router();

//import Auth Controller
const { sendOTP,
    signUp,
    login,
    changePassword } = require("../Controllers/auth");

//import resetPassword Controller
const { resetPasswordToken,
    resetPassword,
} = require("../Controllers/resetpassword");

const { auth, isStudent, isInstructor, isAdmin } = require("../Middleware/auth");
// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************
// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)
// Route for Changing the password
router.post("/changepassword", auth, changePassword)

//********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router