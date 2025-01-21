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
  const [isCollapsed, setIsCollapsed] = useState(
    controlledCollapsed !== undefined ? controlledCollapsed : true
  );
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
