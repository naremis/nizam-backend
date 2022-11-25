const httpStatus = require('http-status');
const { Role } = require('../models');
const ApiError = require('../utils/ApiError');

const createRole = async (roleBody) => {
  if (await Role.roleExists(roleBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Role already exist');
  }
  return Role.create(roleBody);
};

const queryRole = async (filter, options) => {
  const faculties = await Role.paginate(filter, options);
  return faculties;
};

const getRoleById = async (roleId) => {
  return Role.findById(roleId);
};

const getRoleByName = async (name) => {
  return Role.findOne({ name });
};

const updateRoleByName = async (roleName, updateBody) => {
  const role = await getRoleByName(roleName);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  Object.assign(role, updateBody);
  await role.save();
  return role;
};

const updateRoleById = async (roleId, updateBody) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  Object.assign(role, updateBody);
  await role.save();
  return role;
};

const deleteRoleById = async (roleId) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  await role.remove();
  return role;
};

module.exports = {
  createRole,

  updateRoleById,
  updateRoleByName,

  queryRole,
  getRoleByName,
  getRoleById,

  deleteRoleById,
};
