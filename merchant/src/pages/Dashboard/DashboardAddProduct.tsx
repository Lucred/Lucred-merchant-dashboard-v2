import shoes from '../../assets/shoe.png'
import drag1 from '../../assets/dragndrop1.png'
import drag2 from '../../assets/dragndrop2.png'
import { Link, useLocation } from 'react-router-dom'

const DashboardAddProduct = () => {
  return (
    <div className={`${window.innerWidth > 768 ? `ml-[15%]`: `ml-[10%]`} mr-[5%] bg-[#1100770A] h-[100vh] `}>
        <div className='mx-[3%]'>
            <div className='py-[1%]'>
                <p className='text-[0.7rem]'>Dashboard/Product</p>
                <h3 className='text-[1.3rem] font-[500]'>Add Product</h3>
            </div>
        
        <div className='flex lg:flex-row flex-col justify-between'>
            <div className='bg-[#fff] lg:w-[40%] px-[3%] py-[2%] rounded-md '>
                <TextInput label='Product Name' placeholder='Product Name' type='text' name='product-name' value='' onChange={() => {}} error='Do not exceed 20 character when entering product name.' />
                <div className='flex justify-between w-[100%] '>
                    <SelectInput label='Category' value="sneakers" width={`w-[40%]`} />
                    <SelectInput label='Gender' value="Male" width={`w-[40%]`}  />
                </div>
                <SelectInput label="Brand" value="Adidas" />
                <TextAreaInput label="Description" error='Do not exceed 20 character when entering product description. ' />

            </div>
            <div className='bg-[#fff] lg:w-[50%] px-[3%] py-[2%] rounded-md '>
                <div>
                    <h3 className='text-[#110077]'>Product Images</h3>
                    <div className='flex justify-between'>
                        <img src={shoes} alt="" className='h-[20vh]' />
                        <img src={drag1} alt="" className='h-[20vh]' />
                        <div className='flex flex-col justify-between'>
                            <img src={drag2} alt="" className='h-[9vh]' />
                            <img src={drag2} alt="" className='h-[9vh]' />
                        </div>
                    </div>
                    <p className='text-[0.7rem] text-[#8C858D] my-[1%]'>You need to add at least 4 images, pay attention to the quality of pictures you add.
Ensure the product shows all details.</p>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='w-[40%]'>
                        <SelectInput label="Add Size" width={`w-[100%]`} value={`EU-44`}/>
                    </div>
                    <TextInput label="Stock" placeholder={`24`} />
                

                </div>
                <div className='flex justify-between'>
                    <TextInput label="Price" placeholder={`₦35,000`} />
                    <SelectInput label="Product Date" width={`w-[50%]`} value={`Today (March 18, 2022)`}/>
                </div>

                <div className='flex justify-center my-[8%]'>
                    <Link to="" className='bg-[#533AE9] w-[40%] h-[5vh] text-[#fff] mr-[5%] rounded-md flex justify-center items-center'>Add Product</Link>
                    <Link to="" className='bg-[#FAFAFA] w-[40%] h-[5vh] text-[#533AE9] mr-[5%] rounded-md flex justify-center items-center'>Cancel</Link>
                </div>
                
                
                

            </div>
        </div>
    </div>
    </div>
  )
}

export default DashboardAddProduct

export const TextInput = ({label, placeholder, type, name, value, onChange, error}:any) => {
    return (
        <div className='flex flex-col py-[2%]'>
            <label htmlFor={label} className='text-[0.9rem] text-[#110077] '>{label}</label>
            <input type={type} name={name} id={label} placeholder={placeholder} value={value} onChange={onChange} className='border border-[#11007766] rounded-md h-[6vh] lg:h-[4vh] px-[2%] outline-none' />
            {error && <p className='text-[0.7rem] text-[#8C858D]'>{error}</p>}
        </div>
    )
}

export const SelectInput = ({label, placeholder, type, name, value, onChange, width, error}:any) => {
    const location = useLocation()
    return(
        <div className={`flex flex-col ${width} py-[2%]`}>
           <label htmlFor={label} className='text-[0.9rem] text-[#110077] '>{label}</label>
           <select className={`border border-[#11007766] rounded-md px-[2%] outline-none w-[100%] h-[6vh] lg:h-[4vh] ${location.pathname === "/dashboard/sales-info" ? `bg-[transparent]` : null}`} >
                <option value={value}>{value}</option>
           </select>
        </div>
    )
}

export const TextAreaInput = ({label, placeholder, type, name, value, onChange, width, error}:any) => {
    return(
        <div className={`flex flex-col ${width} py-[2%]`}>
           <label htmlFor={label} className='text-[0.9rem] text-[#110077] '>{label}</label>
           <textarea className='border border-[#11007766] rounded-md px-[2%] outline-none w-[100%] ' rows={7}></textarea>
           {error && <p className='text-[0.7rem] text-[#8C858D]'>{error}</p>}
        </div>
    

    )
}