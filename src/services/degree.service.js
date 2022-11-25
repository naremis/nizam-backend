const httpStatus = require('http-status');
const { Degree } = require('../models');
const ApiError = require('../utils/ApiError');

const createDegree = async (degreeBody) => {
  if (await Degree.degreeExists(degreeBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Degree already exist');
  }
  return Degree.create(degreeBody);
};

const queryDegree = async (filter, options) => {
  const faculties = await Degree.paginate(filter, options);
  return faculties;
};

const getDegreeById = async (degreeId) => {
  return Degree.findById(degreeId);
};

const getDegreeByName = async (name) => {
  return Degree.findOne({ name });
};

const updateDegreeByName = async (degreeName, updateBody) => {
  const degree = await getDegreeByName(degreeName);
  if (!degree) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Degree not found');
  }
  Object.assign(degree, updateBody);
  await degree.save();
  return degree;
};

const updateDegreeById = async (degreeId, updateBody) => {
  const degree = await getDegreeById(degreeId);
  if (!degree) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Degree not found');
  }
  Object.assign(degree, updateBody);
  await degree.save();
  return degree;
};

const deleteDegreeById = async (degreeId) => {
  const degree = await getDegreeById(degreeId);
  if (!degree) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Degree not found');
  }
  await degree.remove();
  return degree;
};

module.exports = {
  createDegree,

  updateDegreeById,
  updateDegreeByName,

  queryDegree,
  getDegreeByName,
  getDegreeById,

  deleteDegreeById,
};
