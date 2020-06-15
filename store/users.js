import { _users as types } from "~/utilities/types/users.js";
import { snackbar } from "~/utilities/types/snackbar.js";

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
  [types.getters.USERS]: state => state.users,
  [types.getters.SELECTED]: state => state.selected,
  [types.getters.GET_USER]: state => id =>
    state.users.find(user => user.id === id),
  [types.getters.ROLE_LIST]: state => state.roles,
  [types.getters.QUERY_PARAMS]: state => key =>
    typeof key !== undefined ? state.queryParams[key] : state.queryParams
};

const mutations = {
  [types.mutations.SET_USERS](state, users) {
    state.users = users;
  },
  [types.mutations.SET_ROLE_LIST](state, roles) {
    state.roles = roles;
  },
  [types.mutations.SET_SELECTED](state, value) {
    state.selected = value;
  },
  [types.mutations.SET_PARAM](state, { param, value }) {
    if (typeof state.queryParams[param] !== undefined) {
      state.queryParams[param] = value;
    }
  },
  [types.mutations.ADD_ROLE](state, { userId, role }) {
    const user = state.users.find(u => u.id === userId);
    if (user) user.roles.push(role);
  },
  [types.mutations.REMOVE_ROLE](state, { user_id, role_id }) {
    const user = state.users.find(u => u.id === user_id);
    if (user) {
      const idx = user.roles.findIndex(role => role.id === role_id);
      if (idx !== -1) user.roles.splice(idx, 1);
    }
  },
  [types.mutations.SET_USERNAME](state, { id, value }) {
    const user = state.users.find(u => u.id === id);
    if (user) user.username = value;
  },
  [types.mutations.SET_EMAIL](state, { id, value }) {
    const user = state.users.find(u => u.id === id);
    if (user) user.email = value;
  }
};

const actions = {
  async [types.actions.FETCH]({ state, commit, dispatch }) {
    try {
      const { data } = await this.$axios.get("/api/users", {
        params: { ...state.queryParams }
      });

      commit(types.mutations.SET_USERS, data.users.results);
      commit(types.mutations.SET_PARAM, {
        param: "total",
        value: data.users.total
      });
      commit(types.mutations.SET_ROLE_LIST, data.roles);
      dispatch(
        snackbar.actions.TOGGLE_BAR,
        { text: "Content Loaded." },
        { root: true }
      );
    } catch (err) {
      dispatch(
        snackbar.actions.TOGGLE_BAR,
        { text: err.message },
        { root: true }
      );
    }
  },
  async [types.actions.ADD_ROLE]({ commit, dispatch }, { userId, roleId }) {
    try {
      const { data } = await this.$axios.put(`/api/users/${userId}/role`, {
        roleId
      });
      commit(types.mutations.ADD_ROLE, {
        userId: data.user.id,
        role: data.user.role
      });
    } catch (err) {
      console.log(err);
      dispatch(
        snackbar.actions.TOGGLE_BAR,
        { text: err.message },
        { root: true }
      );
    }
  },
  async [types.actions.REMOVE_ROLE]({ commit, dispatch }, { userId, roleId }) {
    const url = `/api/users/${userId}/role`;
    try {
      const { data } = await this.$axios.delete(url, {
        data: { roleId }
      });

      commit(types.mutations.REMOVE_ROLE, data.user);
    } catch (err) {}
  },
  async [types.actions.DISABLE_USER]({ commit, dispatach }) {},
  async [types.actions.CHANGE_USER_INFO](
    { commit, dispatch },
    { id, type, value }
  ) {
    try {
      const { data } = await this.$axios.put(`/api/users/${id}/edit`, {
        [type]: value,
        type
      });

      const mutation = "SET_" + data.user.type.toUpperCase();

      commit(types.mutations[mutation], {
        id: data.user.id,
        value: data.user.value
      });
    } catch (err) {
      dispatch(
        snackbar.actions.TOGGLE_BAR,
        { text: err.message },
        { root: true }
      );
    }
  },
  async [types.actions.RESET_PASSWORD]({ commit, dispatch }) {},
  async [types.actions.CREATE_USER]({ state, commit, dispatch }, payload) {
    try {
      payload = { page, limit } = state.queryParams;
      const url = "/api/admin/users/create";
      const { data } = await this.$axios.post(url, payload);
      const text = `Created user: ${data.user.username}`;

      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });

      commit(types.mutations.SET_PARAM, {
        param: "total",
        value: data.users.total
      });
      commit(types.mutations.SETtypes, data.users.results);
    } catch (err) {
      const text = err.message;
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    }
  },
  async [types.actions.EDIT_USER]({ commit, dispatch }, { id, data }) {
    try {
      const url = `/api/admin/users/${id}/edit`;
      const { data } = await this.$axios.put(url, data);
    } catch (err) {}
  }
};

export default { state, getters, mutations, actions };
