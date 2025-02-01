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
import { numberWithCommas } from "../../utils";
import Pagination from "../../components/Pagination";

const TableLoadingSkeleton = () =>
  Array.from({ length: 5 }).map((_, index) => (
    <TableRow key={`loading-${index}`}>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-12 w-12 ' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-28 sm:w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-20 sm:w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-20 sm:w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-28 sm:w-[250px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-12 sm:w-[50px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='bg-gray-100 animate-pulse h-4 w-16 sm:w-[80px]' />
      </TableCell>
      <TableCell>
        <div className='flex space-x-3'>
          <Skeleton className='bg-gray-100 animate-pulse h-4 w-4' />
          <Skeleton className='bg-gray-100 animate-pulse h-4 w-4' />
          <Skeleton className='bg-gray-100 animate-pulse h-4 w-4' />
        </div>
      </TableCell>
    </TableRow>
  ));

const ProductActions = ({ product, onDeleteClick }: any) => (
  <div className='flex justify-end items-center gap-2'>
    <Button variant='ghost' size='icon' asChild className='h-8 w-8'>
      <Link to={`/dashboard/product/${product._id}`}>
        <Eye className='h-4 w-4' />
      </Link>
    </Button>
    <Button variant='ghost' size='icon' asChild className='h-8 w-8'>
      <Link to={`/dashboard/update-product/${product._id}`}>
        <Pencil className='h-4 w-4' />
      </Link>
    </Button>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2
          onClick={() => onDeleteClick(product._id)}
          color='red'
          className='h-4 w-4 cursor-pointer'
        />
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-white w-[90%] rounded-lg lg:w-full max-w-md mx-auto'>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex flex-col sm:flex-row gap-2'>
          <AlertDialogCancel
            onClick={() => onDeleteClick(null)}
            className='w-full sm:w-auto'
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className='bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto'
            onClick={() => onDeleteClick(product._id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
);

const DashboardProduct = () => {
  const dispatch = useDispatch() as unknown as any;
  const id = localStorage.getItem("merchantId") as string;
  const [isLoading, setIsLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const products = useSelector((state: any) => state.product);
  const productArray = useMemo(
    () => (Array.isArray(products) ? products : []),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return productArray
      .filter((product: any) => {
        const searchString = searchQuery.toLowerCase();
        return (
          product.title?.toLowerCase().includes(searchString) ||
          product.category?.toLowerCase().includes(searchString) ||
          product.subCategory?.toLowerCase().includes(searchString) ||
          product.description?.toLowerCase().includes(searchString)
        );
      })
      .reverse();
  }, [productArray, searchQuery]);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      await dispatch(getProducts({ id }));
      setIsLoading(false);
    };
    fetchProducts();
  }, [dispatch, id]);

  return (
    <div className='bg-white min-h-screen'>
      <div className='min-h-screen px-2 sm:px-4 md:px-6 ml-16 sm:ml-12'>
        <div className='py-4 sm:py-6'>
          <div className='mb-4 sm:mb-6'>
            <p className='text-sm text-muted-foreground'>Dashboard/Product</p>
            <h3 className='text-xl sm:text-2xl font-medium'>Product</h3>
          </div>

          <div className='rounded-lg border bg-card p-3 sm:p-6'>
            <div className='flex flex-col sm:flex-row justify-between gap-4 mb-6'>
              <div className='relative w-full sm:w-72'>
                <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search products...'
                  className='pl-8 bg-white'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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

            <div className='relative w-full overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-24'>Product</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className='hidden sm:table-cell'>
                      Subcategory
                    </TableHead>
                    <TableHead className='hidden sm:table-cell'>
                      Category
                    </TableHead>
                    <TableHead className='hidden lg:table-cell'>
                      Description
                    </TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableLoadingSkeleton />
                  ) : (
                    currentProducts?.map((product: any) => (
                      <TableRow key={product._id}>
                        <TableCell>
                          <img
                            src={product.coverImage}
                            alt={product.title}
                            className='h-12 w-12 object-cover rounded'
                          />
                        </TableCell>
                        <TableCell className='font-medium'>
                          {product.title}
                        </TableCell>
                        <TableCell className='hidden sm:table-cell'>
                          {product.subCategory}
                        </TableCell>
                        <TableCell className='hidden sm:table-cell'>
                          {product.category}
                        </TableCell>
                        <TableCell className='hidden lg:table-cell max-w-[300px] truncate'>
                          {product.description}
                        </TableCell>
                        <TableCell>100</TableCell>
                        <TableCell>
                          ₦{numberWithCommas(product.price)}
                        </TableCell>
                        <TableCell>
                          <ProductActions
                            product={product}
                            onDeleteClick={setProductToDelete}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className='mt-4 flex justify-center'>
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(
                  filteredProducts.length / productsPerPage
                )}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProduct;
