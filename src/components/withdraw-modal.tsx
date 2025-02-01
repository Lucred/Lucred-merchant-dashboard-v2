import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withdraw } from "../redux/actions";
import { toast } from "react-toastify";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserState {
  merchant: {
    availableBalance: number;
  };
}

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch() as unknown as any;

  // Get the available balance from Redux store

  const availableBalance = useSelector(
    (state: UserState) => state.merchant?.availableBalance ?? 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const withdrawalAmount = parseFloat(amount);

    // Validate amount
    if (!withdrawalAmount || withdrawalAmount <= 0) {
      toast.error("Please enter a valid amount");
      setIsLoading(false);
      return;
    }

    // Check if amount exceeds available balance
    if (withdrawalAmount > availableBalance) {
      toast.error("Insufficient balance");
      setIsLoading(false);
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      await dispatch(
        withdraw({ _ID: userId, amount: withdrawalAmount })
      ).unwrap();

      toast.success("Withdrawal initiated successfully");
      setAmount("");
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Failed to process withdrawal");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white w-[90%] lg:w-full'>
        <DialogHeader>
          <DialogTitle>Withdrawal Request</DialogTitle>
          <DialogDescription>
            Enter the amount you wish to withdraw. Available balance: ₦
            {availableBalance.toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='amount' className='text-right'>
                Amount
              </Label>
              <Input
                id='amount'
                type='number'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Enter amount'
                className='col-span-3'
                min='1'
              />
            </div>
          </div>
          <DialogFooter className='gap-2 lg:gap-0'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className='bg-[#533AE9] text-white'
              type='submit'
              disabled={isLoading || !amount}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
