const superadminPrefix = '/superadmin';
const users = `${superadminPrefix}/users`;

const superadminRoutesList = {
  superadminDashboard: superadminPrefix,
  users: users,
  createUsers: `${users}/create`,
  getUsers: `${users}/get`,
};

export default superadminRoutesList;