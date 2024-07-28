import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from "react-icons/ai"
import { IoIosArrowDropdownCircle } from "react-icons/io"
import { useSelector } from 'react-redux'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/TechLearn_transparent.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import "../../styles/HomePage/Navbar.css"
import ProfileDropdown from '../auth/ProfileDropDown'

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ; (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        console.log(res.data.allcategory);
        const result = res.data.allcategory

        setSubLinks(result)

      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])
  console.log("sublinks", subLinks)
  console.log("user", user)
  console.log("token", token)
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }
  return (
    <div className='container'>
      <div className='content'>
        <div className='logo-main'>
          <Link to="/">
            <img src={logo} width={160} height={42} loading="lazy" />
          </Link>
        </div>

        <nav>
          <ul className='navList'>
            {NavbarLinks.map((link, index) => (
              <li key={index} className='navItem'>
                {link.title === 'Catalog' ? (
                  <div className='dropdown-container'>
                    {link.title === 'Catalog' ? (

                      <>
                        <div className='dropdown-toggle'>
                          <p>{link.title}</p>
                          <IoIosArrowDropdownCircle />
                        </div>
                        <div className='dropdown-menu'>
                          <div className='dropdown-menu-arrow'></div>
                          {subLinks.length ? (
                            subLinks.map((subLink, index) => (
                              <div className='link' key={index}>
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(/[\s/]+/)
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={index}
                                >
                                  <p>{subLink.name}</p>
                                </Link>

                              </div>
                            ))
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className='dropdown-toggle'>
                        <p>{link.title}</p>
                      </div>
                    )}
                  </div>

                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${matchRoute(link?.path)
                        ? 'activeLink'
                        : 'navLink'
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>

        </nav>
        {/* Login/SignUp/Dashboard */}

        {<div className='flex gap-x-4 items-center'>

          {

            user && user?.accountType != "Instructor" && (

              <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -top-3 -bottom-0 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-800 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
            )
          }
          {
            token === null && (
              <Link to="/login">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                  Log in
                </button>
              </Link>
            )
          }
          {
            token === null && (
              <Link to="/signup">
                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                  Sign Up
                </button>
              </Link>
            )
          }
          {
            token !== null && <ProfileDropdown />
          }

        </div>}

      </div>
    </div>
  )
}

export default Navbar
