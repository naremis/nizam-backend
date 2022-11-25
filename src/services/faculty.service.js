const httpStatus = require('http-status');
const { Faculty } = require('../models');
const ApiError = require('../utils/ApiError');

const createFaculty = async (facultyBody) => {
  if (await Faculty.facultyExists(facultyBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty already exist');
  }
  return Faculty.create(facultyBody);
};

const queryFaculty = async (filter, options) => {
  const faculties = await Faculty.paginate(filter, options);
  return faculties;
};

const getFacultyById = async (facultyId) => {
  return Faculty.findById(facultyId);
};

const getFacultyByName = async (name) => {
  return Faculty.findOne({ name });
};

const updateFacultyByName = async (facultyName, updateBody) => {
  const faculty = await getFacultyByName(facultyName);
  if (!faculty) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }
  Object.assign(faculty, updateBody);
  await faculty.save();
  return faculty;
};

const updateFacultyById = async (facultyId, updateBody) => {
  const faculty = await getFacultyById(facultyId);
  if (!faculty) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }
  Object.assign(faculty, updateBody);
  await faculty.save();
  return faculty;
};

const deleteFacultyById = async (facultyId) => {
  const faculty = await getFacultyById(facultyId);
  if (!faculty) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found');
  }
  await faculty.remove();
  return faculty;
};

module.exports = {
  createFaculty,

  updateFacultyById,
  updateFacultyByName,

  queryFaculty,
  getFacultyByName,
  getFacultyById,

  deleteFacultyById,
};
