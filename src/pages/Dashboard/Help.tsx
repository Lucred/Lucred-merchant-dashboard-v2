import avatar from "../../assets/avatar.png";
import attachment from "../../assets/attachment.png";
import send from "../../assets/send.png";
import { IoAddCircleSharp } from "react-icons/io5";
import { AiFillMinusCircle } from "react-icons/ai";
import { useState, useRef } from "react";
import { faqData } from "../../data/faq";

const Help = () => {
  const [active, setActive] = useState<number | null>(null)

  const handleClick = (index: number) => {
      setActive(active === index ? null : index);
    };

  return (
    <div className="bg-[#000000A5] flex justify-center fixed left-[0%] top-[0%] w-[100%] h-[100vh] py-[5%]">
      <div className="bg-[#fff] flex justify-between items-center  w-[80%]  rounded-md px-[5%]">
        <div className="w-[50%]">
          <div className="bg-[#533AE9] w-[80%] h-[75vh] rounded-xl">
            <div className="flex justify-center items-center py-[5%]">
              <img src={avatar} alt="" className="w-[13%]" />
              <div className="text-[#fff] ml-[5%]">
                <h3>Hello</h3>
                <p>We are here to help</p>
              </div>
            </div>
          </div>
          <div className="bg-[#fff] w-[28%] h-[60vh] rounded-[20px] absolute top-[28%] flex items-end justify-center ">
            <div className="bg-[#1100771A] flex justify-evenly items-center h-[7vh] px-[1%] my-[5%] rounded-md w-[80%]">
              <input
                type="text"
                placeholder="Ask us any question"
                className="bg-[transparent] w-[70%]"
              />
              <img src={attachment} alt="" className="h-[3vh]" />
              <img src={send} alt="" className="h-[3vh]" />
            </div>
          </div>
        </div>

        <div className="w-[40%] overflow-scroll">
          {faqData.map((elem,index) => (<div  className="my-[5%]">
            <h3 className="text-[#171515] text-[1.5rem] font-[600] flex items-center">
               {active !== index ?<IoAddCircleSharp onClick={() =>handleClick(index)} />: <AiFillMinusCircle onClick={() =>handleClick(index)} />} {elem.text}
            </h3>
            {active === index &&<p className="text-[0.8rem] w-[100%]">
              {elem.answer}
            </p>}
          </div>))}
         
        </div>
      </div>
    </div>
  );
};

export default Help;
