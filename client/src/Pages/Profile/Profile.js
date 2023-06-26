import { Tabs } from 'antd';
import Products from './Products';
import Bids from './UserBids';
import { useSelector } from 'react-redux';
import General from './General/General';




function Profile() {
  const {user} = useSelector(state => state.users)
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bids" key="2">
          <Bids />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <General />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
export default Profile;
