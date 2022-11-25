const httpStatus = require('http-status');
const { Department } = require('../models');
const ApiError = require('../utils/ApiError');

const createDepartment = async (departmentBody) => {
  if (await Department.departmentExists(departmentBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Department already exist');
  }
  return Department.create(departmentBody);
};

const queryDepartment = async (filter, options) => {
  const departments = await Department.paginate(filter, options);
  return departments;
};

const getDepartmentById = async (departmentId) => {
  return Department.findById(departmentId);
};

const getDepartmentByName = async (name) => {
  return Department.findOne({ name });
};

const updateDepartmentByName = async (departmentName, updateBody) => {
  const department = await getDepartmentByName(departmentName);
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
  }
  Object.assign(department, updateBody);
  await department.save();
  return department;
};

const updateDepartmentById = async (departmentId, updateBody) => {
  const department = await getDepartmentById(departmentId);
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
  }
  Object.assign(department, updateBody);
  await department.save();
  return department;
};

const deleteDepartmentById = async (departmentId) => {
  const department = await getDepartmentById(departmentId);
  if (!department) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Department not found');
  }
  await department.remove();
  return department;
};

module.exports = {
  createDepartment,

  updateDepartmentById,
  updateDepartmentByName,

  queryDepartment,
  getDepartmentByName,
  getDepartmentById,

  deleteDepartmentById,
};
