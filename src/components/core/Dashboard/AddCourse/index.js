import React from 'react'
import CourseInformationForm from './CourseInformation/CourseInformationForm'
import HighlightText from '../../HomePage/HighlightText'
const index = () => {
  return (
    <div>
      <div className=" Add-Course-main" >
        
          <h1 className='add-course'><HighlightText text="Add Course"></HighlightText> </h1>
          </div>
          <div className='text-white Add-Course-main-CourseInformationForm'>
            <CourseInformationForm ></CourseInformationForm>
          </div>
        
      
    </div>
  )
}

export default index
