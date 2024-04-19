import shoes from "../../assets/shoe1.jpeg";
import drag1 from "../../assets/dragndrop1.png";
import drag2 from "../../assets/dragndrop2.png";
import mac from "../../assets/mac1.jpeg";
import { categories } from "../../data/categories";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  createProducts,
  getCategories,
  getProducts,
  updateProduct,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { SelectInput, TextAreaInput, TextInput } from "./DashboardAddProduct";

const SingleProduct = () => {
  const dispatch = useDispatch() as unknown as any
  const id = localStorage.getItem("merchantId") as unknown as string

  const products = useSelector((state: any) => state.product)
  console.log(products)

  const { productId } = useParams()

  const product = products.find((item: any) => item._id === productId)

  console.log('pro', product)

  const numberWithCommas = (x: any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    dispatch(getProducts(id))
  }, [])

  return (
    <div
      className={`${window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`
        } mr-[5%] bg-[#1100770A] min-h-[100vh] `}
    >
      <div className="mx-[3%]">
        <div className="py-[1%]">
          <p className="text-[0.7rem]">Dashboard/Product</p>
          <h3 className="text-[1.3rem] font-[500]">
            {product?.title}
          </h3>
        </div>

        <form
          className="flex lg:flex-row flex-col justify-between"

        >
          <div className="bg-[#fff] lg:w-[40%] px-[3%] py-[2%] rounded-md ">
            <TextInput
              label="Product Name"
              placeholder="Product Name"
              type="text"
              name="title"
              value={product?.title}
              error="Do not exceed 20 character when entering product name."
              readonly={true}
            />

            <TextInput
              label="Category"
              name="category"
              width={`w-[100%]`}
              value={product?.category}
              readonly={true}
            />

            <TextInput
              label="Brand"
              name="subCategory"
              value={product?.subCategory}
              readonly={true}
            />
            <TextInput
              label="Description"
              name="description"
              value={product?.description}
              readonly={true}
            />
            <TextAreaInput
              label="Specifications"
              name="specifications"
              chips={product?.specifications}
            />
          </div>
          <div className="bg-[#fff] lg:w-[50%] px-[3%] py-[2%] rounded-md ">
            <div>
              <h3 className="text-[#110077]">Product Images</h3>
              <div className="flex justify-between">
                <img
                  src={product?.coverImage}
                  alt=""
                  className="w-[auto] border border-dashed border-[#8C858D] rounded-md w-[55%]"
                />


                {/* <img src={drag1} alt="" className="h-[20vh] " />

                <div className="flex flex-col justify-between ">
                  <img src={drag2} alt="" className="h-[9.5vh]" />
                  <img src={drag2} alt="" className="h-[9.5vh]" />
                </div> */}
              </div>
              {/* <p className="text-[0.7rem] text-[#8C858D] my-[1%]">
                You need to add at least 4 images, pay attention to the quality
                of pictures you add. Ensure the product shows all details.
              </p> */}
            </div>
            {/* <div className="flex justify-between items-center">
              <div className="w-[40%]">
                <SelectInput
                  label="Add Size"
                  width={`w-[100%]`}
                  value={`EU-44`}
                />
              </div>
              <TextInput label="Stock" placeholder={`24`} />
            </div> */}
            <div >
              <TextInput
                label="Price"
                name="price"
                placeholder={`₦35,000`}
                width={`w-[100%]`}
                value={numberWithCommas(product?.price)}
              />
              {/* <SelectInput
                label="Product Date"
                width={`w-[50%]`}
                value={`Today (March 18, 2022)`}
              /> */}
            </div>
            <Link to={`/dashboard/update-product/${productId}`}
              type="submit"
              className="bg-[#533AE9] w-[40%] h-[5vh] text-[#fff] mr-[5%] rounded-md flex justify-center items-center"
            >
              Update Product
            </Link >

          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;
