import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { getProducts, deleteProduct } from "../../redux/actions";

const DashboardProduct = () => {
  const dispatch = useDispatch() as unknown as any;
  const id = localStorage.getItem("merchantId") as string;

  const products = useSelector((state: any) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const currentProduct = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return products.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [products, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getProducts({ id }));
  }, [dispatch, id]);

  return (
    <div
      className={`${
        window.innerWidth > 768 ? `ml-[15%]` : `ml-[8%]`
      } mr-[5%] bg-[#1100770A] min-h-[100vh]`}
    >
      <div className='mx-[3%]'>
        <div className='py-[1%]'>
          <p className='text-[0.7rem]'>Dashboard/Product</p>
          <h3 className='text-[1.3rem] font-[500]'>Product</h3>
        </div>
        <div className='bg-[#fff] py-[2%] px-[1%]'>
          <div className='flex items-center justify-between'>
            <div className='lg:w-[25%] w-[50%] bg-[#FFFFFF] flex items-center justify-center h-[5vh] border border-[#C3C3C4] rounded-md'>
              <input
                type='text'
                placeholder='Search'
                className='border-none h-[5vh] text-[#707070] outline-none bg-[transparent]'
              />
            </div>
            <Link
              to='/dashboard/add-product'
              className='bg-[#533AE9] lg:w-[20%] w-[40%] h-[5vh] text-[#fff] lg:mr-[5%] rounded-md flex justify-center items-center'
            >
              Add Product
            </Link>
          </div>
          <div className='w-[100%] overflow-scroll scrollbar-none'>
            <table className='w-[250%] lg:w-[100%] rounded-md my-[2%]'>
              <thead>
                <tr className='bg-[#1100770A] text-[0.8rem] text-[#171515] font-[700] w-[100%] px-[5%]'>
                  <th className='font-[500] py-[1%]'>Product</th>
                  <th className='font-[500]'>Title</th>
                  <th className='font-[500]'>Subcategory</th>
                  <th className='font-[500]'>Category</th>
                  <th className='font-[500]'>Description</th>
                  <th className='font-[500]'>Stock</th>
                  <th className='font-[500]'>Price</th>
                  <th className='font-[500]'>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProduct?.map((elem: any, id: number) => (
                  <tr
                    key={id}
                    className='bg-[#FFFFFF] text-[0.8rem] text-[#171515] text-center w-[100%] h-[10vh]'
                  >
                    <td className='font-[400] flex justify-center items-center h-[10vh]'>
                      <img src={elem.coverImage} alt='' className='h-[50px]' />
                    </td>
                    <td className='font-[400] px-[10px]'>{elem.title}</td>
                    <td className='font-[400] px-[10px]'>{elem.subCategory}</td>
                    <td className='font-[400] px-[10px]'>{elem.category}</td>
                    <td className='font-[400] px-[10px]'>{elem.description}</td>
                    <td className='font-[400] px-[10px]'>100</td>
                    <td className='font-[400] px-[10px]'>₦{elem.price}</td>
                    <td className='font-[400] w-[100px]'>
                      <div className='flex items-center justify-center'>
                        <Link to={`/dashboard/product/${elem._id}`}>
                          <img src='view.png' className='mx-[2px]' alt='' />
                        </Link>
                        <Link to={`/dashboard/update-product/${elem._id}`}>
                          <img src='edit.png' className='mx-[2px]' alt='' />
                        </Link>
                        <img
                          src='trash.png'
                          className='mx-[2px]'
                          alt=''
                          onClick={async () =>
                            await dispatch(deleteProduct(elem._id))
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(products.length / productsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DashboardProduct;
