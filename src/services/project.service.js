const httpStatus = require('http-status');
const { Project } = require('../models');
const ApiError = require('../utils/ApiError');

const createProject = async (projectBody) => {
  return Project.create(projectBody);
};

const queryProject = async (filter, options) => {
  const faculties = await Project.paginate(filter, options);
  return faculties;
};

const getProjectById = async (projectId) => {
  return Project.findById(projectId);
};

const getProjectByName = async (name) => {
  return Project.findOne({ name });
};

const updateProjectByName = async (projectName, updateBody) => {
  const project = await getProjectByName(projectName);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  Object.assign(project, updateBody);
  await project.save();
  return project;
};

const updateProjectById = async (projectId, updateBody) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  Object.assign(project, updateBody);
  await project.save();
  return project;
};

const deleteProjectById = async (projectId) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  await project.remove();
  return project;
};

module.exports = {
  createProject,

  updateProjectById,
  updateProjectByName,

  queryProject,
  getProjectByName,
  getProjectById,

  deleteProjectById,
};
