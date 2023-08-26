import { Circles } from "react-loader-spinner"


const Loader = () => {
  return (
    <div className="fixed top-[0%] left-[0%] h-[100vh] w-[100%] flex justify-center items-center bg-[#fff] z-[16]"><Circles
  height="80"
  width="80"
  color="#533ae9"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/></div>
  )
}

export default Loader