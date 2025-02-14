// import { Link } from "react-router-dom";
// import profille from "../../assets/profille.png";
// import { TextInput } from "./DashboardAddProduct";
// import { useState } from "react";
// import { updateProfile } from "../../redux/actions";
// import { useDispatch } from "react-redux";

// const Settings = () => {
//   const [formData, setFormData] = useState<any>({
//     firstname: "",
//     lastname: "",
//     bankAccountInfo: {
//       accountName: "",
//       accountNumber: "",
//       bankName: "",
//       bankCode: "153",
//       bankAccountType: "",
//     },
//   });

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleBankChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       bankAccountInfo: {
//         ...formData.bankAccountInfo,
//         [name]: value,
//       },
//     });
//   };

//   const id = localStorage.getItem("userId");
//   const logo = localStorage.getItem("logo");

//   const dispatch = useDispatch() as unknown as any;

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     await dispatch(updateProfile({ id, formData }));
//   };

//   return (
//     <div
//       className={`${
//         window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`
//       } bg-[#1100770A] mr-[5%] `}
//     >
//       <div className='mx-[3%]'>
//         <div className='flex items-center justify-between'>
//           <div>
//             <div className='py-[1%]'>
//               <p className='text-[0.7rem]'>Dashboard/Settings</p>
//               <h3 className='text-[1.3rem] font-[500]'>Settings</h3>
//             </div>
//             <h3 className='lg:text-[1.5rem] text-[1.2rem] font-[500]'>
//               User Information
//             </h3>
//             <p className='text-[#8C858D] w-[60%] lg:text-[0.9rem] text-[0.6rem]'>
//               Here you can edit Public information about yourself Changes will
//               be displayed with 2-5 minutes
//             </p>
//           </div>
//           <div className='flex flex-col items-center py-[4%]'>
//             <p className='text-[0.8rem]'>Company Logo</p>
//             <div className='bg-[#fff] w-[100px] h-[100px] border border-[#533AE9] border-[5px] rounded-[50%] flex items-center justify-center '>
//               <img
//                 src={logo || profille}
//                 alt=''
//                 className='w-[90px] h-[90px] object-cover object-top rounded-[50%]'
//               />
//             </div>
//           </div>
//         </div>

//         <div className='flex lg:flex-row flex-col justify-between'>
//           <div className='lg:w-[45%]'>
//             <TextInput
//               label='Email Address'
//               type='email'
//               placeholder='Enter your Email here'
//             />
//             <div className='flex lg:flex-row flex-col justify-between'>
//               <TextInput
//                 label='First Name'
//                 name='firstname'
//                 value={formData.firstName}
//                 type='text'
//                 placeholder='Enter your first name'
//                 onChange={handleChange}
//               />
//               <TextInput
//                 label='Second Name'
//                 name='lastname'
//                 value={formData.lastName}
//                 type='text'
//                 placeholder='Enter your second name'
//                 onChange={handleChange}
//               />
//             </div>
//             <TextInput
//               label='Company Name'
//               type='text'
//               placeholder='COMPANY XYZ'
//             />
//             <TextInput
//               label='Address'
//               type='text'
//               placeholder='Enter your address'
//             />
//           </div>
//           <div className='lg:w-[45%]'>
//             <TextInput
//               label='Contact Number'
//               type='number'
//               placeholder='Enter your number'
//             />
//             <TextInput
//               label='Account Name'
//               name={"accountName"}
//               value={formData.bankAccountInfo.accountName}
//               type='text'
//               placeholder='Enter your account name'
//               onChange={handleBankChange}
//             />
//             <TextInput
//               label='Account Number'
//               name={"accountNumber"}
//               value={formData.bankAccountInfo.accountNumber}
//               type='number'
//               placeholder='Enter your Account number'
//               onChange={handleBankChange}
//             />
//             <TextInput
//               label='Bank Name'
//               name={"bankName"}
//               value={formData.bankAccountInfo.bankName}
//               type='text'
//               placeholder='Enter your bank name'
//               onChange={handleBankChange}
//             />
//             <TextInput
//               label='Account Type'
//               name={"bankAccountType"}
//               value={formData.bankAccountInfo.bankAccountType}
//               type='text'
//               placeholder='Enter your account type'
//               onChange={handleBankChange}
//             />
//           </div>
//         </div>
//         <div className='flex justify-end  py-[5%]'>
//           <Link
//             to=''
//             className='bg-[#FFF] lg:w-[20%] w-[50%] h-[5vh] text-[#533AE9] mr-[5%] rounded-md flex justify-center items-center'
//           >
//             Cancel
//           </Link>
//           <button
//             className='bg-[#533AE9] lg:w-[20%] w-[50%] h-[5vh] text-[#fff] rounded-md flex justify-center items-center'
//             onClick={handleSubmit}
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/actions";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";

const Settings = () => {
  const [formData, setFormData] = useState<any>({
    firstname: "",
    lastname: "",
    email: "",
    companyName: "",
    address: "",
    contactNumber: "",
    bankAccountInfo: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      bankCode: "153",
      bankAccountType: "",
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      bankAccountInfo: {
        ...prev.bankAccountInfo,
        [name]: value,
      },
    }));
  };

  const id = localStorage.getItem("userId");
  const logo = localStorage.getItem("logo");

  const dispatch = useDispatch() as unknown as any;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateProfile({ id, formData }));
  };

  return (
    <div
      className={` bg-white ${
        window.innerWidth > 768 ? `ml-12` : `ml-12`
      } bg-[#1100770A] min-h-[100vh]`}
    >
      <div className=' mx-auto p-4'>
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <p className='text-sm text-muted-foreground'>
              Here you can edit public information about yourself. Changes will
              be displayed within 2-5 minutes.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-8'>
              <div className='flex justify-between items-start p-3 font-medium bg-[#533ae9] text-white rounded-md'>
                <div className='space-y-2'>
                  <h3 className='text-lg font-medium'>User Information</h3>
                  <p className='text-[12px] md:text-sm text-muted-foreground'>
                    Update your personal details and company information.
                  </p>
                </div>
                <div className='flex flex-col items-center space-y-2'>
                  <p className='hidden md:block text-sm'>Company Logo</p>
                  <Avatar className='w-24 h-24 bg-white'>
                    <AvatarImage src={logo || ""} alt='Company Logo' />
                    <AvatarFallback>CL</AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email Address</Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      placeholder='Enter your Email here'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='firstname'>First Name</Label>
                      <Input
                        id='firstname'
                        name='firstname'
                        type='text'
                        placeholder='Enter your first name'
                        value={formData.firstname}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='lastname'>Last Name</Label>
                      <Input
                        id='lastname'
                        name='lastname'
                        type='text'
                        placeholder='Enter your last name'
                        value={formData.lastname}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='companyName'>Company Name</Label>
                    <Input
                      id='companyName'
                      name='companyName'
                      type='text'
                      placeholder='COMPANY XYZ'
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='address'>Address</Label>
                    <Input
                      id='address'
                      name='address'
                      type='text'
                      placeholder='Enter your address'
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='contactNumber'>Contact Number</Label>
                    <Input
                      id='contactNumber'
                      name='contactNumber'
                      type='tel'
                      placeholder='Enter your number'
                      value={formData.contactNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='accountName'>Account Name</Label>
                    <Input
                      id='accountName'
                      name='accountName'
                      type='text'
                      placeholder='Enter your account name'
                      value={formData.bankAccountInfo.accountName}
                      onChange={handleBankChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='accountNumber'>Account Number</Label>
                    <Input
                      id='accountNumber'
                      name='accountNumber'
                      type='text'
                      placeholder='Enter your Account number'
                      value={formData.bankAccountInfo.accountNumber}
                      onChange={handleBankChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='bankName'>Bank Name</Label>
                    <Input
                      id='bankName'
                      name='bankName'
                      type='text'
                      placeholder='Enter your bank name'
                      value={formData.bankAccountInfo.bankName}
                      onChange={handleBankChange}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='bankAccountType'>Account Type</Label>
                    <Input
                      id='bankAccountType'
                      name='bankAccountType'
                      type='text'
                      placeholder='Enter your account type'
                      value={formData.bankAccountInfo.bankAccountType}
                      onChange={handleBankChange}
                    />
                  </div>
                </div>
              </div>

              <div className='flex justify-end space-x-4'>
                <Button variant='outline' asChild>
                  <Link to=''>Cancel</Link>
                </Button>
                <Button className='bg-[#533ae9] text-white' type='submit'>
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
