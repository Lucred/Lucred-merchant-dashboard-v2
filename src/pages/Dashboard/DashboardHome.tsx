import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMerchant } from "../../redux/actions";
import { numberWithCommas } from "../../utils";

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

import AnalyticCard from "../../components/analytic-card";
import TransactionTable from "../../components/transaction-table";
import TopProduct from "../../components/top-product";
import {
  BadgeDollarSign,
  GitCompareArrowsIcon,
  MenuIcon,
  Users,
} from "lucide-react";

export default function DashboardHome() {
  const merchant = useSelector((state: any) => state.merchant);

  const dispatch = useDispatch() as unknown as any;
  const id = localStorage.getItem("userId") as string;

  useEffect(() => {
    dispatch(getMerchant(id));
  }, [dispatch, id]);

  return (
    <div
      className={` bg-white ${
        window.innerWidth > 768 ? `ml-[15%]` : `ml-[8%]`
      } mr-[5%] bg-[#1100770A] min-h-[100vh]`}
    >
      <div className='bg-background min-h-screen p-6'>
        <div className='space-y-6'>
          <div className='flex justify-between items-center'>
            <div className='flex space-x-4'>
              <Button className='bg-white ' variant='ghost'>
                Last 24 hours
              </Button>
              <Button className='bg-white ' variant='ghost'>
                Last weeks
              </Button>
              <Button className='bg-white ' variant='ghost'>
                Last month
              </Button>
              <Button className='bg-white ' variant='ghost'>
                Last year
              </Button>
            </div>
            <Select defaultValue='today'>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Select date range' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='today'>Today (March 18, 2022)</SelectItem>
                <SelectItem value='week'>This Week</SelectItem>
                <SelectItem value='month'>This Month</SelectItem>
                <SelectItem value='year'>This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <AnalyticCard
              icon={<BadgeDollarSign color='blue' />}
              title='Total Revenue'
              amount={`₦${numberWithCommas(merchant?.walletBalance)}`}
              percentage={13}
            />
            <AnalyticCard
              icon={<Users color='blue' />}
              title='Total Customers'
              amount={numberWithCommas(merchant?.customers?.length) || "0"}
              percentage={13}
            />
            <AnalyticCard
              icon={<GitCompareArrowsIcon color='blue' />}
              title='Total Transactions'
              amount={numberWithCommas(merchant?.totalOrders)}
              percentage={13}
            />
            <AnalyticCard
              icon={<MenuIcon color='blue' />}
              title='Total Products'
              amount={numberWithCommas(merchant?.products?.length) || "0"}
              percentage={13}
            />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <Card className='col-span-2'>
              <CardHeader>
                <CardTitle>Top Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionTable />
              </CardContent>
            </Card>
            <div className='space-y-6'>
              <Card>
                <CardHeader>
                  <CardTitle>Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <TopProduct />
                </CardContent>
              </Card>
              <Link to='/dashboard/product'>
                <Button className='w-full bg-blue-600 text-white'>
                  See More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
