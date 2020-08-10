import page from "~/utilities/ns/private/page.js";

const state = () => ({
  title: "",
  mobile: false,
  adminPanel: true
});

const getters = {
  [page.getters.TITLE]: state => state.title,
  [page.getters.MOBILE]: state => state.mobile,
  [page.getters.ACPANEL]: state => state.adminPanel
};

const mutations = {
  [page.mutations.SET_TITLE](state, title) {
    state.title = title;
  },
  [page.mutations.SET_MOBILE](state, mobile) {
    state.mobile = mobile;
  },
  [page.mutations.TOGGLE_ACPANEL](state, bool) {
    state.adminPanel = bool;
  }
};

export { state, getters, mutations };
