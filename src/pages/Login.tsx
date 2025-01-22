import lucred from "../assets/lucred.png";
import mi from "../assets/mi.png";
import apple from "../assets/apple.png";
import huawei from "../assets/huawei.png";
import alcatel from "../assets/alcatel.png";
import loginImg from "../assets/loginImg.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, resetUser } from "../redux/actions";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(1);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // Convert email to lowercase if the field is email
    const processedValue = name === "email" ? value.toLowerCase() : value;
    setFormData({ ...formData, [name]: processedValue });
  };

  const dispatch = useDispatch() as unknown as any;

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    console.log("Form submitted", formData);
    await dispatch(loginUser(formData));
    setLoading(false);
  };

  const handleReset = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    await dispatch(resetUser(formData.email));
    setLoading(false);
  };

  return (
    <div className='flex lg:flex-row flex-col justify-between px-[5%] py-[3%] h-[100vh]'>
      <div className='xl:w-[50%] lg:w-[60%]  py-[5%] lg:block flex flex-col items-center justify-center'>
        <img src={lucred} alt='Lucred' />
        {tab === 1 ? (
          <div className='text-center space-y-8 md:space-y-3  lg:text-left w-full'>
            <div className='mt-4'>
              <h3 className='font-[500] text-[2.4rem]'>Welcome back</h3>
              <p className='text-[#8C858D]'>
                Welcome back! Please enter your details.{" "}
              </p>
            </div>
            <div className='text-left my-[2%]'>
              <label className='text-[#171515]'>Email</label>
              <br></br>
              <input
                type='text'
                name='email'
                placeholder='Enter your email'
                className='border rounded-md h-12 w-[100%] lg:w-[70%] pl-[5%] py-[1%]'
                onChange={handleChange}
              />
            </div>
            <div className='text-left'>
              <label>Password</label>
              <br></br>
              <input
                type='password'
                name='password'
                placeholder='Enter your password'
                className='border rounded-md w-[100%] h-12 lg:w-[70%] pl-[5%] py-[1%]'
                onChange={handleChange}
              />
            </div>
            <div className='flex justify-between items-center w-[100%] lg:w-[70%] my-[2%]'>
              <div className=' flex xl:w-[50%] lg:w-[35%] items-center'>
                <input type='checkbox' className='bg-[#533AE9]' />
                <label className='ml-[5px]'>Remember me</label>
              </div>
              <p
                className='text-black bg-[transparent]'
                onClick={() => setTab((tab) => tab + 1)}
              >
                Forgot password?
              </p>
            </div>
            <button
              className='bg-[#533AE9] text-white rounded-md w-[70%]'
              disabled={loading}
              onClick={handleSubmit}
              onKeyDown={handleSubmit}
            >
              {loading ? "Please wait..." : "Sign in"}
            </button>
            <p className=' text-center text-[.8rem] lg:w-[70%] my-[3%]'>
              Want to become a Merchant? <Link to={""}>Sign up</Link>
            </p>
          </div>
        ) : (
          <div className='text-center lg:text-left'>
            <div className='mt-[15%]'>
              <h3 className='font-[500] text-[2.4rem]'>Trouble logging in?</h3>
              <p className='text-[#8C858D]'>
                Enter your email and we'll send you a link to get back into your
                account.{" "}
              </p>
            </div>
            <div className='text-left my-[2%]'>
              <label className='text-[#171515]'>Email</label>
              <br></br>
              <input
                type='text'
                name='email'
                placeholder='Enter your email'
                className='border rounded-md w-[100%] lg:w-[70%] pl-[5%] py-[1%]'
                onChange={handleChange}
              />
            </div>
            <div className='flex justify-end items-end w-[100%] lg:w-[70%] my-[2%]'>
              <button
                className='text-black bg-[transparent]'
                onClick={() => setTab((tab) => tab - 1)}
              >
                Login
              </button>
            </div>
            <button
              className='bg-[#533AE9] text-white rounded-md w-[70%]'
              disabled={loading}
              onClick={handleReset}
              onKeyDown={handleReset}
            >
              {loading ? "Please wait..." : "Send login link"}
            </button>
          </div>
        )}
        <div className='flex items-center mt-[10%]'>
          <img src={mi} alt='mi' className='w-[40px] h-[40px] mr-[5px]' />
          <img src={apple} alt='apple' className='w-[40px] h-[40px] mr-[5px]' />
          <img
            src={huawei}
            alt='huawei'
            className='w-[40px] h-[40px] mr-[5px]'
          />
          <img
            src={alcatel}
            alt='alcatel'
            className='w-[40px] h-[40px] mr-[5px]'
          />
          <p className='text-[.8rem]'>Join over 1000+ Merchants</p>
        </div>
      </div>
      <div className='hidden lg:flex flex-col items-center justify-center bg-[#1100770A] xl:none xl:w-[50%] lg:w-[45%] rounded-md py-[5%] text-center'>
        <h2 className='text-[1.5rem] lg:text-[2.2rem] text-[#110077] font-[600]'>
          Increase Sales with Lucred
        </h2>
        <p className='w-[70%] mx-auto text-[0.9rem]'>
          Allow your customers buy now and pay overtime at zero-cost to you,
          increase revenue by 50%
        </p>
        <img
          src={loginImg}
          alt='loginImg'
          className='lg:h-[35vh] xl:h-[65vh] my-[3%]'
        />
      </div>
    </div>
  );
};

export default Login;
