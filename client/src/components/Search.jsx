import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import useMobile from '../hooks/useMobile';


function Search() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)
    const [isMobile] = useMobile()


    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    }, [location])


    const redirectToSearchPage = () => {
        navigate("/search")
    }



    return (
        <div className='w-full min-w-[300px] lg:min-w-[420px] h-10 lg:h-11 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200'>
            <div>

                {
                    (isSearchPage && isMobile) ? (
                        <Link to={'/'} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md' >
                            <FaArrowLeft size={22} />

                        </Link>

                    ) : (
                        <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200 '>
                            <IoSearchOutline size={22} />
                        </button>
                    )
                }

            </div>

            <div>
                {
                    !isSearchPage ? (
                        //not in search page
                        <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>


                            <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Search "milk',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Search "bread" ',
                                    1000,
                                    'Search "sugar"',
                                    1000,
                                    'Search "panner"',
                                    1000,
                                    'Search "atta"',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Search "rice" ',
                                    1000,
                                    'Search "dal"',
                                    1000,
                                    'Search "oil"',
                                    1000
                                ]}
                                wrapper="span"
                                speed={40}
                                repeat={Infinity}
                            />

                        </div>
                    ) : (
                        //in search page
                        <div className='w-full h-full'>
                            <input
                                type='text'
                                placeholder='Search for products'
                                autoFocus
                                className='w-full h-full bg-transparent outline-none'
                            />
                        </div>
                    )
                }
            </div>



        </div>
    )
}

export default Search