import removeNamespace from "../removeNamespace.js";

export const roles = {
  getters: {
    ROLES: "roles/roles",
    SELECTED: "roles/selected",
    PERM_LIST: "roles/perms",
    SELECTED_IDS: "roles/selectedIds",
    GET_ROLE: "roles/getRole",
    QUERY_PARAMS: "roles/queryParams"
  },
  mutations: {
    SET_ROLES: "roles/setRoles",
    SET_NAME: "roles/setName",
    SET_PERM_LIST: "roles/setPerms",
    SET_SELECTED: "roles/setSelected",
    SET_PERMISSIONS: "roles/setPermissions",
    SET_PARAM: "roles/setParam",
    SET_STATUS: "roles/setStatus",
    CHANGE_ROLE_PERMISSION: "roles/changeRolePermission"
  },
  actions: {
    FETCH: "roles/fetchRoles",
    FETCH_PERMS: "roles/fetchRolePerms",
    ADD_ROLE: "roles/addRole",
    EDIT_ROLE: "roles/editRole",
    REMOVE_ROLE: "roles/removeRole"
  }
};

export const _roles = removeNamespace("roles/", roles);

export default { roles };
