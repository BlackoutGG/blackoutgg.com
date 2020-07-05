import { _snackbar as types } from "~/utilities/types/snackbar.js";

const defaultOptions = {
  x: null,
  y: "bottom",
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
  [types.getters.TEXT]: state => state.text,
  [types.getters.DISPLAY]: state => !!state.text,
  [types.getters.OPTIONS]: state => state.options
};

const mutations = {
  [types.mutations.SET_OPTIONS](state, options) {
    if (options) {
      for (let key in options) {
        if (typeof state.options[key] !== undefined) {
          state.options[key] = options[key];
        }
      }
    }
  },
  [types.mutations.RESET_OPTIONS](state) {
    for (let key in defaultOptions) {
      if (typeof state.options[key] !== undefined) {
        state.options[key] = defaultOptions[key];
      }
    }
  },
  [types.mutations.SET_TEXT](state, text) {
    state.text = text;
  }
};

const actions = {
  [types.actions.TOGGLE_BAR]({ commit }, { text, options }) {
    console.log(text);
    if (text) {
      commit(types.mutations.SET_OPTIONS, options);
      commit(types.mutations.SET_TEXT, text);
      console.log("toggling bar...");
    } else {
      commit(types.mutations.RESET_OPTIONS);
      commit(types.mutations.SET_TEXT, "");
      console.log("resetting bar...");
    }
  },
  [types.actions.DISPLAY_ERROR]({ dispatch }) {
    const text = "Encountered an error. Please contact administration.";
    dispatch(types.actions.TOGGLE_BAR, { text });
  }
};

export default { state, getters, mutations, actions };
