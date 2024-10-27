import { GoHome } from "react-icons/go";
import { 
    CiMail,
    CiFileOn,
    CiFolderOn,
    CiCirclePlus,
    CiSettings,
    CiUser 
} from "react-icons/ci";
import { LuFileLineChart } from "react-icons/lu";
import { useState } from "react";




function LeftSideBar() {
    const [select]=useState("home")
  return (
    <section className="hidden md:flex md:flex-col justify-between h-screen w-[5%]  items-center py-5 border-r-[1px] border-gray-300">
        <div className="">
            <span className="">Logo</span>
            <div className="flex flex-col space-y-5 mt-10">
                <GoHome size={26} color={select === "home"?"blue" :"gray"} className={"cursor-pointer"}/>
                <CiMail size={26} color="gray" className="cursor-pointer"/>
                <CiFileOn size={26} color="gray" className="cursor-pointer"/>
                <CiFolderOn size={26} color="gray" className="cursor-pointer"/>
                <LuFileLineChart size={26} color="gray" className="cursor-pointer"/>
            </div>
            
        </div>
        <div className="flex flex-col space-y-2">
            <div className="w-9 h-9 relative">
                <div className="w-2 h-2 rounded-full bg-green-400 absolute top-0 right-1"></div>
                <img 
                    src="/img/charlize.webp"
                    alt="profile"
                    className="w-8 h-8 rounded-full cursor-pointer"
                />
            </div>
            <div className="w-9 h-9 relative">
                <div className="w-2 h-2 rounded-full bg-green-400 absolute top-0 right-1"></div>
                <img 
                    src="/img/christiano.webp"
                    alt="profile"
                    className="w-8 h-8 rounded-full cursor-pointer"
                />
            </div>
            <div className="w-9 h-9 relative">
                
                <img 
                    src="/img/jeff.webp"
                    alt="profile"
                    className="w-8 h-8 rounded-full cursor-pointer"
                />
            </div>
            <CiCirclePlus size={38} color="gray" className="cursor-pointer" />
            
        </div>
        <div className="flex-col flex space-y-5">
            <CiSettings size={26} color="gray" className="cursor-pointer"/>
            <CiUser size={26} color="gray" className="cursor-pointer"/>
        </div>
        
    </section>
  )
}

export default LeftSideBar