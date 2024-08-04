
import {CiSearch} from "react-icons/ci"
const Header = () =>{
    return(
        <div className="flex justify-between fixed top-0 left-0 w-full h-16 bg-white md:hidden">
         <span className=" m-4 bg-gradient-to-r from-red-600 to-blue-600 text-transparent bg-clip-text font-bold text-2xl">
          Photogram
        </span>
            <div className='flex items-center p-2 m-4 bg-gray-200 rounded-xl outline-none w-1/2 h-10'>
        <CiSearch size="20px" />
        <input type="text" className='bg-transparent outline-none px-2' placeholder='Search' />
      </div>
        </div>
    )
}

export default Header