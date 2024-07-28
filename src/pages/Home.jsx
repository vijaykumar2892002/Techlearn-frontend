import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import Banner from "../assets/Images/banner3.mp4";
import Instructor from "../assets/Images/remote-teacher-video.jpg"
import CTAButton from "../components/core/HomePage/Button";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import HighlightText from '../components/core/HomePage/HighlightText';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import ExploreMore from '../components/core/HomePage/ExploreMore'
import Footer from '../components/common/Footer';
import "../styles/HomePage/Home.css";
import ReviewSlider from '../components/common/ReviewSlider'
function Home() {
  return (
    <div>
      {/*********************************Section1*******************************************/}
      <div className='section1'>
        <Link to={"/signup"}>
          <div className='Become-an-Instructor1'>
            <div className='inner-div'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>

        </Link>
        <div className="empower-future">
          Welcome to Tech-Learn for
          <span>&nbsp;</span>
          <TypeAnimation
            className='HighlightText'
            sequence={[
              "Coding Skills",
              1000, // Pause for 2000 milliseconds
              "" // This represents the end of the sequence
            ]}
            repeat={Infinity} // Repeat the animation infinitely
            cursor={true} // Show cursor
            omitDeletionAnimation={true} // Omit deletion animation
          />
        </div>

        <div className='text'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className='flex flex-row gap-7 mt-8'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        <div className='video-container'>
          <video className='video'
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>

        </div>
        <div className='flex items-center justify-center '>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </div>
        {/* Code Section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold'>
                Unlock Your
                <HighlightText text={"coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={
              {
                btnText: "try it yourself",
                linkto: "/signup",
                active: true,
              }
            }
            ctabtn2={
              {
                btnText: "learn more",
                linkto: "/login",
                active: false,
              }
            }

            codeblock={`<<!DOCTYPE html>\n<html>head>\n<title>Example\n<linkrel="stylesheet"\nhref="styles.css">\n/head>\n<body>\n<div></div>\n</body>\n</html>`}
            codeColor={"bg-gradient-to-r from-pink-500 via-orange-500 to-purple-500"}
          />
        </div>

      </div>
      {/*********************************Section2*******************************************/}
      <div className='section2'>
      <div>
        <div className='AboutTeam'>
          <div className='AboutTeam-text'>
          <div className='padding'>
            <h1 >We are a dedicated team of Educators who are <HighlightText text="passionate learning experience"></HighlightText></h1>
            <ul className='course-list' >
              <li>Comprehensive course catalog</li>
              <li>our experience teacher are passionate about helping student</li>
              <li>Courses are designed to meet the learning need </li>
            </ul>
            <div className='flex flex-row gap-7 mt-8'>
          <CTAButton active={true} linkto={"/signup"}>
            Get Started
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
          </div>
          </div>
          <div className='AboutTeam-image'>
           <img src={Instructor} alt="" />
          </div>
        </div>
        <div className='what-include-main'>
          <div className='what-include-text'>
          <HighlightText text={"What's included in this Course"} />
         
          </div>
          <div className='what-include-content'>
            <div className='what-include-list'>
              <TimelineSection></TimelineSection>
            </div>
          </div>
        </div>
        <ExploreMore />
        
        </div>
      </div>
      <div> <h2 className='text-center text-4xl font-semobold mt-10 text-white'>Review from Other Learners</h2>
            {/* Review Slider here */}
            <ReviewSlider />
            </div>
      {/*********************************Section3*******************************************/}
     
      {/*********************************Footer*******************************************/}
      <Footer></Footer>
      
    </div>
  )
}

export default Home
