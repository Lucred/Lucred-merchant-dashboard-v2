import { SelectInput } from "./DashboardAddProduct";
import customer1 from "../../assets/customer1.png";
import rating from "../../assets/rating.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData, getMerchant } from "../../redux/actions";
import { useEffect } from "react";

const UserReport = () => {
  const orders = useSelector((state: any) => state.data);
  const merchant = useSelector((state: any) => state.merchant);
  const dispatch = useDispatch() as unknown as any;
  const id = localStorage.getItem("userId") as string;
  const merchantId = localStorage.getItem("merchantId");

  useEffect(() => {
    dispatch(getMerchant(id));
    dispatch(fetchOrderData({ merchantId } as any));
  }, [id, merchantId, dispatch]);

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
                  <tr className='text-[0.8rem] text-[#56555B] text-center w-[100%] '>
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
