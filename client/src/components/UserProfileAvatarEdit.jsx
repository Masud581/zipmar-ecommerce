import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../apis/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { updatedAvatar } from '../store/userSlice';
import { IoClose } from 'react-icons/io5';

const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError('No file selected. Please choose a file.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload an image (JPEG, PNG, GIF).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB. Please upload a smaller image.');
      return;
    }

    setError(null);
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });
      const { data: responseData } = response;

      dispatch(updatedAvatar(responseData.data.avatar));
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="fixed inset-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center"
      aria-labelledby="edit-avatar-title"
      role="dialog"
    >
      <div className="bg-white max-w-sm w-full rounded-lg p-6 shadow-lg relative">
        <button
          onClick={close}
          className="text-neutral-800 absolute top-4 right-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label="Close"
        >
          <IoClose size={24} />
        </button>
        <h2 id="edit-avatar-title" className="text-lg font-semibold text-neutral-800 text-center mb-4">
          Edit Profile Avatar
        </h2>
        <div className="w-24 h-24 bg-neutral-200 flex items-center justify-center rounded-full overflow-hidden shadow-md mb-4">
          {user.avatar ? (
            <img
              alt={user.name}
              src={user.avatar}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaRegUserCircle size={72} className="text-neutral-400" />
          )}
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <label htmlFor="uploadProfile" className="w-full">
            <div className="border border-primary-500 cursor-pointer hover:bg-primary-100 text-primary-700 px-4 py-2 rounded text-sm text-center transition-all duration-200">
              {loading ? 'Uploading...' : 'Upload New Avatar'}
            </div>
            <input
              onChange={handleUploadAvatarImage}
              type="file"
              id="uploadProfile"
              className="hidden"
              accept="image/*"
              aria-describedby="upload-error"
            />
          </label>
          {error && (
            <p id="upload-error" className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
