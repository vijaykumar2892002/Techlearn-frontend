// Import the required modules
const express=require("express");
const router=express.Router();

//import Payment Controller
const {capturePayment,verifySignature}=require("../Controllers/Payment");
const {auth,isStudent,isInstructor,isAdmin}=require("../Middleware/auth");
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", verifySignature);
module.exports = router
