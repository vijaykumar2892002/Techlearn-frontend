import React from 'react';
import aboutPhoto from "../../../assets/Images/aboutPhoto.jpg";
import "../../../styles/AboutPage/aboutPage.css";
import HighlightText from '../../core/HomePage/HighlightText';
import AboutCart from './AboutCart';
import ContactUsForm from './ContactUsForm';
import Vision_Mission from "./Vision_Mission";
const AboutSection = () => {
  return (
    <div className='about-main-container'>
      <div className='about-container'>
        <div className='about-photo'>

          <img src={aboutPhoto} alt="" />
        </div>
        <div className='about-teams'>
          <div className='about-teams-heading'> <HighlightText text={"Our Teams"} /></div>
          <p className='about-text'>Our team is our greatest asset. Comprised of dedicated educators, technologists, designers, and content creators, we bring together a wealth of expertise and passion for education. Together, we work tirelessly to develop engaging, interactive, and personalized learning experiences that empower learners to succeed.</p>
        </div>
        <div className='about-teams'>
          <div className='about-teams-heading'> <HighlightText text={"Our Services"} /></div>
          <AboutCart></AboutCart>
          <div className='about-teams-heading'> <HighlightText text={"Vision And Mission"} /></div>
          <Vision_Mission></Vision_Mission>
        </div>
        <div className='form-main'>
          <h1 className='form-heading about-teams-heading'>
          <HighlightText  text={"Get in Touch"}></HighlightText>
          </h1>
          <div>
            <ContactUsForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection
