import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { RiEditBoxLine } from "react-icons/ri"
import { formattedDate } from "../../../utils/dateFormatter"
import '../../../styles/Dashboard/Myprofile.css'

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();

  return (
    <>
      <h1 id="profile-heading">My Profile</h1>
      <div id="profile-container">
        <div id="name">
          <img
            id="profile-image"
            src={user?.image}
            alt={`profile-${user?.firstName}`}
          />
          <div id="name-details">
            <p id="full-name">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p id="email">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div id="about-container">
        <div id="about-header">
          <p id="about-title">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          id="about-content"
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div id="personal-details-container">
        <div id="personal-details-header">
          <p id="personal-details-title">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div id="personal-details-content">
          <div id="personal-details-left">
            <div>
              <p id="first-name-label">First Name</p>
              <p id="first-name">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p id="email-label">Email</p>
              <p id="email-value">
                {user?.email}
              </p>
            </div>
            <div>
              <p id="gender-label">Gender</p>
              <p id="gender">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div id="personal-details-right">
            <div>
              <p id="last-name-label">Last Name</p>
              <p id="last-name">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p id="phone-number-label">Phone Number</p>
              <p id="phone-number">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p id="date-of-birth-label">Date Of Birth</p>
              <p id="date-of-birth">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfile