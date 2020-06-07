const SNACKBAR = {
  getters: {
    TEXT: "snackbar/text",
    DISPLAY: "snackbar/displayBar",
    OPTIONS: "snackbar/options"
  },
  mutations: {
    SET_OPTIONS: "snackbar/setOptions",
    RESET_OPTIONS: "snackbar/resetOptions",
    SET_TEXT: "snackbar/setText"
  },
  actions: {
    TOGGLE_BAR: "snackbar/toggleBar"
  }
};

const LISTS = {
  getters: {
    ITEMS: "lists/getItems",
    LIST_TYPE: "lists/type",
    SELECTED: "lists/selected",
    QUERY_PARAMS: "lists/queryParams"
  },
  mutations: {
    SET_LIST: "lists/SET_LIST",
    SET_TYPE: "lists/SET_TYPE",
    SET_SELECTED: "lists/SET_SELECTED",
    SET_PAGE: "lists/SET_PAGE",
    SET_SORT: "lists/SORT",
    SET_TOTAL: "lists/SET_TOTAL",
    REMOVE_ROLE: "lists/REMOVE_ROLE"
  },
  actions: {
    FETCH: "lists/fetchList"
  }
};

const USERS = {
  getters: {
    USERS: "users/users",
    SELECTED: "users/selected",
    ROLE_LIST: "users/roleList"
  },
  mutations: {
    SET_USERS: "users/SET_USERS",
    SET_ROLE_LIST: "users/SET_ROLE_LIST",
    SET_SELECTED: "users/SET_SELECTED"
  },
  actions: {
    FETCH: "users/fetch",
    ADD_ROLE: "users/addRoleToUser",
    REMOVE_ROLE: "users/removeRoleFromUser",
    DISABLE_USER: "users/disableUser",
    CHANGE_USERNAME: "users/changeUsername",
    CHANGE_EMAIL: "users/changeEmail",
    RESET_PASSWORD: "users/resetPassword"
  }
};

const DIALOG = {
  getters: {
    SHOW: "dialog/openDialog"
  },
  mutations: {
    TOGGLE: "dialog/toggleDialog"
  }
};

const PAGE = {
  getters: {
    TITLE: "page/title",
    MOBILE: "page/mobile",
    ACPANEL: "page/acPanel"
  },
  mutations: {
    SET_TITLE: "page/SET_TITLE",
    SET_MOBILE: "page/SET_MOBILE",
    TOGGLE_ACPANEL: "page/TOGGLE_ACPANEL"
  }
};

export { SNACKBAR, LISTS, DIALOG, PAGE };
