import { _dialogs as types } from "~/utilities/ns/dialogs.js";

const state = () => ({
  dialog: ""
});

const getters = {
  [types.getters.SHOW]: state => value => state.dialog === value
};

const mutations = {
  [types.mutations.TOGGLE](state, dialog) {
    state.dialog = dialog;
  }
};

export default { state, getters, mutations };
