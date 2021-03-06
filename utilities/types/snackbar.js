import removeNamespace from "../removeNamespace";

export const snackbar = {
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

export const _snackbar = removeNamespace("snackbar/", snackbar);

export default { snackbar };
