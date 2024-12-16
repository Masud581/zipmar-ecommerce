import React, { useEffect, useState } from 'react';
import UploadCategoryModel from '../components/UploadCategoryModel';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../apis/SummaryApi';
import EditCategory from '../components/EditCategory';
import CofirmBox from '../components/CofirmBox';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useSelector } from 'react-redux';

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        image: "",
    });
    const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState({
        _id: "",
    });
     const allCategory = useSelector(state => state.product.allCategory)


    useEffect(()=>{
        setCategoryData(allCategory)
    },[allCategory])
    

    const fetchCategory = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getCategory,
            });
            const { data: responseData } = response;

            if (responseData.success) {
                setCategoryData(responseData.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
    }, []);

    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteCategory,
            });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                fetchCategory();
                setOpenConfirmBoxDelete(false);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className="bg-gray-100 min-h-screen">
            <div className="p-4 bg-white shadow-md flex items-center justify-between">
                <h2 className="font-semibold text-lg">Category Management</h2>
                <button
                    onClick={() => setOpenUploadCategory(true)}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Add Category
                </button>
            </div>
            {
                !categoryData[0] && !loading && (
                    <NoData />
                )
            }

            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {
                    categoryData.map((category) => {
                        return (
                            <div
                                className="bg-white shadow-md rounded-lg overflow-hidden relative"
                                key={category._id}
                            >
                                <div className="relative group">
                                    <img
                                        alt={category.name}
                                        src={category.image}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="absolute top-2 right-2 flex gap-2 p-2">
                                        <button
                                            onClick={() => {
                                                setOpenEdit(true);
                                                setEditData(category);
                                            }}
                                            className="bg-green-500 text-white px-2 py-1 text-xs rounded hover:bg-green-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setOpenConfirmBoxDelete(true);
                                                setDeleteCategory(category);
                                            }}
                                            className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="p-2">
                                    <h3 className="text-center text-sm font-medium text-gray-700">
                                        {category.name}
                                    </h3>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            {
                loading && (
                    <Loading />
                )
            }

            {
                openUploadCategory && (
                    <UploadCategoryModel
                        fetchData={fetchCategory}
                        close={() => setOpenUploadCategory(false)}
                    />
                )
            }

            {
                openEdit && (
                    <EditCategory
                        data={editData}
                        close={() => setOpenEdit(false)}
                        fetchData={fetchCategory}
                    />
                )
            }

            {
                openConfimBoxDelete && (
                    <CofirmBox
                        close={() => setOpenConfirmBoxDelete(false)}
                        cancel={() => setOpenConfirmBoxDelete(false)}
                        confirm={handleDeleteCategory}
                    />
                )
            }
        </section>
    );
};

export default CategoryPage;
