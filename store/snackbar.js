import snackbar from "~/utilities/ns/private/snackbar.js";

const defaultOptions = {
  x: null,
  y: "top",
  mode: null,
  color: "#000",
  timeout: 3000
};

const state = () => ({
  text: "",

  options: {
    x: defaultOptions.x,
    y: defaultOptions.y,
    mode: defaultOptions.mode,
    color: defaultOptions.color,
    timeout: defaultOptions.timeout
  }
});

const getters = {
  [snackbar.getters.TEXT]: state => state.text,
  [snackbar.getters.DISPLAY]: state => !!state.text,
  [snackbar.getters.OPTIONS]: state => state.options
};

const mutations = {
  [snackbar.mutations.SET_OPTIONS](state, options) {
    if (options) {
      for (let key in options) {
        if (typeof state.options[key] !== undefined) {
          state.options[key] = options[key];
        }
      }
    }
  },
  [snackbar.mutations.RESET_OPTIONS](state) {
    for (let key in defaultOptions) {
      if (typeof state.options[key] !== undefined) {
        state.options[key] = defaultOptions[key];
      }
    }
  },
  [snackbar.mutations.SET_TEXT](state, text) {
    state.text = text;
  }
};

const actions = {
  [snackbar.actions.TOGGLE_BAR]({ commit }, { text, options }) {
    console.log(text);
    if (text) {
      commit(snackbar.mutations.SET_OPTIONS, options);
      commit(snackbar.mutations.SET_TEXT, text);
      console.log("toggling bar...");
    } else {
      commit(snackbar.mutations.RESET_OPTIONS);
      commit(snackbar.mutations.SET_TEXT, "");
      console.log("resetting bar...");
    }
  },
  [snackbar.actions.ERROR]({ dispatch }) {
    const text = "Encountered an error. Please contact administration.";
    dispatch(snackbar.actions.TOGGLE_BAR, { text });
  },
  [snackbar.actions.SUCCESS]({ dispatch }) {
    const text = "Saved Changes.";
    dispatch(snackbar.actions.TOGGLE_BAR, { text });
  }
};

export default { state, getters, mutations, actions };
