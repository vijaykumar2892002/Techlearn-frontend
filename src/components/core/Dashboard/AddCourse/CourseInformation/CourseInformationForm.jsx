import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import "../style/CourseInformationForm.css";
import InformationForm from './InformationForm';
import { AiOutlineCheck } from "react-icons/ai";
import CourseBuilderForm from "../CourseBuilderForm/CourseBuilderForm"
import PublishCourse from '../PublishCourse/PublishCourse';
const CourseInformationForm = () => {
    const { step } = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: "Information",
        },
        {
            id: 2,
            title: "Builder",
        },
        {
            id: 3,
            title: "Publish",
        },
    ]
    return (
        <div className='CourseInformationForm-main'>

            <div className='steps-text-main'>
           
                <div className='steps-main' >
                    {steps.map((item) => (
                        <>
                            <div >
                                <div className={`${step === item.id
                                    ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                                    : "border-richblack-700 bg-richblack-800 text-richblack-300"} step-count`}>

                                    {
                                        step > item.id ? (<AiOutlineCheck  className='tick'/>) : (item.id)
                                    }

                                </div>
                            </div>
                            {/* Add COde for dashes between the labels */}
                        </>
                    ))}
                </div>
                <div className='steps-text'>
                    {steps.map((item) => (
                        <>
                            <div>
                                <p>{item.title}</p>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            {step === 1 && <InformationForm />}
            {step === 2 && <CourseBuilderForm/>}
            {step===3 && <PublishCourse/>}

        </div>
    )
}

export default CourseInformationForm
