import Sidebar from "./Sidebar";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "./DashboardHome";
import DashboardProduct from "./DashboardProduct";
import DashboardAddProduct from "./DashboardAddProduct";
import SalesInfo from "./SalesInfo";
import Profile from "./Profile";
import UserReport from "./UserReport";
import UserGuide from "./UserGuide";
import Settings from "./Settings";
import SingleProduct from "./SingleProduct";
import { DashNav } from "../../components/dash-nav";
import { useState } from "react";

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className=''>
      <Sidebar onCollapse={(collapsed) => setSidebarCollapsed(collapsed)} />
      <div
        className={`${
          sidebarCollapsed ? "ml-64" : "ml-3"
        } transition-all duration-300 bg-[#1100770A]`}
      >
        <DashNav />
      </div>
      <div className=''>
        <Routes>
          <Route path='/' element={<DashboardHome />} />
          <Route path='/product' element={<DashboardProduct />} />
          <Route path='/product/:productId' element={<SingleProduct />} />
          <Route path='/add-product' element={<DashboardAddProduct />} />
          <Route
            path='/update-product/:productId'
            element={<DashboardAddProduct />}
          />
          <Route path='/sales-info' element={<SalesInfo />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/customer-report' element={<UserReport />} />
          <Route path='/user-guide' element={<UserGuide />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
