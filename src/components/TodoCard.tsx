import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaRegCommentDots } from "react-icons/fa";
import { useState } from "react";
import { MdCancel } from "react-icons/md";


interface TodoCardProps{
    status:string 
    img?:string 
    title:string 
    description?:string 
    comments?:[{id:string,count:number,message:string}]
    team?:string[]
    edit?:()=>void 
    remove?:()=>void
    close?:()=>void 
    
}

function TodoCard({
    status,
    img,
    title,
    description,
    edit:Edit,
    remove:Delete,
    
}:TodoCardProps) {
    const [dropDown,setDropDown]=useState(false)
    const [theme]=useState(localStorage.getItem('theme'))
  return (
    <div className={theme ==="dark"?"p-5 rounded-md shadow-md shadow-white":"p-5 rounded-md shadow-md shadow-black"}>
            {
                img && 
                <div className="">
                     <img src={img} alt="image" className="" />
                </div>
            }
        <div className="flex items-center justify-between relative">
            <span className={(status ==="In Progress" || status === 'En cours')?"text-xs px-3 py-1 bg-orange-200 rounded-md text-orange-800 ":"text-xs text-green-800 rounded-md bg-green-200 px-3 py-1"}>{status}</span>
            {dropDown ?
                <MdCancel className="cursor-pointer" onClick={()=>setDropDown(false)}/>:
                <HiOutlineDotsVertical className="cursor-pointer" onClick={()=>setDropDown(true)} />}
            {dropDown && 
                <div className="absolute w-[20%] -bottom-16 shadow-lg py-1 right-0 flex flex-col space-y-2 bg-gray-200">
                    <span 
                        onClick={Edit}
                        className="hover:text-white text-gray-500 pl-2 hover:bg-blue-500  cursor-pointer"
                    >
                        Edit
                    </span>
                    <span 
                        onClick={Delete}
                        className="hover:text-white text-gray-500 pl-2 hover:bg-blue-500  cursor-pointer"
                    >
                        Delete
                    </span>
                </div>}
        </div>
        <div className="flex flex-col space-y-2 mt-3">
            <span className="font-bold text-md">{title}</span>
            <span className="text-gray-400 ">{description}</span>
        </div>
        <div className="pt-10 flex items-center justify-between border-t-[2px] border-gray-400">
            <div className="flex items-center -space-x-1">
                <img 
                    src="/img/charlize.webp"
                    className="w-6 h-6 rounded-full cursor-pointer"
                />
                <img 
                    src="/img/jeff.webp"
                    className="w-6 h-6 rounded-full cursor-pointer"
                />
                <img 
                    src="/img/christiano.webp"
                    className="w-6 h-6 rounded-full cursor-pointer"
                />
                
            </div>
            <div className="flex items-center space-x-1">
                <FaRegCommentDots />
                <span className="text-gray-500">3</span>
            </div>
        </div>
    </div>
  )
}

export default TodoCard