import { Link, useLocation } from "react-router-dom";
import { SelectInput } from "./DashboardAddProduct";
import { AnalyticCard } from "./DashboardHome";
import phone from "../../assets/phone.png";
import xmark from "../../assets/xmark.png";
import { useEffect, useMemo, useState } from "react";
import { fetchOrderData, getMerchant, withdraw } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination";

const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "long", // e.g., 'October'
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Use 12-hour format
  });
};

const SalesInfo = () => {
  const location = useLocation();
  const orders = useSelector((state: any) => state.data);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const currentOrders = useMemo(() => {
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    return orders.slice(indexOfFirstOrder, indexOfLastOrder);
  }, [orders, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
      className={`${
        window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`
      } mr-[5%] bg-[#1100770A] min-h-[100vh] `}
    >
      <div className='mx-[3%]'>
        <div className='flex items-center justify-between'>
          <div className='py-[1%]'>
            <p className='text-[0.7rem]'>Dashboard/Sales</p>
            <h3 className='text-[1.3rem] font-[500]'>Sales Info</h3>
          </div>
          {location.pathname === "/dashboard/sales-info" ? (
            <Link
              to=''
              className='bg-[#533AE9] lg:w-[15%] w-[50%] h-[5vh] text-[#fff] mr-[5%] rounded-md flex justify-center items-center'
              onClick={toggleModal}
            >
              Withdraw
            </Link>
          ) : null}
        </div>
        <div className='flex lg:flex-row flex-col justify-between my-[3%] lg:my-[0%]'>
          <div className=' w-[100%] overflow-scroll scrollbar-none'>
            <div className='lg:w-[65%] md:w-[100%] w-[150%] flex justify-between '>
              <AnalyticCard
                width={`w-[45%]`}
                total={`Sales`}
                amount={`₦` + merchant?.walletBalance || 0}
              />
              <AnalyticCard
                width={`w-[45%]`}
                total={`Balance`}
                amount={`₦` + merchant?.availableBalance || 0}
              />
            </div>
          </div>

          <SelectInput
            width={`lg:w-[30%] md:w-[50%]`}
            value={`Today (March 18, 2022)`}
          />
        </div>
        <div className='w-[100%] overflow-scroll scrollbar-none'>
          <table className=' lg:w-[100%] border rounded-md my-[2%] w-[250%]'>
            <thead>
              <tr className='bg-[#1100770A] text-[0.8rem]  text-[#56555B] w-[100%] px-[5%] bg-[#fff]'>
                <th className='font-[500] py-[1%]'>ID</th>
                <th className='font-[500]'>Product name</th>
                <th className='font-[500]'>Quantity</th>
                <th className='font-[500]'>Total Price</th>
                <th className='font-[500]'>Customer's name</th>
                <th className='font-[500]'>Phone Number</th>
                <th className='font-[500] '>Date</th>
              </tr>
            </thead>
            <tbody className=''>
              {currentOrders && currentOrders.length > 0 ? (
                orders.map((order: any, index: number) => (
                  <tr
                    key={order.id}
                    className='bg-[#1100770A] text-[0.8rem] text-[#56555B] text-center w-[100%]'
                  >
                    <td className='font-[400] py-[1%]'>#{index + 1}</td>
                    <td className='font-[400] flex justify-left items-center h-[8vh] ml-[10%] md:ml-[20%]'>
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className='h-[3vh] mr-[5%] truncate '
                      />{" "}
                      {order.productName}
                    </td>
                    <td className='font-[400]'>₦{order.initialPrice}</td>
                    <td className='font-[400]'>₦{order.totalPrice}</td>
                    <td className='font-[400]'>{order.users.firstname}</td>
                    <td className='font-[400]'>{order.users.phone}</td>
                    <td className='font-[400]'>
                      {formatDate(order.createdAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className=' h-[50vh] w-full'>
                  <td colSpan={7} className='font-[400] text-[1.5rem]'></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(orders.length / ordersPerPage)}
          onPageChange={handlePageChange}
        />
      </div>

      {showModal ? <WithdrawModal func={toggleModal} /> : null}
    </div>
  );
};

export default SalesInfo;

export const WithdrawModal = ({ func }: any) => {
  const [formData, setFormData] = useState<any>({
    _ID: localStorage.getItem("userId"),
    amount: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dispatch = useDispatch() as unknown as any;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(withdraw(formData));
  };

  console.log(formData);
  return (
    <div className=' fixed h-[100vh] w-[100%] bg-[#17151599] top-[0] left-[0] flex items-center justify-center'>
      <div className='bg-[#fff] lg:w-[40%] w-[80%] rounded-md '>
        <div className='bg-[#1100770A] px-[3%] py-[2%] flex justify-between items-center'>
          <h3>Withdrawal Request</h3>
          <img
            src={xmark}
            alt=''
            className='cursor-pointer h-[2vh]'
            onClick={func}
          />
        </div>
        <div className='flex items-center justify-between my-[3%] px-[3%]'>
          <label className='text-[0.9rem]'>Amount Requested</label>
          <input
            type='number'
            placeholder='450000'
            name='amount'
            className='border w-[50%] px-[3%] rounded-md py-[1%]'
            onChange={handleChange}
          />
        </div>
        <div className='flex items-center justify-between my-[3%] px-[3%]'>
          <label className='text-[0.9rem]'>Withdraw To</label>
          <SelectInput value={`Select bank account`} width={`w-[50%]`} />
        </div>

        <div className='flex justify-end my-[8%] '>
          <Link
            to=''
            className='bg-[#FAFAFA] w-[20%] h-[5vh] text-[#533AE9] font-[600] mr-[5%] rounded-md flex justify-center items-center'
          >
            Cancel
          </Link>
          <Link
            to=''
            className='bg-[#533AE9] w-[20%] h-[5vh] text-[#fff] mr-[5%] font-[600] rounded-md flex justify-center items-center'
            onClick={handleSubmit}
          >
            Confirm
          </Link>
        </div>
      </div>
    </div>
  );
};
