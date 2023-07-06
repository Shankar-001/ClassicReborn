import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../apicalls/users';
import { message } from 'antd';
import { SetLoader } from '../../../Redux/lodersSlice';

function General() {
  const { user } = useSelector((state) => state.users);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      dispatch(SetLoader(true));
      const updatedUser = { ...user, name };
      const response = await updateUserProfile(updatedUser);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        setIsEditing(false);
        window.location.reload();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const handleCancel = () => {
    setName(user.name);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col w-1/4">
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="text-stone-600 text-xl">
            Name:
          </label>
          {isEditing ? (
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xl border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
            />
          ) : (
            <span className="text-xl">{user.name}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-stone-600 text-xl">
            Email:
          </label>
          <span className="text-xl">{user.email}</span>
        </div>
        <div className="mb-4">
          <label htmlFor="createdAt" className="text-stone-600 text-xl">
            Created At:
          </label>
          <span className="text-xl">
            {moment(user.createdAt).format('DD-MM-YYYY hh:mm A')}
          </span>
        </div>
        {isEditing ? (
          <div className="flex">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 mr-2 text-white bg-indigo-500 rounded hover:bg-indigo-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleEdit}
            className="px-4 py-2 mt-4 text-white bg-indigo-500 rounded hover:bg-indigo-600"
          >
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
}

export default General;
