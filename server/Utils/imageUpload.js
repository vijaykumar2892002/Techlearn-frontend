const cloudinary = require('cloudinary').v2;

// Function to upload image to Cloudinary
exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = { folder };
    if (height) options.height = height;
    if (quality) options.quality = quality;
    options.resource_type = "auto";

    try {
        console.log("Uploading image to Cloudinary:", file.tempFilePath);
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log("Image uploaded successfully:", result.secure_url);
        return result;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw error;
    }
};
