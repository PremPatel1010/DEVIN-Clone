import React from 'react'
import { useLocation } from 'react-router-dom'
import { MdOutlineGroup } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const Project = () => {

  const location = useLocation()
  
  console.log(location.state)

  return (
    <main className='h-screen w-screen flex'>
      <section className="left flex flex-col h-full min-w-60 bg-red-300">
        <header className='flex justify-end p-2 px-4 w-full bg-slate-200'>
          <button className='p-2'><MdOutlineGroup className='text-2xl'  /></button>
        </header>

        <div className="conversation-area flex-grow flex flex-col">
          <div className="message-box flex flex-grow">

          </div>
          <div className="inputField w-full flex ">
            <input className='p-2 px-4 border-none outline-none' type="text" placeholder="Enter a message" />
            <button className='flex-grow px-2'><IoMdSend /></button>
          </div>
        </div>

      </section>
    </main>
  )
}

export default Project
