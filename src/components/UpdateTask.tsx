import { useState } from "react"
import { useTranslation } from "react-i18next"
import {MdCancel} from 'react-icons/md'

interface updateTaskformProps{
    todo?:string 
    completed?:boolean 
    userId?:number 
    className:string 
    close:()=>void
    onChange:(e:any)=>void
    updateTask:()=>void 
    loading:boolean
    
}

function UpdateTaskform({
    todo,
    completed,
    className,
    close,
    onChange,
    updateTask,
    loading
}:updateTaskformProps) {
    const [theme] = useState(localStorage.getItem('theme'))
    const [isChecked,setIsChecked]=useState(completed ? true:false)
    const {t}=useTranslation()
    
  return (
    <div className={className}>
        <MdCancel className="absolute -top-2 -right-2 cursor-pointer" color={theme ==='dark'? "gray":"black"} size={40}  onClick={close}/>
        <div className="flex items-center justify-center">
            <span className="font-bold text-black">Update Task</span>
        </div>
        
        <div className="w-[100%] mx-auto mt-10">
            <input 
                placeholder={todo}
                value={todo}
                className="py-2 w-[90%] indent-2 rounded-md outline-none"
                onChange={onChange}
            />
            <div className="flex space-x-2 items-center mt-2">
                <input 
                    checked={isChecked}
                    type="checkbox"
                    className=""
                    onChange={()=>setIsChecked(!isChecked)}
                />
                <span className="text-black font-semibold">completed</span>
            </div>
        </div>
        <div className="w-2/4 mx-auto mt-5 md:mt-10">
            <button disabled={loading} onClick={updateTask} className="w-full py-1 md:py-2 rounded-md bg-blue-500 text-white">{loading ?"Updading task...":t("update-task")}</button>
        </div>
        
    </div>
  )
}

export default UpdateTaskform