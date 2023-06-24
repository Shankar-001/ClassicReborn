import { Tabs } from "antd"
import Products from "./AdminProducts"


function Admin() {
  return (
    <div>
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Products" key ='1'>
                <Products />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Users" key ='2'>
                <h1>Users</h1>
            </Tabs.TabPane>
        </Tabs>
    </div>
  )
}
export default Admin