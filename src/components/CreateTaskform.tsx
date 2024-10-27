import { useState } from "react"
import { useTranslation } from "react-i18next"
import {MdCancel} from 'react-icons/md'

interface createTaskformProps{
    className:string 
    close:()=>void
    onChange:(e:any)=>void
    addTask:()=>void 
    loading:boolean
}

function CreateTaskform({
    className,
    close,
    onChange,
    addTask,
    loading
}:createTaskformProps) {
    const [theme] = useState(localStorage.getItem('theme'))
    const {t}=useTranslation()
    
  return (
    <div className={className}>
        <MdCancel className="absolute -top-2 -right-2 cursor-pointer" color={theme ==='dark'? "gray":"black"} size={40}  onClick={close}/>
        <div className="flex items-center justify-center">
            <span className="font-bold text-black">ADD New Task</span>
        </div>
        
        <div className="w-[100%] mx-auto mt-10">
            <p className="text-black font-semibold">Title</p>
            <input 
                placeholder={t("add-title")}
                className="py-2 w-[90%] indent-2 rounded-md outline-none"
                onChange={onChange}
            />
        </div>
        <div className="w-2/4 mx-auto mt-5 md:mt-10">
            <button onClick={addTask} className="w-full py-1 md:py-2 rounded-md bg-blue-500 text-white">{loading ?"Adding task":t("add-task")}</button>
        </div>
        
    </div>
  )
}

export default CreateTaskform