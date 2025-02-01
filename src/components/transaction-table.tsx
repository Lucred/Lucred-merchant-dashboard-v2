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
import { Order, RootState } from "@/interface";

export default function TransactionTable() {
  const orders = useSelector((state: RootState) => state.data);
  const merchant = useSelector((state: RootState) => state.merchant);
  const dispatch = useDispatch<any>();

  const id = localStorage.getItem("userId") as string;
  const merchantId = localStorage.getItem("merchantId");

  useEffect(() => {
    dispatch(getMerchant(id));
    dispatch(fetchOrderData({ merchantId } as any));
  }, [id, merchantId, dispatch]);

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

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
        {sortedOrders.slice(0, 3).map((order: Order, index: number) => (
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
