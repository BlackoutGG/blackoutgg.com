import { _page as types } from "~/utilities/ns/page.js";

const state = () => ({
  title: "",
  mobile: false,
  adminPanel: true
});

const getters = {
  [types.getters.TITLE]: state => state.title,
  [types.getters.MOBILE]: state => state.mobile,
  [types.getters.ACPANEL]: state => state.adminPanel
};

const mutations = {
  [types.mutations.SET_TITLE](state, title) {
    state.title = title;
  },
  [types.mutations.SET_MOBILE](state, mobile) {
    state.mobile = mobile;
  },
  [types.mutations.TOGGLE_ACPANEL](state, bool) {
    state.adminPanel = bool;
  }
};

export { state, getters, mutations };
