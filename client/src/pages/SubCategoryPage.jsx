import React, { useEffect, useState } from 'react';
import UploadSubCategoryModel from '../components/UploadSubCategoryModel';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../apis/SummaryApi';
import DisplayTable from '../components/DisplayTable';
import { createColumnHelper } from '@tanstack/react-table';
import ViewImage from '../components/ViewImage';
import { HiPencil } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import EditSubCategory from '../components/EditSubCategory';
import ConfirmBox from '../components/CofirmBox';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner'; // Assume you have a reusable Spinner component

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [imageURL, setImageURL] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ _id: '' });
  const [deleteSubCategory, setDeleteSubCategory] = useState({ _id: '' });
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummaryApi.getSubCategory });
      const { data: responseData } = response;

      if (responseData.success) {
        setData(
          responseData.data.map((item) => ({
            ...item,
            category: item.category || [], // Ensure category is always an array
          }))
        );
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => <span className="text-gray-800 font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-8 h-8 cursor-pointer rounded border"
            onClick={() => setImageURL(row.original.image)}
          />
        </div>
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          {Array.isArray(row.original.category) ? (
            row.original.category.map((c) => (
              <span
                key={c._id}
                className="bg-blue-50 text-blue-600 px-2 py-1 text-xs rounded shadow-sm"
              >
                {c.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500 italic">No category</span>
          )}
        </div>
      ),
    }),
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => {
              setOpenEdit(true);
              setEditData(row.original);
            }}
            className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
          >
            <HiPencil size={18} />
          </button>
          <button
            onClick={() => {
              setOpenDeleteConfirmBox(true);
              setDeleteSubCategory(row.original);
            }}
            className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
          >
            <MdDelete size={18} />
          </button>
        </div>
      ),
    }),
  ];

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setOpenDeleteConfirmBox(false);
        setDeleteSubCategory({ _id: '' });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="p-4 space-y-4">
      <div className="bg-white shadow rounded p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Sub Categories</h2>
        <button
          onClick={() => setOpenAddSubCategory(true)}
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Sub Category
        </button>
      </div>

      <div className="bg-white shadow rounded p-4 overflow-auto">
        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : (
          <DisplayTable data={data} columns={columns} />
        )}

        {!loading && data.length === 0 && (
          <div className="text-center py-10 text-gray-500">No subcategories available.</div>
        )}
      </div>

      {openAddSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenAddSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {imageURL && <ViewImage url={imageURL} close={() => setImageURL('')} />}

      {openEdit && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {openDeleteConfirmBox && (
        <ConfirmBox
          title="Delete Sub Category"
          message="Are you sure you want to delete this subcategory? This action cannot be undone."
          cancel={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategoryPage;
