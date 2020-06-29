import { _roles as types } from "~/utilities/types/roles.js";
import { snackbar } from "~/utilities/types/snackbar.js";

const state = () => ({
  roles: [],
  selected: [],

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
  [types.getters.SELECTED]: state => state.selected,
  [types.getters.SELECTED_IDS]: (state, getters) =>
    getters[types.getters.SELECTED].map(({ id }) => id),
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
  },

  [types.mutations.SET_NAME](state, { roleId, name }) {
    const role = state.roles.find(({ id }) => id === roleId);
    if (role) role.name = name;
  },

  [types.mutations.SET_STATUS](state, { roleId, status }) {
    const role = state.roles.find(({ id }) => id === roleId);
    if (role) role.is_disabled = status;
  },

  [types.mutations.CHANGE_ROLE_PERMISSION](state, { roleId, name, value }) {
    const role = state.roles.find(role => role.id === roleId);
    if (role && role.permissions) {
      const perms = role.permissions.find(perm => perm.name === name);
      if (perms) {
        perms.value = value;
      }
    }
  }
};

const actions = {
  async [types.actions.FETCH]({ commit, dispatch, state }, msg) {
    try {
      const {
        data: { roles, perms }
      } = await this.$axios.get(`/api/admin/roles`, {
        params: { ...state.queryParams }
      });

      commit(types.mutations.SET_ROLES, roles.results);
      commit(types.mutations.SET_PERMS, perms);
      commit(types.mutations.SET_PARAM, {
        param: "total",
        value: roles.total
      });

      if (msg) {
        const text = "Content Loaded.";
        dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
      }
    } catch (err) {
      console.log(err);
      const text = err.message;
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    }
  },

  async [types.actions.FETCH_PERMS]({ commit, getters, dispatch }, id) {
    try {
      const {
        data: { permissions }
      } = await this.$axios.get(`/api/roles/perms/${id}`);

      commit(types.mutations.SET_PERMISSIONS, {
        roleId: id,
        perms: permissions
      });
    } catch (err) {
      const text = err.message;
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
      console.log(err.response);
    }
  },

  async [types.actions.ADD_ROLE]({ state, commit, dispatch }, _data) {
    _data = { ..._data, ...state.queryParams };
    try {
      const {
        data: { roles }
      } = await this.$axios.post("/api/roles", _data);

      const text = `Added Role: ${_data.name}`;

      console.log(roles);

      commit(types.mutations.SET_ROLES, roles.results);
      commit(types.mutations.SET_PARAM, { param: "total", value: roles.total });
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    } catch (err) {
      const text = "Encountered a problem. Please contact the administrator.";
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    }
  },

  async [types.actions.EDIT_ROLE]({ commit, dispatch }, { id, payload }) {
    try {
      const {
        data: { role }
      } = await this.$axios.put(`/api/roles/${id}`, payload);

      if (role.name) {
        commit(types.mutations.SET_NAME, {
          roleId: role.id,
          name: role.name
        });
      }

      if (role.permissions && role.permissions.length) {
        role.permissions.forEach(r =>
          commit(types.mutations.CHANGE_ROLE_PERMISSION, {
            roleId: role.id,
            name: r.name,
            value: r.value
          })
        );
      }

      if (role.is_disabled) {
        commit(types.mutations.SET_STATUS, role.is_disabled);
      }

      const text = "Your changes have been saved.";
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    } catch (err) {
      const text = "Encountered a problem. Please contact the administrator.";
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    }
  },

  async [types.actions.REMOVE_ROLE]({ commit, state, getters }, id) {
    try {
      const ids = id || getters[types.getters.SELECTED_IDS];
      const data = { ids, ...state.queryparams };
      const roles = await this.$axios.delete("/api/roles", { data });

      commit(types.mutations.SET_ROLES, roles.data.results);
      commit(types.mutations.SET_PARAM, {
        param: "total",
        value: roles.data.total
      });
      const text = `Removed roles with the following ids: ${ids}`;
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    } catch (err) {
      const text = err.response;
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    }
  }
};

export default { state, getters, mutations, actions };
