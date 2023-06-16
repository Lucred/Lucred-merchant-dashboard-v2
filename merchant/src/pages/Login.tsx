import lucred from '../assets/lucred.png'
import mi from '../assets/mi.png'
import apple from '../assets/apple.png'
import huawei from '../assets/huawei.png'
import alcatel from '../assets/alcatel.png'
import loginImg from '../assets/loginImg.png'

const Login = () => {
  return (
    <div className='flex lg:flex-row flex-col justify-between px-[5%] py-[3%] h-[100vh] '>
        <div className='xl:w-[50%] lg:w-[60%]  py-[5%] pl-[5%] lg:block flex flex-col items-center justify-center'>
            <img src={lucred} alt="Lucred" />
            <div className='text-center lg:text-left'>
                <div className='mt-[15%]'>
                    <h3 className='font-[500] text-[2.4rem]'>Welcome back</h3>
                    <p className='text-[#8C858D]'>Welcome back! Please enter your details. </p>
                </div>
                <div className='text-left my-[2%]' >
                    <label className='text-[#171515]'>Email</label><br></br>
                    <input type="text" placeholder="Enter your email" className='border rounded-md w-[100%] lg:w-[70%] pl-[5%] py-[1%]' />
                </div>
                <div  className='text-left'>
                    <label>Password</label><br></br>
                    <input type="password" placeholder="Enter your password" className='border rounded-md w-[100%] lg:w-[70%] pl-[5%] py-[1%]' />
                </div>
                <div className='flex justify-between items-center w-[100%] lg:w-[70%] my-[2%]'>
                    <div className=' flex w-[35%] justify-between items-center'>
                        <input type="checkbox" className='bg-[#533AE9]'/>
                        <label className=''>Remember me</label>
                    </div>
                    <p>Forgot password?</p> 
                </div>
                <button className='bg-[#533AE9] text-white rounded-md w-[70%]'>Sign in</button>
                <p className=' text-center lg:w-[70%] my-[3%]'>Want to become a Merchant? Sign up</p> 
                <div className='flex items-center mt-[10%]'>
                    <img src={mi} alt="mi" />
                    <img src={apple} alt="apple" />
                    <img src={huawei} alt="huawei" />
                    <img src={alcatel} alt="alcatel" />
                    <p>Join over 1000+ Merchants</p>
                </div>
            </div>

        </div>
        <div className='flex flex-col items-center justify-center bg-[#1100770A] xl:w-[50%] lg:w-[45%] rounded-md py-[5%] text-center'>
            <h2 className='text-[1.5rem] lg:text-[2.2rem] text-[#110077] font-[600]'>Increase Sales with Lucred</h2>
            <p className='w-[70%] mx-auto text-[0.9rem]'>Allow your customers buy now and pay overtime at zero-cost to you, increase revenu by 50%</p>
            <img src={loginImg} alt="loginImg" className='lg:h-[35vh] xl:h-[65vh] my-[3%]' />
        </div>
        
    </div>
  )
}

export default Login