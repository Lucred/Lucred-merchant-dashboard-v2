"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Eye, Pencil, Search, Trash2, Plus } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Skeleton } from "../../components/ui/skeleton";
import { getProducts, deleteProduct } from "../../redux/actions";
import Pagination from "../../components/Pagination";
import { numberWithCommas } from "../../utils";

const DashboardProduct = () => {
  const dispatch = useDispatch() as unknown as any;
  const id = localStorage.getItem("merchantId") as string;
  const [isLoading, setIsLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const products = useSelector((state: any) => state.product);

  const productArray = useMemo(() => {
    return Array.isArray(products) ? products : [];
  }, [products]);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    return productArray.filter((product: any) => {
      const searchString = searchQuery.toLowerCase();
      return (
        product.title?.toLowerCase().includes(searchString) ||
        product.category?.toLowerCase().includes(searchString) ||
        product.subCategory?.toLowerCase().includes(searchString) ||
        product.description?.toLowerCase().includes(searchString)
      );
    });
  }, [productArray, searchQuery]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Use filtered products for pagination
  const currentProduct = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, currentPage]);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      await dispatch(deleteProduct(productToDelete));
      setProductToDelete(null);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      await dispatch(getProducts({ id }));
      setIsLoading(false);
    };
    fetchProducts();
  }, [dispatch, id]);

  return (
    <div
      className={` bg-white ${
        window.innerWidth > 768 ? `ml-12` : `ml-12`
      }  bg-[#1100770A] min-h-[100vh]`}
    >
      <div className='min-h-screen bg-background px-4 sm:px-6'>
        <div className='py-6'>
          <div className='mb-6'>
            <p className='text-sm text-muted-foreground'>Dashboard/Product</p>
            <h3 className='text-2xl font-medium'>Product</h3>
          </div>

          <div className='rounded-lg border bg-card p-6'>
            <div className='flex flex-col sm:flex-row justify-between gap-4 mb-6'>
              <div className='relative w-full sm:w-72'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground ' />
                <Input
                  placeholder='Search products...'
                  className='pl-8 bg-white'
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Button
                asChild
                className='w-full sm:w-auto bg-[#533AE9] hover:bg-[#533AE9]/40 text-white hover:text-white'
              >
                <Link to='/dashboard/add-product'>
                  <Plus className='mr-2 h-4 w-4' />
                  Add Product
                </Link>
              </Button>
            </div>

            <div className='relative overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Subcategory</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={`loading-${index}`}>
                          <TableCell>
                            <Skeleton className='h-12 w-12' />
                          </TableCell>
                          <TableCell>
                            <Skeleton className='h-4 w-[200px]' />
                          </TableCell>
                          <TableCell>
                            <Skeleton className='h-4 w-[100px]' />
                          </TableCell>
                          <TableCell>
                            <Skeleton className='h-4 w-[100px]' />
                          </TableCell>
                          <TableCell>
                            <Skeleton className='h-4 w-[300px]' />
                          </TableCell>
                          <TableCell>
                            <Skeleton className='h-4 w-[50px]' />
                          </TableCell>
                          <TableCell>
                            <Skeleton className='h-4 w-[80px]' />
                          </TableCell>
                          <TableCell>
                            <Skeleton className='h-8 w-[100px]' />
                          </TableCell>
                        </TableRow>
                      ))
                    : currentProduct?.map((elem: any, id: number) => (
                        <TableRow key={id}>
                          <TableCell>
                            <img
                              src={elem.coverImage}
                              alt={elem.title}
                              className='h-12 w-12 object-cover rounded'
                            />
                          </TableCell>
                          <TableCell className='font-medium'>
                            {elem.title}
                          </TableCell>
                          <TableCell>{elem.subCategory}</TableCell>
                          <TableCell>{elem.category}</TableCell>
                          <TableCell className='max-w-[300px] truncate'>
                            {elem.description}
                          </TableCell>
                          <TableCell>100</TableCell>
                          <TableCell>₦{numberWithCommas(elem.price)}</TableCell>
                          <TableCell>
                            <div className='flex justify-end items-center gap-2'>
                              <Button
                                variant='ghost'
                                size='icon'
                                asChild
                                className='h-8 w-8'
                              >
                                <Link to={`/dashboard/product/${elem._id}`}>
                                  <Eye className='h-4 w-4' />
                                </Link>
                              </Button>
                              <Button
                                variant='ghost'
                                size='icon'
                                asChild
                                className='h-8 w-8'
                              >
                                <Link
                                  to={`/dashboard/update-product/${elem._id}`}
                                >
                                  <Pencil className='h-4 w-4' />
                                </Link>
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Trash2
                                    onClick={() => setProductToDelete(elem._id)}
                                    color='red'
                                    className='h-4 w-4 cursor-pointer'
                                  />
                                </AlertDialogTrigger>
                                <AlertDialogContent className='bg-white w-[90%] lg:w-full'>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Product
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this
                                      product? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      onClick={() => setProductToDelete(null)}
                                    >
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      className='bg-red-600 text-white hover:bg-red-700'
                                      onClick={handleDeleteConfirm}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>

            <div className='mt-4 flex justify-center'>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  filteredProducts.length / productsPerPage
                )}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProduct;
