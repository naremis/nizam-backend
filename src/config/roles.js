const allRoles = {
  student: [],
  user: [],
  admin: ['getUsers', 'manageUsers'],
  faculty: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
