import { Button, Form, Input, message } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '../../Components/Divider';
import { RegisterUser } from '../../apicalls/users';

const validation = [
  {
    required: true,
    message: 'Fill out this field',
  },
];

function Register() {
  const navigate = useNavigate();
  const handleFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
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
        {' '}
        {/* border border-solid border-gray-800 */}
        <h1 className=" text-gray-700">Register</h1>
        <Divider />
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Name" name="name" rules={validation}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={validation}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={validation}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Register
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className=" text-primary">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Register;
