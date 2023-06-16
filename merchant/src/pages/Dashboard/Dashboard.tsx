import Sidebar from './Sidebar'
import {Routes, Route} from 'react-router-dom'
import DashboardHome, { DashNav } from './DashboardHome'
import DashboardProduct from './DashboardProduct'
import DashboardAddProduct from './DashboardAddProduct'
import SalesInfo from './SalesInfo'
import Profile from './Profile'
import UserReport from './UserReport'
import Settings from './Settings'

const Dashboard = () => {
  
  return (
    <div >
        <Sidebar />
        <div className={`${window.innerWidth > 768 ? `ml-[15%]`:`ml-[10%]`} mr-[5%] bg-[#1100770A]`}>
          <DashNav />
        </div>
        
        <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/product" element={<DashboardProduct />} />
            <Route path="/add-product" element={<DashboardAddProduct />} />
            <Route path="/sales-info" element={<SalesInfo />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/customer-report" element={<UserReport />} />
            <Route path="/settings" element={<Settings />} />

        </Routes>

    </div>
  )
}

export default Dashboard