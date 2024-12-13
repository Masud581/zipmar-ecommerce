import React, { useState } from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { GoTriangleDown,GoTriangleUp  } from "react-icons/go";
import UserMenu from './UserMenu';



const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu,setOpenUserMenu] = useState(false);
  

  const redirectToLoginPage = () => {
    navigate("/login");

  }
  
  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }
  const handleMobileUser = () => {
    if(!user._id){
      navigate("/login")
      return
    }
    navigate("/user")
  }



  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 flex z-40 items-center flex-col justify-center gap-1 bg-white'>
      {
        // if isMobile is true, then return the following div
        !(isSearchPage && isMobile) && (
          <div className='container mx-auto flex items-center px-2 justify-between'>
            {/* logo */}
            <div className='h-full'>
              <Link to={"/"} className='h-full flex justify-center items-center p-2'>
                <img
                  src={logo}
                  width={150}
                  height={50}
                  alt='logo'
                  className=' hidden  lg:block '
                />
                <img
                  src={logo}
                  width={120}
                  height={60}
                  alt='logo'
                  className='lg:hidden'
                />
              </Link>
            </div>



            {/* search */}
            <div className='hidden lg:block'>
              <Search />
            </div>


            {/* login and my cart */}
            <div className=''>
              {/* user icon display in only mobile version */}
              <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                <FaRegCircleUser size={26} />
              </button>
              {/* this for the desktop version */}
              <div className='hidden lg:flex items-center gap-10'>
                {
                  user?._id?(
                    <div className='relative'>
                      <div onClick={()=>setOpenUserMenu(prev =>!prev)} className='flex select-nonetems-center gap-2 cursor-pointer'>
                        <p>Account</p>
                        {
                          openUserMenu?(
                            <GoTriangleUp size={25}/>
                            
                          ):(
                            <GoTriangleDown size={25}/>
                          )
                        }                      
                                               
                      </div>
                      {
                        openUserMenu && (
                          <div className='absolute right-0 top-16'>                    
                          <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                              <UserMenu close={handleCloseUserMenu}/>
                            </div>
                            </div> 
                        )
                      }
                                           
                    </div>
                    
                  ):(          
                    <button onClick={redirectToLoginPage}>Login</button>
                  )
                }
                <div className='text-blue-500 '>
                {/* <button onClick={redirectToRegisterPage} className='px-1'>Register</button> */}
              
                </div>
                
                


                <button className='flex items-center gap-2 bg-secondary-200 hover:bg-green-800 px-2 py-2 rounded text-white'>
                   {/* add cart icon */}
                  <div className='animate-bounce'>                   
                    <TiShoppingCart size={26} />
                  </div>
                  <div className='font-semibold'>
                    <p>My Cart</p>
                  </div>
                </button>
              </div>

            </div>
          </div>

        )
      }

      <div className='container mx-auto px-2 lg:hidden'>
        <Search />
      </div>
    </header>
  )
}

export default Header