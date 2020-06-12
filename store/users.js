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
  [USERS.mutations.REMOVE_ROLE](state, { userId, roleId }) {
    const user = state.users.find(u => u.id === userId);
    if (user) {
      const idx = user.roles.findIndex(role => role.id === roleId);
      if (idx !== -1) user.roles.splice(idx, 1);
    }
  },
  [USERS.mutations.SET_USERNAME](state, { id, value }) {
    const user = state.users.find(u => u.id === id);
    if (user) users.username = value;
  },
  [USERS.mutations.SET_EMAIL](state, { id, value }) {
    const user = state.users.find(u => u.id === id);
    if (user) users.email = value;
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
      const user = await this.$axios.put(`/api/users/${userId}/role`, {
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
  async [USERS.actions.REMOVE_ROLE]({ commit, dispatch }, { userId, roleId }) {
    const url = `/api/users/${userId}/role`;
    try {
      const user = await this.$axios.delete(url, {
        data: { roleId }
      }).data;
      console.log(user);
      commit(USERS.mutations.REMOVE_ROLE, {
        userId: user.user_id,
        roleId: user.role_id
      });
    } catch (err) {}
  },
  async [USERS.actions.DISABLE_USER]({ commit, dispatach }) {},
  async [USERS.actions.CHANGE_USER_INFO](
    { commit, dispatch },
    { id, type, value }
  ) {
    try {
      const {
        data: { user }
      } = this.$axios.put(`/api/users/${id}/edit`, {
        data: { [type]: value }
      });

      // const mutation =
      //   "set" + user.type.charAt(0).toUpperCase() + user.type.slice(1);

      const mutation = "SET_" + user.type.toUpperCase();

      commit(USERS.mutation[mutation], {
        id: user.id,
        value: user.value
      });
    } catch (err) {
      dispatch(
        SNACKBAR.actions.TOGGLE_BAR,
        { text: err.message },
        { root: true }
      );
    }
  },
  async [USERS.actions.RESET_PASSWORD]({ commit, dispatch }) {},
  async [USERS.actions.CREATE_USER]({ state, commit, dispatch }, payload) {
    try {
      payload = { page, limit } = state.queryParams;
      const { data } = await this.$axios.post(
        "/api/admin/users/create",
        payload
      );
      const text = `Created user: ${data.user.username}`;

      dispatch(SNACKBAR.actions.TOGGLE_BAR, { text }, { root: true });

      commit(USERS.mutations.SET_PARAM, {
        param: "total",
        value: data.users.total
      });
      commit(USERS.mutations.SET_USERS, data.users.results);
    } catch (err) {
      const text = err.message;
      dispatch(SNACKBAR.actions.TOGGLE_BAR, { text }, { root: true });
    }
  }
};

export default { state, getters, mutations, actions };
