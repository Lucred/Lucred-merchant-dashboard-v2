/* eslint-disable @typescript-eslint/no-explicit-any */
export const TextInput = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  error,
  width,
  readonly,
}: any) => {
  return (
    <div className='flex flex-col py-[2%]'>
      <label htmlFor={label} className='text-[0.9rem] text-[#110077] '>
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
        readOnly={readonly}
      />
      {error && <p className='text-[0.7rem] text-[#8C858D]'>{error}</p>}
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
  readonly,
}: any) => {
  // const location = useLocation();
  return (
    <div className={`flex flex-col ${width} py-[2%]`}>
      <label htmlFor={label} className='text-[0.9rem] text-[#110077] '>
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
        disabled={readonly}
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
      <label htmlFor={label} className='text-[0.9rem] text-[#110077] '>
        {label}
      </label>
      <div
        className={`flex flex-col ${width} py-[2%] border border-[#11007766] rounded-md`}
      >
        {label === "Specifications" ? (
          <input
            className=' px-[2%] outline-none w-[100%]'
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyPress}
          ></input>
        ) : (
          <textarea
            className=' px-[2%] outline-none w-[100%]'
            name={name}
            value={value}
            onChange={onChange}
          ></textarea>
        )}
      </div>
      {error && <p className='text-[0.7rem] text-[#8C858D]'>{error}</p>}
    </div>
  );
};

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImagePlus, MoveLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import {
  createProducts,
  getCategories,
  updateProduct,
  getProducts,
} from "../../redux/actions";
import ErrorBoundary from "../../components/ErrorBoundary";
import { toast } from "react-toastify";

interface Category {
  _id: string;
  name: string;
  description: string;
  coverImage: string;
  subCategories: string[];
  featuredCategories: boolean;
  totalMerchants: number;
  createdAt: string;
  updatedAt: string;
}

export default function AddProductPage() {
  return (
    <ErrorBoundary>
      <AddProduct />
    </ErrorBoundary>
  );
}

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const id = localStorage.getItem("merchantId") as string;
  const [imagePreview, setImagePreview] = useState<string>("");
  const [specifications, setSpecifications] = useState<string[]>([]);
  const [specInput, setSpecInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [originalImageUrl, setOriginalImageUrl] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subCategory: "",
    description: "",
    price: "",
    coverImage: null as File | null,
    specifications: [] as string[],
    isAvailable: true,
    merchantId: localStorage.getItem("merchantId"),
    categoryId: "",
  });
  console.log(formData);

  const [errors, setErrors] = useState({
    title: "",
    category: "",
    subCategory: "",
    description: "",
    price: "",
    coverImage: "",
  });

  const categories = useSelector(
    (state: any) => state.categories
  ) as Category[];

  const products = useSelector((state: any) => state.product);

  const selectedCategory = categories.find(
    (cat: Category) => cat.name === formData.category
  );

  const handleCategorySelect = (categoryName: string) => {
    const selectedCategory = categories.find(
      (cat: Category) => cat.name === categoryName
    );
    setFormData((prev) => ({
      ...prev,
      category: categoryName,
      categoryId: selectedCategory?._id || "",
      subCategory: "",
    }));
  };

  useEffect(() => {
    dispatch(getCategories() as any);
    dispatch(getProducts({ id }) as any);
  }, [dispatch, id]);

  useEffect(() => {
    if (productId) {
      const product = products.find((p: any) => p._id === productId);
      if (product) {
        setFormData({
          ...product,
          specifications: product.specifications || [],
          coverImage: null, // Reset coverImage since we'll handle it separately
        });
        setSpecifications(product.specifications || []);
        setImagePreview(product.coverImageUrl || product.coverImage || "");
      }
    }
  }, [productId, products]);

  const handleSpecificationKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      if (specInput.trim()) {
        const newSpec = specInput.trim();
        setSpecifications((prev) => [...prev, newSpec]);
        setFormData((prev) => ({
          ...prev,
          specifications: [...prev.specifications, newSpec],
        }));
        setSpecInput("");
      }
    }
  };

  const removeSpecification = (index: number) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {
      title: formData.title.trim() ? "" : "Product name is required",
      category: formData.category ? "" : "Category is required",
      subCategory: formData.subCategory ? "" : "Brand is required",
      description: formData.description.trim() ? "" : "Description is required",
      // isAvailable: formData?.isAvailable ? "Set Product availability" : "",
      price: formData.price ? "" : "Price is required",
      coverImage:
        !productId && !formData.coverImage ? "Product image is required" : "",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    setError(null);

    if (!validateForm()) {
      setIsButtonDisabled(false);
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("category", formData.category);
      submitData.append("subCategory", formData.subCategory);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append(
        "isAvailable",
        formData.isAvailable === true ? "true" : "false"
      );
      submitData.append("categoryId", formData.categoryId);
      submitData.append(
        "specifications",
        JSON.stringify(formData.specifications)
      );

      if (formData.coverImage instanceof File) {
        submitData.append("coverImage", formData.coverImage);
      }

      if (productId) {
        const response = await dispatch(
          updateProduct({ id: productId, formData: submitData }) as any
        );

        // Check if the update was successful
        if (response?.payload?.error) {
          throw new Error(response.payload.error);
        }

        toast.success("Product updated successfully");
        navigate("/dashboard/product");
      } else {
        submitData.append("merchantId", formData.merchantId || "");
        const response = await dispatch(createProducts(submitData) as any);

        if (response?.payload?.error) {
          throw new Error(response.payload.error);
        }

        toast.success("Product created successfully");
        navigate("/dashboard/product");
      }
    } catch (error: any) {
      setIsButtonDisabled(false);
      const errorMessage =
        error.message || "An error occurred while updating the product";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div
      className={` bg-white ${
        window.innerWidth > 768 ? `ml-12` : `ml-12`
      }  bg-[#1100770A] min-h-[100vh]`}
    >
      <div className='min-h-screen bg-background px-4 sm:px-6'>
        <div className='py-6'>
          <div className='mb-6'>
            <div className='flex items-center gap-4'>
              <MoveLeft
                size={32}
                onClick={() => navigate(-1)}
                className='cursor-pointer'
              />

              <div>
                <p className='text-sm text-muted-foreground'>
                  Dashboard/Product/{productId ? "Update" : "Add"}
                </p>
                <h3 className='text-2xl font-medium'>
                  {productId ? "Update Product" : "Add Product"}
                </h3>
              </div>
            </div>
          </div>

          {error && (
            <div className='mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='grid gap-6 md:grid-cols-2'>
            <Card>
              <CardContent className='pt-6 space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='title'>Product Name</Label>
                  <Input
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder='Enter product name'
                    required
                  />
                  {errors.title && (
                    <div className='text-red-600 text-sm'>{errors.title}</div>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='category'>Category</Label>
                  <Select
                    value={formData.category}
                    // onValueChange={(value) =>
                    //   setFormData((prev) => ({ ...prev, category: value }))
                    // }
                    onValueChange={handleCategorySelect}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <div className='text-red-600 text-sm'>
                      {errors.category}
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='subCategory'>Subcategory</Label>
                  <Select
                    value={formData.subCategory}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, subCategory: value }))
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select brand' />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory?.subCategories?.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.subCategory && (
                    <div className='text-red-600 text-sm'>
                      {errors.subCategory}
                    </div>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='availabilty'>
                    Is this product available?
                  </Label>
                  <Select
                    value={String(formData.isAvailable)}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        isAvailable: value === "true",
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select availability' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value={"true"}
                        // onClick={() => setIsAvailable(true)}
                      >
                        Yes
                      </SelectItem>
                      <SelectItem
                        value={"false"}
                        // onClick={() => setIsAvailable(false)}
                      >
                        No
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    id='description'
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder='Enter product description'
                    required
                  />
                  {errors.description && (
                    <div className='text-red-600 text-sm'>
                      {errors.description}
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='specifications'>Specifications</Label>
                  <Textarea
                    id='specifications'
                    value={specInput}
                    onChange={(e) => setSpecInput(e.target.value)}
                    onKeyDown={handleSpecificationKeyDown}
                    placeholder='Enter specifications and press Enter'
                  />
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {specifications.map((spec, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='cursor-pointer border border-white bg-blue-600 text-white'
                        onClick={() => removeSpecification(index)}
                      >
                        {spec} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='pt-6 space-y-4'>
                <div className='space-y-2'>
                  <Label>Product Image</Label>
                  <div
                    className='border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors'
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt='Preview'
                        className='w-full aspect-video object-cover rounded-lg'
                      />
                    ) : (
                      <div className='flex flex-col items-center justify-center py-4'>
                        <ImagePlus className='h-8 w-8 text-muted-foreground mb-2' />
                        <p className='text-sm text-muted-foreground'>
                          Click to upload product image
                        </p>
                      </div>
                    )}
                    <input
                      id='image-upload'
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          const file = files[0];
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const preview = event.target?.result as string;
                            setImagePreview(preview);
                          };
                          reader.readAsDataURL(file);
                          setFormData((prev) => ({
                            ...prev,
                            coverImage: file,
                          }));
                        }
                      }}
                      required={!productId}
                    />
                  </div>
                  {errors.coverImage && (
                    <div className='text-red-600 text-sm'>
                      {errors.coverImage}
                    </div>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='price'>Price</Label>
                  <Input
                    id='price'
                    type='number'
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    placeholder='Enter price'
                    required
                  />
                  {errors.price && (
                    <div className='text-red-600 text-sm'>{errors.price}</div>
                  )}
                </div>

                <div className='flex gap-4 pt-4'>
                  <Button
                    type='submit'
                    className='flex-1 bg-[#533AE9] hover:bg-[#533AE9]/40 hover:text-white text-white'
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className='flex items-center gap-2'>
                        <span className='animate-spin'>⊚</span>
                        {productId ? "Updating..." : "Adding..."}
                      </div>
                    ) : productId ? (
                      "Update Product"
                    ) : (
                      "Add Product"
                    )}
                  </Button>
                  <Button
                    type='button'
                    variant='outline'
                    className='flex-1'
                    onClick={() => navigate("/dashboard/product")}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
