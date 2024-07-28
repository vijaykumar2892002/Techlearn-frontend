const SubSection = require("../Models/SubSection");
const Section = require("../Models/Section");
const {uploadImageToCloudinary}=require("../Utils/imageUpload");
exports.createSubSection = async (req, res) => {
    try {
        //fecth data from Req body
        const { sectionId, subSectionName,  description } = req.body;
        //extract file/video
        const video = req.files.video;
        console.log("section id",sectionId,  "subSectionName ",subSectionName,"description",description,"video", video)
        //validation
        if (!sectionId || !subSectionName ||  !description || !video) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
       
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //  const timeDuration= `${uploadDetails.duration}`
        //create a sub-section
        const subSectionDetails = await SubSection.create({
            subSectionName: subSectionName,
            timeDuration: uploadDetails.duration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        })
        //update section with this sub section ObjectId
        const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId },
            {
                $push: {
                    subSection: subSectionDetails._id,
                }
            },
            { new: true }).populate("subSection").exec();
            return res.status(200).json({
                succcess:true,
                message:'Sub Section Created Successfully',
                updatedSection,
            });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}
//update subSection
exports.updatesubSection = async (req, res) => {
    try {
        //data input

         const { sectionId,subSectionId, subSectionName, description } = req.body
         const subSection = await SubSection.findById(subSectionId)
         if (!subSection) {
            return res.status(404).json({
              success: false,
              message: "SubSection not found",
            })
          }
          if (subSectionName !== undefined) {
            subSection.subSectionName = subSectionName
          }
          if (description !== undefined) {
            subSection.description = description
          }
          if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
          }
          await subSection.save()
          const updatedSection = await Section.findById(sectionId).populate("subSection")
          return res.json({
            success: true,
            data:updatedSection,
            message: "Section updated successfully",
          })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update subSection, please try again",
            error: error.message,
        });
    }
}
//HW:deleteSubSection
exports.deleteSubSection = async (req, res) => {
    try {
        //get ID - assuming that we are sending ID in params
        const { subSectionId,sectionId } = req.body
         //use findByIdandDelete
        const deletedSubSection= await SubSection.findByIdAndDelete(subSectionId);
         if(!deletedSubSection){
            return res.status(500).json({
                success:false,
                message:"No subSection is present, please try again",
                
            });
         }
         await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
              $pull: {
                subSection: subSectionId,
              },
            }
          )
         //TODO[Testing]: do we need to delete the entry from the course schema ??
         //return response
                 // Removing the reference to the SubSection from the Section schema
                 const updatedSection = await Section.findById(sectionId).populate("subSection")
         return res.status(200).json({
             success:true,
             data:updatedSection,
             message:"SubSection Deleted Successfully",
         })
 

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete subSection, please try again",
            error:error.message,
        });
    }
}