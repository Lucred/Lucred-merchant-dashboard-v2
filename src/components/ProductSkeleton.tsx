import React from "react";
import { Card, CardContent } from "./ui/card";

const ProductFormSkeleton = () => {
  return (
    <div className='bg-white ml-12 bg-[#1100770A] min-h-screen'>
      <div className='min-h-screen bg-background px-4 sm:px-6'>
        <div className='py-6'>
          {/* Header Skeleton */}
          <div className='mb-6'>
            <div className='flex items-center gap-4'>
              <div className='w-8 h-8 rounded-full bg-gray-200 animate-pulse' />
              <div>
                <div className='h-4 w-48 bg-gray-200 rounded animate-pulse mb-2' />
                <div className='h-6 w-64 bg-gray-200 rounded animate-pulse' />
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className='grid gap-6 md:grid-cols-2'>
            {/* Left Card */}
            <Card>
              <CardContent className='pt-6 space-y-4'>
                {/* Product Name Skeleton */}
                <div className='space-y-2'>
                  <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
                  <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
                </div>

                {/* Category Skeleton */}
                <div className='space-y-2'>
                  <div className='h-4 w-20 bg-gray-200 rounded animate-pulse' />
                  <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
                </div>

                {/* Subcategory Skeleton */}
                <div className='space-y-2'>
                  <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
                  <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
                </div>

                {/* Availability Skeleton */}
                <div className='space-y-2'>
                  <div className='h-4 w-40 bg-gray-200 rounded animate-pulse' />
                  <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
                </div>

                {/* Description Skeleton */}
                <div className='space-y-2'>
                  <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
                  <div className='h-32 w-full bg-gray-200 rounded animate-pulse' />
                </div>

                {/* Specifications Skeleton */}
                <div className='space-y-2'>
                  <div className='h-4 w-28 bg-gray-200 rounded animate-pulse' />
                  <div className='h-24 w-full bg-gray-200 rounded animate-pulse' />
                  <div className='flex flex-wrap gap-2'>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className='h-6 w-20 bg-gray-200 rounded-full animate-pulse'
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Card */}
            <Card>
              <CardContent className='pt-6 space-y-4'>
                {/* Image Upload Skeleton */}
                <div className='space-y-2'>
                  <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
                  <div className='border-2 border-dashed rounded-lg p-4'>
                    <div className='w-full aspect-video bg-gray-200 rounded animate-pulse' />
                  </div>
                </div>

                {/* Price Skeleton */}
                <div className='space-y-2'>
                  <div className='h-4 w-16 bg-gray-200 rounded animate-pulse' />
                  <div className='h-10 w-full bg-gray-200 rounded animate-pulse' />
                </div>

                {/* Buttons Skeleton */}
                <div className='flex gap-4 pt-4'>
                  <div className='h-10 flex-1 bg-gray-200 rounded animate-pulse' />
                  <div className='h-10 flex-1 bg-gray-200 rounded animate-pulse' />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormSkeleton;
