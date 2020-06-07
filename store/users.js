import userTypes from "~/utilities/types/users.js";
import SNACKBAR from "~/utilities/types/snackbar.js";
import removeNamespace from "~/utilities/removeNamespace.js";

const USERS = removeNamespace("users/", userTypes);

const state = () => ({
  users: [],
  selected: [],
  roles: [],

  queryParams: {
    page: 1,
    limit: 20,
    total: 0,
    sortBy: "id",
    orderBy: "ASC"
  }
});

const getters = {
  [USERS.getters.USERS]: state => state.users,
  [USERS.getters.SELECTED]: state => state.selected,
  [USERS.getters.GET_USER]: state => id =>
    state.users.find(user => user.id === id),
  [USERS.getters.ROLE_LIST]: state => state.roles,
  [USERS.getters.QUERY_PARAMS]: state => key =>
    typeof key !== undefined ? state.queryParams[key] : state.queryParams
};

const mutations = {
  [USERS.mutations.SET_USERS](state, users) {
    state.users = users;
  },
  [USERS.mutations.SET_ROLE_LIST](state, roles) {
    state.roles = roles;
  },
  [USERS.mutations.SET_SELECTED](state, value) {
    // const idx = state.selected.indexOf(value);
    // if (idx !== -1) state.selected.splice(idx, 1);
    // else state.selected.push(value);
    state.selected = value;
  },
  [USERS.mutations.SET_PARAM](state, { param, value }) {
    if (typeof state.queryParams[param] !== undefined) {
      state.queryParams[param] = value;
    }
  },
  [USERS.mutations.ADD_ROLE](state, { userId, role }) {
    const user = state.users.find(id => id === userId);
    if (user) user.roles.push(role);
  },
  [USERS.mutations.REMOVE_ROLE](state, { userId, role }) {
    const user = state.users.find(id => id == userId);
    if (user) user.roles.splice(user.roles.indexOf(role), 1);
  }
};

const actions = {
  async [USERS.actions.FETCH]({ state, commit, dispatch }) {
    try {
      const { data } = await this.$axios.get("/api/admin/users", {
        params: { ...state.queryParams }
      });

      commit(USERS.mutations.SET_USERS, data.users.results);
      commit(USERS.mutations.SET_PARAM, {
        param: "total",
        value: data.users.total
      });
      commit(USERS.mutations.SET_ROLE_LIST, data.roles);
      dispatch(
        SNACKBAR.actions.TOGGLE_BAR,
        { text: "Content Loaded." },
        { root: true }
      );
    } catch (err) {
      dispatch(
        SNACKBAR.actions.TOGGLE_BAR,
        { text: err.message },
        { root: true }
      );
    }
  },
  async [USERS.actions.ADD_ROLE]({ commit, dispatch }, { userId, roleId }) {
    try {
      const user = await this.$axios.put(`/users/${userId}/role`, {
        data: { roleId }
      }).data;
      console.log(user);
    } catch (err) {
      console.log(err);
      dispatch(
        SNACKBAR.actions.TOGGLE_BAR,
        { text: err.message },
        { root: true }
      );
    }
  },
  async [USERS.actions.REMOVE_ROLE]({ commit, dispatach }) {},
  async [USERS.actions.DISABLE_USER]({ commit, dispatach }) {},
  async [USERS.actions.CHANGE_USERNAME]({ commit, dispatach }) {},
  async [USERS.actions.CHANGE_EMAIL]({ commit, dispatach }) {},
  async [USERS.actions.RESET_PASSWORD]({ commit, dispatach }) {}
};

export default { state, getters, mutations, actions };
