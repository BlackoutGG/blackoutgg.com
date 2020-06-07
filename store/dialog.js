import { DIALOG } from "~/utilities/types";
import removeNamespace from "~/utilities/removeNamespace";

const Types = removeNamespace("dialog/", DIALOG);

const state = () => ({
  dialog: ""
});

const getters = {
  [Types.getters.SHOW]: state => value => state.dialog === value
};

const mutations = {
  [Types.mutations.TOGGLE](state, dialog) {
    state.dialog = dialog;
  }
};

export default { state, getters, mutations };
