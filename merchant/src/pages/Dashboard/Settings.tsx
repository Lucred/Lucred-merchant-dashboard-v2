import { Link } from 'react-router-dom'
import profille from '../../assets/profille.png'
import { TextInput } from './DashboardAddProduct'


const Settings = () => {
  return (
    <div className={`${window.innerWidth > 768 ? `ml-[15%]`: `ml-[10%]`} bg-[#1100770A] mr-[5%] `}>
        <div className='mx-[3%]'>
            <div className="flex items-center justify-between">
                <div>
                    <div className='py-[1%]'>
                        <p className='text-[0.7rem]'>Dashboard/Product</p>
                        <h3 className='text-[1.3rem] font-[500]'>Settings</h3>
                    </div>
                    <h3 className="lg:text-[1.5rem] text-[1.2rem] font-[500]">User Information</h3>
                    <p className="text-[#8C858D] w-[60%] lg:text-[0.9rem] text-[0.6rem]">Here you can edit Public information about yourself Changes will be displayed with 2-5 minutes</p>

                </div>
                <div className='flex flex-col items-center py-[4%]'>
                    <p className='text-[0.8rem]'>Company Logo</p>
                    <div className='bg-[#fff] w-[100px] h-[100px] border border-[#533AE9] border-[5px] rounded-[50%] flex items-center justify-center '>
                        <img src={profille} alt="" className='h-[10vh] rounded-full'/>
                    </div>
                </div>
            </div>

            <div className='flex lg:flex-row flex-col justify-between'>
                <div className='lg:w-[45%]'>
                    <TextInput label='Email Address' type="email" placeholder="DahunsiTemmyforgood@gmail.com" />
                    <div className='flex lg:flex-row flex-col justify-between'>
                        <TextInput label='First Name' type="text" placeholder="Dahunsi" />
                        <TextInput label='Second Name' type="text" placeholder="Temitope" />

                    </div>
                    <TextInput label='Company Name' type="number" placeholder="08030601026" />
                    <TextInput label='Address' type="text" placeholder="House 38/40 Sunshine Estate" />

                </div >
                <div className='lg:w-[45%]'>
                    <TextInput label='Contact Number' type="number" placeholder="08030601026" />
                    <TextInput label='Account Name' type="text" placeholder="Dahunsi Temitope" />
                    <TextInput label='Account Number' type="number" placeholder="1234567890" />
                    <TextInput label='Bank Name' type="text" placeholder="GTB" />
                    <TextInput label='Account Type' type="text" placeholder="Current" />

                </div>

            </div>
            <div className='flex justify-end  py-[5%]'>
                    <Link to="" className='bg-[#FFF] lg:w-[20%] w-[50%] h-[5vh] text-[#533AE9] mr-[5%] rounded-md flex justify-center items-center'>Cancel</Link>
                    <Link to="" className='bg-[#533AE9] lg:w-[20%] w-[50%] h-[5vh] text-[#fff] rounded-md flex justify-center items-center'>Save Changes</Link>
            </div>
        </div>
    </div>
  )
}

export default Settings