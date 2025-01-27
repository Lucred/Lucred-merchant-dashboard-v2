import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowUpIcon, ArrowDownIcon, Loader2 } from "lucide-react";

interface AnalyticCardProps {
  icon: any;
  title: string;
  amount: string;
  percentage: number;
  isLoading: boolean;
}

export default function AnalyticCard({
  icon,
  title,
  amount,
  percentage,
  isLoading,
}: AnalyticCardProps) {
  return (
    <Card className='rounded-xl'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 bg-white rounded-xl'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {/* Replace with actual icon component based on the 'icon' prop */}
        {/* <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          className='h-4 w-4 text-muted-foreground'
        >
          <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
        </svg> */}
        <div className='text-[#533ae9]'>{icon}</div>
      </CardHeader>
      <CardContent className='bg-white rounded-xl'>
        {isLoading ? (
          <div className='flex items-center space-x-2 text-[#533ae9]'>
            <Loader2 className='h-4 w-4 animate-spin ' />
            <span className='text-sm '>Loading...</span>
          </div>
        ) : (
          <>
            <div className='text-2xl font-bold text-[#533AE9]'>{amount}</div>
            <p className='text-xs text-muted-foreground'>
              +{percentage}% from last month
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
