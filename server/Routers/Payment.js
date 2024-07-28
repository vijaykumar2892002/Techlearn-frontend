// Import the required modules
const express=require("express");
const router=express.Router();

//import Payment Controller
const {capturePayment,verifyPayment, sendPaymentSuccessEmail}=require("../Controllers/Payment");
const {auth,isStudent,isInstructor,isAdmin}=require("../Middleware/auth");
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment",auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);
module.exports = router
