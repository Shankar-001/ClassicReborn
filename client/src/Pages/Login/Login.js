import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '../../Components/Divider';
import { LoginUser } from '../../apicalls/users';

const validation = [
  {
    required: true,
    message: 'Fill out this field',
  },
];

function Login() {
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.token);
        navigate('/');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="h-screen bg-primary flex justify-center items-center ">
      <div className=" bg-white p-5 rounded w-[550px]">
        {/* border border-solid border-gray-800 */}
        <h1 className=" text-gray-700">Login</h1>
        <Divider />
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Email" name="email" rules={validation}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={validation}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Login
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className=" text-primary">
                Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Login;
