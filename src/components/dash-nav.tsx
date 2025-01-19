import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, Search } from "lucide-react";

export function DashNav() {
  const location = useLocation();
  const logo = localStorage.getItem("logo");

  return (
    <div className='flex justify-between items-center bg-secondary/10 px-4 h-16'>
      <div className='relative w-1/2 invisible'>
        <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
        <Input type='text' placeholder='Search' className='pl-8 w-full' />
      </div>
      <div className='flex items-center space-x-4'>
        {/* {location.pathname === "/dashboard" && (
          <Link to='/dashboard/product'>
            <Button>Add Product</Button>
          </Link>
        )} */}
        <Bell className='h-5 w-5' />
        <Avatar>
          <AvatarImage src={logo || undefined} alt='User avatar' />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
