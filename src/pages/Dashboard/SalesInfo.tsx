import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchOrderData, getMerchant, withdraw } from "../../redux/actions";
import { formatDate, getCurrentDate, numberWithCommas } from "../../utils";
import { Button } from "../../components/ui/button";
import { Loader2, Search } from "lucide-react";
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
import { WithdrawModal } from "../../components/withdraw-modal";
import { Input } from "../../components/ui/input";
import Pagination from "../../components/Pagination";
import { Skeleton } from "../../components/ui/skeleton";

const LoadingAnalyticCard = ({ title }: { title: string }) => (
  <Card className='w-full bg-white'>
    <CardHeader>
      <CardTitle className='text-[18px]'>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className='flex items-center justify-start'>
        <Loader2 className='h-8 w-8 animate-spin text-[#533AE9]' />
      </div>
    </CardContent>
  </Card>
);

const AnalyticCard = ({ title, amount }: { title: string; amount: string }) => (
  <Card className='w-full bg-white'>
    <CardHeader>
      <CardTitle className='text-[18px]'>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className='text-2xl font-bold text-[#533AE9]'>{amount}</p>
    </CardContent>
  </Card>
);

const SkeletonRow = () => (
  <TableRow>
    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
      <TableCell key={i}>
        <div className='h-4 bg-gray-200 rounded animate-pulse' />
      </TableCell>
    ))}
  </TableRow>
);

const TableLoadingSkeleton = () =>
  Array.from({ length: 5 }).map((_, index) => (
    <TableRow key={`loading-${index}`}>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-12 ' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-12 w-12 ' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-28 sm:w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-20 sm:w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-20 sm:w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-28 sm:w-[250px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-12 sm:w-[50px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-16 sm:w-[80px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-16 sm:w-[80px]' />
      </TableCell>
    </TableRow>
  ));

export function SalesInfo() {
  const location = useLocation();
  const orders = useSelector((state: any) => state.data);
  const merchant = useSelector((state: any) => state.merchant);
  const loading = useSelector((state: any) => state.loading);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const ordersPerPage = 10;

  const dispatch = useDispatch() as unknown as any;
  const id = localStorage.getItem("userId") as string;
  const merchantId = localStorage.getItem("merchantId");

  const toggleModal = () => setShowModal(!showModal);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return [...orders].reverse();

    const searchTerm = searchQuery.toLowerCase().trim();
    return orders.filter((order: any) => {
      return (
        order.productName?.toLowerCase().includes(searchTerm) ||
        order.users?.firstname?.toLowerCase().includes(searchTerm) ||
        order.users?.lastname?.toLowerCase().includes(searchTerm) ||
        order.users?.phone?.includes(searchTerm) ||
        `#${order.id}`?.includes(searchTerm) ||
        String(order.totalPrice).includes(searchTerm)
      );
    });
  }, [orders, searchQuery]);

  const currentOrders = useMemo(() => {
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    return filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  }, [filteredOrders, currentPage, ordersPerPage]);

  useEffect(() => {
    dispatch(getMerchant(id));
    dispatch(fetchOrderData({ merchantId } as any));
  }, [id, merchantId, dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div
      className={`bg-white ${
        window.innerWidth > 768 ? "ml-16" : "ml-14"
      } bg-[#1100770A] min-h-[100vh]`}
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
              {loading ? (
                <Loader2 className='h-4 w-4 animate-spin mr-2' />
              ) : null}
              Withdraw
            </Button>
          )}
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
          {loading ? (
            <>
              <LoadingAnalyticCard title='Sales' />
              <LoadingAnalyticCard title='Balance' />
            </>
          ) : (
            <>
              <AnalyticCard
                title='Sales'
                amount={`₦${numberWithCommas(merchant?.walletBalance) || 0}`}
              />
              <AnalyticCard
                title='Balance'
                amount={`₦${numberWithCommas(merchant?.availableBalance) || 0}`}
              />
            </>
          )}
          <Select defaultValue='today'>
            <SelectTrigger className='w-full bg-white'>
              <SelectValue
                placeholder={loading ? "Loading..." : "Select Date Range"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='today'>Today ({getCurrentDate()})</SelectItem>
              <SelectItem value='week'>This Week</SelectItem>
              <SelectItem value='month'>This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='relative w-full sm:w-72'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search by product, customer, or phone...'
            className='pl-8 bg-white'
            value={searchQuery}
            onChange={handleSearchChange}
            disabled={loading}
          />
        </div>

        <Card className='mt-8'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Product</TableHead>
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
              {loading ? (
                // [...Array(5)].map((_, index) => <SkeletonRow key={index} />)
                <TableLoadingSkeleton />
              ) : currentOrders && currentOrders.length > 0 ? (
                currentOrders.map((order: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      #{(currentPage - 1) * ordersPerPage + index + 1}
                    </TableCell>
                    <TableCell>
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className='h-8 w-8 mr-2 object-cover rounded'
                      />
                    </TableCell>
                    <TableCell className=''>{order.productName}</TableCell>
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
                    {searchQuery
                      ? "No matching orders found."
                      : "No orders found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        {!loading && (
          <div className='mt-4 flex justify-center'>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredOrders.length / ordersPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {showModal && (
          <WithdrawModal isOpen={showModal} onClose={toggleModal} />
        )}
      </div>
    </div>
  );
}

export default SalesInfo;
