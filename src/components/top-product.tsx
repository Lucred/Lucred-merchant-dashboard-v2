import { getProducts } from "../redux/actions";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TopProduct() {
  const dispatch = useDispatch() as unknown as any;
  const id = localStorage.getItem("merchantId") as string;
  const [isLoading, setIsLoading] = useState(true);

  const products = useSelector((state: any) => state.product);

  const productArray = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      await dispatch(getProducts({ id }));
      setIsLoading(false);
    };
    fetchProducts();
  }, [dispatch, id]);
  return (
    <div className='space-y-4'>
      <p className='text-sm text-muted-foreground'>
        Top 3 of the week based on total sold
      </p>
      <div className='flex justify-between items-center'>
        {productArray.slice(0, 3).map((product) => (
          <div
            key={product._id}
            className='border flex justify-center items-center rounded-md h-40 w-24 overflow-hidden bg-white'
          >
            <img
              src={product?.coverImage}
              alt='Product 1'
              width={96}
              height={96}
              className='object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  );
}
