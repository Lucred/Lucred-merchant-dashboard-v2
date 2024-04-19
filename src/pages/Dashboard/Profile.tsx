import { Link } from 'react-router-dom'
import profille from '../../assets/profille.png'
import { SelectInput, TextInput } from './DashboardAddProduct'
import { useEffect, useRef, useState } from 'react'
import { getMerchant, updateLogo } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

const Profile = () => {
    const [imgFile, setImgFile] = useState('')

    const [imageData, setimageData] = useState<any>({})

    const [formData, setFormData] = useState<any>({})

    const id = localStorage.getItem("userId") as string
    const logo = localStorage.getItem("logo")
    const dispatch = useDispatch() as unknown as any

    const inputRef = useRef<any>()

    const handleRef = () => {
        inputRef.current.click()
    }

    const handleLogoChange = (e: any) => {
        setImgFile(URL.createObjectURL(e.target.files[0]))
        setimageData({
            ...imageData, [e.target.name]: e.target.files[0]
        })
    }

    const handleLogo = async (e: any) => {
        e.preventDefault()
        await dispatch(updateLogo({ id, imageData }))
    }

    const handleChange = (e: any) => {
        setimageData({
            ...formData, [e.target.name]: e.target.files[0]
        })
    }

    const merchant = useSelector((state: any) => state.merchant)

    console.log(merchant)

    useEffect(() => {
        dispatch(getMerchant(id))
    }, [])

    return (
        <div className={`${window.innerWidth > 768 ? `ml-[15%]` : `ml-[10%]`} mr-[5%] bg-[#1100770A] min-h-[100vh]`} >
            <div className='mx-[3%]'>
                <div className="flex items-center justify-between">
                    <div className='py-[1%]'>
                        <p className='text-[0.7rem]'>Dashboard/Profile</p>
                        <h3 className='text-[1.3rem] font-[500]'>Profile</h3>
                    </div>
                </div>
                <div className='bg-[#533AE9] mb-[6%] px-[1%] rounded-md flex items-end'>
                    <div className='flex items-end h-[20vh]'>
                        <div className='bg-[#fff] w-[150px] h-[150px] rounded-[50%] flex items-center justify-center mb-[-21%]' >
                            {!imgFile ? <img src={logo || profille} alt="" className='w-[150px] h-[150px] object-cover object-top rounded-[50%]' onClick={handleRef} /> :
                                <img src={imgFile} alt="" className='w-[150px] h-[150px] object-cover object-top rounded-[50%]' onClick={handleRef} />}
                            <input name="logo" type="file" ref={inputRef} onChange={handleLogoChange} className="hidden" />
                        </div>
                        {/* <p onClick={handleLogo}>Enter</p> */}
                        <h3 className='text-[1.3rem] font-[500] text-[#fff] ml-[10px]'>{merchant.firstname + ' ' + merchant.lastname}</h3>

                    </div>

                </div>
                <button onClick={handleLogo} className='bg-[#533AE9] text-[#fff]'>update logo</button>
                <div className=' py-[2%] px-[1%] rounded-md lg:grid grid-cols-2 grid-rows-4 gap-x-8 mt-[15%] lg:mt-[0%]' >
                    <TextInput label='Email Address' placeholder='Email Address' type='email' value={merchant.email} onChange={handleChange} readonly={true} />
                    <TextInput label='Account Name' placeholder='Account Name' onChange={handleChange} value={merchant.bankAccountInfo?.accountName} readonly={true} />
                    <TextInput label='Company Name' placeholder='Company Name' onChange={handleChange} value={merchant.companyName} readonly={true} />
                    <TextInput label='Account Number' placeholder='Account Number' type='number' onChange={handleChange} value={merchant.bankAccountInfo?.accountNumber} readonly={true} />
                    <TextInput label='Contact Number' placeholder='Contact Number' type='number' onChange={handleChange} value={merchant.phone} readonly={true} />
                    <TextInput label='Bank Name' placeholder='Bank Name' onChange={handleChange} value={merchant.bankAccountInfo?.bankName} readonly={true} />
                    <TextInput label='Address' placeholder='Address' value={"N/A"} onChange={handleChange} readonly={true} />
                    <SelectInput label='Country' value='Country' onChange={handleChange} readonly={true} />
                </div>
                <div className='flex justify-end'>
                    <Link to="/dashboard/settings" className='bg-[#533AE9] w-[50%] lg:w-[10%] h-[5vh] text-[#fff] rounded-md flex justify-center items-center'>Edit</Link>
                </div>
            </div>


        </div>
    )
}

export default Profile