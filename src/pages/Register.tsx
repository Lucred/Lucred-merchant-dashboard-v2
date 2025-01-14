import lucred from "../assets/lucred.png";
import mi from "../assets/mi.png";
import apple from "../assets/apple.png";
import huawei from "../assets/huawei.png";
import alcatel from "../assets/alcatel.png";
import loginImg from "../assets/loginImg.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState<any>({
    firstname: "",
    lastname: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch() as unknown as any;

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    console.log("Form submitted", formData);
    await dispatch(registerUser(formData));
    setLoading(false);
  };

  return (
    <div className='flex lg:flex-row flex-col justify-between px-[5%] py-[3%] h-[100vh]'>
      <div className='xl:w-[50%] lg:w-[60%]  py-[5%] lg:block flex flex-col items-center justify-center'>
        <img src={lucred} alt='Lucred' />
        <div className='text-center lg:text-left'>
          <div className='mt-[15%]'>
            <h3 className='font-[500] text-[2.4rem]'>Create an Account</h3>
            <p className='text-[#8C858D]'>
              Fill in the form to create a new account.
            </p>
          </div>
          <div className='text-left my-[2%]'>
            <label className='text-[#171515]'>First Name</label>
            <br></br>
            <input
              type='text'
              name='firstname'
              placeholder='Enter your first name'
              className='border rounded-md w-[100%] lg:w-[70%] pl-[5%] py-[1%]'
              onChange={handleChange}
            />
          </div>
          <div className='text-left my-[2%]'>
            <label className='text-[#171515]'>Last Name</label>
            <br></br>
            <input
              type='text'
              name='lastname'
              placeholder='Enter your last name'
              className='border rounded-md w-[100%] lg:w-[70%] pl-[5%] py-[1%]'
              onChange={handleChange}
            />
          </div>
          <div className='text-left my-[2%]'>
            <label className='text-[#171515]'>Date of Birth</label>
            <br></br>
            <input
              type='date'
              name='dob'
              className='border rounded-md w-[100%] lg:w-[70%] pl-[5%] py-[1%]'
              onChange={handleChange}
            />
          </div>
          <div className='text-left my-[2%]'>
            <label className='text-[#171515]'>Phone Number</label>
            <br></br>
            <input
              type='text'
              name='phone'
              placeholder='Enter your phone number'
              className='border rounded-md w-[100%] lg:w-[70%] pl-[5%] py-[1%]'
              onChange={handleChange}
            />
          </div>
          <div className='text-left'>
            <label>Email</label>
            <br></br>
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              className='border rounded-md w-[100%] lg:w-[70%] pl-[5%] py-[1%]'
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
              className='border rounded-md w-[100%] lg:w-[70%] pl-[5%] py-[1%]'
              onChange={handleChange}
            />
          </div>
          <div className='text-left'>
            <label>Confirm Password</label>
            <br></br>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm your password'
              className='border rounded-md w-[100%] lg:w-[70%] pl-[5%] py-[1%]'
              onChange={handleChange}
            />
          </div>
          <button
            className='bg-[#533AE9] text-white rounded-md w-[70%] mt-[2%]'
            disabled={loading}
            onClick={handleSubmit}
            onKeyDown={handleSubmit}
          >
            {loading ? "Please wait..." : "Sign up"}
          </button>
          <p className=' text-center text-[.8rem] lg:w-[70%] my-[3%]'>
            Already have an account? <Link to={"/login"}>Sign in</Link>
          </p>
        </div>
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

export default Register;
