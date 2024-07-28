import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { IoIosContact } from "react-icons/io";
import { LuLinkedin } from "react-icons/lu";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import contactus from "../../../assets/Images/contactus.jpg";
import ContactUsForm from '../AboutPage/ContactUsForm';
import HighlightText from '../HomePage/HighlightText';
import "./contactus.css";
const ContactUsPage = () => {
  return (
    <div className='contact-main1'>
      <div className='contact-main'>
        <div className='contact-form-main'>
          <h1 className='form-heading about-teams-heading'>
            <HighlightText text={"Get in Touch"}></HighlightText>
          </h1>
          <div>
            <ContactUsForm />
          </div>
        </div>
        <div className='contact-image' style={{
          backgroundImage: `url(${contactus})`,
          backgroundSize: 'cover', /* or contain, depending on your needs */
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#f0f0f0',
          /* Optionally, you can set a background color as fallback */
        }}>
          <img src={contactus} alt="contact us" />
        </div>
      </div>
      <div>

        <div class="ag-format-container">
          <div class="ag-courses_box">
            <div class="ag-courses_item">
              <a href="#" class="ag-courses-item_link">
                <div class="ag-courses-item_bg"></div>

                <div class="ag-courses-item_title">
                  <div className='address-icons'><FaLocationDot className='FaLocationDot' />
                    <h1>Address</h1></div>
                  <p className='address-text'>Survey No. 27, Near Trimurti Chowk
                    Dhankwadi, Pune - 411043
                    Google Maps Link</p>

                </div>


              </a>
            </div>

            <div class="ag-courses_item">
              <a href="#" class="ag-courses-item_link">
                <div class="ag-courses-item_bg"></div>

                <div class="ag-courses-item_title">
                <div className='address-icons'><IoCall
                    className='FaLocationDot' />
                    <h1>Phone Number</h1></div>
                  <p className='address-text'>
                  Phone Number:     6006163835
                  Email:vkumar80090@gmail.com
                   </p>

                </div>


              </a>
            </div>
            <div class="ag-courses_item">
              <a href="#" class="ag-courses-item_link">
                <div class="ag-courses-item_bg"></div>

                <div class="ag-courses-item_title">
                  <div className='address-icons'><IoIosContact
                    className='' />
                    <h1>Social Media</h1></div>
                    <div className='Lower-body'>
                    <a href='https://www.linkedin.com/school/pune-institute-of-computer-technology/' target='_blank'>
                      <LuLinkedin className='size' />
                    </a>
                    <a href='https://www.instagram.com/pict.pune/' target='_blank'>
                      <FaInstagram className='size' />
                    </a>
                    <a href='https://twitter.com/PunePict' target='_blank'>
                      <FaTwitter className='size' />
                    </a>
                    <a href='https://www.facebook.com/PICTOfficial' target='_blank'>
                      <FaFacebookF className='size' />
                    </a>
                  </div>

                </div>


              </a>
            </div>






          </div>
        </div>
      </div>
    </div>


  )
}

export default ContactUsPage;
