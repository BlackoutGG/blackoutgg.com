export default {
  getters: {
    USERS: "users/users",
    GET_USER: "users/getUser",
    SELECTED: "users/selected",
    ROLE_LIST: "users/roleList",
    QUERY_PARAMS: "users/queryParams"
  },
  mutations: {
    SET_USERS: "users/setUsers",
    SET_ROLE_LIST: "users/setRoleList",
    SET_SELECTED: "users/setSelected",
    SET_PARAM: "users/setParam",
    SET_USERNAME: "users/setUsername",
    SET_EMAIL: "users/setEmail",
    ADD_ROLE: "users/addRole",
    REMOVE_ROLE: "users/removeRole"
  },
  actions: {
    FETCH: "users/fetch",
    ADD_ROLE: "users/addRoleToUser",
    REMOVE_ROLE: "users/removeRoleFromUser",
    DISABLE_USER: "users/disableUser",
    CHANGE_USER_INFO: "users/changeUserInfo",
    CREATE_USER: "users/createUser",
    EDIT_USER: "users/editUser",
    RESET_PASSWORD: "users/resetPassword"
  }
};
