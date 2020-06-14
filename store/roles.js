import { _roles as types } from "~/utilities/types/roles.js";
import { snackbar } from "~/utilities/types/snackbar.js";

const state = () => ({
  roles: [],
  selected: [],

  lastLoaded: 0,

  queryParams: {
    page: 1,
    limit: 20,
    total: 0,
    orderBy: "DESC",
    sortBy: "id"
  }
});

const getters = {
  [types.getters.ROLES]: state => state.roles,
  [types.getters.SELECTED]: state => state.selected.map({ id }),
  [types.getters.GET_ROLE]: state => id =>
    state.roles.find(role => role.id === id),
  [types.getters.QUERY_PARAMS]: state => key =>
    typeof key !== undefined ? state.queryParams[key] : state.queryParams
};

const mutations = {
  [types.mutations.SET_ROLES](state, payload) {
    state.roles = payload;
  },

  [types.mutations.SET_SELECTED](state, selected) {
    state.selected = selected;
  },

  [types.mutations.SET_PARAM](state, { param, value }) {
    state.queryParams[param] = value;
  },

  [types.mutations.SET_PERMISSIONS](state, { roleId, perms }) {
    const role = state.roles.find(role => role.id === roleId);
    if (role) role.permissions = perms;
  }
};

const actions = {
  async [types.actions.FETCH]({ commit, dispatch, state }, root) {
    try {
      const { data } = await this.$axios.get(`/api/roles`, {
        params: { ...state.queryParams }
      });

      commit(types.mutations.SET_ROLES, data.roles.results);
      commit(types.mutations.SET_PARAM, {
        param: "total",
        value: data.roles.total
      });

      if (root) {
        const text = "Content Loaded.";
        dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
      }
    } catch (err) {
      const text = err.message;
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
      console.log(err.response);
    }
  },
  async [types.actions.FETCH_PERMS]({ commit, dispatch, state }, id) {
    try {
      const { data } = await this.$axios.get(`/api/roles/perms/${id}`);

      commit(types.mutations.SET_PERMISSIONS, {
        roleId: data.role.id,
        perms: data.role.permissions
      });

      if (root) {
        const text = `Permissions loaded for ${id}.`;
        dispatch(
          snackbar.actions.TOGGLE_BAR,
          { text, timeout: 1500 },
          { root: true }
        );
      }
    } catch (err) {
      const text = err.message;
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
      console.log(err.response);
    }
  }
};

export default { state, getters, mutations, actions };
