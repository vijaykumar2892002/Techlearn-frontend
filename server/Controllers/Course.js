const Course = require("../Models/Course");

const User = require("../Models/User");
const { uploadImageToCloudinary } = require("../Utils/imageUpload");
const Category = require("../Models/category");

//createCourse handler function
exports.createCourse = async (req, res) => {
    try {
        //fetch data 
        let { courseName, courseDescription, whatYouWillLearn, price, tag, category, status,
            instructions, } = req.body;
        //get thumbnail
        const thumbnail = req.files.thumbnailImage;
        console.log("what will u learn",whatYouWillLearn)
        console.log("price",price);
        console.log("tag",tag);
        console.log("category",category);
        console.log("instruction",instructions);
        //validation
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        if (!status || status === undefined) {
            status = "Draft";
        }
        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, { accountType: "Instructor" });
        console.log("Instructor Details: ", instructorDetails);
        //TODO: Verify that userId and instructorDetails._id  are same or different ?
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: 'Instructor Details not found',
            });
        }
        //check given tag is valid or not
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: 'Tag Details not found',
            });
        }
        //Upload Image top Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
        //create an entry for new Course
        console.log("before save")
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        })
        //add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true },
        );
        //update the TAG ka schema 
        //TODO: HW
        // Add the new course to the Categories
        await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        );
        //return response
        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCourse,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create Course',
            error: error.message,
        })
    }
}
//getAllCourses handler function
exports.showAllCourses = async (req, res) => {
    try {
        //TODO: change the below statement incrementally
        const allCourses = await Course.find({},
            {
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}).populate("instructor")
			.exec();

        return res.status(200).json({
            success: true,
            message: 'Data for all courses fetched successfully',
            data: allCourses,
        })

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Cannot Fetch course data',
            error: error.message,
        })
    }
}

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {
            //get id
            const {courseId} = req.body;
            //find course details
            console.log("erf")
            const courseDetails = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: { path: "profile" }
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: { path: "subSection" }
            })
            .exec();
        
                 console.log("erf")
                //validation
                if(!courseDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                    });
                }
                //return response
                return res.status(200).json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:courseDetails,
                })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}
