import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoClose } from "react-icons/io5";

function UserMenuMobile() {
  return (
    <section className='bg-white h-full w-full py-2'>
        <button onCanPlay={()=>window.history.back()} className='text-neutral-800 block w-fit ml-auto'>
            <IoClose size={25}/>
        </button>
        <div className='container mx-auto px-3 py-5 pb-8'>
        <UserMenu/>
        </div>
    </section>
  )
}

export default UserMenuMobile