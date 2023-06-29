import { useEffect, useState } from 'react';
import { Avatar, Badge, message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../Redux/lodersSlice';
import { SetUser } from '../Redux/usersSlice';
import Notifications from './Notifications';
import {
  GetAllNotifications,
  ReadAllNotifications,
} from '../apicalls/notifications';
import ConfirmationModal from './ConfirmationPage';

function ProtectedPage({ children }) {
  const [notifications = [], setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        navigate('/login');
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate('/login');
      message.error(error.message);
    }
  };

  const getNotifications = async () => {
    try {
      const response = await GetAllNotifications();
      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const readNotifications = async () => {
    try {
      const response = await ReadAllNotifications();
      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(SetLoader(false));
    navigate('/login');
    window.location.reload();
  };

  const showLogoutConfirmationModal = () => {
    setShowLogoutConfirmation(true);
  };

  const handleLogoutConfirmation = () => {
    handleLogout();
    setShowLogoutConfirmation(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirmation(false);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      validateToken();
      getNotifications();
    } else {
      message.error('Session Expired Please Login Again');
      navigate('/login');
    }
  }, []);
  return (
    user && (
      <div>
        {/* Header part start here */}
        <div className=" flex justify-between items-center bg-slate-700 p-5">
          <h1
            className="text-2xl text-white cursor-pointer"
            onClick={() => navigate('/')}
          >
            Sell Or Swirl
          </h1>
          <div className=" bg-white px-2 py-3 rounded flex gap-1 items-center">
            <i className="ri-user-2-fill"></i>
            <span
              className="underline cursor-pointer"
              onClick={() => {
                if (user.role === 'user') {
                  navigate('/profile');
                } else {
                  navigate('/admin');
                }
              }}
            >
              {user.name}
            </span>
            <Badge
              count={
                notifications?.filter((notification) => !notification.read)
                  .length
              }
              onClick={() => {
                readNotifications();
                setShowNotifications(true);
              }}
              className="cursor-pointer ml-2"
            >
              <Avatar
                shape="circle"
                icon={<i className="ri-notification-3-line"></i>}
              />
            </Badge>
            <i
              className="ri-logout-circle-r-line ml-2 cursor-pointer"
              onClick={showLogoutConfirmationModal}
            ></i>
          </div>
        </div>

        {/* Content */}
        <div className=" p-5">{children}</div>

        {
          <Notifications
            notifications={notifications}
            reloadNotifications={readNotifications}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
          />
        }
        <ConfirmationModal
          visible={showLogoutConfirmation}
          onConfirm={handleLogoutConfirmation}
          onCancel={handleLogoutCancel}
        />
      </div>
    )
  );
}
export default ProtectedPage;
