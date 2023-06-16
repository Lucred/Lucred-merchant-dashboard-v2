import { Link } from 'react-router-dom'
import profille from '../../assets/profille.png'
import { SelectInput, TextInput } from './DashboardAddProduct'

const Profile = () => {
  return (
    <div className={`${window.innerWidth > 768 ? `ml-[15%]`: `ml-[10%]`} mr-[5%] bg-[#1100770A] h-[100vh]`}>
        <div className='mx-[3%]'>
            <div className="flex items-center justify-between">
                <div className='py-[1%]'>
                    <p className='text-[0.7rem]'>Dashboard/Product</p>
                    <h3 className='text-[1.3rem] font-[500]'>Profile</h3>
                </div>
            </div>
            <div className='bg-[#533AE9] mb-[5%] px-[1%] rounded-md flex items-end'>
                <div className='flex items-end h-[20vh]'>
                    <div className='bg-[#fff] w-[150px] h-[150px] rounded-[50%] flex items-center justify-center mb-[-15%]'>
                        <img src={profille} alt="" className='h-[10vh] rounded-full'/>
                    </div>
                    <h3 className='text-[1.3rem] font-[500] text-[#fff]'>Dahunsi Temitope</h3>
                </div>
            </div>
            <div className=' py-[2%] px-[1%] rounded-md lg:grid grid-cols-2 grid-rows-4 gap-x-8 mt-[15%] lg:mt-[0%]'>
                <TextInput label='Email Address' placeholder='DahunsiTemmyforgood@gmail.com' type='email'/>
                <TextInput label='Account Name' placeholder='Dahunsi Temitope' />
                <TextInput label='Company Name' placeholder='EasyGadgets' />
                <TextInput label='Account Number' placeholder='1234567890' type='number' />
                <TextInput label='Contact Number' placeholder='1234567890' type='number' />
                <TextInput label='Bank Name' placeholder='GTB'  />
                <TextInput label='Address' placeholder='House 38/40 Sunshine Estate'  />
                <SelectInput label='Country' value='Nigeria' />
            </div>
            <div className='flex justify-end'>
                <Link to="/dashboard/product" className='bg-[#533AE9] w-[50%] lg:w-[10%] h-[5vh] text-[#fff] rounded-md flex justify-center items-center'>Edit</Link>
            </div>
        </div>
       
       
    </div>
    )
}

export default Profile