import mongoose from "mongoose";
import projectModel from "../models/project.model.js";
import userModel from "../models/user.model.js";


export const createProject = async ({ name, userId }) => {
  if (!name) {
    throw new Error("Name is required");
  }
  if (!userId) {
    throw new Error("User is required");
  }

  const project = await projectModel.create({
    name,
    users: [userId],
  });

  return project;
};

export const getAllProjectByUserId = async ({ userId }) => {
  if (!userId) {
    throw new Error("User is required");
  }
  const allUserProjects = await projectModel.find({ users: userId });

  return allUserProjects;
};

export const addUsersToProject = async ({ projectId, users, userId }) => {
  if (!projectId) {
    throw new Error("Project ID is required");
  }
  if (!userId) {
    throw new Error("User is required");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid Project ID");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid User ID");
  }
  if (!users || !Array.isArray(users)) {
    throw new Error("Users are required and should be an array");
  }
  for (const userId of users) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error(`Invalid User ID: ${userId}`);
    }
  }

  const project = await projectModel.findOne({ _id: projectId, users: userId });

  if(!project){
    throw new Error("Project not found");
  }

  const updatedProject = await projectModel.findOneAndUpdate(
    { _id: projectId },
    { $addToSet: { users: { $each: users } } },
    { new: true } 
  )

  return updatedProject;

};

export const getProjectById = async ({ projectId }) => {
  if (!projectId) {
    throw new Error("Project ID is required");
  }
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid Project ID");
  }

  const project = await projectModel.findOne({ _id: projectId })
  if (!project) {
    throw new Error("Project not found");
  }

  return project;
}