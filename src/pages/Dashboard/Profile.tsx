import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMerchant, updateLogo } from "../../redux/actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const ProfileSkeleton = () => {
  return (
    <div className='bg-white ml-12 bg-[#1100770A] min-h-screen'>
      <div className='container mx-auto p-4'>
        <Card>
          <CardHeader>
            <div className='h-7 w-24 bg-gray-200 rounded animate-pulse' />
          </CardHeader>
          <CardContent>
            {/* Profile Header Section */}
            <div className='mb-6 bg-[#533ae9] p-3 rounded-md'>
              <div className='flex items-center space-x-4'>
                {/* Avatar Skeleton */}
                <div className='w-24 h-24 rounded-full bg-white/30 animate-pulse' />

                <div className='space-y-3'>
                  {/* Name Skeleton */}
                  <div className='h-8 w-48 bg-white/30 rounded animate-pulse' />
                  {/* Button Skeleton */}
                  <div className='h-9 w-32 bg-white rounded animate-pulse' />
                </div>
              </div>
            </div>

            {/* Form Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Generate 8 form field skeletons */}
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className='space-y-2'>
                  {/* Label Skeleton */}
                  <div className='h-5 w-24 bg-gray-200 rounded animate-pulse' />
                  {/* Input Skeleton */}
                  <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
                </div>
              ))}
            </div>

            {/* Edit Button Skeleton */}
            <div className='mt-6 flex justify-end'>
              <div className='h-10 w-20 bg-gray-200 rounded animate-pulse' />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Profile = () => {
  const [imgFile, setImgFile] = useState("");
  const [imageData, setImageData] = useState<any>({});
  const [formData, setFormData] = useState<any>({});

  const id = localStorage.getItem("userId") as string;
  const logo = localStorage.getItem("logo");
  const dispatch = useDispatch() as unknown as any;
  const loading = useSelector((state: any) => state.loading);
  const [isLoading, setIsLoading] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleRef = () => {
    inputRef.current?.click();
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgFile(URL.createObjectURL(e.target.files[0]));
      setImageData({
        ...imageData,
        [e.target.name]: e.target.files[0],
      });
    }
  };

  const handleLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateLogo({ id, imageData }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const merchant = useSelector((state: any) => state.merchant);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getMerchant(id));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch, id]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div
      className={` bg-white ${
        window.innerWidth > 768 ? `ml-12` : `ml-12`
      }  bg-[#1100770A] min-h-[100vh]`}
    >
      <div className='container mx-auto p-4'>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='mb-6 bg-[#533ae9] text-white p-3'>
              <div className='flex items-center space-x-4'>
                <Avatar
                  className='w-24 h-24 cursor-pointer bg-white'
                  onClick={handleRef}
                >
                  <AvatarImage
                    src={imgFile || logo || "/placeholder.svg"}
                    alt='Profile'
                  />
                  <AvatarFallback>
                    {merchant.firstname?.[0]}
                    {merchant.lastname?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='text-2xl font-semibold'>{`${merchant.firstname} ${merchant.lastname}`}</h3>
                  <input
                    name='logo'
                    type='file'
                    ref={inputRef}
                    onChange={handleLogoChange}
                    className='hidden'
                  />
                  <Button
                    onClick={handleLogo}
                    className='mt-2 bg-white text-black'
                  >
                    Update Logo
                  </Button>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <Input id='email' value={merchant.email} readOnly />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='accountName'>Account Name</Label>
                <Input
                  id='accountName'
                  value={merchant.bankAccountInfo?.accountName}
                  readOnly
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='companyName'>Company Name</Label>
                <Input id='companyName' value={merchant.companyName} readOnly />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='accountNumber'>Account Number</Label>
                <Input
                  id='accountNumber'
                  value={merchant.bankAccountInfo?.accountNumber}
                  readOnly
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='contactNumber'>Contact Number</Label>
                <Input id='contactNumber' value={merchant.phone} readOnly />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='bankName'>Bank Name</Label>
                <Input
                  id='bankName'
                  value={merchant.bankAccountInfo?.bankName}
                  readOnly
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='address'>Address</Label>
                <Input id='address' value='N/A' readOnly />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='country'>Country</Label>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder='Country' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='country'>Country</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className='mt-6 flex justify-end'>
              <Button asChild className='bg-[#533ae9] text-white'>
                <Link to='/dashboard/settings'>Edit</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
