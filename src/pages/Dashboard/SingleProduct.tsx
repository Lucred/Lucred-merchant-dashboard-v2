"use client";

import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, MoveLeft, Pencil } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { numberWithCommas } from "../../utils";
import { Badge } from "../../components/ui/badge";
import { Label } from "../../components/ui/label";
import { useEffect, useState } from "react";
import { getProducts } from "../../redux/actions";
import { Skeleton } from "../../components/ui/skeleton";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch() as unknown as any;
  const [isLoading, setIsLoading] = useState(true);

  const merchantId = localStorage.getItem("merchantId") as string;
  const products = useSelector((state: any) => state.product);
  const product = products.find((p: any) => p._id === id);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      await dispatch(getProducts({ id: merchantId }));
      setIsLoading(false);
    };
    fetchProducts();
  }, [dispatch, merchantId]);

  if (isLoading) {
    return (
      <div
        className={`${
          window.innerWidth > 768 ? `ml-[15%]` : `ml-[8%]`
        } mr-[5%] bg-[#1100770A] min-h-[100vh]`}
      >
        <div className='min-h-screen bg-background px-4 sm:px-6'>
          <div className='py-6'>
            <div className='mb-6'>
              <Skeleton className='h-8 w-64' />
            </div>
            <Card>
              <CardHeader>
                <Skeleton className='h-8 w-48' />
              </CardHeader>
              <CardContent>
                <div className='grid gap-6 md:grid-cols-2'>
                  <Skeleton className='aspect-square h-full w-full' />
                  <div className='space-y-6'>
                    <Skeleton className='h-8 w-full' />
                    <Skeleton className='h-6 w-32' />
                    <Separator />
                    <div className='space-y-4'>
                      <Skeleton className='h-4 w-24' />
                      <Skeleton className='h-4 w-32' />
                      <Skeleton className='h-4 w-16' />
                    </div>
                    <Separator />
                    <div>
                      <Skeleton className='h-4 w-24 mb-2' />
                      <Skeleton className='h-24 w-full' />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <p className='text-lg text-muted-foreground'>Product not found</p>
          <Button
            variant='ghost'
            onClick={() => navigate("/dashboard")}
            className='mt-4'
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={` bg-white `}>
      <div className='min-h-screen bg-background px-4 sm:px-6'>
        <div className='py-6'>
          <div className='mb-6'>
            <div className='flex items-center gap-4'>
              <MoveLeft
                onClick={() => navigate(-1)}
                className='h-4 w-4 cursor-pointer'
              />

              <div>
                <p className='text-sm text-muted-foreground'>
                  Dashboard/Product/View
                </p>
                <h3 className='text-2xl font-medium'>View Product</h3>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader className='flex-row items-center justify-between'>
              <h3 className='text-xl font-semibold'>Product Details</h3>
              <Button asChild className='bg-blue-600 text-white'>
                <Link to={`/dashboard/update-product/${product._id}`}>
                  <Pencil className='mr-2 h-4 w-4' />
                  Update Product
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6 md:grid-cols-2'>
                <div className='space-y-4'>
                  <div className='aspect-square overflow-hidden rounded-lg border'>
                    <img
                      src={product.coverImage}
                      alt={product.title}
                      className='h-full w-full object-cover'
                    />
                  </div>
                </div>

                <div className='space-y-6'>
                  <div>
                    <h2 className='text-2xl font-bold'>{product.title}</h2>
                    <p className='text-2xl font-semibold text-primary mt-2'>
                      ₦{numberWithCommas(product.price)}
                    </p>
                  </div>

                  <Separator />

                  <div className='space-y-4'>
                    <div>
                      <h4 className='font-medium text-muted-foreground'>
                        Category
                      </h4>
                      <p className='mt-1'>{product.category}</p>
                    </div>
                    <div>
                      <h4 className='font-medium text-muted-foreground'>
                        Subcategory
                      </h4>
                      <p className='mt-1'>{product.subCategory}</p>
                    </div>
                    <div>
                      <h4 className='font-medium text-muted-foreground'>
                        Stock
                      </h4>
                      <p className='mt-1'>100</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className='font-medium text-muted-foreground'>
                      Description
                    </h4>
                    <p className='mt-2 whitespace-pre-wrap'>
                      {product.description}
                    </p>
                  </div>
                  <div className='space-y-2'>
                    <Label>Specifications</Label>
                    <div className='flex flex-wrap gap-2'>
                      {product?.specifications?.map(
                        (spec: string, index: number) => (
                          <Badge key={index} variant='secondary'>
                            {spec}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
