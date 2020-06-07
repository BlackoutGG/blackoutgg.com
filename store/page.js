import { PAGE } from "~/utilities/types";
import removeNamespace from "~/utilities/removeNamespace";

const Types = removeNamespace("page/", PAGE);

const state = () => ({
  title: "",
  mobile: false,
  adminPanel: true
});

const getters = {
  [Types.getters.TITLE]: state => state.title,
  [Types.getters.MOBILE]: state => state.mobile,
  [Types.getters.ACPANEL]: state => state.adminPanel
};

const mutations = {
  [Types.mutations.SET_TITLE](state, title) {
    state.title = title;
  },
  [Types.mutations.SET_MOBILE](state, mobile) {
    state.mobile = mobile;
  },
  [Types.mutations.TOGGLE_ACPANEL](state, bool) {
    state.adminPanel = bool;
  }
};

export { state, getters, mutations };
