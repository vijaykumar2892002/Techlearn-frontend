const mongoose = require("mongoose");
const mailSender = require("../Utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    }
});
//function -->to sendmail
async function sendEmailVerification(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Mail is for verification from vijay", emailTemplate(otp));
        console.log("Email sent Sucessfully", mailResponse);

    } catch (error) {
        console.log("error occured while sending mails: ", error);
        throw error;

    }

}


OTPSchema.pre("save", async function (next) {
    console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendEmailVerification(this.email, this.otp);
	}
	next();
})
module.exports = mongoose.model("OTP", OTPSchema);