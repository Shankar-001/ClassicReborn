import { useEffect } from 'react';
import { message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from '../Redux/lodersSlice';
import { SetUser } from '../Redux/usersSlice';

function ProtectedPage({ children }) {
  const {user} = useSelector((state) => state.users)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data))
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

  useEffect(() => {
    if (localStorage.getItem('token')) {
      validateToken();
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
          <h1 className="text-2xl text-white">Sell Or Swirl</h1>
          <div className=" bg-white px-2 py-3 rounded flex gap-1 items-center">
            <i className="ri-user-2-fill"></i>
            <span className="underline cursor-pointer" onClick={() => navigate('/profile')}>{user.name}</span>
            <i
              className="ri-logout-circle-r-line ml-4 cursor-pointer"
              onClick={() => {
                localStorage.removeItem('token');
                dispatch(SetLoader(false));
                navigate('/login');
              }}
            ></i>
          </div>
        </div>

        {/* Content */}
        <div className=" p-5">{children}</div>
      </div>
    )
  );
}
export default ProtectedPage;
