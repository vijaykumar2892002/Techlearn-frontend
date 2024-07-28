import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from "react-router-dom"
import Sidebar from '../components/core/Dashboard/Sidebar'
import "../styles/Dashboard/dashboard.css"
const Dashboard = () => {

  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);



  if (profileLoading || authLoading) {
    return (
      <div className='loader'>

      </div>
    )
  }


  return (
    <div id="main-container">
      <div>
        <Sidebar></Sidebar>
      </div>


      <div id="content-wrapper-div">
        <div id="content-div">
          <Outlet>  </Outlet>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
