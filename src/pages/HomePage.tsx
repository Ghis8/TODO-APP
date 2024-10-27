import { useTranslation } from "react-i18next";
import LeftSideBar from "../components/LeftSideBar"
import RightSideBar from "../components/RightSideBar"
import { CiCirclePlus, CiSearch } from "react-icons/ci";
import { PiMoonThin,PiSunDimThin ,PiBellLight} from "react-icons/pi";
import { useEffect, useState } from "react";
import { GoLink } from "react-icons/go";
import { CiGrid2H,CiGrid41 } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { useAddTaskMutation, useDeleteTaskMutation, useEditTaskMutation, useGetAllTasksQuery } from "../redux/services/task";
import { TaskProps } from "../app";
import Loader from "../components/Loader";
import TodoCard from "../components/TodoCard";
import { MdCancel } from "react-icons/md";
import CreateTaskform from "../components/CreateTaskform";
import toast from "react-hot-toast";
import UpdateTaskform from "../components/UpdateTask";


function HomePage() {
    const {data,isLoading,isError,error,isSuccess}=useGetAllTasksQuery('')
    const [
        addTask,
        {
            data:addTaskData,
            isSuccess:addTaskIsSuccess,
            isLoading:addTaskIsLoading,
            isError:addTaskIsError,
            error:addTaskError
        }
    ]=useAddTaskMutation()

    const [
        editTask,
        {
            data:editTaskData,
            isLoading:editTaskIsLoading ,
            isError:editTaskIsError,
            error:editTaskError,
            isSuccess:editTaskIsSuccess
        }
    ]=useEditTaskMutation()

    const [
        deleteTask,
        {
            data:deleteTaskData,
            isError:deleteTaskIsError,
            error:deleteTaskError,
            isSuccess:deleteTaskIsSuccess
        }
    ]=useDeleteTaskMutation()


    const [filterSelect,setFilterSelect]=useState({
        all:true,
        todo:false,
        completed:false
    })

    const [todos,setToDos]=useState<TaskProps[]>([])

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [newTask,setNewTask]=useState<boolean>(false)
    const [updateTask,setUpdateTask]=useState(false)
    const[task,setTask]=useState('')
    const [search,setSearch]=useState(false)
    const [selectedTask,setSelectedTask]=useState({
        id:0,
        todo:"",
        completed:false,
        userId:0
    })
    
    const [searchWord,setSearchWord]=useState('')
    const {t,i18n}=useTranslation()
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lng", lng);
      };

      const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      };

      const handleSearch=(e:any)=>{
        setSearchWord(e.target.value)
        if(searchWord.length > 0){
            setSearch(true)
        }
        if(searchWord.length === 0){
            setSearch(false)
        }
      }

      //! Create task Responses
      useEffect(()=>{
        if(addTaskData && addTaskIsSuccess){
            // console.log("added new task",addTaskData)
            setToDos([...todos,addTaskData])
            setNewTask(false)
            toast.success(t("task-added-success"))
            
        }   
        if(addTaskIsError){
            console.log("Add Task error",addTaskError)
            toast.error(t("task-added-error"))
        }
      },[addTaskIsError,addTaskIsSuccess])


      //! Edit Task Responses
      useEffect(()=>{
        if(editTaskData && editTaskIsSuccess){
            console.log("Data edited",editTaskData)
            setToDos((prev)=>prev.map(item=>item.id === editTaskData.id ? editTaskData :item))
            toast.success(t("task-updated-successfully"))
            setUpdateTask(false)
        }
        if(editTaskIsError){
            console.log("edit task error",editTaskError)
            toast.error(t("task-update-error"))
            setUpdateTask(false)
        }
      },[editTaskIsError,editTaskIsSuccess])

      //!Delete Task  responses
      useEffect(()=>{
        if(deleteTaskIsSuccess && deleteTaskData){
            // console.log("deleted task",deleteTaskData)
            setToDos(todos.filter(item=>item.id !== deleteTaskData.id))
            console.log("new todos",todos)
            toast.success(t("task-delete-success"))
        }
        if(deleteTaskIsError){
            console.log("delete task Error",deleteTaskError)
            toast.error(t("task-delete-error"))
        }
      },[deleteTaskIsError,deleteTaskIsSuccess])


      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }, [theme]);



      useEffect(()=>{
        if(isSuccess && data){
            console.log("todo Data->",data)
            setToDos(data.todos)
        }
        if(isError){
            console.log("Todo Error->",error)
        }
      },[isError,isSuccess])


  return (
    <section className="flex h-[100vh] w-[100vw]">
        <LeftSideBar />
        <main className="px-0 relative pb-5 w-[100%] overflow-y-auto no-scrollbar">
            {
                newTask && 
                <CreateTaskform 
                    loading={addTaskIsLoading}
                    onChange={(e:any)=>setTask(e.target.value.trim())}
                    addTask={()=>addTask({
                        todo:task,
                        completed:false,
                        userId:5
                    })}
                    close={()=>setNewTask(false)}
                    className="w-[80%] h-[30%] md:w-[500px] md:h-[300px] p-5 z-50 fixed top-[40%] left-[10%] md:top-56 md:left-[30%] bg-gray-200 shadow-lg rounded-md"
                />
            }
            {
                updateTask && 
                <UpdateTaskform 
                    
                    todo={selectedTask.todo}
                    completed={selectedTask.completed}
                    close={()=>{
                        setUpdateTask(false)
                    }}
                    onChange={()=>{}}
                    updateTask={()=>{
                        console.log("selected task",selectedTask)
                        editTask({id:selectedTask.id,data:{
                            completed:!selectedTask.completed
                        }})
                    }}
                    loading={editTaskIsLoading}
                    className="w-[80%] h-[30%] md:w-[500px] md:h-[300px] p-5 z-50 fixed top-[40%] left-[10%] md:top-56 md:left-[30%] bg-gray-200 shadow-lg rounded-md"
                />
            }
            <div className={`sticky top-0 z-30 bg-gray-200 p-5 rounded-b-md`}>
                <div className="flex flex-col-reverse md:flex-row items-center justify-between mb-5 py-5">
                    <div className="w-[100%] mt-5 md:mt-0 md:w-2/5 relative">
                        {
                            searchWord.length > 0 ? 
                                <MdCancel onClick={()=>{
                                    setSearch(false)
                                    setSearchWord('')
                                }} size={24} color="gray" className="cursor-pointer absolute right-2 top-2" />:
                                <CiSearch size={24} color="gray" className="cursor-pointer absolute right-2 top-2" />
                        }
                        
                        <input 
                            onChange={handleSearch}
                            value={searchWord}
                            placeholder="Search"
                            className="indent-2 bg-gray-100  rounded-md w-full py-2 outline-none"
                        />
                    </div>
                    <div className="flex w-[100%] justify-end  items-center space-x-2 md:space-x-4">
                            {
                                theme === 'light' ? 
                                <div onClick={toggleTheme} className="w-8 h-8 rounded-md bg-gray-100 cursor-pointer flex items-center justify-center">
                                    <PiMoonThin size={24} color="gray" />
                                </div>:
                                <div onClick={toggleTheme} className="w-8 h-8 rounded-md bg-gray-100 cursor-pointer flex items-center justify-center">
                                    <PiSunDimThin size={24} color="gray" />
                                </div>
                            }
                            
                            <div className="w-8 h-8 rounded-md relative bg-gray-100 cursor-pointer flex items-center justify-center">
                                <div className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-2"></div>
                                <PiBellLight size={24} color="gray" />
                            </div>
                            <div className="text-gray-500">
                                <select
                                    onChange={(e) => changeLanguage(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-4 py-1 outline-none"
                                    value={i18n.language} 
                                >
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                </select>
                            </div>
                    </div>
                </div>
                <div className="flex items-center justify-between my-5">
                    <div className="hidden md:flex space-x-10 items-center text-gray-500">
                        <select className=" capitalize  rounded-lg px-4 py-1 outline-none">
                            <option value="limited">{t("limited")}</option>
                        </select>
                        <div className="flex items-center space-x-5">
                            <div className="flex items-center -space-x-1">
                                <img 
                                    src="/img/charlize.webp"
                                    className="w-7 h-7 rounded-full cursor-pointer"
                                />
                                <img 
                                    src="/img/jeff.webp"
                                    className="w-7 h-7 rounded-full cursor-pointer"
                                />
                                <img 
                                    src="/img/christiano.webp"
                                    className="w-7 h-7 rounded-full cursor-pointer"
                                />
                                <img 
                                    src="/img/mark.jpeg"
                                    className="w-7 h-7 rounded-full cursor-pointer"
                                />
                                <div className="bg-gray-300 w-7 h-7 rounded-full cursor-pointer flex items-center justify-center">
                                    <span className="text-xs font-semibold">+2</span>
                                </div>
                            </div>
                            <CiCirclePlus size={34} color="blue" className="cursor-pointer" />
                        </div>
                    </div>
                    <div className="flex space-x-5 items-center">
                        <GoLink color="blue" size={14} className="cursor-pointer" />
                        <div className="border-l-[1px] border-gray-300 pl-5 flex items-center space-x-3">
                            <CiGrid2H size={24} color="gray" />
                            <CiGrid41 size={24} color="gray" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex space-x-5 items-center">
                        <button 
                            onClick={()=>setFilterSelect({...filterSelect,all:true,todo:false,completed:false})}
                            className={filterSelect.all ?"flex border-b-4 border-b-blue-700 items-center space-x-1 md:space-x-2":"flex items-center space-x-1 md:space-x-2 whitespace-nowrap"}
                        >
                            <span className={filterSelect.all?"text-blue-600  font-bold":"text-gray-500 "}>{t("all-tasks")}</span>
                            <span className={filterSelect.all ? "px-1 text-xs rounded-md  bg-blue-600 text-white" :"px-1 text-xs rounded-md bg-gray-200 text-gray-500"}>{todos?.length}</span>
                        </button>
                        <button
                            onClick={()=>setFilterSelect({...filterSelect,all:false,todo:true,completed:false})} 
                            className={filterSelect.todo ?"flex border-b-4 border-b-blue-700 items-center space-x-1 md:space-x-2":"flex items-center space-x-1 md:space-x-2"}
                        >
                            <span className={filterSelect.todo?"text-blue-600  font-bold":"text-gray-500 "}>{t("todo")}</span>
                            <span className={filterSelect.todo ? "px-1 text-xs rounded-md  bg-blue-600 text-white" :"px-1 text-xs rounded-md bg-gray-200 text-gray-500"}>{todos.filter(item=>!item.completed).length}</span>
                        </button>
                        <button 
                            onClick={()=>setFilterSelect({...filterSelect,all:false,todo:false,completed:true})} 
                            className={filterSelect.completed ?"flex border-b-4 border-b-blue-700 items-center space-x-1 md:space-x-2":"flex items-center space-x-1 md:space-x-2"}
                        >
                            <span className={filterSelect.completed?"text-blue-600  font-bold":"text-gray-500 "}>{t("completed")}</span>
                            <span className={filterSelect.completed ? "px-1 text-xs rounded-md  bg-blue-600 text-white" :"px-1 text-xs rounded-md bg-gray-200 text-gray-500"}>{todos.filter(item=>item.completed).length}</span>
                        </button>
                    </div>
                    <div className="mt-5 md:mt-0">
                        <button onClick={()=>setNewTask(true)} className="flex items-center space-x-3 border-[1px] px-3 border-gray-400 rounded-md">
                            <GoPlus color="gray"/>
                            <span className="capitalize  text-gray-500">{t("new-task")}</span>
                        </button>
                    </div>
                </div>
            </div>
           
            <div className="w-[100%] xl:w-[68vw] px-5">
                {/* <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-500 cursor-pointer">{t("workspace")} &gt;</span>
                            <span className="text-gray-500 cursor-pointer">{t("creative")} &gt;</span>
                            <span className="cursor-pointer">{t("creative-website")} &gt;</span>
                        </div>
                        <span className="text-3xl font-bold capitalize">{t("website-design")}</span>  
                    </div>
                    <div className="flex flex-col space-y-2">
                        <span className="font-semibold">{t("from")} {t("from-date")}</span>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-500 text-sm">{t("updated")} 12 min</span>
                        </div>
                    </div>
                </div> */}
                {
                    isLoading && <Loader  />
                }
                {
                    !isLoading && todos.length > 0 && filterSelect.all && !search &&
                    <div className="">
                        <section className="mt-5">
                            {todos?.length > 0 && (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {
                                        todos.map((item)=>(
                                            <TodoCard 
                                                edit={()=>{
                                                    setSelectedTask(item)
                                                    setUpdateTask(true)
                                                }}
                                                remove={()=>{
                                                    deleteTask({id:item.id})
                                                }}
                                                key={item.id} 
                                                status={item.completed ? t("completed"):t("progress")} 
                                                title={item.todo}
                                            />
                                        ))
                                    }
                                </div>
                                )
                            }
                        </section>
                    </div>
                }
                {
                    !isLoading && todos.length > 0 && filterSelect.todo && !search &&
                    <div className="">
                        <section className="mt-5 ">
                            {todos?.length > 0 && (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {
                                        todos.filter(item=>!item.completed).map((item)=>(
                                            <TodoCard 
                                                edit={()=>{
                                                    setSelectedTask(item)
                                                    setUpdateTask(true)
                                                }}
                                                remove={()=>{
                                                    deleteTask({id:item.id})
                                                }}
                                                key={item.id} 
                                                status={item.completed ? t("completed"):t("progress")} 
                                                title={item.todo}
                                            />
                                        ))
                                    }
                                </div>
                                )
                            }
                        </section>
                    </div>
                }
                {
                    !isLoading && todos.length > 0 && filterSelect.completed && !search &&
                    <div className="">
                        <section className="mt-5 ">
                            {todos?.length > 0 && (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {
                                        todos.filter(item=>item.completed).map((item)=>(
                                            <TodoCard 
                                                
                                                edit={()=>{
                                                    setSelectedTask(item)
                                                    setUpdateTask(true)
                                                }}
                                                remove={()=>{
                                                    deleteTask({id:item.id})
                                                }}
                                                key={item.id} 
                                                status={item.completed ? t("completed"):t("progress")} 
                                                title={item.todo}
                                            />
                                        ))
                                    }
                                </div>
                                )
                            }
                        </section>
                    </div>
                }
                {
                    !isLoading && todos.length > 0 && search && searchWord.length > 0 && 
                    <div className="">
                        <section className="mt-5 ">
                            {todos?.length > 0 && (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {
                                        todos.filter(item=>item.todo.toLowerCase().startsWith(searchWord.toLowerCase())).map((item)=>(
                                            <TodoCard 
                                                
                                                edit={()=>{
                                                    setSelectedTask(item)
                                                    setUpdateTask(true)
                                                }}
                                                remove={()=>{
                                                    deleteTask({id:item.id})
                                                }}
                                                key={item.id} 
                                                status={item.completed ? t("completed"):t("progress")} 
                                                title={item.todo}
                                            />
                                        ))
                                    }
                                </div>
                                )
                            }
                            {
                                todos.length === 0 && (
                                    <div className="flex items-center justify-center">
                                        <span className="text-xl text-gray-500 font-bold">No Task Found!</span>
                                    </div>
                                )
                            }
                        </section>
                    </div>
                }
                
            </div>
        </main>
        <RightSideBar />
    </section>
  )
}

export default HomePage