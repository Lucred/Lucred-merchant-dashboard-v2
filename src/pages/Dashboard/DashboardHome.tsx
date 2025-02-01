import React from "react";
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
  BadgeDollarSign,
  GitCompareArrowsIcon,
  MenuIcon,
  Users,
} from "lucide-react";
import TransactionTable from "../../components/transaction-table";
import TopProduct from "../../components/top-product";
import AnalyticCard from "../../components/analytic-card";

const TableSkeleton = () => (
  <div className='space-y-3'>
    <div className='h-10 bg-gray-200 rounded w-full animate-pulse'></div>
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className='h-16 bg-gray-200 rounded w-full animate-pulse'
      ></div>
    ))}
  </div>
);

export default function DashboardHome() {
  const merchant = useSelector((state: any) => state.merchant);
  const dispatch = useDispatch() as unknown as any;
  const id = localStorage.getItem("userId") as string;
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    dispatch(getMerchant(id)).finally(() => {
      setTimeout(() => setIsLoading(false), 1000);
    });
  }, [dispatch, id]);

  return (
    <div className='p-2 sm:p-4 md:p-6 ml-16 sm:ml-12 bg-[#1100770A] min-h-screen'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4'>
        <AnalyticCard
          title='Total Revenue'
          amount={`₦${numberWithCommas(merchant?.walletBalance)}`}
          percentage={13}
          icon={<BadgeDollarSign className='h-4 w-4 text-muted-foreground' />}
          isLoading={isLoading}
        />
        <AnalyticCard
          title='Total Customers'
          amount={numberWithCommas(merchant?.customers?.length) || "0"}
          percentage={13}
          icon={<Users className='h-4 w-4 text-muted-foreground' />}
          isLoading={isLoading}
        />
        <AnalyticCard
          title='Total Transactions'
          amount={numberWithCommas(merchant?.totalOrders)}
          percentage={13}
          icon={
            <GitCompareArrowsIcon className='h-4 w-4 text-muted-foreground' />
          }
          isLoading={isLoading}
        />
        <AnalyticCard
          title='Total Products'
          amount={numberWithCommas(merchant?.products?.length) || "0"}
          percentage={13}
          icon={<MenuIcon className='h-4 w-4 text-muted-foreground' />}
          isLoading={isLoading}
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-7 gap-2 sm:gap-4 mt-4'>
        <Card className='lg:col-span-4'>
          <CardHeader>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
              <CardTitle className='text-base sm:text-lg'>
                Latest Products
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className='overflow-x-auto'>
            {isLoading ? <TableSkeleton /> : <TransactionTable />}
          </CardContent>
        </Card>

        <Card className='lg:col-span-3'>
          <CardHeader>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
              <CardTitle className='text-base sm:text-lg'>
                Top Products
              </CardTitle>
              <Link to='/dashboard/product'>
                <Button
                  variant='ghost'
                  className='w-full sm:w-auto bg-[#533ae9] text-white'
                >
                  See More
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className='overflow-x-auto'>
            {isLoading ? <TableSkeleton /> : <TopProduct />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
