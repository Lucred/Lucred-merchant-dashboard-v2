import { SelectInput } from "./DashboardAddProduct"
import customer1 from '../../assets/customer1.png'
import rating from '../../assets/rating.png'


const UserReport = () => {
  return (
    <div className='ml-[15%] mr-[5%] bg-[#1100770A] '>
        <div className='mx-[3%]'>
            <div className="flex items-center justify-between">
                <div className='py-[1%]'>
                    <p className='text-[0.7rem]'>Dashboard/Product</p>
                    <h3 className='text-[1.3rem] font-[500]'>Customer Report</h3>
                </div>
                <SelectInput  width={`w-[30%]`} value={`Today (March 18, 2022)`}/>
            </div>
            <div className="bg-[#fff] px-[1%] py-[1%]">
                <table className=' w-[100%] rounded-md  '>
                    <thead  >
                    <tr className='bg-[#1100770A] text-[0.8rem]  text-[#56555B] w-[100%] px-[5%] '>
                        <th className='font-[400] py-[1%]'>Name</th>
                        <th className='font-[400]'>ID</th>
                        <th className='font-[400]'>Email</th>
                        <th className='font-[400]'>Phone No</th>
                        <th className='font-[400]'>Address</th>
                        <th className='font-[400]'>No of Item bought</th>
                    </tr>
                    </thead> 
                    <tbody>
                        <tr className='text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                            <td className='font-[400] flex justify-center items-center h-[7vh]'><img src={customer1} alt="" className="h-[3vh] mr-[5%]"/> Judy Peter</td>
                            <td className='font-[400] '>#24567</td>
                            <td className='font-[400]'>JollyPeter@gmail.com</td>
                            <td className='font-[400]'>08130601026</td>
                            <td className='font-[400]'>Ikeja</td>
                            <td className='font-[400]'>4</td>
                        </tr>
                        <tr className='text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                            <td className='font-[400] flex justify-center items-center h-[7vh]'><img src={customer1} alt="" className="h-[3vh] mr-[5%]"/> Judy Peter</td>
                            <td className='font-[400] '>#24567</td>
                            <td className='font-[400]'>JollyPeter@gmail.com</td>
                            <td className='font-[400]'>08130601026</td>
                            <td className='font-[400]'>Ikeja</td>
                            <td className='font-[400]'>4</td>
                        </tr>
                        <tr className='text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                            <td className='font-[400] flex justify-center items-center h-[7vh]'><img src={customer1} alt="" className="h-[3vh] mr-[5%]"/> Judy Peter</td>
                            <td className='font-[400] '>#24567</td>
                            <td className='font-[400]'>JollyPeter@gmail.com</td>
                            <td className='font-[400]'>08130601026</td>
                            <td className='font-[400]'>Ikeja</td>
                            <td className='font-[400]'>4</td>
                        </tr>
                        <tr className='text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                            <td className='font-[400] flex justify-center items-center h-[7vh]'><img src={customer1} alt="" className="h-[3vh] mr-[5%]"/> Judy Peter</td>
                            <td className='font-[400] '>#24567</td>
                            <td className='font-[400]'>JollyPeter@gmail.com</td>
                            <td className='font-[400]'>08130601026</td>
                            <td className='font-[400]'>Ikeja</td>
                            <td className='font-[400]'>4</td>
                        </tr>
                        <tr className='text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                            <td className='font-[400] flex justify-center items-center h-[7vh]'><img src={customer1} alt="" className="h-[3vh] mr-[5%]"/> Judy Peter</td>
                            <td className='font-[400] '>#24567</td>
                            <td className='font-[400]'>JollyPeter@gmail.com</td>
                            <td className='font-[400]'>08130601026</td>
                            <td className='font-[400]'>Ikeja</td>
                            <td className='font-[400]'>4</td>
                        </tr>
                        <tr className='text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                            <td className='font-[400] flex justify-center items-center h-[5vh]'><img src={customer1} alt="" className="h-[3vh] mr-[5%]"/> Judy Peter</td>
                            <td className='font-[400] '>#24567</td>
                            <td className='font-[400]'>JollyPeter@gmail.com</td>
                            <td className='font-[400]'>08130601026</td>
                            <td className='font-[400]'>Ikeja</td>
                            <td className='font-[400]'>4</td>
                        </tr>
                        <tr className='text-[0.8rem] text-[#56555B] text-center w-[100%] '>
                            <td className='font-[400] flex justify-center items-center h-[7vh]'><img src={customer1} alt="" className="h-[3vh] mr-[5%]"/> Judy Peter</td>
                            <td className='font-[400] '>#24567</td>
                            <td className='font-[400]'>JollyPeter@gmail.com</td>
                            <td className='font-[400]'>08130601026</td>
                            <td className='font-[400]'>Ikeja</td>
                            <td className='font-[400]'>4</td>
                        </tr>
                     
                    </tbody>
                </table>

            </div>
            <CustomerReview />
        </div>
    </div>
  )
}

export default UserReport

export const CustomerReview = () => {
    return(
        <div className="bg-[#fff] rounded-md w-[40%] my-[2%] px-[3%] py-[2%]">
            <h3>Customer Review</h3>
            <div className="flex items-center justify-between my-[2%] ">
                <div className="flex w-[80%] items-center">
                    <img src={customer1} alt="" className=""/>
                    <p className="text-[0.8rem] ml-[3%]">Good Product , just what i wanted.</p>
                </div>
                
                <div className="flex h-[2vh]">
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>

                </div>
            </div>
            <div className="flex items-center justify-between my-[2%] ">
                <div className="flex w-[80%] items-center">
                    <img src={customer1} alt="" className=""/>
                    <p className="text-[0.8rem] ml-[3%]">Good Product , just what i wanted.</p>
                </div>
                
                <div className="flex h-[2vh]">
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>

                </div>
            </div>
            <div className="flex items-center justify-between my-[2%] ">
                <div className="flex w-[80%] items-center">
                    <img src={customer1} alt="" className=""/>
                    <p className="text-[0.8rem] ml-[3%]">Good Product , just what i wanted.</p>
                </div>
                
                <div className="flex h-[2vh]">
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>

                </div>
            </div>
            <div className="flex items-center justify-between my-[2%] ">
                <div className="flex w-[80%] items-center">
                    <img src={customer1} alt="" className=""/>
                    <p className="text-[0.8rem] ml-[3%]">Good Product , just what i wanted.</p>
                </div>
                
                <div className="flex h-[2vh]">
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>

                </div>
            </div>
            <div className="flex items-center justify-between my-[2%] ">
                <div className="flex w-[80%] items-center">
                    <img src={customer1} alt="" className=""/>
                    <p className="text-[0.8rem] ml-[3%]">Good Product , just what i wanted.</p>
                </div>
                
                <div className="flex h-[2vh]">
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>
                    <img src={rating} alt="" className=""/>

                </div>
            </div>
            

        </div>
    )
}