// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import lucred from '../../assets/lucred-logo.png'
// import lucredMini from '../../assets/lucred-mini.png'
// import home from "../../assets/home.png";
// import addProduct from "../../assets/addProduct.png";
// import sales from "../../assets/sales.png";
// import profile from "../../assets/profile.png";
// import userGuide from "../../assets/userGuide.png";
// import userReport from "../../assets/userReport.png";
// import settings from "../../assets/settings.png";
// import help from "../../assets/help.png";
// import logout from "../../assets/logout.png";
// import { Logout } from '../../redux/actions'

// const Sidebar = () => {
//     return (
//         <div>
//             {window.innerWidth > 768 ? <MaxSidebar /> : <MinSidebar />}

//         </div>
//     )
// }

// export const MaxSidebar = () => {
//     return (
//         <div className='w-[15%] bg-[#533AE9] fixed h-[100vh] '>
//             <img src={lucred} alt="Lucred" className='bg-[#fff] rounded-md mx-[auto] my-[12%] w-[15vh]' />
//             <ul className='h-[60vh] flex flex-col justify-evenly ml-[5%]'>
//                 <li><Link to={'/dashboard'} className='text-[#fff] flex pl-[5%] items-center '><img src={home} alt="" className='h-[2vh] mr-[5%]' />Dashboard</Link></li>
//                 <li><Link to={'/dashboard/product'} className='text-[#fff] flex pl-[5%] items-center '><img src={addProduct} alt="" className='h-[2vh] mr-[5%]' />Product</Link></li>
//                 <li><Link to={'/dashboard/sales-info'} className='text-[#fff] flex pl-[5%] items-center '><img src={sales} alt="" className='h-[2vh] mr-[5%]' />Sales Info</Link></li>
//                 <li><Link to={'/dashboard/profile'} className='text-[#fff] flex pl-[5%] items-center '><img src={profile} alt="" className='h-[2vh] mr-[5%]' />Profile</Link></li>
//                 <li><Link to={'/dashboard/user-guide'} className='text-[#fff] flex pl-[5%] items-center '><img src={userGuide} alt="" className='h-[auto] mr-[5%]' />User Guide</Link></li>
//                 <li><Link to={'/dashboard/customer-report'} className='text-[#fff] flex pl-[5%] items-center '><img src={userReport} alt="" className='h-[2vh] mr-[5%]' />User Report</Link></li>
//                 <li><Link to={'/dashboard/settings'} className='text-[#fff] flex pl-[5%] items-center '><img src={settings} alt="" className='h-[2vh] mr-[5%]' />Settings</Link></li>
//                 <li><Link to={''} className='text-[#fff] flex pl-[5%] items-center '><img src={help} alt="" className='h-[2vh] mr-[5%]' />Help</Link></li>
//                 <li><Link to={''} className='text-[#fff] flex pl-[5%] items-center ' onClick={Logout}><img src={logout} alt="" className='h-[2vh] mr-[5%]' />Logout</Link></li>
//             </ul>

//         </div>
//     )
// }

// export const MinSidebar = () => {
//     const [showNav, setShowNav] = useState(true)
//     const toggleNav = () => {
//         setShowNav(!showNav)
//     }
//     return (
//         <>
//             {showNav ? <MinSidebar1 click={toggleNav} /> : <MinSidebar2 click={toggleNav} />}
//         </>

//     )
// }

// export const MinSidebar1 = ({ click }: any) => {
//     return (
//         <div className='w-[10%] bg-[#533AE9] fixed h-[100vh] py-[5%] '>
//             <img src={lucredMini} alt="Lucred" className=' mx-auto ' />
//             <ul className='h-[60vh] flex flex-col justify-evenly items-center ml-[5%]'>
//                 <li><Link to={'/dashboard'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={home} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
//                 <li><Link to={'/dashboard/product'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={addProduct} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
//                 <li><Link to={'/dashboard/sales-info'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={sales} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
//                 <li><Link to={'/dashboard/profile'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={profile} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
//                 <li><Link to={'/dashboard/user-guide'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={userGuide} alt="" className='h-[auto] mr-[5%]' /></Link></li>
//                 <li><Link to={'/dashboard/customer-report'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={userReport} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
//                 <li><Link to={'/dashboard/settings'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={settings} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
//                 <li><Link to={''} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={help} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
//                 <li><Link to={''} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={logout} alt="" className='h-[2vh] mr-[5%]' /></Link></li>
//             </ul>

//         </div>
//     )
// }

// export const MinSidebar2 = ({ click }: any) => {
//     return (
//         <div className='w-[50%] md:w-[30%] bg-[#533AE9] fixed h-[100vh] py-[5%] z-[17]'>
//             <img src={lucred} alt="Lucred" className='bg-[#fff] rounded-md mx-[auto] my-[12%] py-[5%] px-[5%] h-[9vh]' />
//             <ul className='h-[60vh] flex flex-col justify-evenly ml-[5%]'>
//                 <li><Link to={'/dashboard'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={home} alt="" className='h-[2vh] mr-[5%]' />Dashboard</Link></li>
//                 <li><Link to={'/dashboard/product'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={addProduct} alt="" className='h-[2vh] mr-[5%]' />Product</Link></li>
//                 <li><Link to={'/dashboard/sales-info'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={sales} alt="" className='h-[2vh] mr-[5%]' />Sales Info</Link></li>
//                 <li><Link to={'/dashboard/profile'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={profile} alt="" className='h-[2vh] mr-[5%]' />Profile</Link></li>
//                 <li><Link to={'/dashboard/user-guide'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={userGuide} alt="" className='h-[auto] mr-[5%]' />User Guide</Link></li>
//                 <li><Link to={'/dashboard/customer-report'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={userReport} alt="" className='h-[2vh] mr-[5%]' />User Report</Link></li>
//                 <li><Link to={'/dashboard/settings'} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={settings} alt="" className='h-[2vh] mr-[5%]' />Settings</Link></li>
//                 <li><Link to={''} className='text-[#fff] flex pl-[5%] items-center ' onClick={click}><img src={help} alt="" className='h-[2vh] mr-[5%]' />Help</Link></li>
//                 <li><Link to={''} className='text-[#fff] flex pl-[5%] items-center ' onClick={Logout}><img src={logout} alt="" className='h-[2vh] mr-[5%]' />Logout</Link></li>
//             </ul>

//         </div>
//     )
// }

// export default Sidebar

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import lucred from "../../assets/lucred-logo.png";
import lucredMini from "../../assets/lucred-mini.png";
import { cn } from "../../utils";
import home from "../../assets/home.png";
import addProduct from "../../assets/addProduct.png";
import sales from "../../assets/sales.png";
import profile from "../../assets/profile.png";
import userGuide from "../../assets/userGuide.png";
import userReport from "../../assets/userReport.png";
import settings from "../../assets/settings.png";
import help from "../../assets/help.png";
import logout from "../../assets/logout.png";
import { Logout } from "../../redux/actions";
import { Button } from "../../components/ui/button";

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed: controlledCollapsed,
  onCollapse,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(controlledCollapsed || true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    if (controlledCollapsed !== undefined) {
      setIsCollapsed(controlledCollapsed);
    }
  }, [controlledCollapsed]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapse?.(newCollapsed);
  };

  const menuItems = [
    { path: "/dashboard", icon: home, label: "Dashboard" },
    { path: "/dashboard/product", icon: addProduct, label: "Product" },
    { path: "/dashboard/sales-info", icon: sales, label: "Sales Info" },
    { path: "/dashboard/profile", icon: profile, label: "Profile" },
    { path: "/dashboard/user-guide", icon: userGuide, label: "User Guide" },
    {
      path: "/dashboard/customer-report",
      icon: userReport,
      label: "User Report",
    },
    { path: "/dashboard/settings", icon: settings, label: "Settings" },
    { path: "https://wa.me/2347025457747", icon: help, label: "Help" },
    { path: "", icon: logout, label: "Logout", onClick: Logout },
  ];

  const sidebarWidth = isCollapsed ? "w-16" : isMobile ? "w-64" : "w-64";

  return (
    <div
      className={cn(
        "fixed h-screen bg-[#533AE9] transition-all duration-300 z-20",
        sidebarWidth
      )}
    >
      <div className='flex items-center justify-between p-4'>
        <img
          src={isCollapsed ? lucredMini : lucred}
          alt='Lucred'
          className={cn(
            "transition-all duration-300",
            isCollapsed ? "w-8" : "w-32 bg-white rounded-md p-2"
          )}
        />
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='p-2 rounded-full bg-white  text-[#533ae9] '
        >
          {isCollapsed ? (
            <ChevronRight className='w-5 h-5' />
          ) : (
            <ChevronLeft className='w-5 h-5' />
          )}
        </Button>
      </div>

      <nav className='mt-8'>
        <TooltipProvider>
          <ul className='space-y-2 px-2'>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Tooltip>
                  <TooltipTrigger asChild className=''>
                    <Link
                      to={item.path}
                      onClick={item.onClick}
                      className={cn(
                        "flex items-center text-white p-2 rounded-lg hover:bg-[#6148ec] hover:text-white transition-colors",
                        !isCollapsed && "space-x-3"
                      )}
                    >
                      <img
                        src={item.icon}
                        alt={item.label}
                        className='h-5 w-5'
                      />
                      {!isCollapsed && <span>{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent className='bg-white' side='right'>
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </nav>
    </div>
  );
};

export default Sidebar;
