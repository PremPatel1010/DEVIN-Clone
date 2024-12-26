import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context.jsx";
import { FaCode } from "react-icons/fa6";
import axios from "../config/axios.js";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { user } = useContext(UserContext);
  const [projectName, setProjectName] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [project, setProject] = useState([]);

  const navigate = useNavigate();

  function createProject(e) {
    e.preventDefault();
    console.log("create project");

    axios
      .post("/projects/create", {
        name: projectName,
      })
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        setProject(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <main className="p-4">
      <div className="projects flex flex-wrap gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="project p-4 border border-slate-300 rounded"
        >
          <FaCode />
        </button>

        {project.map((project) => (
          <div
            key={project._id}
            onClick={() => {
              navigate(`/project`, { state: { project } });
            }}
            className="project p-4 flex flex-col gap-2 cursor-pointer border border-slate-300 rounded min-w-52 hover:bg-slate-200"
          >
            <h2 className="font-semibold">{project.name}</h2>
            <div className="flex items-center gap-1">
              <CiUser />
              <p>Calloborators:</p>
              {project.users.length}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="projectName"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  onChange={(e) => setProjectName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
