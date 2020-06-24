import removeNamespace from "../removeNamespace.js";

export const roles = {
  getters: {
    ROLES: "roles/roles",
    SELECTED: "roles/selected",
    GET_ROLE: "roles/getRole",
    QUERY_PARAMS: "roles/queryParams"
  },
  mutations: {
    SET_ROLES: "roles/setRoles",
    SET_SELECTED: "roles/setSelected",
    SET_PERMISSIONS: "roles/setPermissions",
    SET_PARAM: "roles/setParam",
    CHANGE_ROLE_PERMISSION: "roles/changeRolePermission"
  },
  actions: {
    FETCH: "roles/fetchRoles",
    FETCH_PERMS: "roles/fetchRolePerms",
    EDIT_ROLE: "roles/editRole"
  }
};

export const _roles = removeNamespace("roles/", roles);

export default { roles };
