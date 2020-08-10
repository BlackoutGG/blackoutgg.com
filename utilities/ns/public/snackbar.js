export default {
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
    TOGGLE_BAR: "snackbar/toggleBar",
    ERROR: "snackbar/displayError",
    SUCCESS: "snackbar/displaySuccess"
  }
};
