import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../../services/apiConnector';
import { contactusEndpoint } from '../../../services/apis';
import CountryCode from '../../../data/countrycode.json';
import './ContactForm.css';
import toast from 'react-hot-toast';

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  const submitContactForm = async (data) => {
    console.log('Logging Data', data);
    try {
      setLoading(true);
      const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
     
      console.log('Logging response', response);
      setLoading(false);
      if(response.data.success){
        toast.success('Form submitted successfully!');
      }
  
    } catch (error) {
      console.log('Error:', error.message);
      setLoading(false);
      toast.error('Failed to submit form.');
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: '',
        firstname: '',
        lastname: '',
        message: '',
        phoneNo: ''
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div className='contactus-form'>
        <div className='form-group'>
          <div className='input-group'>
            {/* firstName */}
            <div className='input-group-item'>
              <label htmlFor='firstname'>First Name</label><span className='star'>*</span>
              <input
                type='text'
                name='firstname'
                id='firstname'
                placeholder='Enter first name'
                className='text-black'
                {...register('firstname', { required: true })}
              />
              {errors.firstname && <span>Please enter Your name</span>}
            </div>

            {/* lastName */}
            <div className='input-group-item'>
              <label htmlFor='lastname'>Last Name</label>
              <input
                type='text'
                name='lastname'
                id='lastname'
                className='text-black'
                placeholder='Enter Last name'
                {...register('lastname')}
              />
            </div>
          </div>
        </div>

        {/* email */}
        <div className='form-group'>
          <div className='input-group'>
            <div className='input-group-item'>
              <label htmlFor='email'>Email Address</label><span className='star'>*</span>
              <input
                type='email'
                name='email'
                id='email'
                className='text-black'
                placeholder='Enter email Address'
                {...register('email', { required: true })}
              />
              {errors.email && <span>Please enter your email address</span>}
            </div>
          </div>
        </div>

        {/* phoneNo */}
        <div className='form-group'>
          <div className='input-group'>
            <div className='input-group-item'>
              <label htmlFor='phonenumber'>Phone Number</label><span className='star'>*</span>
              <div className='phone-input'>
                <select
                  name='dropdown'
                  id='dropdown'
                  className='country-code'
                  {...register('countrycode', { required: true })}
                >
                  {CountryCode.map((element, index) => {
                    return (
                      <option key={index} value={element.code}>
                        {element.code} -{element.country}
                      </option>
                    );
                  })}
                </select>
                <input
                  type='number'
                  name='phonenumber'
                  id='phonenumber'
                  placeholder='12345 67890'
                  className='text-black phone-number'
                  {...register('phoneNo', {
                    required: { value: true, message: 'Please enter Phone Number' },
                    maxLength: { value: 10, message: 'Invalid Phone Number' },
                    minLength: { value: 8, message: 'Invalid Phone Number' }
                  })}
                />
              </div>
              {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
            </div>
          </div>
        </div>

        {/* message */}
        <div className='form-group'>
          <div className='input-group'>
            <div className='input-group-item'>
              <label htmlFor='message'>Message</label>
              <textarea
                name='message'
                id='message'
                cols='30'
                className='text-black message-input'
                rows='7'
                placeholder='Enter Your message here'
                {...register('message', { required: true })}
              />
              {errors.message && <span>PLease enter your message.</span>}
            </div>
          </div>
        </div>

        <div className='form-group'>
          <button
            type='submit'
            className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold text-black submit-button'
          >
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactUsForm;
