import { useEffect, useState } from 'react';
import { message } from 'antd';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';

function ProtectedPage({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.data);
      } else {
        navigate('/login');
        message.error(response.message);
      }
    } catch (error) {
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
    <div>
      {user && (
        <div>
          {user.name}
          {children}
        </div>
      )}
    </div>
  );
}
export default ProtectedPage;
