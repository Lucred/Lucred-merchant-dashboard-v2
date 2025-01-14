import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchOrderData, getMerchant, withdraw } from "../../redux/actions";
import { formatDate, getCurrentDate, numberWithCommas } from "../../utils";
import xmark from "../../assets/xmark.png";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import { WithdrawModal } from "../../components/withdraw-modal";

const AnalyticCard = ({ title, amount }: { title: string; amount: string }) => (
  <Card className='w-full bg-white'>
    <CardHeader>
      <CardTitle className='text-[18px]'>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className='text-2xl font-bold text-blue-800'>{amount}</p>
    </CardContent>
  </Card>
);

export function SalesInfo() {
  const location = useLocation();
  const orders = useSelector((state: any) => state.data);
  const merchant = useSelector((state: any) => state.merchant);

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const ordersPerPage = 10;

  const dispatch = useDispatch() as unknown as any;
  const id = localStorage.getItem("userId") as string;
  const merchantId = localStorage.getItem("merchantId");

  const toggleModal = () => setShowModal(!showModal);

  const currentOrders = useMemo(() => {
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    return orders.slice(indexOfFirstOrder, indexOfLastOrder);
  }, [orders, currentPage]);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  useEffect(() => {
    dispatch(getMerchant(id));
    dispatch(fetchOrderData({ merchantId } as any));
  }, [id, merchantId, dispatch]);

  return (
    <div
      className={` bg-white ${
        window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`
      } mr-[5%] bg-[#1100770A] min-h-[100vh] `}
    >
      <div className='container mx-auto p-4 bg-background min-h-screen'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <p className='text-sm text-muted-foreground'>Dashboard/Sales</p>
            <h3 className='text-2xl font-medium'>Sales Info</h3>
          </div>
          {location.pathname === "/dashboard/sales-info" && (
            <Button
              className='bg-[#533AE9] lg:w-[15%] w-[50%] h-[5vh] text-[#fff] mr-[5%] rounded-md flex justify-center items-center'
              onClick={toggleModal}
            >
              Withdraw
            </Button>
          )}
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
          <AnalyticCard
            title='Sales'
            amount={`₦${numberWithCommas(merchant?.walletBalance) || 0}`}
          />
          <AnalyticCard
            title='Balance'
            amount={`₦${numberWithCommas(merchant?.availableBalance) || 0}`}
          />
          <Select defaultValue='today'>
            <SelectTrigger className='w-full bg-white'>
              <SelectValue placeholder='Select Date Range' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='today'>Today ({getCurrentDate()})</SelectItem>
              <SelectItem value='week'>This Week</SelectItem>
              <SelectItem value='month'>This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Product name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Customer's firstname</TableHead>
                <TableHead>Customer's lastname</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders && currentOrders.length > 0 ? (
                currentOrders.map((order: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>#{index + 1}</TableCell>
                    <TableCell className='flex items-center'>
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className='h-8 w-8 mr-2 object-cover rounded'
                      />
                      {order.productName}
                    </TableCell>
                    <TableCell>{order?.quantity}</TableCell>
                    <TableCell>₦{numberWithCommas(order.totalPrice)}</TableCell>
                    <TableCell>{order.users.firstname}</TableCell>
                    <TableCell>{order.users.lastname}</TableCell>
                    <TableCell>{order.users.phone}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className='h-24 text-center'>
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        <Pagination className='mt-4'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href='#'
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        {showModal && (
          <WithdrawModal isOpen={showModal} onClose={toggleModal} />
        )}
      </div>
    </div>
  );
}

export default SalesInfo;

// export const WithdrawModal = ({ toggleModal }: any) => {
//   const [formData, setFormData] = useState<any>({
//     _ID: localStorage.getItem("userId"),
//     amount: "",
//   });

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const dispatch = useDispatch() as unknown as any;

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     dispatch(withdraw(formData));
//   };

//   console.log(formData);
//   return (
//     <div className=' fixed h-[100vh] w-[100%] bg-[#17151599] top-[0] left-[0] flex items-center justify-center'>
//       <div className='bg-[#fff] lg:w-[40%] w-[80%] rounded-md '>
//         <div className='bg-[#1100770A] px-[3%] py-[2%] flex justify-between items-center'>
//           <h3>Withdrawal Request</h3>
//           <img
//             src={xmark}
//             alt=''
//             className='cursor-pointer h-[2vh]'
//             onClick={toggleModal}
//           />
//         </div>
//         <div className='flex items-center justify-between my-[3%] px-[3%]'>
//           <label className='text-[0.9rem]'>Amount Requested</label>
//           <input
//             type='number'
//             placeholder='450000'
//             name='amount'
//             className='border w-[50%] px-[3%] rounded-md py-[1%]'
//             onChange={handleChange}
//           />
//         </div>

//         <div className='flex justify-end my-[8%] '>
//           <Link
//             to=''
//             className='bg-[#FAFAFA] w-[20%] h-[5vh] text-[#533AE9] font-[600] mr-[5%] rounded-md flex justify-center items-center'
//           >
//             Cancel
//           </Link>
//           <Link
//             to=''
//             className='bg-[#533AE9] w-[20%] h-[5vh] text-[#fff] mr-[5%] font-[600] rounded-md flex justify-center items-center'
//             onClick={handleSubmit}
//           >
//             Confirm
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
