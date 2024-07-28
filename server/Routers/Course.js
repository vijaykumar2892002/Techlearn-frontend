// Import the required modules
const express = require("express");
const router = express.Router();
//import require Controller
//1.import  Course Contoller
const { createCourse,
    showAllCourses,
    editCourse,
    getCourseDetails,
    getFullCourseDetails,
    getInstructorCourses,
    deleteCourse,
} = require("../Controllers/Course");
//import Category controller
const { createCategory,
    showAllCategories,
    categoryPageDetails } = require("../Controllers/Category");
//import RatingAndReview Controller
const { createRating,
    getAverageRating,
    getAllRating } = require("../Controllers/RatingAndReview");
//import Section Controller
const { createSection,
    updateSection,
    deleteSection } = require("../Controllers/Section");
//import sub-section Controller
const { createSubSection,
    updatesubSection,
    deleteSubSection,
} = require("../Controllers/subSection");


const {
    updateCourseProgress
  } = require("../Controllers/courseProgress");
//import MiddleWare Controller

const {auth,isStudent,isInstructor,isAdmin}=require("../Middleware/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// ********************************************************************************************************
//                                      Courses create routes (Only by Instructor)
// ********************************************************************************************************
router.post("/createCourse",auth,isInstructor,createCourse);

//Add a Section to a Course
router.post("/addSection",auth,isInstructor,createSection);
//update section 
router.post("/updateSection",auth,isInstructor,updateSection);
//delete section
router.post("/deleteSection",auth,isInstructor,deleteSection);

//Add a sub-Section to a Course
router.post("/addSubSection",auth,isInstructor,createSubSection);
//update section 
router.post("/updateSubSection",auth,isInstructor,updatesubSection)
//delete section
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);

// Get all Registered Courses
router.get("/getAllCourses",showAllCourses);
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Get Details for a Specific Courses
router.post("/getCourseDetails",getCourseDetails);
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse", deleteCourse)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);
// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategories);
router.post("/getCategoryPageDetails",categoryPageDetails);
// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews",  getAllRating)

module.exports = router