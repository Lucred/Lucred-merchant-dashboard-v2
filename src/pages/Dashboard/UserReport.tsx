import { SelectInput } from "./DashboardAddProduct";
import customer1 from "../../assets/customer1.png";
import rating from "../../assets/rating.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData, getMerchant } from "../../redux/actions";
import { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";

const UserReportSkeleton = () => {
  return (
    <div className='bg-white ml-12 bg-[#1100770A] min-h-screen'>
      <div className='mx-[3%]'>
        {/* Header Section */}
        <div className='flex lg:flex-row flex-col items-start justify-between ml-6 md:ml-0'>
          <div className='py-[1%]'>
            <div className='h-4 w-32 bg-gray-200 rounded animate-pulse mb-2' />
            <div className='h-6 w-48 bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='lg:w-[30%] w-[70%] h-10 bg-gray-200 rounded animate-pulse' />
        </div>

        {/* Table Section */}
        <Card className='mt-4'>
          <div className='p-4'>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-gray-50'>
                    {[
                      "Name",
                      "ID",
                      "Email",
                      "Phone No",
                      "Address",
                      "No of Item bought",
                    ].map((header) => (
                      <th key={header} className='h-12 px-4'>
                        <div className='h-4 bg-gray-200 rounded animate-pulse' />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className='px-4 py-3'>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse' />
                          <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
                        </div>
                      </td>
                      {Array.from({ length: 5 }).map((_, cellIndex) => (
                        <td key={cellIndex} className='px-4 py-3'>
                          <div className='h-4 w-full bg-gray-200 rounded animate-pulse' />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Customer Review Section */}
        <div className='py-[2%]'>
          <Card className='lg:w-[40%]'>
            <div className='p-4'>
              <div className='h-6 w-40 bg-gray-200 rounded animate-pulse mb-4' />

              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between my-4'
                >
                  <div className='flex items-center gap-3 flex-1'>
                    <div className='w-10 h-10 rounded-full bg-gray-200 animate-pulse' />
                    <div className='h-4 w-48 bg-gray-200 rounded animate-pulse' />
                  </div>
                  <div className='flex gap-1'>
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <div
                        key={starIndex}
                        className='w-4 h-4 bg-gray-200 rounded animate-pulse'
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const UserReport = () => {
  const orders = useSelector((state: any) => state.data);
  const merchant = useSelector((state: any) => state.merchant);
  const dispatch = useDispatch() as unknown as any;
  const id = localStorage.getItem("userId") as string;
  const merchantId = localStorage.getItem("merchantId");
  const [isLoading, setIsLoading] = useState(true);

  // ... other state and hooks

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getMerchant(id)),
          dispatch(fetchOrderData({ merchantId } as any)),
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, merchantId, dispatch]);

  if (isLoading) {
    return <UserReportSkeleton />;
  }

  return (
    <div
      className={` bg-white ${
        window.innerWidth > 768 ? `ml-12` : `ml-12`
      } bg-[#1100770A] min-h-[100vh]`}
    >
      <div className='mx-[3%]'>
        <div className='flex lg:flex-row flex-col items-start justify-between ml-6 md:ml-0'>
          <div className='py-[1%]'>
            <p className='text-[0.7rem]'>Dashboard/UserReport</p>
            <h3 className='text-[1.3rem] font-[500]'>Customer Report</h3>
          </div>
          <SelectInput
            width={`lg:w-[30%] w-[70%]`}
            value={`Today (March 18, 2022)`}
          />
        </div>
        <div className='bg-[#fff] px-[1%] py-[1%]'>
          <div className='w-[100%] overflow-scroll'>
            <table className=' lg:w-[100%] rounded-md w-[250%] '>
              <thead>
                <tr className='bg-[#1100770A] text-[0.8rem] w-[100%] px-[5%] '>
                  <th className='font-[500] py-[1%]'>Name</th>
                  <th className='font-[500]'>ID</th>
                  <th className='font-[500]'>Email</th>
                  <th className='font-[500]'>Phone No</th>
                  <th className='font-[500]'>Address</th>
                  <th className='font-[500]'>No of Item bought</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any, index: number) => (
                  <tr
                    key={index}
                    className='text-[0.8rem] text-[#56555B] text-center w-[100%] '
                  >
                    <td className='font-[400] flex gap-3 justify-left items-center h-[7vh] ml-10'>
                      <img src={customer1} alt='' className='h-[3vh] ' />{" "}
                      {order.users.firstname} {order.users.lastname}
                    </td>
                    <td className='font-[400] '>#{index + 1}</td>
                    <td className='font-[400]'>{order.users.email}</td>
                    <td className='font-[400]'>{order.users.phone}</td>
                    <td className='font-[400]'>Ikeja</td>
                    <td className='font-[400]'>{order.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='py-[2%]'>{/* <CustomerReview /> */}</div>
      </div>
    </div>
  );
};

export default UserReport;

export const CustomerReview = () => {
  return (
    <div className='bg-[#fff] rounded-md lg:w-[40%] my-[2%] px-[3%] py-[2%]'>
      <h3 className='mb-[15px]'>Customer Review</h3>
      <div className='flex items-center justify-between my-[2%] '>
        <div className='flex w-[80%] items-center'>
          <img src={customer1} alt='' className='' />
          <p className='text-[0.8rem] ml-[3%]'>
            Good Product , just what i wanted.
          </p>
        </div>

        <div className='flex'>
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
        </div>
      </div>
      <div className='flex items-center justify-between my-[2%] '>
        <div className='flex w-[80%] items-center'>
          <img src={customer1} alt='' className='' />
          <p className='text-[0.8rem] ml-[3%]'>
            Good Product , just what i wanted.
          </p>
        </div>

        <div className='flex'>
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
        </div>
      </div>
      <div className='flex items-center justify-between my-[2%] '>
        <div className='flex w-[80%] items-center'>
          <img src={customer1} alt='' className='' />
          <p className='text-[0.8rem] ml-[3%]'>
            Good Product , just what i wanted.
          </p>
        </div>

        <div className='flex'>
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
        </div>
      </div>
      <div className='flex items-center justify-between my-[2%] '>
        <div className='flex w-[80%] items-center'>
          <img src={customer1} alt='' className='' />
          <p className='text-[0.8rem] ml-[3%]'>
            Good Product , just what i wanted.
          </p>
        </div>

        <div className='flex'>
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
        </div>
      </div>
      <div className='flex items-center justify-between my-[2%] '>
        <div className='flex w-[80%] items-center'>
          <img src={customer1} alt='' className='' />
          <p className='text-[0.8rem] ml-[3%]'>
            Good Product , just what i wanted.
          </p>
        </div>

        <div className='flex'>
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
          <img src={rating} alt='' className='w-[15px] mx-[2px]' />
        </div>
      </div>
    </div>
  );
};
