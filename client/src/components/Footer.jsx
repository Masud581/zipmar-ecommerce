import { FaFacebook,FaInstagram,FaLinkedin  } from "react-icons/fa";
import React from 'react'

function Footer() {
  return (
    <footer className='border-t'>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2 '>
            <p> © All Rights Reserve 2024.</p>
            
            <div className="flex items-center gap-4 justify-center text-2xl">
                <a href="" className="hover:text-primary-100">
                    <FaFacebook/>
                   
                </a>
                <a href=""className="hover:text-primary-100">
                <FaInstagram />
                </a>
                <a href=""className="hover:text-primary-100">
                <FaLinkedin />
                </a>
            </div>

        </div>

    </footer>
  )
}

export default Footer