import { Tabs } from 'antd';
import Products from './AdminProducts';
import Users from './Users';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (user.role !== 'admin') {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="2">
          <Users />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
export default Admin;
