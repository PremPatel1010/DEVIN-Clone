import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineGroup } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import axios from "../config/axios.js";
import {
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../config/socket.js";
import { UserContext } from "../context/user.context.jsx";
import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const Project = () => {
  const location = useLocation();

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext);

  const handleUserClick = (userId) => {
    setSelectedUserId((prevSelectedUserId) =>
      prevSelectedUserId.includes(userId)
        ? prevSelectedUserId.filter((id) => id !== userId)
        : [...prevSelectedUserId, userId]
    );
  };

  function addCollaborators() {
    axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: selectedUserId,
      })
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function send() {
    const newMessage = {
      message,
      sender: user,
    };

    sendMessage("project-message", newMessage);
    appendOutgoingMessage(newMessage);

    setMessage("");
  }

  useEffect(() => {
    initializeSocket(project._id);

    receiveMessage("project-message", (data) => {
      appendIncomingMessage(data);
    });

    axios
      .get(`/projects/${location.state.project._id}`)
      .then((res) => {
        setProject(res.data.project);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/users/all")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function appendIncomingMessage(messageObject) {
    setMessages((prevMessages) => [...prevMessages, messageObject]);
  }

  function appendOutgoingMessage(messageObject) {
    setMessages((prevMessages) => [...prevMessages, messageObject]);
  }

  return (
    <main className="h-screen w-screen flex flex-col md:flex-row">
      <section className="left flex flex-col h-full w-full md:w-1/4 bg-gray-800 text-white relative">
        <header className="flex justify-between p-4 bg-gray-900">
          <button
            className="p-2 flex gap-2 items-center bg-blue-600 hover:bg-blue-700 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            <IoMdPersonAdd className="text-2xl" />
            <p className="text-sm">Add collaborator</p>
          </button>
          <button
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            <MdOutlineGroup className="text-2xl" />
          </button>
        </header>

        <div className="conversation-area flex-grow flex flex-col overflow-y-auto p-4">
          <div className="message-box flex-grow flex flex-col space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message max-w-2/3 flex flex-col p-3 rounded-md shadow-md ${
                  msg.sender && user && msg.sender._id === user._id.toString()
                    ? "ml-auto bg-blue-500 text-white self-end"
                    : msg.sender._id === "ai"
                    ? "mr-auto bg-gray-900 text-white border border-gray-700"
                    : "mr-auto bg-gray-200 text-gray-800 self-start"
                }`}
              >
                {/* Sender Info */}
                <small className="opacity-75 text-xs mb-1">
                  {msg.sender.email || "AI"}
                </small>

                {/* Message Content */}
                {msg.sender._id === "ai" ? (
                  <div className="max-h-40 overflow-y-auto overflow-x-hidden text-sm font-mono rounded-md bg-gray-900 p-2 border border-gray-700">
                    <SyntaxHighlighter
                      style={tomorrow}
                      wrapLongLines
                    >
                      {msg.message}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <p className="text-sm break-words">{msg.message}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Input Box */}
        <div className="inputField w-1/4 flex p-2 bg-gray-900 fixed bottom-0 left-0 right-0 z-10">
          <input
            className="flex-grow p-2 border rounded-l outline-none bg-gray-700 text-white"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message"
          />
          <button
            className="p-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
            onClick={send}
          >
            <IoMdSend />
          </button>
        </div>

        <div
          className={`sidePanel w-full h-full flex flex-col gap-2 bg-gray-900 absolute transition-transform ${
            isSidePanelOpen ? "translate-x-0" : "-translate-x-full"
          } top-0`}
        >
          <header className="flex justify-between items-center p-4 bg-gray-800">
            <h1 className="font-semibold text-lg">Collaborators</h1>
            <button
              onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
            >
              <IoCloseSharp className="text-2xl" />
            </button>
          </header>

          <div className="users flex flex-col gap-2 p-4">
            {project.users &&
              project.users.map((user) => {
                return (
                  <div
                    key={user}
                    className="user cursor-pointer hover:bg-gray-700 p-2 flex gap-2 items-center rounded"
                  >
                    <div className="aspect-square rounded-full p-5 w-fit h-fit flex items-center justify-center bg-gray-600">
                      <FaUserAlt className="text-white" />
                    </div>
                    <h1 className="font-semibold text-lg">{user}</h1>
                  </div>
                );
              })}
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
                  key={user._id}
                  className={`user-item flex hover:bg-gray-200 items-center gap-3 cursor-pointer p-2 border-b border-gray-200 ${
                    selectedUserId.indexOf(user._id) !== -1 ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className="aspect-square relative rounded-full p-5 w-fit h-fit flex items-center justify-center bg-gray-600">
                    <FaUserAlt className="text-white" />
                  </div>
                  {user.email}
                </div>
              ))}
            </div>
            <button
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={addCollaborators}
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
