import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineGroup } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";

const Project = () => {
  const location = useLocation();

  console.log(location.state);

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, email: "user1@example.com" },
    { id: 2, email: "user2@example.com" },
    { id: 3, email: "user3@example.com" },
    { id: 3, email: "user3@example.com" },
    { id: 3, email: "user3@example.com" },
    { id: 3, email: "user3@example.com" },
    { id: 3, email: "user3@example.com" },
    { id: 3, email: "user3@example.com" },
    { id: 3, email: "user3@example.com" },
    { id: 3, email: "user3@example.com" },
    { id: 3, email: "user3@example.com" },
    { id: 3, email: "user3@example.com" },
    { id: 3, email: "user3@example.com" },
  ]);

  return (
    <main className="h-screen w-screen flex">
      <section className="left flex flex-col h-full w-1/4 bg-slate-300 relative">
        <header className="flex justify-between p-2 px-4 w-full bg-slate-100">
          <button
            className="p-2 flex gap-2  items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <IoMdPersonAdd className="text-2xl" />
            <p className="text-sm">Add collaborator</p>
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-2"
          >
            <MdOutlineGroup className="text-2xl" />
          </button>
        </header>

        <div className="conversation-area flex-grow flex flex-col">
          <div className="message-box flex flex-grow flex-col p-4">
            <div className=" message max-w-64 flex flex-col bg-white p-2 rounded shadow mb-2 w-fit">
              <small className="text-gray-500 text-xs">example@gmail.com</small>
              <p className="text-sm ">
                Hello, how are you doing today? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Tempora doloribus nulla molestias
                debitis dignissimos magnam blanditiis id placeat beatae
                doloremque officiis saepe, est ducimus dolorem.
              </p>
            </div>
            <div className=" ml-auto max-w-64 message flex flex-col bg-white p-2 rounded shadow mb-2 w-fit">
              <small className="text-gray-500 text-xs">example@gmail.com</small>
              <p className="text-sm ">Hello, how are you doing today?</p>
            </div>
          </div>
          <div className="inputField w-full flex p-2 bg-slate-100">
            <input
              className="flex-grow p-2 border rounded-l outline-none"
              type="text"
              placeholder="Enter a message"
            />
            <button className="p-2 bg-blue-500 text-white rounded-r">
              <IoMdSend />
            </button>
          </div>
        </div>

        <div
          className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0`}
        >
          <header className="flex justify-end p-2 px-4 w-full bg-slate-100">
            <button
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
              className="p-2"
            >
              <IoCloseSharp className="text-2xl" />
            </button>
          </header>

          <div className="users flex flex-col gap-2">
            <div className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">
              <div className="aspect-square rounded-full p-5 w-fit h-fit flex items-center justify-center bg-slate-600">
                <FaUserAlt className="text-white absolute" />
              </div>
              <h1 className="font-semibold text-lg">Username</h1>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-4 relative">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Select User</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoCloseSharp className="text-2xl" />
              </button>
            </header>
            <div className="users-list max-h-96 overflow-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="user-item flex hover:bg-slate-200 items-center gap-3 cursor-pointer p-2 border-b border-gray-200"
                >
                  <div className="aspect-square relative rounded-full p-5 w-fit h-fit flex items-center justify-center bg-slate-600">
                    <FaUserAlt className="text-white absolute" />
                  </div>
                  {user.email}
                </div>
              ))}
            </div>
            <button
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
