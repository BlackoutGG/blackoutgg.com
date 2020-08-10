import NS from "~/utilities/ns/private/roles.js";
import snackbar from "~/utilities/ns/public/snackbar.js";

const state = () => ({
  roles: [],
  selected: [],
  perms: [],

  queryParams: {
    page: 1,
    limit: 20,
    total: 0,
    orderBy: "DESC",
    sortBy: "id"
  }
});

const getters = {
  [NS.getters.ROLES]: state => state.roles,
  [NS.getters.PERM_LIST]: state => state.perms,
  [NS.getters.SELECTED]: state => state.selected,
  [NS.getters.SELECTED_IDS]: (state, getters) =>
    getters[NS.getters.SELECTED].map(({ id }) => id),
  [NS.getters.GET_ROLE]: state => id =>
    state.roles.find(role => role.id === id),
  [NS.getters.QUERY_PARAMS]: state => key =>
    typeof key !== undefined ? state.queryParams[key] : state.queryParams
};

const mutations = {
  [NS.mutations.SET_ROLES](state, payload) {
    state.roles = payload;
  },

  [NS.mutations.SET_SELECTED](state, selected) {
    state.selected = selected;
  },

  [NS.mutations.SET_PARAM](state, { param, value }) {
    state.queryParams[param] = value;
  },

  [NS.mutations.SET_PERM_LIST](state, perms) {
    state.perms = perms;
  },

  [NS.mutations.SET_PERMISSIONS](state, { roleId, perms }) {
    const role = state.roles.find(role => role.id === roleId);
    if (role) role.permissions = perms;
  },

  [NS.mutations.SET_NAME](state, { roleId, name }) {
    const role = state.roles.find(({ id }) => id === roleId);
    if (role) role.name = name;
  },

  [NS.mutations.SET_STATUS](state, { roleId, status }) {
    const role = state.roles.find(({ id }) => id === roleId);
    if (role) role.is_disabled = status;
  },

  [NS.mutations.CHANGE_ROLE_PERMISSION](state, { roleId, name, value }) {
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
  async [NS.actions.FETCH]({ commit, dispatch, state }, msg) {
    try {
      const { data } = await this.$axios.get("/api/roles", {
        params: { ...state.queryParams }
      });

      console.log(data.perms);

      if (data.perms && data.perms.length) {
        commit(NS.mutations.SET_PERM_LIST, data.perms);
      }

      commit(NS.mutations.SET_ROLES, data.roles.results);
      commit(NS.mutations.SET_PARAM, {
        param: "total",
        value: data.roles.total
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

  async [NS.actions.FETCH_PERMS]({ commit, getters, dispatch }, id) {
    try {
      const {
        data: { permissions }
      } = await this.$axios.get(`/api/roles/perms/${id}`);

      commit(NS.mutations.SET_PERMISSIONS, {
        roleId: id,
        perms: permissions
      });
    } catch (err) {
      const text = err.message;
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
      console.log(err.response);
    }
  },

  async [NS.actions.ADD_ROLE]({ state, commit, dispatch }, _data) {
    const params = { ..._data, ...state.queryParams };
    try {
      const {
        data: { roles }
      } = await this.$axios.post("/api/roles", params);

      const text = `Added Role: ${param.name}`;

      console.log(roles);

      commit(NS.mutations.SET_ROLES, roles.results);
      commit(NS.mutations.SET_PARAM, { param: "total", value: roles.total });
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    } catch (err) {
      console.error(err);
      const text = "Encountered a problem. Please contact the administrator.";
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    }
  },

  async [NS.actions.EDIT_ROLE]({ commit, dispatch }, { id, payload }) {
    try {
      const {
        data: { role }
      } = await this.$axios.put(`/api/roles/${id}`, payload);

      if (role.name) {
        commit(NS.mutations.SET_NAME, {
          roleId: role.id,
          name: role.name
        });
      }

      if (role.permissions && role.permissions.length) {
        role.permissions.forEach(r =>
          commit(NS.mutations.CHANGE_ROLE_PERMISSION, {
            roleId: role.id,
            name: r.name,
            value: r.value
          })
        );
      }

      if (role.is_disabled) {
        commit(NS.mutations.SET_STATUS, role.is_disabled);
      }

      const text = "Your changes have been saved.";
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    } catch (err) {
      console.log(err);
      const text = "Encountered a problem. Please contact the administrator.";
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    }
  },

  async [NS.actions.REMOVE_ROLE]({ commit, state, getters }, id) {
    try {
      const ids = id || getters[NS.getters.SELECTED_IDS];
      const data = { ids, ...state.queryparams };
      const roles = await this.$axios.delete("/api/roles", { data });

      commit(NS.mutations.SET_ROLES, roles.data.results);
      commit(NS.mutations.SET_PARAM, {
        param: "total",
        value: roles.data.total
      });
      const text = `Removed roles with the following ids: ${ids}`;
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    } catch (err) {
      console.log(err);
      const text = err.response;
      dispatch(snackbar.actions.TOGGLE_BAR, { text }, { root: true });
    }
  }
};

export default { state, getters, mutations, actions };
