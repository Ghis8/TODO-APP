import { useTranslation } from "react-i18next"
import { CiCalendar,CiStar } from "react-icons/ci";
import { PiUsersThreeThin } from "react-icons/pi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuSendHorizonal } from "react-icons/lu";
import ChatMessage from "./ChatMessage";
import { useState } from "react";



function RightSideBar() {
    const { t } = useTranslation()
    const [theme]=useState(localStorage.getItem('theme'))
    const messages = [
        { id: 1, message: 'Hello! How are you?', timestamp: '10:00 AM', isOutgoing: false },
        { id: 2, message: 'I am good, thank you! How about you?', timestamp: '10:01 AM', isOutgoing: true },
        { id: 3, message: 'I am doing well too.', timestamp: '10:02 AM', isOutgoing: false },
      ];
  return (
    <section className="hidden xl:flex xl:flex-col xl:justify-between  h-screen w-[25%]  p-5 border-l-[1px] border-gray-300">
        <div className="flex items-center justify-between mt-2 mb-5">
            <span className="font-bold capitalize">{t("project")}</span>
            <span className="text-gray-400 font-semibold cursor-pointer">{t("see")}</span>
        </div>
        <div className="mt-7 p-5 shadow-lg rounded-md">
            <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-1">
                    <CiCalendar size={20} color="gray" />
                    <span className="capitalize">{t("timeline")}:</span>
                </div>
                <span className="text-sm">{t("april")}</span>
            </div>
            <div className="mt-5 flex items-center space-x-3">
                <div className="flex space-x-1 items-center">
                    <PiUsersThreeThin size={20} color="gray"/>
                    <span className="capitalize">{t("team")}:</span>
                </div>
                <div className="grid grid-cols-4 -gap-x-2">
                    <img 
                        alt="profile"
                        src="/img/mark.jpeg"
                        className="w-5 h-5 rounded-full"
                    />
                     <img 
                        alt="profile"
                        src="/img/jeff.webp"
                        className="w-5 h-5 rounded-full"
                    />
                     <img 
                        alt="profile"
                        src="/img/christiano.webp"
                        className="w-5 h-5 rounded-full"
                    />
                     <img 
                        alt="profile"
                        src="/img/mark.jpeg"
                        className="w-5 h-5 rounded-full"
                    />
                     <img 
                        alt="profile"
                        src="/img/mark.jpeg"
                        className="w-5 h-5 rounded-full"
                    />
                     <img 
                        alt="profile"
                        src="/img/charlize.webp"
                        className="w-5 h-5 rounded-full"
                    />
                     <img 
                        alt="profile"
                        src="/img/elon.jpeg"
                        className="w-5 h-5 rounded-full"
                    />
                     <img 
                        alt="profile"
                        src="/img/mark.jpeg"
                        className="w-5 h-5 rounded-full"
                    />
                </div>
                
            </div>
            <div className=" mt-5 flex space-x-2 items-center">
                <div className="flex items-center space-x-1">
                    <CiStar size={20} color="gray" className="cursor-pointer" />
                    <span className="capitalize">{t("status")}:</span>
                </div>
                <span>{t("progress")}</span>
            </div>
        </div>
        <div className={theme ==="dark" ? "mt-5 overflow-y-auto relative  h-[73%] shadow-lg border-gray-100 border-[1px]" : "mt-5 overflow-y-auto relative  h-[73%] shadow-lg"}>
            <div className="sticky top-0 z-30 p-2 shadow-lg border-b-[1px] border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="font-bold">{t("team-chat")}</span>
                        <span>{t("team-chat-date")}</span>
                    </div>
                    <HiOutlineDotsVertical />
                </div>
            </div>
            <div className="w-3/4  py-4 px-5 ">
                <div className="flex flex-col h-full w-[22vw] p-4 overflow-y-auto overflow-x-hidden">
                    {messages.map((msg) => (
                        <ChatMessage
                        key={msg.id}
                        message={msg.message}
                        timestamp={msg.timestamp}
                        isOutgoing={msg.isOutgoing}
                        />
                    ))}
                </div>
            </div>
            <div className="absolute bottom-5 w-[85%] px-5">
                <input 
                    placeholder="Enter message"
                    className="py-2 bg-gray-200 indent-2 w-full rounded-md outline-none"
                />
                <LuSendHorizonal size={24} className="absolute bottom-2 cursor-pointer -right-5" />
            </div>

        </div>
    </section>
  )
}

export default RightSideBar