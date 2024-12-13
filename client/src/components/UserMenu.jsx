import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Links, Navigate, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../apis/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { FiExternalLink } from "react-icons/fi";

function UserMenu({ close }) {
    const user = useSelector((state) => state?.user)
    const dispatch = useDispatch()
    const nevigate = useNavigate()
    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout
            })

            if (response.data.success) {
                if (close) {
                    close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                Navigate('/')
            }

        } catch (error) {
            AxiosToastError

        }

    }

    const handleClose = () => {
        if (close) {
            close()
        }
    }
    return (
        <div >
            <div className='font-semibold'>My Account</div>

            <div className='text-sm flex items-center gap-2'>
                <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile}</span>
                <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-primary-200'>< FiExternalLink size={15} /></Link></div>
            <Divider />
            <div className='text-sm grid gap-1'>

                <Link onClick={handleClose} to={"/dashboard/category"} className='px-2 hover:bg-primary-100 py-1'>Category </Link>
                <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-2 hover:bg-primary-100 py-1'>Sub Category </Link>
                <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-2 hover:bg-primary-100 py-1'>Upload Product </Link>
                <Link onClick={handleClose} to={"/dashboard/product"} className='px-2 hover:bg-primary-100 py-1'>Product </Link>
                <Link onClick={handleClose} to={"/dashboard/myorder"} className='px-2 hover:bg-primary-100 py-1'>My Order </Link>
                <Link onClick={handleClose} to={"/dashboard/address"} className='px-2 hover:bg-primary-100 py-1'>Save Address</Link>
                <button onClick={handleLogout} className='text-left text-red-700 px-2 hover:bg-primary-100 py-1'>Log out</button>
            </div>
        </div>


    )
}

export default UserMenu