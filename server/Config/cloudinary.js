const cloudinary = require('cloudinary').v2;

// Function to configure Cloudinary
exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
			timeout: 60000 // Increase timeout to 60 seconds
        });
        console.log("Cloudinary configured successfully");
    } catch (error) {
        console.error("Error configuring Cloudinary:", error);
    }
};
