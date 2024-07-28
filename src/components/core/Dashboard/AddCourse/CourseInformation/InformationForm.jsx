import React from 'react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI"
import { setStep, setCourse} from "../../../../../slices/courseSlice"
import IconBtn from '../../../../common/IconBtn';
import { toast } from 'react-hot-toast';
import {COURSE_STATUS} from "../../../../../utils/constansts"
import RequirementField from './RequirementField';
import ChipInput from './ChipInput';
import Upload from './Upload';
const InformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
} = useForm();
const dispatch = useDispatch()
const {token} = useSelector((state)=>state.auth);
const {course, editCourse} = useSelector((state)=>state.course);
const [loading, setLoading] = useState(false);
const [courseCategories, setCourseCategories] = useState([]);
useEffect(()=>{
  try {
    
  } catch (error) {
    
  }
  const getCategories = async() => {
    try {
      setLoading(true);
    
    const categories = await fetchCourseCategories();
    console.log("cat",categories);
    if(categories.length > 0) {
        setCourseCategories(categories);
    }
    setLoading(false);
    } catch (error) {
      console.log("Error ",error.message);
    }
    
}
if(editCourse) {
  setValue("courseTitle", course.courseName);
  setValue("courseShortDesc", course.courseDescription);
  setValue("coursePrice", course.price);
  setValue("courseTags", course.tag);
  setValue("courseBenefits", course.whatYouWillLearn);
  setValue("courseCategory", course.category);
  setValue("courseRequirements", course.instructions);
  setValue("courseImage", course.thumbnail);
}
getCategories();
},[]);

const isFormUpdated = () => {
  const currentValues = getValues();
  if(currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      // currentValues.courseTags !== course.course.tag ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() )
      return true;
  else
      return false;
}

//handles next button click 
const onSubmit = async(data) => {
  if(editCourse) {
      if(isFormUpdated()) {
          const currentValues = getValues();
      const formData = new FormData();

      formData.append("courseId", course._id);
      if(currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
      }

      if(currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
      }

      if(currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
      }
      if (currentValues.courseTags.toString() !== course.tag.toString()) {
        formData.append("tag", JSON.stringify(data.courseTags))
      }

      if(currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
      }

      if(currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
      }

      if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.courseRequirements));
      }
      if (currentValues.courseImage !== course.thumbnail) {
        formData.append("thumbnailImage", data.courseImage)
      }

      setLoading(true);
      const result = await editCourseDetails(formData, token);
      setLoading(false);
      if(result) {
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }
      } 
      else {
          toast.error("NO Changes made so far");
      }
      console.log("PRINTING FORMDATA", formData);
      console.log("PRINTING result", result);

      return;
  }

  //create a new course
  console.log("All data",data)
  const formData = new FormData();
  formData.append("courseName", data.courseTitle);
  formData.append("courseDescription", data.courseShortDesc);
  formData.append("price", data.coursePrice);
  formData.append("tag", JSON.stringify(data.courseTags))
  formData.append("whatYouWillLearn", data.courseBenefits);
  formData.append("category", data.courseCategory);
  formData.append("instructions", JSON.stringify(data.courseRequirements));
  formData.append("status", COURSE_STATUS.DRAFT);
  formData.append("thumbnailImage", data.courseImage)

  setLoading(true);
  console.log("BEFORE add course API call");
  console.log("PRINTING FORMDATA", formData);
  console.log("Token",token)
  const result = await addCourseDetails(formData,token);
  if(result) {
    dispatch(setStep(2))
    dispatch(setCourse(result))
  }
  setLoading(false);
  console.log("PRINTING FORMDATA", formData);
  console.log("PRINTING result", result);

}

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}
    className='informationForm-main'>
      
      <div>
            <label  htmlFor='courseTitle'>Course Title<sup>*</sup></label>
            <input
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle", {required:true})}
                className='w-full'
            />
            {
                errors.courseTitle && (
                    <span>Course Title is Required**</span>
                )
            }
        </div>

        <div>
            <label  htmlFor='courseShortDesc'>Course Short Description<sup>*</sup></label>
            <textarea
                id='courseShortDesc'
                placeholder='Enter Description'
                {...register("courseShortDesc", {required:true})}
                className="form-style resize-x-none min-h-[130px] w-full"
                />
            {
                errors.courseShortDesc && (<span>
                    Course Description is required**
                </span>)
            }
        </div>

        <div >
            <label htmlFor='coursePrice'>Course Price<sup>*</sup></label>
            <input
                id='coursePrice'
                placeholder='Enter Course Price'
                {...register("coursePrice", {
                    required:true,
                    valueAsNumber:true,
                    pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },

                })}
                className='w-full'
            />
            
            {
                errors.coursePrice && (
                    <span>Course Price is Required**</span>
                )
            }
        </div>

        <div>
            <label htmlFor='courseCategory'>Course Category  <sup>*   </sup></label>
            <select
            id='courseCategory'
            defaultValue=""
            placeholder="click here"
            {...register("courseCategory", {required:true})}
           
            >
                <option value="" >Choose a Category</option>

                {
                    !loading && courseCategories.map((category, index) => (
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    ))
                }

            </select>
            {errors.courseCategory && (
                <span>
                    Course Category is Required
                </span>
            )}
        </div>
        {/* create a custom component for handling tags input */} 
       {/* <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter tags and press enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues = {getValues}
        /> */}
         <RequirementField
            name="courseTags"
            label="Tags"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />

        {/* create a component for uploading and showing preview of media */}
        <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
        
        {/*     Benefits of the Course */}
        <div>
            <label>Benefits of the course<sup>*</sup></label>
            <textarea
            id='coursebenefits'
            placeholder='Enter Benefits of the course'
            {...register("courseBenefits", {required:true})}
            className='min-h-[130px] w-full'
            />
            {errors.courseBenefits && (
                <span>
                    Benefits of the course are required**
                </span>
            )}
        </div>
        <RequirementField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />
        <div className='flex justify-between'>
            {
                editCourse && (
                    <button
                    onClick={() => dispatch(setStep(2))}
                    className='Continue-Without-Saving' 
                    >
                        Continue Without Saving
                    </button>
                )
            }

            <IconBtn
                text={!editCourse ? "Next" : "Save Changes"}
                />
        </div>
    </form>
    </div>
  )
}

export default InformationForm
