import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { fetchOrderData, getMerchant } from "../redux/actions";
import { useEffect } from "react";
import { formatDate, numberWithCommas } from "../utils";

export default function TransactionTable() {
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
    <Table>
      <TableHeader className='bg-white'>
        <TableRow>
          <TableHead>Customer ID</TableHead>
          <TableHead>First Item</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Purchase</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='bg-white'>
        {orders.slice(0, 3).map((order: any, index: number) => (
          <TableRow key={order.id}>
            <TableCell>#{index + 1}</TableCell>
            <TableCell>{order.productName}</TableCell>
            <TableCell>{formatDate(order.createdAt)}</TableCell>
            <TableCell className='text-emerald-500 font-medium'>
              ₦{numberWithCommas(order.totalPrice)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
