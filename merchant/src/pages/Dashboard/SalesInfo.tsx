import { Link, useLocation } from "react-router-dom"
import { SelectInput } from "./DashboardAddProduct"
import { AnalyticCard } from "./DashboardHome"
import phone from "../../assets/phone.png"
import xmark from "../../assets/xmark.png"
import { useState } from "react"

const SalesInfo = () => {
    const location = useLocation()

    const [showModal, setShowModal] = useState(false)
    const toggleModal = () => {
        setShowModal(!showModal)
    }
  return (
    <div className={`${window.innerWidth > 768 ? `ml-[15%]`: `ml-[10%]`} mr-[5%] bg-[#1100770A] h-[100vh] `}>
        <div className='mx-[3%]'>
            <div className="flex items-center justify-between">
                <div className='py-[1%]'>
                    <p className='text-[0.7rem]'>Dashboard/Product</p>
                    <h3 className='text-[1.3rem] font-[500]'>Sales Info</h3>
                </div>
                {location.pathname=== "/dashboard/sales-info" ? <Link to="" className='bg-[#533AE9] lg:w-[15%] w-[50%] h-[5vh] text-[#fff] mr-[5%] rounded-md flex justify-center items-center' onClick={toggleModal}>Withdraw</Link>: null}

            </div>
            <div className="flex lg:flex-row flex-col justify-between my-[3%] lg:my-[0%]">
                <div className=" w-[100%] overflow-scroll">
                    <div className="lg:w-[65%] md:w-[100%] w-[150%] flex justify-between ">
                        <AnalyticCard width={`w-[45%]`}  />
                        <AnalyticCard width={`w-[45%]`}  />
                    </div>

                </div>
               
                <SelectInput  width={`lg:w-[30%] md:w-[50%]`} value={`Today (March 18, 2022)`}/>
            </div>
            <div className="w-[100%] overflow-scroll">
                <table className=' w-[100%] border rounded-md my-[2%] w-[250%]'>
                    <thead  >
                    <tr className='bg-[#1100770A] text-[0.8rem]  text-[#56555B] w-[100%] px-[5%] bg-[#fff]'>
                        <th className='font-[400] py-[1%]'>ID</th>
                        <th className='font-[400]'>Product name</th>
                        <th className='font-[400]'>Quantity</th>
                        <th className='font-[400]'>Total Price</th>
                        <th className='font-[400]'>Customer's name</th>
                        <th className='font-[400]'>Phone Number</th>
                        <th className='font-[400] '>Date</th>
                    </tr>
                    </thead> 
                    <tbody>
                    <tr className='bg-[#1100770A] text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                        <td className='font-[400] py-[1%]'>#24567</td>
                        <td className='font-[400] flex justify-center items-center h-[8vh]'><img src={phone} alt="" className="h-[3vh] mr-[5%]"/> iphone  XR</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>Abiola Jimoh</td>
                        <td className='font-[400]'>08130601026</td>
                        <td className='font-[400]'>October 24th 2022, 4:18:32 am</td>       
                    </tr>
                    <tr className='bg-[#1100770A] text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                        <td className='font-[400] py-[1%]'>#24567</td>
                        <td className='font-[400] flex justify-center items-center h-[8vh]'><img src={phone} alt="" className="h-[3vh] mr-[5%]"/> iphone  XR</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>Abiola Jimoh</td>
                        <td className='font-[400]'>08130601026</td>
                        <td className='font-[400]'>October 24th 2022, 4:18:32 am</td>       
                    </tr>
                    <tr className='bg-[#1100770A] text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                        <td className='font-[400] py-[1%]'>#24567</td>
                        <td className='font-[400] flex justify-center items-center h-[8vh]'><img src={phone} alt="" className="h-[3vh] mr-[5%]"/> iphone  XR</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>Abiola Jimoh</td>
                        <td className='font-[400]'>08130601026</td>
                        <td className='font-[400]'>October 24th 2022, 4:18:32 am</td>       
                    </tr>
                    <tr className='bg-[#1100770A] text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                        <td className='font-[400] py-[1%]'>#24567</td>
                        <td className='font-[400] flex justify-center items-center h-[8vh]'><img src={phone} alt="" className="h-[3vh] mr-[5%]"/> iphone  XR</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>Abiola Jimoh</td>
                        <td className='font-[400]'>08130601026</td>
                        <td className='font-[400]'>October 24th 2022, 4:18:32 am</td>       
                    </tr>
                    <tr className='bg-[#1100770A] text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                        <td className='font-[400] py-[1%]'>#24567</td>
                        <td className='font-[400] flex justify-center items-center h-[8vh]'><img src={phone} alt="" className="h-[3vh] mr-[5%]"/> iphone  XR</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>Abiola Jimoh</td>
                        <td className='font-[400]'>08130601026</td>
                        <td className='font-[400]'>October 24th 2022, 4:18:32 am</td>       
                    </tr>
                    <tr className='bg-[#1100770A] text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                        <td className='font-[400] py-[1%]'>#24567</td>
                        <td className='font-[400] flex justify-center items-center h-[8vh]'><img src={phone} alt="" className="h-[3vh] mr-[5%]"/> iphone  XR</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>Abiola Jimoh</td>
                        <td className='font-[400]'>08130601026</td>
                        <td className='font-[400]'>October 24th 2022, 4:18:32 am</td>       
                    </tr>
                    <tr className='bg-[#1100770A] text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                        <td className='font-[400] py-[1%]'>#24567</td>
                        <td className='font-[400] flex justify-center items-center h-[8vh]'><img src={phone} alt="" className="h-[3vh] mr-[5%]"/> iphone  XR</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>₦160,000</td>
                        <td className='font-[400]'>Abiola Jimoh</td>
                        <td className='font-[400]'>08130601026</td>
                        <td className='font-[400]'>October 24th 2022, 4:18:32 am</td>       
                    </tr>
                    </tbody>
                </table>

            </div>
           
        </div>

       {showModal ? <WithdrawModal func={toggleModal} /> : null}
    </div>
  )
}

export default SalesInfo

export const WithdrawModal = ({func}:any) =>{
    return (
        <div className=" fixed h-[100vh] w-[100%] bg-[#17151599] top-[0] left-[0] flex items-center justify-center">
            <div className="bg-[#fff] lg:w-[40%] w-[80%] rounded-md ">
                <div className="bg-[#1100770A] px-[3%] py-[2%] flex justify-between items-center">
                    <h3>Withdrawal Request</h3>
                    <img src={xmark} alt="" className="h-[2vh]" onClick={func}/>
                </div>
                <div className="flex items-center justify-between my-[3%] px-[3%]">
                    <label className="text-[0.9rem]">Amount Requested</label>
                    <input type="number" placeholder="450000" className="border w-[50%] px-[3%] rounded-md py-[1%]"/>
                </div>
                <div className="flex items-center justify-between my-[3%] px-[3%]">
                    <label className="text-[0.9rem]">Withdraw To</label>
                    <SelectInput value={`Select bank account`} width={`w-[50%]`}/>
                </div>

                <div className='flex justify-end my-[8%] '>
                    <Link to="" className='bg-[#FAFAFA] w-[20%] h-[5vh] text-[#533AE9] font-[600] mr-[5%] rounded-md flex justify-center items-center'>Cancel</Link>
                    <Link to="" className='bg-[#533AE9] w-[20%] h-[5vh] text-[#fff] mr-[5%] font-[600] rounded-md flex justify-center items-center'>Confirm</Link>
                </div>

            </div>


        </div>
    )
}