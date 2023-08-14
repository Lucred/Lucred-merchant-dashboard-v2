import { Link } from 'react-router-dom'
import profille from '../../assets/profille.png'
import { TextInput } from './DashboardAddProduct'
import { useState } from 'react'
import { updateProfile } from '../../redux/actions'
import { useDispatch } from 'react-redux'


const Settings = () => {
    const [formData, setFormData] = useState<any>({
        firstname:"",
        lastname:"",
        bankAccountInfo:{
            accountName:"",
            accountNumber:"",
            bankName:"",
            bankCode:"153",
            bankAccountType:""
        },

    })

    const handleChange = (e:any) =>{
        const {name,value} = e.target
        setFormData({
            ...formData, [name]: value
        })
    }

    const handleBankChange = (e:any) =>{
        const {name,value} = e.target
        setFormData({
            ...formData, bankAccountInfo:{
                ...formData.bankAccountInfo, [name]: value
            }
        })
    }

    const id = localStorage.getItem("userId")
    const logo = localStorage.getItem("logo")

    const dispatch = useDispatch() as unknown as any

    const handleSubmit = async(e:any) =>{
        e.preventDefault()
        await dispatch(updateProfile({id,formData}))
    }

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
                        <img src={logo || profille} alt="" className='w-[90px] h-[90px] object-cover object-top rounded-[50%]' />
                    </div>
                </div>
            </div>

            <div className='flex lg:flex-row flex-col justify-between'>
                <div className='lg:w-[45%]'>
                    <TextInput label='Email Address' type="email" placeholder="DahunsiTemmyforgood@gmail.com" />
                    <div className='flex lg:flex-row flex-col justify-between'>
                        <TextInput label='First Name' name="firstname" value={formData.firstName} type="text" placeholder="Dahunsi" onChange={handleChange} />
                        <TextInput label='Second Name' name="lastname" value={formData.lastName} type="text" placeholder="Temitope" onChange={handleChange} />

                    </div>
                    <TextInput label='Company Name' type="text" placeholder="COMPANY XYZ" />
                    <TextInput label='Address' type="text" placeholder="House 38/40 Sunshine Estate" />

                </div >
                <div className='lg:w-[45%]'>
                    <TextInput label='Contact Number'  type="number" placeholder="08030601026" />
                    <TextInput label='Account Name' name={'accountName'} value={formData.bankAccountInfo.accountName} type="text" placeholder="Dahunsi Temitope" onChange={handleBankChange} />
                    <TextInput label='Account Number' name={'accountNumber'} value={formData.bankAccountInfo.accountNumber} type="number" placeholder="1234567890" onChange={handleBankChange} />
                    <TextInput label='Bank Name' name={'bankName'} value={formData.bankAccountInfo.bankName} type="text" placeholder="GTB" onChange={handleBankChange} />
                    <TextInput label='Account Type' name={'bankAccountType'} value={formData.bankAccountInfo.bankAccountType} type="text" placeholder="Current" onChange={handleBankChange} />

                </div>

            </div>
            <div className='flex justify-end  py-[5%]'>
                    <Link to="" className='bg-[#FFF] lg:w-[20%] w-[50%] h-[5vh] text-[#533AE9] mr-[5%] rounded-md flex justify-center items-center'>Cancel</Link>
                    <button className='bg-[#533AE9] lg:w-[20%] w-[50%] h-[5vh] text-[#fff] rounded-md flex justify-center items-center' onClick={handleSubmit}>Save Changes</button>
            </div>
        </div>
    </div>
  )
}

export default Settings