import { SNACKBAR } from "~/utilities/types";
import removeNamespace from "~/utilities/removeNamespace";

const Types = removeNamespace("snackbar/", SNACKBAR);

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
  [Types.getters.TEXT]: state => state.text,
  [Types.getters.DISPLAY]: state => !!state.text,
  [Types.getters.OPTIONS]: state => state.options
};

const mutations = {
  [Types.mutations.SET_OPTIONS](state, options) {
    if (options) {
      for (let key in options) {
        if (typeof state.options[key] !== undefined) {
          state.options[key] = options[key];
        }
      }
    }
  },
  [Types.mutations.RESET_OPTIONS](state) {
    for (let key in defaultOptions) {
      if (typeof state.options[key] !== undefined) {
        state.options[key] = defaultOptions[key];
      }
    }
  },
  [Types.mutations.SET_TEXT](state, text) {
    state.text = text;
  }
};

const actions = {
  [Types.actions.TOGGLE_BAR]({ commit }, { text, options }) {
    console.log(text);
    if (text) {
      commit(Types.mutations.SET_OPTIONS, options);
      commit(Types.mutations.SET_TEXT, text);
      console.log("toggling bar...");
    } else {
      commit(Types.mutations.RESET_OPTIONS);
      commit(Types.mutations.SET_TEXT, "");
      console.log("resetting bar...");
    }
  }
};

export default { state, getters, mutations, actions };
