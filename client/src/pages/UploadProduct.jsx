import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../apis/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';
import { useEffect } from 'react';

const UploadProduct = () => {
  const [data,setData] = useState({
      name : "",
      image : [],
      category : [],
      subCategory : [],
      unit : "",
      stock : "",
      price : "",
      discount : "",
      description : "",
      more_details : {},
  })
  const [imageLoading,setImageLoading] = useState(false)
  const [ViewImageURL,setViewImageURL] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory,setSelectCategory] = useState("")
  const [selectSubCategory,setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  const [openAddField,setOpenAddField] = useState(false)
  const [fieldName,setFieldName] = useState("")


  const handleChange = (e)=>{
    const { name, value} = e.target 

    setData((preve)=>{
      return{
          ...preve,
          [name]  : value
      }
    })
  }

  const handleUploadImage = async(e)=>{
    const file = e.target.files[0]

    if(!file){
      return 
    }
    setImageLoading(true)
    const response = await uploadImage(file)
    const { data : ImageResponse } = response
    const imageUrl = ImageResponse.data.url 

    setData((preve)=>{
      return{
        ...preve,
        image : [...preve.image,imageUrl]
      }
    })
    setImageLoading(false)

  }

  const handleDeleteImage = async(index)=>{
      data.image.splice(index,1)
      setData((preve)=>{
        return{
            ...preve
        }
      })
  }

  const handleRemoveCategory = async(index)=>{
    data.category.splice(index,1)
    setData((preve)=>{
      return{
        ...preve
      }
    })
  }
  const handleRemoveSubCategory = async(index)=>{
      data.subCategory.splice(index,1)
      setData((preve)=>{
        return{
          ...preve
        }
      })
  }

  const handleAddField = ()=>{
    setData((preve)=>{
      return{
          ...preve,
          more_details : {
            ...preve.more_details,
            [fieldName] : ""
          }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log("data",data)

    try {
      const response = await Axios({
          ...SummaryApi.createProduct,
          data : data
      })
      const { data : responseData} = response

      if(responseData.success){
          successAlert(responseData.message)
          setData({
            name : "",
            image : [],
            category : [],
            subCategory : [],
            unit : "",
            stock : "",
            price : "",
            discount : "",
            description : "",
            more_details : {},
          })

      }
    } catch (error) {
        AxiosToastError(error)
    }


  }

  // useEffect(()=>{
  //   successAlert("Upload successfully")
  // },[])
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="p-4 bg-white shadow-lg flex items-center justify-between">
        <h2 className="font-bold text-xl text-gray-800">Upload Product</h2>
      </div>
      <div className="max-w-4xl mx-auto mt-6 bg-white shadow-md rounded-lg p-6">
        <form className="grid gap-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="grid gap-2">
            <label htmlFor="name" className="font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-gray-100 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
  
          {/* Description */}
          <div className="grid gap-2">
            <label htmlFor="description" className="font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              placeholder="Enter product description"
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              rows={4}
              className="bg-gray-100 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            />
          </div>
  
          {/* Image Upload */}
          <div className="grid gap-2">
            <p className="font-medium text-gray-700">Image</p>
            <label
              htmlFor="productImage"
              className="bg-gray-100 h-28 border border-gray-300 rounded-lg flex justify-center items-center cursor-pointer hover:bg-gray-200 transition"
            >
              <div className="text-center flex flex-col items-center">
                {imageLoading ? (
                  <Loading />
                ) : (
                  <>
                    <FaCloudUploadAlt size={40} className="text-blue-500" />
                    <p className="text-sm text-gray-500">Upload Image</p>
                  </>
                )}
              </div>
              <input
                type="file"
                id="productImage"
                className="hidden"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </label>
            <div className="flex flex-wrap gap-4 mt-3">
              {data.image.map((img, index) => (
                <div key={img + index} className="relative w-24 h-24 bg-gray-100 border border-gray-300 rounded-lg group">
                  <img
                    src={img}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-lg"
                    onClick={() => setViewImageURL(img)}
                  />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white text-xs hidden group-hover:block"
                  >
                    <MdDelete />
                  </button>
                </div>
              ))}
            </div>
          </div>
  
          {/* Category */}
          <div className="grid gap-2">
            <label className="font-medium text-gray-700">Category</label>
            <select
              className="bg-gray-100 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={selectCategory}
              onChange={(e) => {
                const value = e.target.value;
                const category = allCategory.find((el) => el._id === value);
                if (category) {
                  setData((prev) => ({
                    ...prev,
                    category: [...prev.category, category],
                  }));
                }
                setSelectCategory("");
              }}
            >
              <option value="">Select Category</option>
              {allCategory.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="flex flex-wrap gap-2 mt-3">
              {data.category.map((c, index) => (
                <div
                  key={c._id + index}
                  className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-lg flex items-center gap-2 text-sm"
                >
                  <p>{c.name}</p>
                  <IoClose
                    size={20}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleRemoveCategory(index)}
                  />
                </div>
              ))}
            </div>
          </div>
  
          {/* Subcategory */}
          <div className="grid gap-2">
            <label className="font-medium text-gray-700">Subcategory</label>
            <select
              className="bg-gray-100 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={selectSubCategory}
              onChange={(e) => {
                const value = e.target.value;
                const subCategory = allSubCategory.find((el) => el._id === value);
                if (subCategory) {
                  setData((prev) => ({
                    ...prev,
                    subCategory: [...prev.subCategory, subCategory],
                  }));
                }
                setSelectSubCategory("");
              }}
            >
              <option value="">Select Subcategory</option>
              {allSubCategory.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="flex flex-wrap gap-2 mt-3">
              {data.subCategory.map((c, index) => (
                <div
                  key={c._id + index}
                  className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-lg flex items-center gap-2 text-sm"
                >
                  <p>{c.name}</p>
                  <IoClose
                    size={20}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleRemoveSubCategory(index)}
                  />
                </div>
              ))}
            </div>
          </div>
  
          {/* Unit, Stock, Price, and Discount */}
          {[
            { id: "unit", label: "Unit", type: "text", placeholder: "Enter product unit", value: data.unit },
            { id: "stock", label: "Stock", type: "number", placeholder: "Enter stock quantity", value: data.stock },
            { id: "price", label: "Price", type: "number", placeholder: "Enter product price", value: data.price },
            { id: "discount", label: "Discount", type: "number", placeholder: "Enter discount", value: data.discount },
          ].map((field) => (
            <div key={field.id} className="grid gap-2">
              <label htmlFor={field.id} className="font-medium text-gray-700">{field.label}</label>
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                name={field.id}
                value={field.value}
                onChange={handleChange}
                required
                className="bg-gray-100 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          ))}
  
          {/* Additional Fields */}
          {Object.keys(data.more_details).map((key, index) => (
            <div key={index} className="grid gap-2">
              <label htmlFor={key} className="font-medium text-gray-700">{key}</label>
              <input
                id={key}
                type="text"
                value={data.more_details[key]}
                onChange={(e) => {
                  const value = e.target.value;
                  setData((prev) => ({
                    ...prev,
                    more_details: { ...prev.more_details, [key]: value },
                  }));
                }}
                required
                className="bg-gray-100 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setOpenAddField(true)}
            className="bg-gray-100 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100"
          >
            Add Fields
          </button>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
  
}

export default UploadProduct