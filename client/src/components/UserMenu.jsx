import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import SummaryApi from '../apis/SummaryApi';
import { logout } from '../store/userSlice';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { FiExternalLink } from "react-icons/fi";
import isAdmin from '../utils/isAdmin';

function UserMenu({ close }) {
    const user = useSelector((state) => state?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout,
            });

            if (response.data.success) {
                if (close) {
                    close();
                }
                dispatch(logout());
                localStorage.clear();
                toast.success(response.data.message);
                Navigate('/');
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleClose = () => {
        if (close) {
            close();
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 w-55">
            <div className="font-semibold text-lg mb-2">My Account</div>

            <div className="text-sm flex items-center gap-2 mb-4">
                <span className="max-w-52 text-ellipsis line-clamp-1 font-medium">
                    {user.name || user.mobile} <span className="text-blue-500">{user.role === "admin" ? "(Admin)" : ""}</span>
                </span>
                <Link
                    onClick={handleClose}
                    to={"/dashboard/profile"}
                    className="hover:text-blue-500 transition-all"
                >
                    <FiExternalLink size={15} />
                </Link>
            </div>

            <Divider />

            <div className="text-sm grid gap-2 mt-4">
                {isAdmin(user.role) && (
                    <Link
                        onClick={handleClose}
                        to={"/dashboard/category"}
                        className="block px-3 py-2 bg-gray-100 rounded hover:bg-blue-100 transition-all"
                    >
                        Category
                    </Link>
                )}
                {isAdmin(user.role) && (
                    <Link
                        onClick={handleClose}
                        to={"/dashboard/subcategory"}
                        className="block px-3 py-2 bg-gray-100 rounded hover:bg-blue-100 transition-all"
                    >
                        Sub Category
                    </Link>
                )}
                {isAdmin(user.role) && (
                    <Link
                        onClick={handleClose}
                        to={"/dashboard/upload-product"}
                        className="block px-3 py-2 bg-gray-100 rounded hover:bg-blue-100 transition-all"
                    >
                        Upload Product
                    </Link>
                )}
                {isAdmin(user.role) && (
                    <Link
                        onClick={handleClose}
                        to={"/dashboard/product"}
                        className="block px-3 py-2 bg-gray-100 rounded hover:bg-blue-100 transition-all"
                    >
                        Product
                    </Link>
                )}
                <Link
                    onClick={handleClose}
                    to={"/dashboard/myorder"}
                    className="block px-3 py-2 bg-gray-100 rounded hover:bg-blue-100 transition-all"
                >
                    My Order
                </Link>
                <Link
                    onClick={handleClose}
                    to={"/dashboard/address"}
                    className="block px-3 py-2 bg-gray-100 rounded hover:bg-blue-100 transition-all"
                >
                    Save Address
                </Link>
                <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-600 px-3 py-2 bg-gray-100 rounded hover:bg-red-100 transition-all"
                >
                    Log out
                </button>
            </div>
        </div>
    );
}

export default UserMenu;
