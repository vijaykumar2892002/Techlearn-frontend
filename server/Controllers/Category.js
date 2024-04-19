const category = require("../Models/category");
//create Tag ka handler funciton
exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body; //fetch data
        //validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            })
        }
        const categoryDetails = await category.create({ name: name, description: description });
        console.log(categoryDetails);
        return res.status(200).json({
            success: true,
            message: "Tag Created Successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
//getAlltags handler function
exports.showAllCategories= async (req, res) => {
    try {
        const allcategory = await category.find({}, { name: true, description: true });
        res.status(200).json({
            success: true,
            message: "All tags returned successfully",
            allcategory,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
            //get categoryId
            const {categoryId} = req.body;
            //get courses for specified categoryId
            const selectedCategory = await category.findById(categoryId)
                                            .populate("courses")
                                            .exec();
            //validation
            if(!selectedCategory) {
                return res.status(404).json({
                    success:false,
                    message:'Data Not Found',
                });
            }
            //get coursesfor different categories
            const differentCategories = await category.find({
                                         _id: {$ne: categoryId},
                                         })
                                         .populate("courses")
                                         .exec();

            //get top 10 selling courses
            //HW - write it on your own

            //return response
            return res.status(200).json({
                success:true,
                data: {
                    selectedCategory,
                    differentCategories,
                },
            });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}