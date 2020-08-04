import { _lists as types } from "~/utilities/ns/lists.js";
import { snackbar } from "~/utilities/ns/snackbar.js";

const state = () => ({
  items: {
    categories: [],
    forms: [],
    tags: []
  },
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
  [types.getters.ITEMS]: state => type => state.items[type],
  [types.getters.SELECTED]: state => state.selected,
  [types.getters.QUERY_PARAMS]: state => key =>
    typeof key !== undefined ? state.queryParams[key] : state.queryParams
};

const mutations = {
  [types.mutations.SET_LIST](state, { type, list }) {
    state.items[type] = list;
  },
  [types.mutations.SET_SELECTED](state, selected) {
    state.selected = selected;
  },
  [types.mutations.SET_PARAM](state, { param, value }) {
    state.queryParams[param] = value;
  }
};

const actions = {
  async [types.actions.FETCH]({ commit, dispatch, state }, type) {
    try {
      const { data } = await this.$axios.get(`/api/${type}`, {
        params: { ...state.queryParams }
      });

      const list = data[type];
      // const value = data[type].total;

      commit(types.mutations.SET_LIST, { type, list });
      // commit(types.mutations.SET_PARAM, { param: "total", value });
    } catch (err) {
      console.log(err);
    }
  }
};

export default { state, getters, mutations, actions };
