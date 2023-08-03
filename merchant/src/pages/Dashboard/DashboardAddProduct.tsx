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
  updateProduct,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const DashboardAddProduct = () => {
  const id = localStorage.getItem("merchantId");

  const [formData, setFormData] = useState<any>({
    title: "",
    category: "",
    coverImage: "",
    description: "",
    isAvailable: true,
    subCategory: "",
    specifications: [],
    price: 0,
    merchantId: id,
    categoryId: "",
  });

  const [updateData, setupdateData] = useState<any>({
    title: "",
    category: "",
    coverImage: "",
    description: "",
    isAvailable: true,
    subCategory: "",
    specifications: [],
    price: 0,
    categoryId: "",
  });

  const categories = useSelector((state: any) => state.categories);

  console.log("cat", categories);

  const subCategories = categories.find(
    (item: any) => item.name == formData.category
  );

  const [desc, setDesc] = useState("");

  const [images, setImages] = useState<any>(null);

  const imageRef = useRef<any>(null);

  const handleRef = () => {
    imageRef.current.click();
  };

  const [chips, setChips] = useState<string[]>([]);

  const dispatch = useDispatch() as unknown as any;

  const handleDeleteChip = (index: number) => {
    const newChips = [...chips];
    newChips.splice(index, 1);
    setChips(newChips);
  };

  const onDescription = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setDesc(value);
  };

  const onEnterDescription = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;

    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      setFormData({
        ...formData,
        specifications: JSON.stringify([...chips, value]), // Use the current chips state directly
      });

      setupdateData({
        ...updateData,
        specifications: JSON.stringify([...chips, value]), // Use the current chips state directly
      });

      setChips([...chips, value]); // Update the chips state with the new value

      setDesc("");

      setDesc("");

      console.log(formData);
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;

    if (name === "coverImage") {
      console.log(e.target.files[0]);
      setImages(URL.createObjectURL(e.target.files[0]));
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });

      setupdateData({
        ...updateData,
        [name]: e.target.files[0],
      })
    } else {
      console.log(name, value);
      setFormData({
        ...formData,
        [name]: value,
      });

      setupdateData({
        ...updateData,
        [name]: value,
      })
    }
  };

  useEffect(() => {
    dispatch(getCategories());
    setFormData({ ...formData, categoryId: subCategories?._id });
    setupdateData({ ...updateData, categoryId: subCategories?._id });
  }, []);

  console.log(formData);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(createProducts(formData));
  };

  const updateSubmit = async (e: any) => {
    e.preventDefault();
    await dispatch(updateProduct({ id: productId, formData:updateData }));
  };

  const { productId } = useParams();

  return (
    <div
      className={`${
        window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`
      } mr-[5%] bg-[#1100770A] h-[100vh] `}
    >
      <div className="mx-[3%]">
        <div className="py-[1%]">
          <p className="text-[0.7rem]">Dashboard/Product</p>
          <h3 className="text-[1.3rem] font-[500]">
            {productId ? ` Update Product` : `Add Product`}
          </h3>
        </div>

        <form
          className="flex lg:flex-row flex-col justify-between"
          onSubmit={productId ? updateSubmit : handleSubmit}
        >
          <div className="bg-[#fff] lg:w-[40%] px-[3%] py-[2%] rounded-md ">
            <TextInput
              label="Product Name"
              placeholder="Product Name"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error="Do not exceed 20 character when entering product name."
            />
            <div className="flex justify-between w-[100%] ">
              <SelectInput
                label="Category"
                name="category"
                data={categories}
                width={`w-[100%]`}
                onChange={handleChange}
              />
              {/* <SelectInput
                label="Gender"
                data={["Male", "Female"]}
                width={`w-[40%]`}
              /> */}
            </div>
            <SelectInput
              label="Brand"
              name="subCategory"
              data={subCategories?.subCategories}
              onChange={handleChange}
            />
            <TextInput
              label="Description"
              name="description"
              value={formData?.description}
              onChange={handleChange}
            />
            <TextAreaInput
              label="Specifications"
              name="specifications"
              value={desc}
              chips={chips}
              del={handleDeleteChip}
              onChange={onDescription}
              onKeyPress={onEnterDescription}
              error="Do not exceed 20 character when entering product description. "
            />
          </div>
          <div className="bg-[#fff] lg:w-[50%] px-[3%] py-[2%] rounded-md ">
            <div>
              <h3 className="text-[#110077]">Product Images</h3>
              <div className="flex justify-between">
                <img
                  src={images || shoes}
                  alt=""
                  className="h-[20vh] border border-dashed border-[#8C858D] rounded-md w-[55%]"
                  onClick={handleRef}
                />
                <input
                  type="file"
                  name="coverImage"
                  className="hidden"
                  ref={imageRef}
                  onChange={handleChange}
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
                value={formData.price}
                placeholder={`₦35,000`}
                onChange={handleChange}
                width={`w-[100%]`}
              />
              {/* <SelectInput
                label="Product Date"
                width={`w-[50%]`}
                value={`Today (March 18, 2022)`}
              /> */}
            </div>

            <div className="flex justify-center my-[8%]">
              {productId ? (
                <button
                  type="submit"
                  className="bg-[#533AE9] w-[40%] h-[5vh] text-[#fff] mr-[5%] rounded-md flex justify-center items-center"
                >
                  Update Product
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#533AE9] w-[50%] h-[5vh] text-[#fff] mr-[5%] rounded-md flex justify-center items-center t"
                >
                  Add Product
                </button>
              )}
              <Link
                to="/dashboard/product"
                className="bg-[#FAFAFA] w-[50%] h-[5vh] text-[#533AE9] mr-[5%] rounded-md flex justify-center items-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardAddProduct;

export const TextInput = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  error,
  width
}: any) => {
  return (
    <div className="flex flex-col py-[2%]">
      <label htmlFor={label} className="text-[0.9rem] text-[#110077] ">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border border-[#11007766] rounded-md h-[6vh] lg:h-[4vh] px-[2%] outline-none ${width}`}
      />
      {error && <p className="text-[0.7rem] text-[#8C858D]">{error}</p>}
    </div>
  );
};

export const SelectInput = ({
  label,
  placeholder,
  type,
  name,
  value,
  data,
  onChange,
  width,
  error,
}: any) => {
  const location = useLocation();
  return (
    <div className={`flex flex-col ${width} py-[2%]`}>
      <label htmlFor={label} className="text-[0.9rem] text-[#110077] ">
        {label}
      </label>
      <select
        name={name}
        onChange={onChange}
        className={`border border-[#11007766] rounded-md px-[2%] outline-none w-[100%] h-[6vh] lg:h-[4vh] ${
          location.pathname === "/dashboard/sales-info"
            ? `bg-[transparent]`
            : null
        }`}
      > 
      <option>select</option>
        {name === "category"
          ? data?.map((elem: any, id: number) => (
              <option key={id} value={elem.name}>
                {elem.name}
              </option>
            ))
          : data?.map((elem: string, id: number) => (
              <option key={id} value={elem}>
                {elem}
              </option>
            ))}
      </select>
    </div>
  );
};

export const TextAreaInput = ({
  label,
  placeholder,
  type,
  del,
  chips,
  name,
  value,
  onChange,
  onKeyPress,
  width,
  error,
}: any) => {
  return (
    <div>
      <label htmlFor={label} className="text-[0.9rem] text-[#110077] ">
        {label}
      </label>
      <div
        className={`flex flex-col ${width} py-[2%] border border-[#11007766] rounded-md`}
      >
        <div className="flex flex-wrap ">
          {chips?.map((chip: string, index: number) => (
            <Chip key={index} text={chip} onDelete={() => del(index)} />
          ))}
        </div>
        {
          (label = "Specifications" ? (
            <input
              className=" px-[2%] outline-none w-[100%]"
              name={name}
              value={value}
              onChange={onChange}
              onKeyDown={onKeyPress}
            ></input>
          ) : (
            <textarea
              className=" px-[2%] outline-none w-[100%]"
              name={name}
              value={value}
              onChange={onChange}
            ></textarea>
          ))
        }
      </div>
      {error && <p className="text-[0.7rem] text-[#8C858D]">{error}</p>}
    </div>
  );
};

const Chip = ({ text, onDelete }: any) => {
  return (
    <div className="chip bg-[#ccc] w-[auto] flex justify-between items-center py-[2%] px-[3%] rounded-md mx-[2%] my-[2%]">
      <span className="chip-text">{text}</span>
      <button
        className="h-[2px] w-[2px] flex justify-center items-center ml-[5%]"
        onClick={onDelete}
      >
        &times;
      </button>
    </div>
  );
};
