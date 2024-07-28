const User = require("../Models/User");
const OTP = require("../Models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer=require("nodemailer");
require("dotenv").config();
const Profile=require("../Models/Profile")
const mailSender =require("../Utils/mailSender")
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
//Handler for send otp
exports.sendOTP = async (req, res) => {
    try {
        //fetch data from body
        const { email } = req.body;
        //validate the email
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: 'User already registered',
            })
        }
        //generate Otp 
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        console.log("OTP generated: ", otp);
        //check for unique otp from otp model
        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }
        //Save into OTP model  and create an entry
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return response successful
        res.status(200).json({
            success: true,
            message: 'OTP Sent Successfully',
            otp,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


//Handler for sign up
exports.signUp = async (req, res) => {
    try {
        //get data from body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            phone,
            otp
        } = req.body;
        //validate data
        if (!firstName || !lastName || !email || !password || !confirmPassword
            || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }
        //2 password match krlo
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and ConfirmPassword Value does not match, please try again',
            });
        }
        //check if user is already register from database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User is already registered',
            });
        }
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //get the most recenty  otp from otp model
        console.log(email);
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("helo")
        console.log(recentOtp + "dwwf");
        //validate OTP
        if (recentOtp.length === 0) {
            //OTP not found
            return res.status(400).json({
                success: false,
                message: 'OTP not  Found ok',
            })
        }
        //match the body otp and database otp
        else if (otp !== recentOtp[0].otp) {
            //Invalid OTP
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }
        // Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        //entry create in DB

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        console.log("after profil");
        //save the entry into User model
        const user = await User.create({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            accountType,
            approved: approved,
            profile: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        console.log("after save");
        //return res
        return res.status(200).json({
            success: true,
            message: 'User is registered Successfully',
            user,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registrered. Please try again",
        })
    }

}

//Handler  for login
exports.login = async (req, res) => {
    try {
        //get data from body
        const { email, password } = req.body;
        //validate data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: 'All fields are required, please try again',
            });
        }
        //check if user exist or not
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registrered, please signup first",
            });
        }
        //create the jwt token after compare password is correct
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "10d",
            });

            //store the token into body, cookie
            user.token = token;
            user.password = undefined;
            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'Logged in successfully',
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect',
            });
        }
        //login successfully
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure, please try again',
        });
    }
}

//changePassword
//TODO: HOMEWORK
exports.changePassword = async (req, res) => {
    try {
        const {  oldPassword, newPassword, confirmPassword } = req.body;

        // Validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.',
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and Confirm Password do not match.',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in DB
        const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: hashedPassword},
			{ new: true }
		);
       // Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

        // // Send email notification
        // let transporter = nodemailer.createTransport({
        //     host: process.env.MAIL_HOST,
        //     auth: {
        //         user: process.env.MAIL_USER,
        //         pass: process.env.MAIL_PASS,
        //     }
        // });

        // await transporter.sendMail({
        //     from: 'StudyNotion || CodeHelp - by Babbar',
        //     to: email,
        //     subject: 'Your password has been updated',
        //     html: '<h5>Your password has been updated successfully.</h5>',
        // });

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully.',
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request.',
        });
    }
};
