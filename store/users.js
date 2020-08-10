import NS from "~/utilities/ns/private/users.js";
import snackbar from "~/utilities/ns/public/snackbar.js";

const state = () => ({
  users: [],
  selected: [],

  queryParams: {
    page: 1,
    limit: 20,
    total: 0,
    sortBy: "id",
    orderBy: "ASC"
  }
});

const getters = {
  [NS.getters.USERS]: state => state.users,
  [NS.getters.SELECTED]: state => state.selected,
  [NS.getters.GET_USER]: state => id =>
    state.users.find(user => user.id === id),
  [NS.getters.QUERY_PARAMS]: state => key =>
    typeof key !== undefined ? state.queryParams[key] : state.queryParams
};

const mutations = {
  [NS.mutations.SET_USERS](state, users) {
    state.users = users;
  },
  [NS.mutations.SET_ROLE_LIST](state, roles) {
    state.roles = roles;
  },
  [NS.mutations.SET_SELECTED](state, value) {
    state.selected = value;
  },
  [NS.mutations.SET_PARAM](state, { param, value }) {
    if (typeof state.queryParams[param] !== undefined) {
      state.queryParams[param] = value;
    }
  },
  [NS.mutations.ADD_ROLE](state, { userId, role }) {
    const user = state.users.find(u => u.id === userId);
    if (user) user.roles.push(role);
  },
  [NS.mutations.REMOVE_ROLE](state, { user_id, role_id }) {
    const user = state.users.find(u => u.id === user_id);
    if (user) {
      const idx = user.roles.findIndex(role => role.id === role_id);
      if (idx !== -1) user.roles.splice(idx, 1);
    }
  },
  [NS.mutations.SET_USERNAME](state, { id, value }) {
    const user = state.users.find(u => u.id === id);
    if (user) user.username = value;
  },
  [NS.mutations.SET_EMAIL](state, { id, value }) {
    const user = state.users.find(u => u.id === id);
    if (user) user.email = value;
  }
};

const actions = {
  async [NS.actions.FETCH]({ state, commit, dispatch }) {
    try {
      const { data } = await this.$axios.get("/api/users", {
        params: { ...state.queryParams }
      });

      commit(NS.mutations.SET_USERS, data.users.results);
      commit(NS.mutations.SET_PARAM, {
        param: "total",
        value: data.users.total
      });
      commit(NS.mutations.SET_ROLE_LIST, data.roles);
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
  async [NS.actions.ADD_ROLE]({ commit, dispatch }, { userId, roleId }) {
    try {
      const { data } = await this.$axios.put(`/api/users/${userId}/role`, {
        roleId
      });
      commit(NS.mutations.ADD_ROLE, {
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
  async [NS.actions.REMOVE_ROLE]({ commit, dispatch }, { userId, roleId }) {
    const url = `/api/users/${userId}/role`;
    try {
      const { data } = await this.$axios.delete(url, {
        data: { roleId }
      });

      commit(NS.mutations.REMOVE_ROLE, data.user);
    } catch (err) {}
  },
  async [NS.actions.DISABLE_USER]({ commit, dispatach }) {},
  async [NS.actions.CHANGE_USER_INFO](
    { commit, dispatch },
    { id, type, value }
  ) {
    try {
      const { data } = await this.$axios.put(`/api/users/${id}/edit`, {
        [type]: value,
        type
      });

      const mutation = "SET_" + data.user.type.toUpperCase();

      commit(NS.mutations[mutation], {
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
  async [NS.actions.RESET_PASSWORD]({ commit, dispatch }) {},
  async [NS.actions.CREATE_USER]({ state, commit, dispatch }, payload) {
    try {
      payload = { page, limit } = state.queryParams;
      const url = "/api/admin/users/create";
      const { data } = await this.$axios.post(url, payload);
      const text = `Created user: ${data.user.username}`;

      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });

      commit(NS.mutations.SET_PARAM, {
        param: "total",
        value: data.users.total
      });
      commit(NS.mutations.SET_USERS, data.users.results);
    } catch (err) {
      const text = err.message;
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    }
  },
  async [NS.actions.EDIT_USER]({ commit, dispatch }, payload) {
    try {
      const url = `/api/admin/users/${payload.id}/edit`;
      const {
        data: { user }
      } = await this.$axios.put(url, payload.data);

      if (user.inputs && Object.keys(user.inputs).length) {
        Object.keys(user.inputs).forEach(key => {
          commit(NS.mutations[`SET_${key.toUpperCase()}`], {
            id: user.id,
            value: user.inputs[key]
          });
        });
      }

      console.log(user);

      if (user.saved && user.saved.length) {
        user.saved.forEach(role =>
          commit(NS.mutations.ADD_ROLE, {
            userId: user.id,
            role: role
          })
        );
      }

      if (user.deleted && user.deleted.length) {
        user.deleted.forEach(({ role_id }) =>
          commit(NS.mutations.REMOVE_ROLE, {
            user_id: user.id,
            role_id
          })
        );
      }

      const text = "Your changes have saved.";

      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    } catch (err) {
      console.log(err);
      const text =
        "Encountered an error. Please try again or contact the admin.";
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    }
  }
};

export default { state, getters, mutations, actions };
