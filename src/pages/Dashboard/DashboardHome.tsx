import search from "../../assets/search.png";
import bellRing from "../../assets/bell-ring.png";
import avatar from "../../assets/avatar.png";
import { Link, useLocation } from "react-router-dom";
import revenue from "../../assets/revenue.png";
import product from "../../assets/product.png";
import transaction from "../../assets/transaction.png";
import customer from "../../assets/customer.png";
import ladyBag from "../../assets/ladybag.png";
import seemore from "../../assets/seemore.png";
import Help from "./Help";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMerchant } from "../../redux/actions";

const DashboardHome = () => {
  const [showHelp, setShowHelp] = useState(false);

  const merchant = useSelector((state: any) => state.merchant);

  const dispatch = useDispatch() as unknown as any;
  const id = localStorage.getItem("userId") as unknown as string;

  console.log(merchant);

  useEffect(() => {
    dispatch(getMerchant(id));
  }, []);

  return (
    <div
      className={`${
        window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`
      }  bg-[#1100770A] lg:h-[100vh]  `}
    >
      <div className='mx-[3%] pt-4'>
        <div className='w-[100%] overflow-x-scroll md:overflow-hidden scrollbar-none'>
          <div className='flex justify-between items-center py-[1%] w-[250%] lg:w-[100%] '>
            <ul className='flex w-[40%] justify-between'>
              <li>
                <Link to='' className='text-[#8C858D] text-[0.8rem]'>
                  Last 24 hours
                </Link>
              </li>
              <li>
                <Link to='' className='text-[#8C858D] text-[0.8rem]'>
                  Last weeks
                </Link>
              </li>
              <li>
                <Link to='' className='text-[#8C858D] text-[0.8rem]'>
                  Last month
                </Link>
              </li>
              <li>
                <Link to='' className='text-[#8C858D] text-[0.8rem]'>
                  Last year
                </Link>
              </li>
            </ul>
            <div className='w-[20%]  flex items-center justify-center h-[5vh] '>
              <select
                placeholder='Search'
                className='border-none h-[5vh] pl-[5%] bg-[#F5F5FA] text-[#707070] outline-none text-[0.8rem]'
              >
                <option>Today (March 18, 2022)</option>
              </select>
            </div>
          </div>
        </div>

        <div className=' w-[100%] overflow-x-scroll  scrollbar-none mt-5'>
          <div className='flex justify-between w-[250%] lg:w-[100%] my-[5%] lg:my-[0%] '>
            <AnalyticCard
              width={`w-[23%]`}
              icon={revenue}
              total={`Total Revenue`}
              amount={`₦` + merchant?.currentRevenue}
            />
            <AnalyticCard
              width={`w-[23%]`}
              icon={customer}
              total={`Total Customers`}
              amount={merchant?.customers?.length || 0}
            />
            <AnalyticCard
              width={`w-[23%]`}
              icon={transaction}
              total={`Total Transactions`}
              amount={merchant?.totalOrders}
            />
            <AnalyticCard
              width={`w-[23%]`}
              icon={product}
              total={`Total Products`}
              amount={merchant?.products?.length || 0}
            />
          </div>
        </div>

        <div className=' flex flex-col lg:flex-row lg:items-start items-center justify-between mt-5'>
          <div className=' lg:my-[0%] w-[100%]'>
            <TransactionTable />
          </div>
          <div className=' lg:my-[0%] w-[100%] '>
            <TopProduct />
          </div>
          <div className=' w-[50%] flex justify-center   relative'>
            <img src={seemore} alt='' className='' />
            <button className='text-[#533AE9] font-[600]  absolute bg-[#fff] top-[50%]'>
              See More
            </button>
          </div>
        </div>
      </div>
      {/* {true? <Help />: null }  */}
    </div>
  );
};

export default DashboardHome;

export const DashNav = () => {
  const location = useLocation();
  const logo = localStorage.getItem("logo");
  return (
    <div className='flex justify-between items-center bg-[#533AE90D] px-[3%] h-[8vh]'>
      <div className='w-[50%] bg-[#FFFFFF] flex items-center justify-start h-[5vh] '>
        <img src={search} alt='' className='h-[2vh] ml-[15px]' />
        <input
          type='text'
          placeholder='Search'
          className='border-none h-[5vh] pl-[2%] text-[#707070] outline-none'
        />
      </div>
      <div className='flex items-center justify-end w-[40%]'>
        {location.pathname === "/dashboard" ? (
          <Link
            to='/dashboard/product'
            className='bg-[#533AE9] lg:w-[40%] w-[50%] h-[5vh] text-[#fff] mr-[5%] rounded-md flex justify-center items-center text-[0.6rem] lg:text-[0.8rem]'
          >
            Add Product
          </Link>
        ) : null}
        <img src={bellRing} alt='' className='h-[2vh] mr-[5%]' />
        <img
          src={logo || avatar}
          alt=''
          className='h-[2.5vh] w-[2.5vh] mr-[5%] rounded-[50%]'
        />
      </div>
    </div>
  );
};

export const AnalyticCard = ({ width, icon, total, amount }: any) => {
  const location = useLocation();
  return (
    <div className={`bg-[#fff] ${width} rounded-md px-[2%] py-[1%]`}>
      <div className='flex  items-center'>
        <img src={icon} alt='' className='h-[2vh]' />
        <p className='ml-[3%] text-[0.8rem] text-[#171515]'>{total}(₦)</p>
      </div>
      <div className='flex justify-between items-center pt-[3%]'>
        <h3 className='text-[1.4rem] font-[700]'>{amount}</h3>
        {location.pathname !== "/dashboard/sales-info" ? (
          <div className='text-right'>
            <p className='text-[#32C38F] text-[0.7rem]'>13%</p>
            <p className='text-[#9C9AA4] text-[0.7rem]'>Last 7 days</p>
          </div>
        ) : (
          <div className='flex justify-center items-center border rounded-md bg-[#533AE9] text-[#fff] text-[0.6rem] w-[50px] h-[30px]'>
            +31%
          </div>
        )}
      </div>
      {location.pathname !== "/dashboard/sales-info" ? null : (
        <p className='text-[0.8rem]'>20% more than last month</p>
      )}
    </div>
  );
};

const TransactionTable = () => {
  return (
    <div className='bg-[#fff] w-[100%]  py-[3%] px-[4%] my-[2%] rounded-md'>
      <div className='pb-[2%]'>
        <h3 className='text-[#000000] font-[500] text-[1.2rem] mb-[4px]'>
          Top Transaction
        </h3>
        <p className='text-[#9C9AA4] text-[0.8rem] mb-[10px]'>
          Of the week based on total purchase
        </p>
      </div>
      <div className=''>
        <table className=' w-[100%] border rounded-md'>
          <thead>
            <tr className='bg-[#1100770A] text-[0.8rem]  text-[#56555B] w-[100%] px-[5%]'>
              <th className='font-[400] py-[2.7%]'>Customer ID</th>
              <th className='font-[400] py-[2.7%]'>First Item</th>
              <th className='font-[400] py-[2.7%]'>Date</th>
              <th className='font-[400] py-[2.7%]'>Purchase</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-[0.7rem] text-center '>
              <td className='py-[3%]'>#76418</td>
              <td>Apple Macbook Pro</td>
              <td>4 Jan</td>
              <td className='text-[#32C38F]'>$ 250</td>
            </tr>
            <tr className='bg-[#1100770A] text-[0.7rem] text-center '>
              <td className='py-[3%]'>#76418</td>
              <td>Apple Macbook Pro</td>
              <td>4 Jan</td>
              <td className='text-[#32C38F]'>$ 250</td>
            </tr>
            <tr className='text-[0.7rem] text-center '>
              <td className='py-[3%]'>#76418</td>
              <td>Apple Macbook Pro</td>
              <td>4 Jan</td>
              <td className='text-[#32C38F]'>$ 250</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TopProduct = () => {
  return (
    <div className='bg-[#fff] w-[100%] md:w-[50%] lg:w-[80%] rounded-md py-[4%] px-[4%] mx-[auto]'>
      <div className='pb-[2%]'>
        <h3 className='text-[#000000] font-[500] text-[1.2rem] mb-[4px]'>
          Top Product
        </h3>
        <p className='text-[#9C9AA4] text-[0.8rem] mb-[10px]'>
          Top 3 of the week based on total sold
        </p>
      </div>
      <div className='flex justify-between items-center'>
        <div className='border rounded-md h-[167px] w-[80px] '>
          <img src={ladyBag} alt='' className='h-[100%] w-[100%]' />
        </div>
        <div className='border rounded-md h-[167px] w-[80px] '>
          <img src={ladyBag} alt='' className='h-[100%] w-[100%]' />
        </div>
        <div className='border rounded-md h-[167px] w-[80px] '>
          <img src={ladyBag} alt='' className='h-[100%] w-[100%]' />
        </div>
      </div>
    </div>
  );
};
