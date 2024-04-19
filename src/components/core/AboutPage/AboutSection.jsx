import React from 'react'
import "../../../styles/AboutPage/aboutPage.css"
import aboutPhoto from "../../../assets/Images/aboutPhoto.jpg"
import HighlightText from '../../core/HomePage/HighlightText';
const AboutSection = () => {
  return (
    <div className='about-main-container'>
    <div className='about-container'>
      <div className='about-photo'>
      <img src={aboutPhoto}  alt="" />
      </div>
      <div className='about-teams'>
         <div className='empower-future'> <HighlightText text={"Our Teams"} /></div>
         <p className='about-text'>Our team is our greatest asset. Comprised of dedicated educators, technologists, designers, and content creators, we bring together a wealth of expertise and passion for education. Together, we work tirelessly to develop engaging, interactive, and personalized learning experiences that empower learners to succeed.</p>
      </div>
      <div className='about-teams'>
         <div className='empower-future'> <HighlightText text={"Our Teams"} /></div>
         <p className='about-text'>Our team is our greatest asset. Comprised of dedicated educators, technologists, designers, and content creators, we bring together a wealth of expertise and passion for education. Together, we work tirelessly to develop engaging, interactive, and personalized learning experiences that empower learners to succeed.</p>
      </div>
      </div>
    </div>
  )
}

export default AboutSection
